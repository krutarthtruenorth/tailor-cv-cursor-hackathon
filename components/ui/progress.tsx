import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-[color:var(--secondary)]", className)}>
      <div
        className="h-full rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
