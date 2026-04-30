import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  FileSearch,
  Layers3,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Paste your resume",
    text: "Bring in your current resume exactly as it exists today.",
  },
  {
    title: "Add the job description",
    text: "Use the real posting so the AI can match the role language accurately.",
  },
  {
    title: "Get the full package",
    text: "Receive a tailored resume, ATS score, keyword gaps, bullet upgrades, and cover letter.",
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Structured AI output",
    text: "Reliable JSON generation powers a clean product experience and predictable rendering.",
  },
  {
    icon: FileSearch,
    title: "Keyword intelligence",
    text: "Spot missing phrases, role language, and skill gaps before you hit apply.",
  },
  {
    icon: Layers3,
    title: "Application assets in one flow",
    text: "Resume tailoring, bullet rewriting, score analysis, and cover letters stay in one workspace.",
  },
];

const testimonials = [
  {
    quote: "TailorCV turned a generic resume into something that actually sounded aligned with the role. It saved me hours.",
    name: "Maya Chen",
    role: "Product Designer",
  },
  {
    quote: "The ATS score and keyword view made the biggest difference. I knew exactly what to tighten before applying.",
    name: "Jordan Patel",
    role: "Growth Marketer",
  },
  {
    quote: "It feels like the kind of focused utility people pay for because the value is obvious in the first minute.",
    name: "Rafael Torres",
    role: "Startup Advisor",
  },
];

const pricing = [
  "Free trial for first tailored package",
  "Pro plan for unlimited tailoring and export history",
  "Team workflow for coaches and career services",
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.24),transparent_42%),radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,#f8fbfb_0%,#f4f8f8_42%,#f9f9f7_100%)]" />
      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-[0_12px_45px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold tracking-tight">TailorCV</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">AI resume tailoring</div>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[color:var(--muted-foreground)] md:flex">
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <Button asChild size="sm">
              <Link href="/dashboard">Try Free</Link>
            </Button>
          </header>

          <div className="grid gap-12 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
            <div>
              <Badge>Built for fast, role-specific applications</Badge>
              <h1 className="mt-6 max-w-3xl font-[family:var(--font-display)] text-5xl leading-[0.96] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Land More Interviews with AI Resume Tailoring
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)] sm:text-xl">
                Paste your resume and any job description. Get a recruiter-ready version in seconds.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Try Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#demo">See Demo</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-[color:var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  ATS keyword matching
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Bullet point optimization
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  Cover letter draft
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-none bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.98))] text-white shadow-[0_36px_120px_rgba(15,23,42,0.34)]">
              <CardContent className="p-0">
                <div className="border-b border-white/10 p-6 sm:p-8">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>TailorCV preview</span>
                    <span>Live ATS analysis</span>
                  </div>
                  <div className="mt-6 rounded-[28px] bg-white/6 p-5 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/50">ATS Match</div>
                        <div className="mt-2 text-5xl font-semibold">92</div>
                      </div>
                      <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                        Strong fit
                      </div>
                    </div>
                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[92%] rounded-full bg-[linear-gradient(90deg,#2dd4bf,#67e8f9)]" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 p-6 sm:p-8">
                  <div className="rounded-[26px] bg-white p-5 text-slate-900">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Tailored summary</span>
                      <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">
                      Product designer with a track record of improving SaaS onboarding, scaling design systems, and shipping measurable UX gains in cross-functional teams.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/55">Missing keywords</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {['Experimentation', 'Analytics', 'Stakeholder alignment'].map((keyword) => (
                          <span key={keyword} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/85">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/55">Cover letter status</div>
                      <div className="mt-4 text-2xl font-semibold">Generated</div>
                      <p className="mt-2 text-sm leading-6 text-white/70">Personalized to the role, company context, and resume strengths.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Badge>How it works</Badge>
            <h2 className="mt-5 font-[family:var(--font-display)] text-4xl tracking-tight sm:text-5xl">From source resume to polished application package.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">Step 0{index + 1}</div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{step.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge>Features</Badge>
            <h2 className="mt-5 font-[family:var(--font-display)] text-4xl tracking-tight sm:text-5xl">Fast enough for a hackathon. Polished enough to ship.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--muted-foreground)]">
              TailorCV focuses on the highest-value workflow for job seekers: translate one resume into role-specific applications without losing credibility or speed.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--secondary)] text-[color:var(--primary)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{feature.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-2">
          <Card className="bg-[linear-gradient(180deg,#ffffff,#f2f7f6)]">
            <CardContent className="p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">Before</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Generic, broad, low-signal</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
                "Worked with teams to improve product experiences. Responsible for user flows, research, and supporting launches across different initiatives."
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,#0f766e,#164e63)] text-white">
            <CardContent className="p-8">
              <div className="text-sm uppercase tracking-[0.2em] text-white/60">After</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Role-specific, outcome-driven, recruiter-ready</h3>
              <p className="mt-4 text-sm leading-7 text-white/80">
                "Led onboarding redesign for a SaaS platform, partnering with PM and engineering to improve activation by 18% while expanding the design system that supported faster experimentation across dashboard surfaces."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardContent className="p-8 sm:p-10">
              <div className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">ATS score preview</div>
              <div className="mt-6 flex items-end gap-5">
                <div className="text-7xl font-semibold tracking-tight">88</div>
                <div className="pb-3 text-sm text-[color:var(--muted-foreground)]">before optimization</div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[color:var(--secondary)]">
                <div className="h-full w-[88%] rounded-full bg-[linear-gradient(90deg,#2dd4bf,#14b8a6,#0f766e)]" />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Keyword coverage", "91%"],
                  ["Role alignment", "87%"],
                  ["Bullet clarity", "94%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[22px] bg-[color:var(--secondary)] p-4">
                    <div className="text-sm text-[color:var(--muted-foreground)]">{label}</div>
                    <div className="mt-2 text-2xl font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
            {testimonials.map((item) => (
              <Card key={item.name}>
                <CardContent className="p-7">
                  <div className="flex gap-1 text-amber-400">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-base leading-7 text-[color:var(--foreground)]">“{item.quote}”</p>
                  <div className="mt-6 text-sm text-[color:var(--muted-foreground)]">
                    <div className="font-semibold text-[color:var(--foreground)]">{item.name}</div>
                    <div>{item.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,#101828,#0f766e)] text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
            <CardContent className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Badge className="border-white/20 bg-white/10 text-white/75">Pricing teaser</Badge>
                <h2 className="mt-5 font-[family:var(--font-display)] text-4xl tracking-tight sm:text-5xl">Designed to convert serious job seekers.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
                  A simple free-to-paid motion: prove value on the first tailored package, then expand into unlimited tailoring and application tracking.
                </p>
              </div>
              <div className="grid gap-4">
                {pricing.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[24px] border border-white/12 bg-white/8 p-4 text-sm text-white/85">
                    <WandSparkles className="h-4 w-4 text-teal-200" />
                    {item}
                  </div>
                ))}
                <div className="pt-2">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/dashboard">Launch the MVP</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="px-4 py-10 text-sm text-[color:var(--muted-foreground)] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>TailorCV</div>
          <div>AI-powered resume tailoring for fast, role-specific applications.</div>
        </div>
      </footer>
    </main>
  );
}
