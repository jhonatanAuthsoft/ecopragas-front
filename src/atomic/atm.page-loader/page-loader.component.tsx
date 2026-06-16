import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-grayscale-x-light",
        className,
      )}
    >
      <Loader2 className="size-2xl animate-spin text-brand-primary-medium" />
    </div>
  );
}
