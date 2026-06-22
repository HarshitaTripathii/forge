<?php

return [
    'name' => env('APP_NAME', 'Forge 2 Kanban API'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'timezone' => 'UTC',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
    'providers' => [
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Events\EventServiceProvider::class,
        Illuminate\Routing\RoutingServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,
        Illuminate\Log\LogServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
    ],
    'aliases' => [],
];
