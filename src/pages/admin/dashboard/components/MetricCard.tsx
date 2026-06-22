import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H2 } from "@/atomic/atm.typography";
import {
  Card,
  CardContent,
  CardSubtitle,
  CardTitleSecondary,
} from "@/atomic/mol.card/card.component";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
  isLoading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  isLoading,
}: MetricCardProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <CardTitleSecondary>{title}</CardTitleSecondary>
        {isLoading ? <Skeleton className="h-[31px] w-[54px] mt-xs" /> : <H2>{value}</H2>}
        {trend && !isLoading && (
          <CardSubtitle>
            {trend.isPositive ? "+" : "-"}
            {trend.value}% vs mês anterior
          </CardSubtitle>
        )}
      </CardContent>

      <div className="size-2xl flex items-center justify-center rounded-full bg-brand-cta-light p-sm">
        <Icon className="size-lg text-brand-primary-medium" />
      </div>
    </Card>
  );
};
