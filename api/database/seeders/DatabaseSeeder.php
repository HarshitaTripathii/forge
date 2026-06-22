<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Task::query()->firstOrCreate(
            ['title' => 'Prove the agent loop'],
            [
                'description' => 'Hermes plans in Slack, OpenClaw executes, and all output stays visible.',
                'status' => 'todo',
                'priority' => 'high',
            ],
        );

        Task::query()->firstOrCreate(
            ['title' => 'Deploy frontend and API'],
            [
                'description' => 'Vercel serves React, Render serves Laravel, and the UI talks to /api/tasks.',
                'status' => 'doing',
                'priority' => 'high',
            ],
        );

        Task::query()->firstOrCreate(
            ['title' => 'Collect screenshots'],
            [
                'description' => 'Capture doctor outputs, Slack handoff, autonomous run, GitHub, and live URL.',
                'status' => 'done',
                'priority' => 'medium',
            ],
        );
    }
}
