<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class DasboardController extends Controller
{
    public function index()
    {
       
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalCategories = Category::count();

        
        $recentOrders = Order::where('ngay_tao', '>=', Carbon::now()->subWeeks(2))
                             ->orderBy('ngay_tao', 'desc')
                             ->get();
                             $revenueStats = Order::where('trang_thai', 3) 
        ->whereNotNull('ngay_thanh_toan') 
        ->where('ngay_thanh_toan', '>=', Carbon::now()->subDays(7))
        ->select(
            DB::raw('DATE(ngay_thanh_toan) as date'), 
            DB::raw('SUM(tong_tien) as total_revenue')
        )
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();


        return response()->json([
            'status' => 200,
            'total_users' => $totalUsers,
            'total_products' => $totalProducts,
            'total_orders' => $totalOrders,
            'total_categories' => $totalCategories,
            'recent_orders' => $recentOrders,
            'revenue_stats' => $revenueStats
        ]);
    }
}