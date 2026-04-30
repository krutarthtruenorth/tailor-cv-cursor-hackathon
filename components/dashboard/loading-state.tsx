import { Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const steps = [
  "Analyzing resume...",
  "Matching keywords...",
  "Optimizing bullets...",
  "Writing cover letter...",
];

export function LoadingState({ step }: { step: number }) {
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Card className="overflow-hidden border-none bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.96))] text-white shadow-[0_24px_80px_rgba(15,23,42,0.4)]">
      <CardHeader>
        <div className="flex items-center gap-3 text-sm font-medium text-white/70">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Sparkles className="h-5 w-5" />
          </span>
          TailorCV engine in progress
        </div>
        <CardTitle className="text-2xl">{steps[step] || steps[0]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <Progress value={progress} className="bg-white/10" />
        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((label, index) => {
            const isComplete = index < step;
            const isActive = index === step;
            return (
              <div
                key={label}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  isActive
                    ? "border-white/40 bg-white/12 text-white"
                    : isComplete
                      ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                      : "border-white/10 bg-white/5 text-white/55"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
