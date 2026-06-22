# Deployment

## 1. Push GitHub

Push this repo to:

```text
https://github.com/HarshitaTripathii/forge
```

## 2. Render API

Render dashboard:

1. Click **New**.
2. Click **Blueprint** if available, and select this repo.
3. If Blueprint is not offered, click **Web Service**.
4. Select repo `HarshitaTripathii/forge`.
5. Use:
   - Name: `forge2-kanban-api`
   - Runtime: `Docker`
   - Root Directory: `api`
   - Instance Type: `Free`
   - Health Check Path: `/api/health`
6. Add env var:
   - `FRONTEND_URL`: the final Vercel URL, after Vercel is deployed.
7. Deploy.

After deploy, test:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
https://YOUR-RENDER-SERVICE.onrender.com/api/tasks
```

## 3. Vercel Frontend

Vercel dashboard:

1. Click **Add New**.
2. Click **Project**.
3. Import repo `HarshitaTripathii/forge`.
4. Set:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add env var:
   - `VITE_API_BASE_URL`: `https://YOUR-RENDER-SERVICE.onrender.com/api`
6. Deploy.

## 4. Final Cross-Link

After Vercel deploys, return to Render and set:

```text
FRONTEND_URL=https://YOUR-VERCEL-APP.vercel.app
```

Redeploy Render once so CORS accepts the final frontend URL.
