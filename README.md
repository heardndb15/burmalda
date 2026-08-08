# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## AI-юрист: backend

`/api/generate-contract` — Vercel Function, генерирующая содержательные пункты
трудового договора через Gemini API. Ключ (`GEMINI_API_KEY`) задаётся в `.env`
(локально) и в переменных окружения проекта на Vercel (для деплоя) — без
`VITE_`-префикса, чтобы не попасть в клиентский бандл.

Локальная разработка с API:

```bash
npm run dev:api
```

(обычный `npm run dev` поднимает только статику через Vite и не обслуживает
`/api` — для этого нужен `vercel dev`, команда `npm run dev:api` его и запускает.)

Переменные окружения (см. `.env.example`):
- `GEMINI_API_KEY` — обязателен.
- `GEMINI_MODEL` — опционален, по умолчанию `gemini-flash-lite-latest`.
