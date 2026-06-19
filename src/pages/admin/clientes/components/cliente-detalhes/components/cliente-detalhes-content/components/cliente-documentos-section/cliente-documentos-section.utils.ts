import { toast } from "sonner";
import type { ClienteDocumentoResponse } from "@/model/rest/cliente";
import { triggerDownload } from "@/utils/download-file";

export function downloadClienteDocumento(doc: ClienteDocumentoResponse) {
  if (!doc.url) {
    toast.error("Documento sem referencia para download.");
    return;
  }

  triggerDownload(doc.url, doc.nome ?? doc.id ?? "documento");
}
