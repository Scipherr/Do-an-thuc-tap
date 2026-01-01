<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use Carbon\Carbon;

class DasboardController extends Controller
{
    public function index()
    {
        // 1. Get the counts
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $totalCategories = Category::count();

        // 2. Get the 5 most recent orders (latest first)
        $recentOrders = Order::where('ngay_tao', '>=', Carbon::now()->subWeeks(2)) // Filter: Last 14 days
                             ->orderBy('ngay_tao', 'desc')
                             ->get();

        return response()->json([
            'status' => 200,
            'total_users' => $totalUsers,
            'total_products' => $totalProducts,
            'total_orders' => $totalOrders,
            'total_categories' => $totalCategories,
            'recent_orders' => $recentOrders
        ]);
    }
}