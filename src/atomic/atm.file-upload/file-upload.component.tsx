import { Plus, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  id: string;
  label?: string;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export const FileUpload = ({
  id,
  onFilesChange,
  accept = "image/*,application/pdf",
  className,
}: FileUploadProps) => {
  const [photos, setPhotos] = useState<{ id: string; url: string; file: File }[]>([]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newPhotos = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file,
      }));

      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      onFilesChange?.(updatedPhotos.map((p) => p.file));
    },
    [photos, onFilesChange],
  );

  const removePhoto = useCallback(
    (id: string) => {
      setPhotos((prev) => {
        const removed = prev.find((photo) => photo.id === id);
        if (removed) URL.revokeObjectURL(removed.url);

        const filtered = prev.filter((photo) => photo.id !== id);
        onFilesChange?.(filtered.map((p) => p.file));
        return filtered;
      });
    },
    [onFilesChange],
  );

  const inputId = `file-upload-input-${id}`;

  return (
    <div className={cn("flex flex-col gap-md", className)}>
      <div
        className="border-2 border-dashed border-grayscale-light rounded-xl p-xl flex flex-col items-center justify-center gap-sm bg-grayscale-light/5 cursor-pointer hover:bg-grayscale-light/10 transition-colors"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        <div className="bg-grayscale-light/20 p-sm rounded-full">
          <Upload className="text-grayscale-dark" size={24} />
        </div>
        <div className="flex flex-col items-center gap-0 text-center">
          <p className="text-sm font-medium">
            Arraste e solte arquivos, ou <span className="text-brand-secondary-medium">Browse</span>
          </p>
          <p className="text-xs text-grayscale-medium">Accepted formats: JPEG, PNG, of PDF</p>
        </div>
        <input
          id={inputId}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-lg overflow-hidden border border-grayscale-light"
            >
              {photo.file.type.includes("image") ? (
                <img src={photo.url} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-grayscale-light/10 text-grayscale-dark text-[10px] p-xs text-center font-medium">
                  {photo.file.name}
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(photo.id);
                }}
                className="absolute top-1 right-1 bg-feedback-error-medium text-white p-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-feedback-error-medium/90"
              >
                <Plus size={14} className="rotate-45" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = "FileUpload";
