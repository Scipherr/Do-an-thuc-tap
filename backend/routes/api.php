<?php

use App\Http\Controllers\admin\DasboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController;

// ... existing code ...

//Route::middleware('auth:api')->get('/user', function (Request $request) {
  //  return $request->user();
//});

Route::post('/authenticate', [AuthenticateController::class, 'authenticate']);
Route::post('/register', [AuthenticateController::class, 'register']);


Route :: group (['middleware' => ['auth:sanctum']], function(){
    //Protected routes
Route::get('dashboard', [DasboardController::class,'index']);
Route::get('logout', [AuthenticateController::class, 'logout']);
});
