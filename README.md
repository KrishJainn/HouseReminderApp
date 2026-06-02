# Family Hub

A lightweight household task tracker with EmailJS notifications. Data is stored in `localStorage` on each device.

## Features

- Add, complete, and delete tasks with priority (Urgent / Normal / Low)
- Filter tasks by status or priority
- Manage family members and notify them by email on new tasks, completions, and overdue reminders
- Auto-reminders fire hourly while the page is open for tasks older than 1 day (once per day per task)
- Built-in test reminder button with full debug log

## Deploy

Static site — no build step. Deploy by pointing any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages) at the repo root.

## Config

EmailJS service ID, template ID, and public key are inlined at the top of `index.html`. Update them there to use your own EmailJS account. The template must include `{{to_email}}` in the To field and `{{to_name}}` `{{subject}}` `{{message}}` `{{added_by}}` in the body.
