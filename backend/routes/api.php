<?php

use App\Http\Controllers\admin\DasboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\CheckoutController;

// ROUTE CHO PUBLIC 
Route::post('/authenticate', [AuthenticateController::class, 'authenticate']);
Route::post('/register', [AuthenticateController::class, 'register']);

// ETC
Route::get('products/top-rated', [ProductController::class, 'getTopRated']);
Route::get('products/new-arrivals', [ProductController::class, 'getNewArrivals']);
Route::get('product/{id}', [ProductController::class, 'getDetail']);

// NEW CATEGORY ROUTE (By ID)
Route::get('products/category/{id}', [ProductController::class, 'getProductsByCategory']);


//DASH
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('dashboard', [DasboardController::class,'index']);
    Route::get('logout', [AuthenticateController::class, 'logout']);
    
    //USER
    Route::get('user-profile', [AuthenticateController::class, 'userProfile']);
    Route::get('my-orders', [OrderController::class, 'myOrders']);
    Route::get('my-order/{id}', [OrderController::class, 'viewOrder']);
    Route::post('update-user', [AuthenticateController::class, 'updateUser']);
    Route::post('change-password', [AuthenticateController::class, 'changePassword']);


    Route::get('admin/orders', [OrderController::class, 'index']);
   Route::get('admin/order/{id}', [OrderController::class, 'viewOrderAdmin']);
    // CART ROUTES
    Route::post('add-to-cart', [CartController::class, 'addToCart']);
    Route::get('cart', [CartController::class, 'viewCart']);
    Route::put('cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
    Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem']);
    Route::post('place-order', [CheckoutController::class, 'placeOrder']);

    //ADD PRODUCT
    Route::post('add-product', [ProductController::class, 'store']);
    Route::get('all-categories', [ProductController::class, 'getAllCategories']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::put('update-product/{id}', [ProductController::class, 'update']);
    //AD_USER
    Route::get('admin/users', [UserController::class, 'index']);
    Route::get('admin/user/{id}', [UserController::class, 'show']);
    Route::delete('admin/delete-user/{id}', [UserController::class, 'destroy']);
});