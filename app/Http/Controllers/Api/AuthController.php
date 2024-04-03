<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Mail\TestingMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
            'unique_code' => str::uuid(),
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return(compact('user','token'));
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>'required|email',
            'password'=>'required|string'
        ]);
        if(!Auth::attempt($credentials)){
            return response([
                'message'=>'Incorrect Email Or Password'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return(compact('user','token'));
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}
