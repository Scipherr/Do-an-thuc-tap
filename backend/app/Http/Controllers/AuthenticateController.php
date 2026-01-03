<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
class AuthenticateController extends Controller
{
    public function authenticate(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mat_khau' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

       
        $user = User::where('email', $request->email)->first();

       if ($user && $user->mat_khau == $request->mat_khau) {
            
            Auth::login($user);
            
           
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->ma_nguoi_dung,
                    'name' => $user->ho_ten,
                    'email' => $user->email,
                    'role' => $user->vai_tro,
                    'image' => $user->hinh_anh, 
                ]
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Email hoặc mật khẩu không chính xác'
            ], 401);
        }
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:NguoiDung,email', 
            'mat_khau' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        
        $user = User::create([
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'mat_khau' => $request->mat_khau, 
            'vai_tro' => 'customer', 
        ]);

       $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => [
                'id' => $user->ma_nguoi_dung,
                'name' => $user->ho_ten,
                'email' => $user->email,
                'role' => $user->vai_tro,
                'image' => $user->hinh_anh, 
            ]
        ], 201);
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    
    public function updateUser(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'ho_ten' => 'nullable|string|max:255',
            'so_dien_thoai' => 'nullable|string|max:20',
            'duong' => 'nullable|string|max:255',
            'thanh_pho' => 'nullable|string|max:100',
            'tinh_thanh' => 'nullable|string|max:100',
            'ngay_sinh' => 'nullable|date',
            'gioi_tinh' => 'nullable|string|in:Nam,Nữ,Khác',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 422, 'errors' => $validator->errors()]);
        }

        // Handle Avatar Upload
        if ($request->hasFile('avatar')) {
            $path = 'uploads/profile/';
            if ($user->hinh_anh && File::exists(public_path($user->hinh_anh))) {
                File::delete(public_path($user->hinh_anh));
            }
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path($path), $filename);
            $user->hinh_anh = $path . $filename;
        }

        // Update other fields if present
        if ($request->has('ho_ten')) $user->ho_ten = $request->ho_ten;
        if ($request->has('so_dien_thoai')) $user->so_dien_thoai = $request->so_dien_thoai;
        if ($request->has('duong')) $user->duong = $request->duong;
        if ($request->has('thanh_pho')) $user->thanh_pho = $request->thanh_pho;
        if ($request->has('tinh_thanh')) $user->tinh_thanh = $request->tinh_thanh;
        if ($request->has('ngay_sinh')) $user->ngay_sinh = $request->ngay_sinh;
        if ($request->has('gioi_tinh')) $user->gioi_tinh = $request->gioi_tinh;

        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật thông tin thành công',
            'user' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed', // expects new_password_confirmation field
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 422, 'errors' => $validator->errors()]);
        }

        $user = $request->user();

        // Note: Since your login uses plain text comparison in the provided code ($user->mat_khau == $request->mat_khau),
        // I will assume you want to keep using plain text or switch to hashing. 
        // Best practice is Hashing. Below logic supports plain text as per your current login code.
        
        if ($request->current_password !== $user->mat_khau) {
             return response()->json(['status' => 400, 'message' => 'Mật khẩu hiện tại không đúng']);
        }

        $user->mat_khau = $request->new_password; // If using Hash: Hash::make($request->new_password);
        $user->save();

        return response()->json(['status' => 200, 'message' => 'Đổi mật khẩu thành công']);
    }

    // Update userProfile to include new fields
    public function userProfile(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('ma_nguoi_dung', $user->ma_nguoi_dung)
                       ->orderBy('ngay_tao', 'desc')->get();

        return response()->json([
            'status' => 200,
            'user' => [
                'name' => $user->ho_ten,
                'email' => $user->email,
                'phone' => $user->so_dien_thoai, // Added
                'address' => $user->duong,       // Split for easier editing
                'city' => $user->thanh_pho,      // Split
                'state' => $user->tinh_thanh,    // Split
                'avatar' => $user->hinh_anh,
                'dob' => $user->ngay_sinh,       // Added
                'gender' => $user->gioi_tinh,    // Added
            ],
            'orders' => $orders
        ]);
    }
}