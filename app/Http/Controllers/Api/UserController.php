<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($filter)
    {
        if($filter=="all"){

            return UserResource::collection(
                
                 User::query()->orderBy('id','desc')->where('utype','USR')->paginate(10)
            );
        }
        if($filter=="pending"){
            return UserResource::collection(
            
                    User::query()->orderBy('id','desc')->where('status','Pending')->where('utype','USR')->paginate(10)
            );
        }

        if($filter=="active"){
            return UserResource::collection(
            
                    User::query()->orderBy('id','desc')->where('status','Active')->where('utype','USR')->paginate(10)
            );
        }
        

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->validate([
            'name'=>'required|max:55',
            'email'=>'required|email',
            'phone'=>'required|max:20',
            'password'=>[
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->symbols()]
        ]);
        $data['password']=bcrypt($data['password']);
        $data['unique_code']=str::uuid();
        $user = User::create($data);
        return response (new UserResource($user),201);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate(
            [
                'name'=>'required|max:55',
                'email'=>'required|email|unique:users,email,'.$user->id,
                'phone'=>'required|max:20',
                'password'=>[
                    'confirmed',
                    Password::min(8)->mixedCase()->symbols()]
            ]
        );
        if(isset($data['password'])){
            $data['password']=bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }


    public function activateUser($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->status = 'Active';
        $user->save();
        return response()->json(['message' => 'User activated successfully']);
    }

    public function deactivateUser($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->status = 'Pending';
        $user->save();
        return response()->json(['message' => 'User deactivated successfully']);
    }
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response('',204);
    }
}
