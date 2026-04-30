import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-[24px] border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--foreground)] shadow-sm outline-none transition placeholder:text-[color:var(--muted-foreground)] focus-visible:border-[color:var(--ring)] focus-visible:ring-4 focus-visible:ring-[color:var(--ring-soft)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
