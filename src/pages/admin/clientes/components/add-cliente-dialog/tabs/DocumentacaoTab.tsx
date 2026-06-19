import { AlertTriangle, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import { cn } from "@/lib/utils";
import type { ClienteFormValues } from "@/model/rest/cliente";
import { VALID_FILE_TYPES } from "../add-cliente-dialog.data";

interface DocumentacaoTabProps {
  isSubmitting: boolean;
  submitLabel: string;
}

export const DocumentacaoTab = ({ isSubmitting, submitLabel }: DocumentacaoTabProps) => {
  const { setValue, watch } = useFormContext<ClienteFormValues>();
  const documentos = watch("documentos");
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFileTypes = (selectedFiles: File[]) => {
    const isValid = selectedFiles.every((file) =>
      (VALID_FILE_TYPES as readonly string[]).includes(file.type),
    );

    if (!isValid) {
      setFileError("Este formato de arquivo nao e suportado.");
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleFilesChange = (selectedFiles: File[]) => {
    if (validateFileTypes(selectedFiles)) {
      setValue("documentos", selectedFiles, { shouldDirty: true });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    handleFilesChange(Array.from(event.target.files));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!event.dataTransfer.files.length) {
      return;
    }

    handleFilesChange(Array.from(event.dataTransfer.files));
  };

  const handleRemoveFile = (index: number) => {
    setValue(
      "documentos",
      documentos.filter((_, fileIndex) => fileIndex !== index),
      { shouldDirty: true },
    );
  };

  return (
    <TabsContent value="documentacao" forceMount className="space-y-6 data-[state=inactive]:hidden">
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors",
          fileError ? "border-feedback-error-medium" : "border-grayscale-light",
        )}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept={VALID_FILE_TYPES.join(",")}
        />
        <div className="bg-pink-50 p-2 rounded-full mb-4">
          <Upload className="h-6 w-6 text-pink-500" />
        </div>
        <p className="text-grayscale-dark font-bold mb-1">
          Arraste e solte arquivos, ou{" "}
          <span className="text-brand-secondary-medium cursor-pointer">Browse</span>
        </p>
        <p className="text-xs text-grayscale-medium">Formatos aceitos: JPEG, PNG e PDF</p>
      </div>

      {fileError && (
        <div className="bg-feedback-error-light border border-feedback-error-light rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-feedback-error-medium" />
            <span className="text-sm font-medium text-feedback-error-dark">{fileError}</span>
          </div>
          <button
            type="button"
            onClick={() => setFileError(null)}
            className="text-feedback-error-dark hover:text-feedback-error-medium"
          >
            <X className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      )}

      {documentos.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-grayscale-dark">Arquivos selecionados:</h4>
          {documentos.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between border border-grayscale-light rounded-lg p-3"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="bg-gray-100 p-2 rounded">
                  <Upload className="h-4 w-4 text-gray-500" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-grayscale-dark truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-grayscale-medium">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="text-feedback-error-medium hover:text-feedback-error-dark p-1"
              >
                <Trash2 className="h-4 w-4 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-6 flex justify-center">
        <Button type="submit" className="w-[400px] h-[43px]" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </TabsContent>
  );
};
