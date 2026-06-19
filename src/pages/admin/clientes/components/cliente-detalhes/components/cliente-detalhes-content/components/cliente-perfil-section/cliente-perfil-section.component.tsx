import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PhoneIcon } from "@/assets/icons/phone";
import { Body2, H2 } from "@/atomic/atm.typography";
import type { Cliente } from "@/model/rest/cliente";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { formatClienteEndereco } from "../../../../cliente-detalhes.utils";

interface ClientePerfilSectionProps {
  cliente: Cliente;
}

export const ClientePerfilSection = ({ cliente }: ClientePerfilSectionProps) => (
  <div className="flex flex-col gap-xs">
    <H2>{cliente.nomeRazaoSocial}</H2>
    <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
      <div className="flex items-center gap-1">
        <IdentificationIcon className="size-lg" />
        <Body2>{cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "-"}</Body2>
      </div>
      <div className="flex items-center gap-1">
        <PhoneIcon className="size-lg" />
        <Body2>{cliente.telefone ? formatPhone(cliente.telefone) : "-"}</Body2>
      </div>
      <div className="flex items-center gap-1">
        <MapPinIcon className="size-lg" />
        <Body2>{formatClienteEndereco(cliente)}</Body2>
      </div>
    </div>
  </div>
);
