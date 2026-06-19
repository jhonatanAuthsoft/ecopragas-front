import type { Cliente } from "@/model/rest/cliente";
import { ClienteDetalhesDivider } from "./components/cliente-detalhes-divider";
import { ClienteDocumentosSection } from "./components/cliente-documentos-section";
import { ClientePerfilSection } from "./components/cliente-perfil-section";
import { ClienteUltimoServicoSection } from "./components/cliente-ultimo-servico-section";

interface ClienteDetalhesContentProps {
  cliente: Cliente;
  onClienteUpdated?: () => void;
}

export const ClienteDetalhesContent = ({
  cliente,
  onClienteUpdated,
}: ClienteDetalhesContentProps) => (
  <div className="flex flex-col gap-sm p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
    <ClientePerfilSection cliente={cliente} onClienteUpdated={onClienteUpdated} />
    <ClienteDetalhesDivider />
    <ClienteUltimoServicoSection cliente={cliente} />
    <ClienteDetalhesDivider />
    <ClienteDocumentosSection documentos={cliente.documentos ?? []} />
  </div>
);
