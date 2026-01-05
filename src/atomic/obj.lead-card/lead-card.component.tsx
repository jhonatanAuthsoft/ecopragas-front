import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Building2, Calendar, Mail, Phone } from "lucide-react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import type { Lead } from "@/pages/Leads";

interface LeadCardProps {
  lead: Lead;
}

const originColors: Record<Lead["origin"], string> = {
  Google: "bg-brand-accessory-green text-white",
  Instagram: "bg-brand-accessory-purple text-white",
  Indicação: "bg-brand-accessory-orange text-white",
  Facebook: "bg-brand-secondary-medium text-white",
  Website: "bg-brand-primary-medium text-white",
  Outro: "bg-grayscale-light text-grayscale-dark",
};

export const LeadCard = ({ lead }: LeadCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">{lead.name}</h4>
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
          <span className="text-sm font-bold text-brand-primary-medium">
            R$ {lead.value.toLocaleString("pt-BR")}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(lead.createdAt, "dd/MM", { locale: ptBR })}</span>
          </div>
        </div>

        {lead.notes && (
          <p className="text-xs text-muted-foreground line-clamp-2 pt-1">{lead.notes}</p>
        )}
      </CardContent>
    </Card>
  );
};
