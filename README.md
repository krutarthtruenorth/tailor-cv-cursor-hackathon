# TailorCV

TailorCV is an AI-powered resume tailoring MVP built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, and the OpenAI API.

## Features

- Premium landing page with startup-style SaaS presentation
- Interactive dashboard for resume and job description input
- Structured OpenAI generation flow via `POST /api/generate`
- Tailored resume output
- ATS match score
- Missing keyword analysis
- Improved bullet points
- Custom cover letter draft
- Copy-to-clipboard actions and TXT download
- Responsive layout ready for Vercel deployment

## Tech Stack

- Next.js 16+
- React 19
- TypeScript
- Tailwind CSS
- shadcn-style component structure
- OpenAI API

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your OpenAI API key to `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5
```

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## API Contract

### `POST /api/generate`

Request:

```json
{
  "resume": "string",
  "jobDescription": "string"
}
```

Response:

```json
{
  "tailoredResume": "string",
  "atsScore": 92,
  "missingKeywords": ["ATS workflows", "analytics"],
  "improvedBullets": ["Led..."],
  "coverLetter": "string"
}
```

## Project Structure

```text
app/
  api/generate/route.ts
  dashboard/page.tsx
  layout.tsx
  page.tsx
components/
  dashboard/
  ui/
lib/
  openai.ts
  types.ts
  utils.ts
  validators.ts
styles/
  globals.css
```

## Notes

- `OPENAI_API_KEY` is required for generation.
- The API route uses structured output parsing with Zod for reliable JSON responses.
- The OpenAI client is lazily initialized to stay build-safe in Next.js.
