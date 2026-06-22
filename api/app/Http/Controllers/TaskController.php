<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Task::query()->latest()->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $task = Task::query()->create($this->validated($request));

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task): JsonResponse
    {
        $task->update($this->validated($request, partial: true));

        return response()->json($task->refresh());
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(null, 204);
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'title' => [$required, 'string', 'max:120'],
            'description' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'status' => [$required, Rule::in(['todo', 'doing', 'done'])],
            'priority' => [$required, Rule::in(['low', 'medium', 'high'])],
        ]);
    }
}
