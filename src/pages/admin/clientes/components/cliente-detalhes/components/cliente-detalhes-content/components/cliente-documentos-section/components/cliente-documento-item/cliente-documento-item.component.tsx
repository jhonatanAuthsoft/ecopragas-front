import { Download } from "lucide-react";
import { PdfFile } from "@/assets/vectors/pdf-file";
import { Button } from "@/atomic/atm.button/button.component";
import { H4, InputCaption } from "@/atomic/atm.typography";
import type { ClienteDocumentoResponse } from "@/model/rest/cliente";
import { downloadClienteDocumento } from "../../cliente-documentos-section.utils";

interface ClienteDocumentoItemProps {
  documento: ClienteDocumentoResponse;
}

export const ClienteDocumentoItem = ({ documento }: ClienteDocumentoItemProps) => (
  <div className="flex items-center justify-between p-md border border-grayscale-light rounded-small hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-sm">
      <PdfFile />
      <div className="flex flex-col gap-2xs">
        <H4>{documento.nome}</H4>
        <InputCaption className="text-grayscale-medium">
          {/* TODO: colocar o tamanho */}
          {documento.tipo ?? "-"}
        </InputCaption>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="text-brand-primary-medium hover:text-brand-primary-dark hover:bg-brand-primary-light/10"
      onClick={() => downloadClienteDocumento(documento)}
    >
      <Download className="size-[20px]" />
    </Button>
  </div>
);
