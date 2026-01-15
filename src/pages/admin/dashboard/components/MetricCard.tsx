import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard = ({ title, value, icon: Icon, trend, className }: MetricCardProps) => {
  return (
    <Card className={cn("border-border hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-normal text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-sm font-normal text-grayscale-x-dark",
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}% vs mês anterior
              </p>
            )}
          </div>
          <div className="rounded-full bg-brand-cta-light p-md">
            <Icon className="h-6 w-6 text-brand-primary-medium" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
