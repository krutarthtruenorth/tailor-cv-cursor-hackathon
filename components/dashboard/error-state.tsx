import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ErrorState({ message }: { message: string }) {
  return (
    <Card className="border-rose-200 bg-rose-50/80">
      <CardHeader>
        <div className="flex items-center gap-3 text-rose-700">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
            <AlertTriangle className="h-5 w-5" />
          </span>
          Something went wrong
        </div>
        <CardTitle className="text-2xl text-rose-950">Unable to generate your tailored package.</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-rose-800">{message}</p>
      </CardContent>
    </Card>
  );
}
