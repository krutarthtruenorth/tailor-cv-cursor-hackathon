"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clipboard, Download, Sparkles, Target } from "lucide-react";

import type { TailorCvResponse } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ResultPanel({ data }: { data: TailorCvResponse }) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const bundledText = useMemo(
    () => [
      "TAILORED RESUME",
      data.tailoredResume,
      "",
      "ATS SCORE",
      `${data.atsScore}/100`,
      "",
      "MISSING KEYWORDS",
      data.missingKeywords.join(", "),
      "",
      "IMPROVED BULLETS",
      data.improvedBullets.map((bullet) => `- ${bullet}`).join("\n"),
      "",
      "COVER LETTER",
      data.coverLetter,
    ].join("\n"),
    [data]
  );

  async function handleCopy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedTab(key);
    window.setTimeout(() => setCopiedTab((current) => (current === key ? null : current)), 1800);
  }

  return (
    <Card className="min-h-[640px]">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700">Generated package</Badge>
            <CardTitle className="mt-3 text-3xl">Your recruiter-ready assets</CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-base leading-7">
              Review the tailored resume, keyword gaps, score breakdown, and custom cover letter in one place.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => downloadText("tailorcv-output.txt", bundledText)}>
            <Download className="h-4 w-4" />
            Download TXT
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--secondary)] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)]">
              <Target className="h-4 w-4" />
              ATS match score
            </div>
            <div className="mt-3 text-4xl font-semibold tracking-tight">{data.atsScore}</div>
            <Progress value={data.atsScore} className="mt-4" />
          </div>
          <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--secondary)] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)]">
              <Sparkles className="h-4 w-4" />
              Improved bullets
            </div>
            <div className="mt-3 text-4xl font-semibold tracking-tight">{data.improvedBullets.length}</div>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Refined for clarity, impact, and measurable outcomes.</p>
          </div>
          <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--secondary)] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)]">
              <CheckCircle2 className="h-4 w-4" />
              Missing keywords
            </div>
            <div className="mt-3 text-4xl font-semibold tracking-tight">{data.missingKeywords.length}</div>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Critical skills and phrases still missing from the resume.</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="resume">
          <TabsList>
            <TabsTrigger value="resume">Tailored Resume</TabsTrigger>
            <TabsTrigger value="ats">ATS Score</TabsTrigger>
            <TabsTrigger value="keywords">Missing Keywords</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
          </TabsList>

          <TabsContent value="resume">
            <PanelHeader
              title="Tailored Resume"
              description="Updated content aligned to the role, keeping a direct and scannable format."
              onCopy={() => handleCopy("resume", data.tailoredResume)}
              copied={copiedTab === "resume"}
            />
            <ReadableBlock content={data.tailoredResume} />
            <Separator className="my-6" />
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Improved bullet points
            </h4>
            <div className="mt-4 grid gap-3">
              {data.improvedBullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--secondary)] p-4 text-sm leading-6">
                  {bullet}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ats">
            <PanelHeader
              title="ATS Score"
              description="A directional score based on skill overlap, terminology coverage, and role fit."
              onCopy={() => handleCopy("ats", `${data.atsScore}/100`)}
              copied={copiedTab === "ats"}
            />
            <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
              <div className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,#ffffff,#eef6f5)] p-6 text-center">
                <div className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">Match score</div>
                <div className="mt-4 text-6xl font-semibold tracking-tight">{data.atsScore}</div>
                <Progress value={data.atsScore} className="mt-5" />
              </div>
              <div className="space-y-4">
                <ScoringItem title="Keyword alignment" text="Core role terminology appears in the updated resume where it matters most." />
                <ScoringItem title="Bullet quality" text="Bullets are more outcome-driven and easier for recruiters to scan quickly." />
                <ScoringItem title="Coverage gap" text="Review the missing keywords tab and only add keywords you can honestly support with experience." />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keywords">
            <PanelHeader
              title="Missing Keywords"
              description="High-signal terms the job description expects but the source resume underrepresents."
              onCopy={() => handleCopy("keywords", data.missingKeywords.join(", "))}
              copied={copiedTab === "keywords"}
            />
            <div className="flex flex-wrap gap-3">
              {data.missingKeywords.length ? (
                data.missingKeywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] px-4 py-2 text-sm font-medium"
                  >
                    {keyword}
                  </div>
                ))
              ) : (
                <p className="text-sm text-[color:var(--muted-foreground)]">No major missing keywords detected.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cover-letter">
            <PanelHeader
              title="Custom Cover Letter"
              description="A polished draft you can personalize before sending."
              onCopy={() => handleCopy("cover-letter", data.coverLetter)}
              copied={copiedTab === "cover-letter"}
            />
            <ReadableBlock content={data.coverLetter} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function PanelHeader({
  title,
  description,
  onCopy,
  copied,
}: {
  title: string;
  description: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted-foreground)]">{description}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onCopy}>
        <Clipboard className="h-4 w-4" />
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

function ReadableBlock({ content }: { content: string }) {
  return (
    <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6">
      <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-[color:var(--foreground)]">{content}</pre>
    </div>
  );
}

function ScoringItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-[color:var(--border)] bg-white p-5">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">{text}</p>
    </div>
  );
}
