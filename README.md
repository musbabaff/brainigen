<div align="center">

# 🧠 Brainigen

### Next-Generation AI Agent Platform

**Build, deploy, and scale intelligent AI agents for your business — without the engineering overhead.**

[![License: MIT](https://img.shields.io/badge/License-MIT-5B4FE9.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Stars](https://img.shields.io/github/stars/musbabaff/brainigen?style=social)](https://github.com/musbabaff/brainigen/stargazers)

[Website](https://brainigen.com) · [Docs](./docs) · [Demo](https://brainigen.com/demo) · [Report Bug](https://github.com/musbabaff/brainigen/issues)

</div>

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/musbabaff/brainigen&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,OPENAI_API_KEY&envDescription=Required%20API%20keys&envLink=https://github.com/musbabaff/brainigen/blob/main/.env.example&project-name=brainigen)

## Overview
Brainigen is a comprehensive open-source SaaS template designed for AI Agent deployment. With Next.js 16, Supabase, and OpenAI integration out of the box, it provides a solid foundation for your next AI startup.

## Features
- **Next.js 16 App Router**: Leverages the latest React paradigms.
- **Supabase Backend**: Complete Auth, Postgres Database, Row Level Security, Storage, and Realtime integration.
- **OpenAI Integration**: Built-in support for multiple LLMs.
- **8 Languages Support**: English, Turkish, Azerbaijani, Russian, German, French, Spanish, Arabic (RTL).
- **Stripe Billing**: Ready to monetize your platform.
- **Premium UI**: Tailwind CSS v4, Motion animations, Shadcn UI.
- **Admin Dashboard**: Full visibility into platform usage.
- **Full CI/CD**: Pre-configured GitHub Actions.

## Quick Start
1. Clone the repository.
2. Run `pnpm install`.
3. Set up `.env.local` using `.env.example`.
4. Run `pnpm run dev`.

## Tech Stack
| Frontend | Backend | DevOps |
|---|---|---|
| Next.js 16 | Supabase | Vercel |
| React 19 | PostgreSQL | GitHub Actions |
| Tailwind CSS v4 | OpenAI API | Turbopack |

## Project Structure
- `src/app`: Next.js App Router
- `src/components`: Reusable React components
- `src/lib`: Utilities and API wrappers
- `src/i18n`: Internationalization
- `docs/`: Detailed documentation

## Roadmap
- [x] Initial Release v0.1.0
- [ ] Add more LLM providers (Anthropic, Gemini)
- [ ] Implement team collaboration features
- [ ] Expand analytics

## License
MIT License. See LICENSE file for more details.
