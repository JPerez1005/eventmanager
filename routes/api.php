<?php

use App\Http\Controllers\MultiModelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('{type}')->group(function () {
    Route::get('/all', [MultiModelController::class, 'all']);
    Route::get('/paginate', [MultiModelController::class, 'index']);
    Route::post('/', [MultiModelController::class, 'store']);
    Route::get('/{id}', [MultiModelController::class, 'show']);
    Route::put('/{id}', [MultiModelController::class, 'update']);
    Route::delete('/{id}', [MultiModelController::class, 'destroy']);
});
