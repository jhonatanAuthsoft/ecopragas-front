import { Camera, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/atomic/atm.avatar/avatar.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/atomic/mol.dialog/dialog.component";
import { ImageCropperDialog } from "@/atomic/obj.image-cropper-dialog/image-cropper-dialog.component";
import { cn } from "@/lib/utils";
import type { Tecnico, UpdateTecnicoDTO } from "@/services/tecnicos.service";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface EditTecnicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tecnico: Tecnico | null;
  onSave: (data: UpdateTecnicoDTO, id?: string) => Promise<void>;
}

export const EditTecnicoDialog = ({
  open,
  onOpenChange,
  tecnico,
  onSave,
}: EditTecnicoDialogProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
    foto: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImageForCrop, setSelectedImageForCrop] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      if (tecnico) {
        setFormData({
          nome: tecnico.nome,
          email: tecnico.email,
          cpfCnpj: formatCPFCNPJ(tecnico.cpfCnpj),
          telefone: tecnico.telefone ? formatPhone(tecnico.telefone) : "",
          foto: tecnico.foto || "",
        });
      } else {
        setFormData({
          nome: "",
          email: "",
          cpfCnpj: "",
          telefone: "",
          foto: "",
        });
      }
      setErrors({});
    }
  }, [tecnico, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageForCrop(reader.result as string);
        setIsCropperOpen(true);
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setFormData({ ...formData, foto: croppedImage });
    setIsCropperOpen(false);
    setSelectedImageForCrop(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome) newErrors.nome = "Campo Obrigatório";
    if (!formData.cpfCnpj) newErrors.cpfCnpj = "Campo Obrigatório";
    if (!formData.telefone) newErrors.telefone = "Campo Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSave(
        {
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpfCnpj.replace(/\D/g, ""),
          foto: formData.foto,
          telefone: formData.telefone.replace(/\D/g, ""),
        },
        tecnico?.id,
      );
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving tecnico:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader className="mb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {tecnico ? "Editar Técnico" : "Novo Técnico"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.foto} />
              <AvatarFallback className="bg-zinc-600 flex flex-col items-center justify-center text-white">
                <Camera className="h-8 w-8 mb-1" />
                <span className="text-[10px] font-bold">ADD PHOTO</span>
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <input
                type="file"
                id="foto-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById("foto-upload")?.click()}
              >
                <Upload className="h-4 w-4" />
                Alterar Foto
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-base font-normal text-grayscale-dark">
                Nome
              </Label>
              <div className="relative">
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className={cn(
                    "pr-10 rounded-lg h-12",
                    errors.nome ? "border-feedback-error-medium" : "border-grayscale-light",
                  )}
                  placeholder="Nome do técnico"
                />
                {formData.nome && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, nome: "" })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-feedback-error-medium hover:text-feedback-error-dark"
                  >
                    <X className="h-5 w-5 rounded-full border border-current p-0.5" />
                  </button>
                )}
              </div>
              {errors.nome && (
                <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.nome}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-base font-normal text-grayscale-dark">
                Contato
              </Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: formatPhone(e.target.value) })
                }
                className={cn(
                  "rounded-lg h-12",
                  errors.telefone ? "border-feedback-error-medium" : "border-grayscale-light",
                )}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
              {errors.telefone && (
                <span className="text-xs text-feedback-error-dark mt-1 block">
                  × {errors.telefone}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpfCnpj" className="text-base font-normal text-grayscale-dark">
                CPF
              </Label>
              <Input
                id="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={(e) =>
                  setFormData({ ...formData, cpfCnpj: formatCPFCNPJ(e.target.value) })
                }
                className={cn(
                  "rounded-lg h-12",
                  errors.cpfCnpj ? "border-feedback-error-medium" : "border-grayscale-light",
                )}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.cpfCnpj && (
                <span className="text-xs text-feedback-error-dark mt-1 block">
                  × {errors.cpfCnpj}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-normal text-grayscale-dark">
                E-mail
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-lg h-12 border-grayscale-light"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-feedback-success-medium hover:bg-feedback-success-dark text-white font-medium h-12 rounded-lg w-full md:w-auto px-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : tecnico ? "Salvar alterações" : "Adicionar Técnico"}
            </Button>
          </div>
        </form>

        <ImageCropperDialog
          open={isCropperOpen}
          onOpenChange={setIsCropperOpen}
          imageSrc={selectedImageForCrop}
          onCropComplete={handleCropComplete}
        />
      </DialogContent>
    </Dialog>
  );
};
