<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticateController extends Controller
{
    public function authenticate (Request $request){
        $validator = Validator::make(request()->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
         if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator ->errors()] );
        } else {
            $credentials =[
                'email' => $request -> email,
                'password' => $request -> password,
            ];

            if  (Auth :: attempt ()){

            } else {
                return response()->json([
                'status' => false,
                'errors' => 'Either email/password is incorrect'] );
            }
        }
}
}
