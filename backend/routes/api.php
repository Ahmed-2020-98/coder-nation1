<?php

use App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware(SetLocale::class)->group(function () {
    Route::controller(ContentController::class)->group(function () {
        Route::get('services', 'services');
        Route::get('services/{slug}', 'service');
        Route::get('projects', 'projects');
        Route::get('projects/{slug}', 'project');
        Route::get('testimonials', 'testimonials');
        Route::get('settings', 'settings');
    });

    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

    Route::prefix('admin')->group(function () {
        Route::post('login', [Admin\AuthController::class, 'login'])->middleware('throttle:10,1');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('me', [Admin\AuthController::class, 'me']);
            Route::post('logout', [Admin\AuthController::class, 'logout']);
            Route::get('stats', Admin\StatsController::class);
            Route::patch('{resource}/reorder', Admin\ReorderController::class)
                ->whereIn('resource', ['services', 'projects', 'testimonials']);
            Route::apiResource('services', Admin\ServiceController::class);
            Route::apiResource('projects', Admin\ProjectController::class);
            Route::apiResource('testimonials', Admin\TestimonialController::class);
            Route::apiResource('messages', Admin\MessageController::class)->except('store');
            Route::get('settings', [Admin\SettingController::class, 'show']);
            Route::put('settings', [Admin\SettingController::class, 'update']);
            Route::post('uploads', Admin\UploadController::class);
        });
    });
});
