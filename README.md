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
| `/admin` | Admin dashboard (admins only) |
| `/privacy` | Privacy policy |
| `/app` | Mobile app landing page |

## Tech

- Static HTML/CSS/JS served via Vercel (Williams-Digital team, `cart-path-club` project)
- DNS: GoDaddy → Vercel apex A record (`76.76.21.21`) + `www` CNAME to `cname.vercel-dns.com`
- Email: Google Workspace (`@cartpathclub.com`) with `hello@` as the shared team inbox
- Auth: AWS Cognito (`us-east-1_TSgDZMC6H`)
- API: AWS Lambda + API Gateway (`ha2sinzpu3.execute-api.us-east-1.amazonaws.com`)
- Scores: ESPN public feed, normalized via `cartpath-scores-proxy` Lambda
- Chat: DynamoDB + Lambda polling
- Config: `vercel.json` handles clean URLs, legacy redirects, and security headers

## Deploy

Push to `main`. Vercel auto-detects the commit via the GitHub App webhook and redeploys within ~15 seconds. Every branch push creates a preview deployment.
