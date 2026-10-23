# FitLog — Workout Library

A responsive dark-mode workout library and daily training planner built with Next.js App Router. Browse exercises, view workout instructions, save favorites, and build a plan of up to five lifts.

## Technologies
- Next.js App Router and React
- JavaScript
- Tailwind CSS setup plus custom responsive CSS
- Lucide React icons
- FitLog REST API
- localStorage for persistent plan and saved lists

## Features
1. Responsive workout library with API-driven data.
2. Workout detail routes with equipment, difficulty, sets, reps, stats, and instructions.
3. Today's Plan with a five-workout cap and live exercise/minutes/calories metrics.
4. Save-for-later list with persistent localStorage state.
5. Search and sort by duration, calories, or rating.
6. Toast notifications, mark-as-done, remove actions, and live navbar counters.
7. Loading states, fallback API endpoint, and custom 404 page.

## Run locally

Use Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, copy the environment example with:

```powershell
Copy-Item .env.example .env.local
```

The app tries the primary API and then the alternative API if the first request fails. To set a different endpoint, update `NEXT_PUBLIC_FITLOG_API` in `.env.local` and restart the dev server.

## Routes
- `/` — Workout Library
- `/workouts/[id]` — Workout details
- `/my-plan` — Today's Plan and Saved tabs
- Unknown routes — custom 404 page

## Deployment notes
Deploy as a Next.js application (for example, on Vercel). Do not deploy as a static-only export unless you configure the host to support the required routes. Test direct refresh on `/my-plan` and a `/workouts/{id}` route after deployment.

## Git commit checklist
Make separate commits as you finish milestones, for example:
1. `chore: scaffold Next.js app router project`
2. `style: add dark FitLog design tokens and responsive layout`
3. `feat: add shared navbar and footer`
4. `feat: fetch and render workout library`
5. `feat: add workout detail route and instructions`
6. `feat: add plan and saved state with localStorage`
7. `feat: add plan metrics, remove and mark done actions`
8. `docs: add FitLog README and deployment instructions`
