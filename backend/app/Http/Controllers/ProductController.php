<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('ma_san_pham', 'desc')->get();

        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

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

    public function getAllCategories()
    {
        $category = Category::all();
        
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ma_san_pham' => 'required|unique:sanpham,ma_san_pham|max:191',
            'ma_danh_muc' => 'required|max:191',
            'slug' => 'required|max:191',
            'ten_san_pham' => 'required|max:191',
            'gia' => 'required|numeric',
            'hinh_anh' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $product = new Product;
            $product->ma_san_pham = $request->input('ma_san_pham');
            $product->ma_danh_muc = $request->input('ma_danh_muc');
            $product->ten_san_pham = $request->input('ten_san_pham');
            $product->slug = $request->input('slug');
            $product->mo_ta = $request->input('mo_ta');
            $product->thuong_hieu = $request->input('thuong_hieu');
            $product->gia_goc = $request->input('gia_goc');
            $product->gia = $request->input('gia');
            $product->so_luong_ton = $request->input('so_luong_ton');

           
            $product->diem_danh_gia = 0;
            $product->so_luot_danh_gia = 0;
            

            
            $product->thong_so_ky_thuat = $request->input('thong_so_ky_thuat');

            if ($request->hasFile('hinh_anh')) {
                $file = $request->file('hinh_anh');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/product/', $filename);
                $product->hinh_anh = 'uploads/product/' . $filename;
            }

            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Added Successfully',
            ]);
        }
    }
    public function destroy($id)
{
    $product = Product::find($id);
    
    if($product) 
    {
        // Optional: Delete the image file from public folder
        $path = $product->hinh_anh;
        if(File::exists($path)) {
            File::delete($path);
        }

        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa sản phẩm thành công',
        ]);
    }
    else 
    {
        return response()->json([
            'status' => 404,
            'message' => 'Không tìm thấy sản phẩm',
        ]);
    }
}
}