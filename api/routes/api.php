<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => ['ok' => true, 'service' => 'forge2-kanban-api']);

Route::apiResource('tasks', TaskController::class)->only([
    'index',
    'store',
    'update',
    'destroy',
]);
