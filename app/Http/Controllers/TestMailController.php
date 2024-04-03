<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Mail;
use App\Mail\TestingMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail as FacadesMail;

class TestMailController extends Controller
{
    public function index(){
        // $body="test Body";
        $subject="test subject";
        FacadesMail::to('user@gmail.com')->send(new TestingMail(Auth::user(),$subject));
    }
}
