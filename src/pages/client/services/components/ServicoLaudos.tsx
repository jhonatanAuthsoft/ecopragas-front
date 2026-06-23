import { Download } from "lucide-react";
import { useState } from "react";
import { PdfFile } from "@/assets/vectors/pdf-file";
import { Button } from "@/atomic/atm.button/button.component";
import { Body2, H4, InputCaption } from "@/atomic/atm.typography";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import type { ClienteDocumento } from "@/model/rest/cliente";

const LAUDOS_PAGE_SIZE = 4;

interface ServicoLaudosProps {
  laudos: ClienteDocumento[];
}

export function ServicoLaudos({ laudos = [] }: ServicoLaudosProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(laudos.length / LAUDOS_PAGE_SIZE));
  const paginatedLaudos = laudos.slice(page * LAUDOS_PAGE_SIZE, (page + 1) * LAUDOS_PAGE_SIZE);

  const handleDownloadDocumento = (doc: ClienteDocumento) => {
    if (doc.url) {
      const dataUri = doc.url.startsWith("data:")
        ? doc.url
        : `data:${doc.tipo || "application/octet-stream"};base64,${doc.url}`;

      const link = document.createElement("a");
      link.href = dataUri;
      link.download = doc.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (laudos.length === 0) {
    return <Body2 className="text-grayscale-medium">Nenhum laudo encontrado.</Body2>;
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        {paginatedLaudos.map((doc, index) => (
          <div
            key={`${doc.nome ?? "doc"}-${index}`}
            className="flex items-center justify-between p-md border border-grayscale-light rounded-small hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-sm">
              <PdfFile />
              <div className="flex flex-col gap-2xs">
                <H4>{doc.nome}</H4>
                <InputCaption className="text-grayscale-medium">-</InputCaption>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-primary-medium hover:text-brand-primary-dark hover:bg-brand-primary-light/10"
              onClick={() => handleDownloadDocumento(doc)}
            >
              <Download className="size-[20px]" />
            </Button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControl
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage - 1)}
        />
      )}
    </div>
  );
}
