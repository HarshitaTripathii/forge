# Agent Setup Notes

## OpenClaw

Install:

```bash
npm install -g openclaw@latest
openclaw onboard
openclaw doctor
```

Slack patch:

```bash
openclaw plugins install @openclaw/slack
openclaw config patch --file ./openclaw/slack.socket.patch.json5.example --dry-run
openclaw config patch --file ./openclaw/slack.socket.patch.json5.example
openclaw gateway
```

Required local env:

```bash
SLACK_APP_TOKEN=xapp-...
SLACK_BOT_TOKEN=xoxb-...
GROQ_API_KEY=gsk_...
```

## Hermes

Install:

```bash
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
hermes setup
hermes model
hermes
```

Use Gemini free routing:

```bash
GEMINI_API_KEY=...
```

Commit the required reusable skill at:

```text
skills/status-report/SKILL.md
```

## Slack Loop To Demonstrate

1. Human posts goal in `#sprint-main`.
2. Hermes posts a plan in `#sprint-main`.
3. Hermes assigns coding work in `#agent-coder`.
4. OpenClaw edits/runs code and reports in `#agent-coder`.
5. Hermes posts autonomous/status output in `#agent-log`.
