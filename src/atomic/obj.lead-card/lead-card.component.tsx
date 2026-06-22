import { Mail, Phone } from "lucide-react";
import { Body2, H4 } from "@/atomic/atm.typography";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import type { Lead } from "@/model/rest/lead";
import { formatCurrency, formatPhone } from "@/utils/formatters";

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  return (
    <Card className="block p-sm hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col gap-2xs">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <H4 className="truncate">{lead.nome}</H4>
          </div>
        </div>

        <div className="flex flex-col gap-2xs">
          <div className="flex gap-2xs">
            <Mail className="size-md flex-shrink-0 text-grayscale-dark mt-2xs" />
            <Body2 className="font-normal text-grayscale-dark break-all">{lead.email}</Body2>
          </div>
          <div className="flex gap-2xs">
            <Phone className="size-md flex-shrink-0 text-grayscale-dark mt-2xs" />
            <Body2 className="font-normal text-grayscale-dark">
              {lead.telefone ? formatPhone(lead.telefone) : ""}
            </Body2>
          </div>
        </div>

        <div className="pt-2xs border-t border-grayscale-light flex items-center justify-between">
          <Body2 className="font-bold text-brand-cta-dark">
            {formatCurrency(lead.valorEstimado ?? 0)}
          </Body2>
        </div>
      </CardContent>
    </Card>
  );
};
