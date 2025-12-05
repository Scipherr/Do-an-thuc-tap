<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController; // <-- Import your controller here

// ... existing code ...

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Add your authentication routes here:
Route::post('/authenticate', [AuthenticateController::class, 'authenticate']);
Route::post('/register', [AuthenticateController::class, 'register']);


