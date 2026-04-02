# E-baonmo

Local-first expense tracker with a Commander.js CLI and a Next.js 14 dashboard backed by `data/expenses.json`.

## Commands

```bash
npm run cli -- add --amount 150 --category Food --desc "Lunch" --date 2026-04-01
npm run cli -- list
npm run cli -- summary
npm run cli -- filter --category Food
npm run cli -- delete --id <uuid>
npm run cli -- export --output expenses.csv
npm run cli -- budget --monthly 5000
npm run cli -- budget --category Food --limit 1500
```

## Web dashboard

```bash
npm run web:dev
```

## Tests

```bash
npm test
npm run test:verbose
```
