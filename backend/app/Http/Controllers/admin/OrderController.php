<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;

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
}