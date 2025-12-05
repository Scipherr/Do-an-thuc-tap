<?php

use App\Http\Controllers\admin\DasboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController;

// Public Routes
Route::post('/authenticate', [AuthenticateController::class, 'authenticate']);
Route::post('/register', [AuthenticateController::class, 'register']);

// Product Data Routes
Route::get('products/top-rated', [ProductController::class, 'getTopRated']);
Route::get('products/new-arrivals', [ProductController::class, 'getNewArrivals']);
Route::get('product/{id}', [ProductController::class, 'getDetail']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('dashboard', [DasboardController::class,'index']);
    Route::get('logout', [AuthenticateController::class, 'logout']);
});