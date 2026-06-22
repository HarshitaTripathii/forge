# Submission Evidence Checklist

Take screenshots of:

- `openclaw doctor` with no major config/channel errors.
- `hermes doctor` with clean setup.
- `#sprint-main`: your goal prompt and Hermes replying with a plan.
- `#agent-coder`: Hermes assigning a coding task to OpenClaw.
- `#agent-coder`: OpenClaw reporting code/run results.
- `#agent-log`: one autonomous Hermes cron/status message.
- Slack API `auth.test` output showing `"ok": true`.
- Slack API `chat.postMessage` output showing `"ok": true`.
- Slack API `conversations.history` output showing the posted test message.
- GitHub repo page showing the repo is public.
- Render API `/api/health` in browser.
- Vercel live Kanban app in browser.

Recommended Slack round-trip:

```bash
curl -s -H "Authorization: Bearer $SLACK_BOT_TOKEN" https://slack.com/api/auth.test

curl -s -X POST https://slack.com/api/chat.postMessage \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"channel\":\"$SPRINT_MAIN_CHANNEL_ID\",\"text\":\"round-trip test from Forge 2 qualifier\"}"

curl -s -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  "https://slack.com/api/conversations.history?channel=$SPRINT_MAIN_CHANNEL_ID&limit=5"
```
