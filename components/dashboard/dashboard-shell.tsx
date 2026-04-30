"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText, WandSparkles } from "lucide-react";

import { ErrorState } from "@/components/dashboard/error-state";
import { LoadingState } from "@/components/dashboard/loading-state";
import { ResultPanel } from "@/components/dashboard/result-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { TailorCvResponse } from "@/lib/types";

const loadingSteps = [0, 1, 2, 3];

const demoScenarios = [
  {
    id: "product-designer",
    label: "Senior Product Designer",
    resume: `Maya Chen
Senior Product Designer
Toronto, ON
maya.chen@email.com | linkedin.com/in/mayachen

Summary
Product designer with 6+ years of experience designing SaaS products for B2B teams. Strong background in user research, design systems, prototyping, and cross-functional collaboration.

Experience
Senior Product Designer
Northstar Software
2022 – Present
- Led redesign of onboarding flows for a workflow platform used by 25,000+ users.
- Partnered with PMs and engineers to improve activation and reduce drop-off in early user journeys.
- Built reusable design system components for dashboard and form experiences.
- Conducted user interviews and usability tests to inform product improvements.

Product Designer
Pixel Foundry
2019 – 2022
- Designed web and mobile experiences for SaaS and e-commerce clients.
- Created wireframes, prototypes, and high-fidelity UI in Figma.
- Worked closely with developers to ship polished product features.

Skills
Figma, Design Systems, User Research, Prototyping, Usability Testing, SaaS, Cross-functional Collaboration`,
    jobDescription: `We are hiring a Senior Product Designer to join our AI recruiting platform team. You will own key user journeys across employer dashboards and applicant workflows. The ideal candidate has experience with SaaS dashboards, experimentation, analytics, design systems, stakeholder communication, and improving product outcomes through research and iteration.

Responsibilities:
- Design end-to-end user experiences for recruiting workflows
- Partner with product, engineering, and leadership teams
- Use research and analytics to improve user outcomes
- Contribute to and evolve the design system
- Support experimentation and hypothesis-driven product decisions

Qualifications:
- 5+ years of product design experience
- Strong portfolio of SaaS product work
- Experience with dashboards, research, and metrics-driven design
- Excellent communication and collaboration skills`,
  },
  {
    id: "software-engineer",
    label: "Full-Stack Software Engineer",
    resume: `Daniel Rivera
Full-Stack Software Engineer
Calgary, AB
daniel.rivera@email.com | github.com/danielrivera

Summary
Software engineer with 5 years of experience building web applications using React, Node.js, TypeScript, and SQL. Focused on shipping reliable features, improving application performance, and collaborating across product teams.

Experience
Software Engineer
BrightLayer Tech
2021 – Present
- Built internal tools and customer-facing product features using React and Node.js.
- Developed REST APIs and database-backed workflows for account management features.
- Improved page performance and reduced API response times through backend optimizations.
- Collaborated with design and product teams to deliver roadmap features.

Junior Software Engineer
CloudSpark
2019 – 2021
- Maintained frontend features in React and backend services in Express.
- Wrote unit tests and fixed production bugs across the platform.
- Participated in code reviews and sprint planning.

Skills
TypeScript, JavaScript, React, Node.js, Express, PostgreSQL, REST APIs, Git, Testing`,
    jobDescription: `We are seeking a Full-Stack Engineer to help build and scale our AI-powered hiring platform. You will work across frontend and backend systems to deliver product features, improve system reliability, and support integrations.

Responsibilities:
- Build product features using Next.js, TypeScript, and backend APIs
- Design scalable services and database-backed workflows
- Collaborate with product, design, and data teams
- Improve testing, observability, and deployment workflows
- Contribute to performance and reliability initiatives

Qualifications:
- 4+ years of full-stack engineering experience
- Strong TypeScript and React experience
- Experience with Next.js, PostgreSQL, and cloud deployment
- Familiarity with observability, CI/CD, and system design
- Strong communication and ownership mindset`,
  },
  {
    id: "growth-marketing-manager",
    label: "Growth Marketing Manager",
    resume: `Priya Shah
Growth Marketing Manager
Vancouver, BC
priya.shah@email.com | linkedin.com/in/priyashah

Summary
Growth marketer with 7 years of experience leading lifecycle, acquisition, and content campaigns for SaaS companies. Strong track record in campaign strategy, cross-functional execution, and performance analysis.

Experience
Growth Marketing Manager
LaunchLoop
2021 – Present
- Owned multi-channel acquisition campaigns across paid social, email, and content.
- Improved trial-to-paid conversion through lifecycle optimization and messaging tests.
- Partnered with product and sales teams on go-to-market launches.
- Built weekly reporting dashboards to monitor campaign performance.

Marketing Manager
ScaleHouse
2018 – 2021
- Managed email campaigns, landing pages, and webinar funnels.
- Supported SEO and content strategy for demand generation initiatives.
- Analyzed campaign metrics and reported on funnel performance.

Skills
Lifecycle Marketing, Paid Social, Email Marketing, Content Strategy, SEO, Analytics, Conversion Optimization, Campaign Reporting`,
    jobDescription: `We are hiring a Growth Marketing Manager to accelerate customer acquisition for our career technology platform. This role will own lifecycle strategy, paid acquisition experiments, landing page performance, funnel reporting, and cross-functional GTM execution.

Responsibilities:
- Own growth campaigns across paid, lifecycle, and content
- Run experiments to improve conversion rates
- Build and analyze funnel performance reporting
- Partner with product, design, and sales on GTM initiatives
- Improve landing page messaging and channel efficiency

Qualifications:
- 5+ years in growth or demand generation roles
- Experience with experimentation, attribution, and performance analytics
- Strong lifecycle and paid acquisition background
- Comfortable working cross-functionally in a fast-paced SaaS environment`,
  },
] as const;

const defaultScenario = demoScenarios[0];

export function DashboardShell() {
  const [selectedScenario, setSelectedScenario] = useState<(typeof demoScenarios)[number]["id"]>(defaultScenario.id);
  const [resume, setResume] = useState(defaultScenario.resume);
  const [jobDescription, setJobDescription] = useState(defaultScenario.jobDescription);
  const [result, setResult] = useState<TailorCvResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    setLoadingStep(0);
    const timers = loadingSteps.map((step, index) =>
      window.setTimeout(() => setLoadingStep(step), index * 900)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isLoading]);

  const canSubmit = useMemo(() => resume.trim().length > 0 && jobDescription.trim().length > 0, [resume, jobDescription]);

  function handleScenarioChange(nextScenarioId: string) {
    const scenario = demoScenarios.find((item) => item.id === nextScenarioId);
    if (!scenario) return;

    setSelectedScenario(scenario.id);
    setResume(scenario.resume);
    setJobDescription(scenario.jobDescription);
    setResult(null);
    setError(null);
  }

  async function handleGenerate() {
    if (!canSubmit || isLoading) {
      if (!resume.trim() || !jobDescription.trim()) {
        setError("Paste both your resume and the target job description before generating.");
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const payload = (await response.json()) as TailorCvResponse | { error?: string };

      if (!response.ok) {
        throw new Error("error" in payload && payload.error ? payload.error : "Generation failed.");
      }

      setResult(payload as TailorCvResponse);
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.18),transparent_58%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_42%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]">
              <ArrowLeft className="h-4 w-4" />
              Back to landing page
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Tailor each application in minutes.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)] sm:text-lg">
              Paste your resume and a job description. TailorCV rewrites the resume, scores alignment, surfaces keyword gaps, and drafts the cover letter.
            </p>
          </div>
          <div className="rounded-full border border-[color:var(--border)] bg-white/80 px-4 py-2 text-sm text-[color:var(--muted-foreground)] shadow-sm backdrop-blur">
            Demo-ready workflow for hackathon judging
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_1.2fr]">
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3 text-sm font-medium text-[color:var(--muted-foreground)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--secondary)]">
                  <FileText className="h-5 w-5" />
                </span>
                Input workspace
              </div>
              <CardTitle className="text-3xl">Source material</CardTitle>
              <CardDescription className="text-base leading-7">
                Start with the current resume and the exact job description. The best results come from real, complete inputs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  Demo Scenario
                </label>
                <select
                  value={selectedScenario}
                  onChange={(event) => handleScenarioChange(event.target.value)}
                  className="flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-2 text-sm text-[color:var(--foreground)] shadow-sm outline-none transition focus-visible:border-[color:var(--ring)] focus-visible:ring-4 focus-visible:ring-[color:var(--ring-soft)]"
                >
                  {demoScenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  Current Resume
                </label>
                <Textarea
                  value={resume}
                  onChange={(event) => setResume(event.target.value)}
                  placeholder="Paste your resume here..."
                  className="min-h-[260px] resize-y"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  Job Description
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the target job description here..."
                  className="min-h-[260px] resize-y"
                />
              </div>
              <Button size="lg" className="w-full" disabled={isLoading} onClick={handleGenerate}>
                <WandSparkles className="h-4 w-4" />
                {isLoading ? "Generating..." : "Generate Tailored Package"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {isLoading ? <LoadingState step={loadingStep} /> : null}
            {!isLoading && error ? <ErrorState message={error} /> : null}
            {!isLoading && !error && result ? (
              <ResultPanel data={result} />
            ) : null}
            {!isLoading && !error && !result ? (
              <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,#0f172a,#1e293b)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.42)]">
                <CardContent className="p-8 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
                    <WandSparkles className="h-4 w-4" />
                    Results will appear here
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">TailorCV assembles a complete application package.</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    Generate once and review the tailored resume, ATS score, missing keywords, improved bullets, and cover letter in organized tabs.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      "Tailored resume formatted for quick recruiter scanning",
                      "ATS-style score to gauge alignment before you apply",
                      "Keyword gap analysis to tighten job-specific relevance",
                      "Cover letter draft that matches the role and tone",
                    ].map((item) => (
                      <div key={item} className="rounded-[24px] border border-white/10 bg-white/8 p-4 text-sm leading-6 text-white/85">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
