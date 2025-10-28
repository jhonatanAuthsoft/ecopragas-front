import { Lead } from "@/pages/Leads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadCardProps {
  lead: Lead;
}

const originColors: Record<Lead["origin"], string> = {
  Google: "bg-chart-1 text-primary-foreground",
  Instagram: "bg-chart-2 text-secondary-foreground",
  Indicação: "bg-chart-3 text-accent-foreground",
  Facebook: "bg-chart-4 text-secondary-foreground",
  Website: "bg-chart-5 text-foreground",
  Outro: "bg-muted text-muted-foreground",
};

export const LeadCard = ({ lead }: LeadCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {lead.name}
            </h4>
            {lead.company && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Building2 className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{lead.company}</span>
              </div>
            )}
          </div>
          <Badge
            className={`${originColors[lead.origin]} text-xs flex-shrink-0`}
            variant="secondary"
          >
            {lead.origin}
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="h-3 w-3 flex-shrink-0" />
            <span>{lead.phone}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            R$ {lead.value.toLocaleString("pt-BR")}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(lead.createdAt, "dd/MM", { locale: ptBR })}</span>
          </div>
        </div>

        {lead.notes && (
          <p className="text-xs text-muted-foreground line-clamp-2 pt-1">
            {lead.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
