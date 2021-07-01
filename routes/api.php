<?php

use App\Http\Controllers\Api\CloudContributorsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/cloud_contributors", [CloudContributorsController::class, "store"]);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
