<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request)
    {
        // 1. Validate 'email' and 'mat_khau'
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

        // 2. Manual check for plain text password
        $user = User::where('email', $request->email)->first();

        if ($user && $user->mat_khau == $request->mat_khau) {
            // Log the user in manually
            Auth::login($user);
            
            // Create Sanctum token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->ma_nguoi_dung,
                    'name' => $user->ho_ten,
                    'email' => $user->email,
                    'role' => $user->vai_tro
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
            'email' => 'required|email|unique:NguoiDung,email', // Note table name
            'mat_khau' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create user with PLAIN TEXT password
        $user = User::create([
            'ho_ten' => $request->ho_ten,
            'email' => $request->email,
            'mat_khau' => $request->mat_khau, // No Hash::make()
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
                'role' => $user->vai_tro
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
}