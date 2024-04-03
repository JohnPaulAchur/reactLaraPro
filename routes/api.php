<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route::apiResource('/users', UserController::class);
    // Route::apiResource('/users',UserController::class);
    

    Route::post('/send-message', [MessageController::class, 'store']);
    Route::get('/my-messages', [MessageController::class,'index']);
    Route::get('/dashboard-count', [DashboardController::class,'index']);
});


Route::middleware('auth:sanctum','auth.adm')->group(function () {
    
    Route::get('/users/{filter}', [UserController::class, 'index']);
    Route::get('/users-messages', [MessageController::class, 'get_all_msg']);
    Route::post('/create-users', [UserController::class, 'store']);
    Route::put('/activate-users/{id}', [UserController::class, 'activateUser']);
    Route::put('/deactivate-users/{id}', [UserController::class, 'deactivateUser']);
});



Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);