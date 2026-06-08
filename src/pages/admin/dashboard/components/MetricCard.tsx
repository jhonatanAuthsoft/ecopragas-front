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
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard = ({ title, value, icon: Icon, trend, className }: MetricCardProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <CardTitleSecondary>{title}</CardTitleSecondary>
        <H2>{value}</H2>
        {trend && (
          <CardSubtitle>
            {trend?.isPositive ? "+" : "-"}
            {trend?.value}% vs mês anterior
          </CardSubtitle>
        )}
      </CardContent>

      <div className="size-2xl flex items-center justify-center rounded-full bg-brand-cta-light p-sm">
        <Icon className="size-lg text-brand-primary-medium" />
      </div>
    </Card>
  );
};
