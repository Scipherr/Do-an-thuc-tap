<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    
    public function getTopRated()
    {
        $products = DB::table('sanpham')
            ->orderByDesc('diem_danh_gia')
            ->limit(4)
            ->get();

        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

   
    public function getNewArrivals()
    {
        $products = DB::table('sanpham')
            ->orderByDesc('ngay_tao') 
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }


    public function getDetail($id)
    {
        $product = DB::table('sanpham')->where('ma_san_pham', $id)->first();
        
        if($product) {
             return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
             return response()->json([
                'status' => 404,
                'message' => 'Product Not Found'
            ]);
        }
    }
}