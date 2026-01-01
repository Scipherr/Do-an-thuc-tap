<?php

use App\Http\Controllers\admin\DasboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\CartController;

// ROUT CHO PUBLIC 
Route::post('/authenticate', [AuthenticateController::class, 'authenticate']);
Route::post('/register', [AuthenticateController::class, 'register']);

// ETC
Route::get('products/top-rated', [ProductController::class, 'getTopRated']);
Route::get('products/new-arrivals', [ProductController::class, 'getNewArrivals']);
Route::get('product/{id}', [ProductController::class, 'getDetail']);
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('dashboard', [DasboardController::class,'index']);
    Route::get('logout', [AuthenticateController::class, 'logout']);
});
//DASH
Route::group(['middleware' => ['auth:sanctum']], function(){
    
    Route::get('dashboard', [DasboardController::class,'index']);
    
    
    Route::get('view-product', [ProductController::class, 'index']);
    
    Route::get('logout', [AuthenticateController::class, 'logout']);
    Route::get('admin/orders', [OrderController::class, 'index']);

    // CART ROUTES
    Route::post('add-to-cart', [CartController::class, 'addToCart']);
    Route::get('cart', [CartController::class, 'viewCart']);
    Route::put('cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
    Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem']);
});

