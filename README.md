# Forge 2 Edition 1 Qualifier

Two-agent qualifier build:

- OpenClaw is the coding agent, connected to Slack as the hands.
- Hermes is the orchestrator, connected to Slack as the brain.
- The shipped app is a tiny Trello-style Kanban board.
- Frontend: React + Vite.
- Backend: Laravel API with SQLite.
- Deployment: Vercel for frontend, Render Docker web service for API.

## Repo Layout

```text
frontend/                 React Kanban UI
api/                      Laravel API
skills/status-report/     Required Hermes reusable skill
openclaw/                 OpenClaw Slack config example
agent-env.example         Required local env names, without real secrets
render.yaml               Render blueprint for the API
```

## Local Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI works with fallback demo tasks if the API is not running. Set this when the API is live:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## Local API

The API is Laravel and is designed to deploy through Docker on Render. For local PHP development:

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

## Agent Routing

Recommended free routing:

- Hermes: Gemini `gemini-2.5-flash`
- OpenClaw: Groq `llama-3.3-70b-versatile`

Keep real keys in a local uncommitted env file. Do not commit Slack, Gemini, or Groq secrets.

## Slack Channels

Use exactly these channels:

- `#sprint-main`: human talks to Hermes
- `#agent-coder`: Hermes assigns coding tasks to OpenClaw
- `#agent-log`: raw activity and autonomous run output

## Submission

Submit:

- Public GitHub repo URL
- Live Vercel frontend URL
- Live Render API URL
- Screenshots listed in `SUBMISSION_EVIDENCE.md`
