# TailorCV

**AI-powered resume tailoring for job seekers.** Paste a resume and a job description to generate a role-specific resume, ATS score, missing keywords, improved bullet points, and a custom cover letter in one flow.

## Problem

Applying to jobs is repetitive and slow.

Most candidates start with one general resume, then manually rewrite it for every role. That creates three problems:

- Weak alignment with the job description
- Poor ATS keyword coverage
- Too much time spent rewriting instead of applying strategically

The result is a resume that may undersell relevant experience even when the candidate is a strong fit.

## Solution

TailorCV turns a generic application workflow into a focused, AI-assisted one.

Users paste:

- Their current resume
- A target job description

TailorCV returns:

- A tailored resume optimized for the role
- An ATS match score
- Missing keywords
- Improved resume bullet points
- A custom cover letter

The goal is speed without losing clarity, structure, or credibility.

## Why This Is Innovative

TailorCV is not just a text-generation demo. It packages multiple job-application tasks into one structured product flow:

- Resume tailoring
- ATS-style matching
- Keyword gap analysis
- Bullet-point optimization
- Cover letter drafting

What makes it compelling in a hackathon context:

- It combines AI generation with structured output, not just freeform text
- It solves a concrete, high-frequency user pain point
- It turns a fragmented workflow into a single, polished experience
- It is demo-ready, immediately understandable, and easy for judges to evaluate

## Technical Architecture / Implementation

**Stack**

- Next.js 16+ App Router
- TypeScript
- Tailwind CSS
- shadcn-style component architecture
- OpenAI API
- Vercel-ready deployment structure

**Architecture Overview**

- [app/page.tsx](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/app/page.tsx): marketing landing page
- [app/dashboard/page.tsx](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/app/dashboard/page.tsx): app workspace
- [app/api/generate/route.ts](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/app/api/generate/route.ts): server-side generation endpoint
- [components/ui/](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/components/ui): reusable UI primitives
- [components/dashboard/](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/components/dashboard): dashboard-specific states and result views
- [lib/validators.ts](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/lib/validators.ts): request/response validation
- [lib/openai.ts](/Users/krutarthsathe/Documents/projects/tailor-cv-cursor-hackathon/lib/openai.ts): lazy OpenAI client initialization

**Technical Decisions**

- Structured server response validated with Zod
- Server-side OpenAI usage through an API route
- Lazy client initialization for build-safe Next.js behavior
- Reusable component structure for maintainability
- Responsive UI with clear loading, error, and empty states

## Core Features / Functionality

- Premium landing page for product presentation
- Resume + job description input workflow
- AI-generated tailored resume
- ATS match score output
- Missing keyword analysis
- Improved bullet point suggestions
- Custom cover letter generation
- Copy-to-clipboard actions
- TXT download for generated output
- Input validation and disabled loading states
- Mobile-responsive layout

## UX and Design Highlights

TailorCV was designed to feel like a real startup MVP rather than a raw prototype.

Highlights:

- Clear two-page flow: landing page and product dashboard
- Strong typography and spacing
- Card-based layout for scannability
- Gradient treatment and polished visual hierarchy
- Multi-step loading state that communicates progress
- Tabbed results UI to reduce clutter
- Clean error messaging
- Responsive layout for desktop and mobile

This matters for judging because the product is easy to understand in under a minute and easy to demo live.

## Learning / Ambition / Future Scope

This project is ambitious because it combines product design, modern full-stack implementation, and LLM integration into one coherent MVP.

Potential next steps:

- Export to PDF or DOCX
- Resume version history
- Saved job applications
- Authentication and user accounts
- More detailed ATS scoring breakdown
- Side-by-side diff view between original and tailored resume

Placeholder note:
- No additional future features are claimed as implemented in this repository today.

## How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a local env file:

```bash
cp .env.example .env.local
```

Then add:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5
```

### 3. Start the app

```bash
npm run dev
```

Open:

- `http://localhost:3000` for the landing page
- `http://localhost:3000/dashboard` for the app

### Notes

- The landing page can be viewed without an OpenAI API key
- Generation requires `OPENAI_API_KEY`
- The app is structured for Vercel deployment

## Demo / Screenshots / Links

- Demo URL: _Not included in this repository_
- Screenshots: _Not included in this repository_
- Deployment link: _Not included in this repository_

Placeholder note:
- Add a deployed Vercel link and screenshots here for judging convenience.

## Judging Rubric Alignment Summary

### Innovation & Originality — 25%

- Combines resume tailoring, ATS scoring, keyword detection, bullet rewriting, and cover letter generation in one product
- Uses structured AI output to create a more productized experience than a basic chatbot flow
- Targets a common and painful real-world workflow with a focused solution

### Technical Execution — 20%

- Built with modern production-oriented stack: Next.js App Router, TypeScript, Tailwind, reusable components
- Uses server-side API architecture for OpenAI integration
- Includes request/response validation and typed data flow
- Organized codebase with reusable UI and feature components

### Functional Completeness — 20%

- Includes both public landing page and working application dashboard
- Supports end-to-end input -> generation -> review flow
- Covers loading, error, empty, and results states
- Provides copy and download actions for output usability

### Problem-Solution Fit — 15%

- Directly addresses the friction of tailoring resumes manually
- Output is aligned with what job seekers actually need before applying
- The solution is focused, easy to understand, and immediately useful

### UX & Design — 10%

- Clean, modern, startup-style interface
- Strong hierarchy and clear interaction flow
- Responsive layout and polished state design
- Designed to demo well and communicate value quickly

### Learning & Ambition — 5%

- Demonstrates full-stack product thinking, not just API usage
- Integrates modern frontend architecture with structured LLM output
- Establishes a strong base for expanding into a larger job-application platform

---

**TailorCV is a focused, hackathon-ready MVP that turns a repetitive job-search task into a polished AI product workflow.**
