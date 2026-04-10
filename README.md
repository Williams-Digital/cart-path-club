# Cart Path Club

The public-facing website for Cart Path Club — Atlanta's private, invitation-only golf membership community.

Live at [cartpathclub.com](https://cartpathclub.com).

## Structure

| Path | Purpose |
|---|---|
| `/` | Main pitch site |
| `/scores` | Live PGA Tour leaderboard (Masters-style board) |
| `/apply` | Membership application form |
| `/members` | Member portal (Cognito login required) |
| `/admin` | Admin dashboard (Dylan + Mayo only) |
| `/privacy` | Privacy policy |
| `/app` | Mobile app landing page |

## Tech

- Static HTML/CSS/JS served via GitHub Pages
- DNS: GoDaddy → GitHub Pages IPs (`185.199.108-111.153`)
- Email: Google Workspace (`@cartpathclub.com`)
- Auth: AWS Cognito (`us-east-1_TSgDZMC6H`)
- API: AWS Lambda + API Gateway (`ha2sinzpu3.execute-api.us-east-1.amazonaws.com`)
- Scores: ESPN public feed, normalized via `cartpath-scores-proxy` Lambda
- Chat: DynamoDB + Lambda polling

## Deploy

Push to `main`. GitHub Pages redeploys automatically within ~30 seconds.
