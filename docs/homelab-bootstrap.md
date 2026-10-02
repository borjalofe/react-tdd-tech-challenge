# Homelab / Git bootstrap

Tipo **2**: GitHub is the primary (issues, PRs, wiki). Forgejo is a **pull-mirror** (LAN).

| Item | Value |
|------|--------|
| GitHub | `https://github.com/borjalofe/react-tdd-tech-challenge` (public) |
| Forgejo | `borja/react-tdd-tech-challenge` (pull-mirror, interval `8h0m0s`, wiki) |
| Local remotes | `github` (upstream), `forgejo` (mirror) — never `origin` |
| Branch protection (`main`) | Require PR; no force-push (GitHub) |
| Merge rights | Owner only (`borjalofe`) |

## Checklist

- [ ] GitHub public repo created
- [ ] Initial `main` pushed to `github`
- [ ] Forgejo pull-mirror configured (`8h`, wiki on, no issues sync required)
- [ ] Local: `git remote add github …` and `git remote add forgejo …`
- [ ] Branch protection on `main`
- [ ] Labels + milestones + issue templates

## Forgejo pull-mirror (when on LAN)

1. Forgejo → New Migration from `https://github.com/borjalofe/react-tdd-tech-challenge.git`
2. Enable periodic pull-mirror, interval `8h0m0s`
3. Include wiki; do **not** treat Forgejo as write primary

> Note: If `git.home.logo` / SSH `forgejo` is unreachable from the machine creating the repo, finish this checklist on the homelab network.
