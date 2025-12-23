import { Camera, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Card } from "@/atomic/mol.card/card.component";

interface PhotoUploadProps {
  ordemId: string;
}

interface Photo {
  id: string;
  url: string;
  tipo: "antes" | "depois";
  timestamp: string;
}

export function PhotoUpload({ ordemId }: PhotoUploadProps) {
  const [fotosAntes, setFotosAntes] = useState<Photo[]>([]);
  const [fotosDepois, setFotosDepois] = useState<Photo[]>([]);
  const inputAntesRef = useRef<HTMLInputElement>(null);
  const inputDepoisRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    tipo: "antes" | "depois",
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione apenas imagens");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: Math.random().toString(36).substr(2, 9),
          url: e.target?.result as string,
          tipo,
          timestamp: new Date().toLocaleString("pt-BR"),
        };

        if (tipo === "antes") {
          setFotosAntes((prev) => [...prev, newPhoto]);
        } else {
          setFotosDepois((prev) => [...prev, newPhoto]);
        }

        toast.success(`Foto ${tipo} adicionada com sucesso!`);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = "";
  };

  const removePhoto = (id: string, tipo: "antes" | "depois") => {
    if (tipo === "antes") {
      setFotosAntes((prev) => prev.filter((photo) => photo.id !== id));
    } else {
      setFotosDepois((prev) => prev.filter((photo) => photo.id !== id));
    }
    toast.success("Foto removida");
  };

  const PhotoSection = ({
    titulo,
    fotos,
    tipo,
    inputRef,
  }: {
    titulo: string;
    fotos: Photo[];
    tipo: "antes" | "depois";
    inputRef: React.RefObject<HTMLInputElement>;
  }) => (
    <Card className="p-6">
      <div className="mb-4">
        <Label className="text-lg font-semibold">{titulo}</Label>
        <p className="text-sm text-muted-foreground mt-1">
          {fotos.length} foto{fotos.length !== 1 ? "s" : ""} adicionada
          {fotos.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {fotos.map((foto) => (
          <div key={foto.id} className="relative group">
            <img
              src={foto.url}
              alt={`Foto ${tipo}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removePhoto(foto.id, tipo)}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-1">{foto.timestamp}</p>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={(e) => handleFileChange(e, tipo)}
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => inputRef.current?.click()} className="w-full">
          <Camera className="h-4 w-4 mr-2" />
          Tirar Foto
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.removeAttribute("capture");
              inputRef.current.click();
              setTimeout(() => {
                inputRef.current?.setAttribute("capture", "environment");
              }, 100);
            }
          }}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Galeria
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PhotoSection
        titulo="Fotos - Antes do Serviço"
        fotos={fotosAntes}
        tipo="antes"
        inputRef={inputAntesRef}
      />
      <PhotoSection
        titulo="Fotos - Depois do Serviço"
        fotos={fotosDepois}
        tipo="depois"
        inputRef={inputDepoisRef}
      />
    </div>
  );
}
