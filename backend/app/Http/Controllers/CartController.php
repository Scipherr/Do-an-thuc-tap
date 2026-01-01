<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        if (Auth::check()) {
            $user_id = Auth::user()->ma_nguoi_dung;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('ma_san_pham', $product_id)->exists();

            if ($productCheck) {
                if (Cart::where('ma_san_pham', $product_id)->where('ma_nguoi_dung', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $product_id . ' đã có trong giỏ hàng',
                    ]);
                } else {
                    $cartItem = new Cart;
                    $cartItem->ma_nguoi_dung = $user_id;
                    $cartItem->ma_san_pham = $product_id;
                    $cartItem->so_luong = $product_qty;
                    $cartItem->save();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Đã thêm vào giỏ hàng thành công',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy sản phẩm',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để thêm vào giỏ hàng',
            ]);
        }
    }

    public function viewCart()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->ma_nguoi_dung;
            $cartItems = Cart::where('ma_nguoi_dung', $user_id)->get();
            
            return response()->json([
                'status' => 200,
                'cart' => $cartItems,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập để xem giỏ hàng',
            ]);
        }
    }

    public function updateQuantity($cart_id, $scope)
    {
        if (Auth::check()) {
            $user_id = Auth::user()->ma_nguoi_dung;
            // Note: Using ma_gio_hang because that's the actual DB column
            $cartItem = Cart::where('ma_gio_hang', $cart_id)->where('ma_nguoi_dung', $user_id)->first();
            
            if ($cartItem) {
                if ($scope == "inc") {
                    $cartItem->so_luong += 1;
                } else if ($scope == "dec") {
                    if($cartItem->so_luong > 1){
                        $cartItem->so_luong -= 1;
                    }
                }
                $cartItem->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Đã cập nhật số lượng',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy sản phẩm trong giỏ',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập',
            ]);
        }
    }

    public function deleteCartItem($cart_id)
    {
        if (Auth::check()) {
            $user_id = Auth::user()->ma_nguoi_dung;
            $cartItem = Cart::where('ma_gio_hang', $cart_id)->where('ma_nguoi_dung', $user_id)->first();
            
            if ($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Đã xóa sản phẩm khỏi giỏ hàng',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy sản phẩm',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vui lòng đăng nhập',
            ]);
        }
    }
}