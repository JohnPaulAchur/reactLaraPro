<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MessageResource::collection(
            Message::query()->orderBy('id','desc')->where('user_id',Auth::user()->id)->paginate(10)
       );
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $request->validated();

        $message = new Message();
        $message->user_id = auth()->id(); 
        $message->message = $request->input('message');
        $message->save();

        return response()->json(['message' => 'Message sent successfully'], 201);
        // return response (new MessageResource($message),201);
    }

    
    public function get_all_msg()
    {
        return MessageResource::collection(
            Message::query()
            ->select('messages.*', 'users.name as sender_fullname')
            ->join('users', 'messages.user_id', '=', 'users.id')
            ->orderBy('messages.id', 'desc')
            ->paginate(10)
       );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
