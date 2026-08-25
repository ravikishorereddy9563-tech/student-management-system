# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Separate Deployments

Deploy the `backend` and `frontend` directories as separate Vercel projects.

In the frontend project, set this environment variable before building:

```text
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

`VITE_API_URL` may also be set to the backend origin without `/api`; the frontend adds that path automatically.

In the backend project, set these environment variables:

```text
DJANGO_SECRET_KEY=your-production-secret
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.vercel.app
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

For multiple frontend domains, use a comma-separated `CORS_ALLOWED_ORIGINS` value instead of `FRONTEND_URL`:

```text
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://www.your-frontend-domain.com
```

After changing Vercel environment variables, redeploy the frontend because Vite embeds `VITE_API_URL` during the build.
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
