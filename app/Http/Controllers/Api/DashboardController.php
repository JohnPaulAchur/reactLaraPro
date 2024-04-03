<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        $usersCount = User::count(); // Replace User with your user model
        $messagesCount = Message::count(); // Replace Message with your message model
        $activeUsersCount = User::where('status', 'Active')->count(); // Replace User with your user model

        // Logic for pending users count (assuming a 'pending' field in the User model)
        $pendingUsersCount = User::where('status','Pending')->count(); // Replace User with your user model
        
        // Fetching today's user records
        $todayUsersCount = User::whereDate('created_at', $today)->count(); // Assuming 'created_at' is the timestamp when the user record was created
        $todayMsgCount = Message::whereDate('created_at', $today)->count(); // Assuming 'created_at' is the timestamp when the user record was created
        
        return compact('usersCount', 'messagesCount', 'activeUsersCount', 'pendingUsersCount', 'todayUsersCount','todayMsgCount');
    }
}
