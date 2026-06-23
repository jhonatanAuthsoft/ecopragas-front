import { useState } from "react";
import { Body2, H3 } from "@/atomic/atm.typography";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import type { ClienteDocumentoResponse } from "@/model/rest/cliente";
import { DOCUMENTOS_PAGE_SIZE } from "./cliente-documentos-section.constants";
import { ClienteDocumentoItem } from "./components/cliente-documento-item";

interface ClienteDocumentosSectionProps {
  documentos: ClienteDocumentoResponse[];
}

export const ClienteDocumentosSection = ({ documentos }: ClienteDocumentosSectionProps) => {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(documentos.length / DOCUMENTOS_PAGE_SIZE));
  const paginatedDocumentos = documentos.slice(
    page * DOCUMENTOS_PAGE_SIZE,
    (page + 1) * DOCUMENTOS_PAGE_SIZE,
  );

  return (
    <div className="space-y-4">
      <H3>Documentação</H3>
      {documentos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
            {paginatedDocumentos.map((documento, index) => (
              <ClienteDocumentoItem
                key={documento.id ?? `${documento.nome ?? "doc"}-${index}`}
                documento={documento}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControl
              className="mt-xs"
              currentPage={page + 1}
              totalPages={totalPages}
              onPageChange={(nextPage) => setPage(nextPage - 1)}
            />
          )}
        </>
      ) : (
        <Body2 className="text-grayscale-medium">Nenhum documento encontrado</Body2>
      )}
    </div>
  );
};
