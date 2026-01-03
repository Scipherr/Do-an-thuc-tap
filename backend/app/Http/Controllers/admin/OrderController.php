<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class OrderController extends Controller
{
   public function index()
{
   
    $orders = Order::join('nguoidung', 'donhang.ma_nguoi_dung', '=', 'nguoidung.ma_nguoi_dung')
        
        ->select('donhang.*', 'nguoidung.ho_ten as user_name') 
        ->orderBy('donhang.ngay_tao', 'desc')
        ->get();

    return response()->json([
        'status' => 200,
        'orders' => $orders
    ]);
}
public function myOrders()
    {
        $orders = Order::where('ma_nguoi_dung', Auth::id())
                        ->orderBy('ngay_tao', 'desc')
                        ->get();

        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }
public function viewOrder($id)
    {
        
        $order = Order::where('ma_don_hang', $id)
            ->where('ma_nguoi_dung', Auth::id())
            ->first();

        if ($order) {
            
            $orderItems = DB::table('chitietdonhang')
                ->join('sanpham', 'chitietdonhang.ma_san_pham', '=', 'sanpham.ma_san_pham')
                ->where('ma_don_hang', $id)
                ->select(
                    'chitietdonhang.*',
                    'sanpham.hinh_anh',
                    'sanpham.ten_san_pham as product_name' 
                )
                ->get();

            return response()->json([
                'status' => 200,
                'order' => $order,
                'order_items' => $orderItems
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found or access denied'
            ]);
        }
    }
}