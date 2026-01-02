<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('ngay_tao', 'desc')->get();
        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            if ($user) {
                
               $user->delete();
                
                
                return response()->json([
                    'status' => 200,
                    'message' => 'User deleted successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found'
                ]);
            }
        } catch (QueryException $e) {
           
            if ($e->getCode() == "23000") {
                return response()->json([
                    'status' => 400, 
                    'message' => 'Cannot delete user. They have related data (Orders, Reviews, etc.) that cannot be removed.'
                ]);
            }
            return response()->json([
                'status' => 500,
                'message' => 'Internal Server Error'
            ]);
        }
    }
}