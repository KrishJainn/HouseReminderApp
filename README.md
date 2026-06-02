# Family Hub

Lightweight household task tracker with email notifications via **EmailJS**. Tasks and members are stored in `localStorage` per device.

## Features

- Add, complete, delete tasks with priority (Urgent / Normal / Low)
- Filter by status or priority
- Email notifications on new task, task done, and daily reminders for stale tasks
- Auto-reminders fire hourly while the page is open (once per day per task, after 1 day open)
- Settings tab with editable EmailJS config + connectivity-test button
- Pure static site — works from any host (Vercel, Netlify, GitHub Pages, or just opened locally)

## Setup (60 seconds)

1. Create an account at https://www.emailjs.com (free tier: 200 emails/month, no domain needed)
2. **Add an Email Service** (e.g. Gmail) — copy the **Service ID** (`service_xxxxxxx`)
3. **Create a Template** with:
   - **To Email:** `{{to_email}}`
   - **Subject:** `{{subject}}`
   - **Content:**
     ```
     Hi {{to_name}},

     {{message}}

     — Added by {{added_by}}
     ```
   - Copy the **Template ID** (`template_xxxxxxx`)
4. **Account → API Keys** → copy your **Public Key**
5. Open the app → **Settings** → paste all three → **Save config** → **Send connectivity test**

## Deploy

Static site — drop on any host. Already on GitHub at https://github.com/KrishJainn/HouseReminderApp; import at https://vercel.com/new for an auto-deploying live URL.
