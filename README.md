# Family Hub

Lightweight household task tracker with email notifications via **Resend**. Tasks and members are stored in `localStorage` on each device.

## Features

- Add, complete, delete tasks with priority (Urgent / Normal / Low)
- Filter by status or priority
- Email notifications on new task, task done, and daily reminders for stale tasks
- Auto-reminders fire hourly while the page is open (once per day per task, after 1 day open)
- Settings tab with editable Resend config + connectivity-test button

## Deploy (Vercel)

1. Push this repo to GitHub (already at https://github.com/KrishJainn/HouseReminderApp)
2. Import at https://vercel.com/new → pick the repo → **Deploy**
3. In Vercel project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend API key (from https://resend.com/api-keys)
4. Redeploy
5. Visit the live URL → **Settings** tab → enter From name / From email / Test recipient → **Send Connectivity Test**

### Alternative: API key in browser

If you don't want to set the env var, just paste the API key into the Settings tab. It's saved in your browser's localStorage and sent to this app's own `/api/send` proxy. The proxy uses the env var if set, otherwise falls back to the key from the request.

## Sender domain

By default emails come from `onboarding@resend.dev`, which Resend only delivers to the email on your Resend account (good for testing). To send to anyone, verify a domain at https://resend.com/domains and use that as the **From email** in Settings.

## Local dev

```
npx vercel dev
```

Opening `index.html` from `file://` won't work — the `/api/send` proxy requires a server.
