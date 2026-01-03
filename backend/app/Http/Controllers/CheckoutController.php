<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Cart;
use App\Models\Product;

class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {
        if (Auth::check()) {
            $validator = Validator::make($request->all(), [
                'ho_ten' => 'required|max:191',
                'so_dien_thoai' => 'required|max:191',
                'email' => 'required|max:191',
                'duong' => 'required|max:191',
                'thanh_pho' => 'required|max:191',
                'tinh_thanh' => 'required|max:191',
                'payment_mode' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors(),
                ]);
            }

            $user_id = Auth::user()->ma_nguoi_dung;
            
            
            $cartItems = Cart::where('ma_nguoi_dung', $user_id)->get();
            
            if($cartItems->count() == 0) {
                 return response()->json([
                    'status' => 400,
                    'message' => 'Giỏ hàng trống',
                ]);
            }

            $total_amount = 0;
            foreach ($cartItems as $item) {
                $product = Product::where('ma_san_pham', $item->ma_san_pham)->first();
                if($product) {
                    $total_amount += $product->gia * $item->so_luong;
                }
            }

            
            $order = new Order();
            $order->ma_nguoi_dung = $user_id;
            $order->tien_hang = $total_amount;
            $order->thue = $total_amount * 0.1; 
            $order->phi_van_chuyen = 30000; 
            $order->tien_giam = 0; 
            $order->tong_tien = $order->tien_hang + $order->thue + $order->phi_van_chuyen - $order->tien_giam;
            
            $order->phuong_thuc_tt = $request->payment_mode;
            $order->trang_thai = 0; 
            $order->duong_giao_hang = $request->duong;
            $order->thanh_pho_giao_hang = $request->thanh_pho . ', ' . $request->tinh_thanh;
            $order->quoc_gia_giao_hang = 'Vietnam';
            
            
            if($request->payment_mode == 'COD') {
                $order->da_thanh_toan = 0;
            } else {
               
                $order->da_thanh_toan = 0; 
            }

            $order->save();

          
            foreach ($cartItems as $item) {
                $product = Product::where('ma_san_pham', $item->ma_san_pham)->first();
                if($product) {
                    OrderDetail::create([
                        'ma_don_hang' => $order->ma_don_hang,
                        'ma_san_pham' => $item->ma_san_pham,
                        'ten_san_pham' => $product->ten_san_pham,
                        'hinh_anh' => $product->hinh_anh, 
                        'so_luong' => $item->so_luong,
                        'gia' => $product->gia,
                        'thoi_gian_bao_hanh' => 12 
                    ]);

                    
                    $product->so_luong_ton = $product->so_luong_ton - $item->so_luong;
                    $product->save();
                }
            }

            
            Cart::destroy($cartItems);

            return response()->json([
                'status' => 200,
                'message' => 'Đặt hàng thành công',
            ]);

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }
}