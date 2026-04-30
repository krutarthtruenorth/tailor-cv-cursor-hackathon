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

const starterResume = `Alex Johnson\nSenior Product Designer\n\nExperience\n- Led end-to-end design for B2B workflow products used by 30,000+ customers.\n- Partnered with PM and engineering to launch onboarding improvements that increased activation by 18%.\n- Built and maintained a design system across web and mobile surfaces.\n\nSkills\nFigma, UX Research, Product Strategy, Design Systems, Cross-functional Collaboration`;

const starterJob = `We are hiring a Senior Product Designer to improve our AI recruiting platform. The ideal candidate has experience with user research, design systems, SaaS dashboards, experimentation, stakeholder communication, ATS workflows, and shipping measurable product improvements. Familiarity with AI-assisted writing tools, analytics, and cross-functional collaboration is required.`;

export function DashboardShell() {
  const [resume, setResume] = useState(starterResume);
  const [jobDescription, setJobDescription] = useState(starterJob);
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
