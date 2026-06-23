import { Camera, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/atomic/atm.avatar/avatar.component";
import { Button } from "@/atomic/atm.button/button.component";
import { TextInput } from "@/atomic/atm.text-input";
import {
  CpfValidator,
  EmailValidator,
  Form,
  FormField,
  PhoneValidator,
  RequiredValidator,
} from "@/atomic/obj.form";
import { ImageCropperDialog } from "@/atomic/obj.image-cropper-dialog/image-cropper-dialog.component";
import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { getTecnicoFormDefaultValues, sanitizeTecnicoInput } from "./tecnico-form-dialog.utils";

interface TecnicoFormProps {
  tecnico: Tecnico | null;
  onSubmit: (data: CadastrarTecnicoInput, id?: string) => Promise<void>;
  onClose: () => void;
}

export const TecnicoForm = ({ tecnico, onSubmit, onClose }: TecnicoFormProps) => {
  const formMethods = useForm<CadastrarTecnicoInput>({
    mode: "onChange",
    defaultValues: getTecnicoFormDefaultValues(tecnico),
  });
  const { isSubmitting } = formMethods.formState;

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImageForCrop, setSelectedImageForCrop] = useState<string | null>(null);

  const fotoUrl = formMethods.watch("fotoUrl");

  const handleSubmit = async (values: CadastrarTecnicoInput) => {
    try {
      await onSubmit(sanitizeTecnicoInput(values), tecnico?.id);
      onClose();
    } catch (error) {
      console.error("Error saving tecnico:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImageForCrop(reader.result as string);
      setIsCropperOpen(true);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    formMethods.setValue("fotoUrl", croppedImage, { shouldDirty: true });
    setIsCropperOpen(false);
    setSelectedImageForCrop(null);
  };

  return (
    <Form formMethods={formMethods} onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-sm mb-lg">
        <Avatar className="size-[128px]">
          <AvatarImage src={fotoUrl} />
          <AvatarFallback className="bg-zinc-600 flex flex-col items-center justify-center text-white">
            <Camera className="h-8 w-8 mb-1" />
            <span className="text-[10px] font-bold">ADD PHOTO</span>
          </AvatarFallback>
        </Avatar>
        <div className="relative">
          <input
            type="file"
            id="tecnico-foto-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-[300px]"
            onClick={() => document.getElementById("tecnico-foto-upload")?.click()}
            leftIcon={<Upload className="size-md" />}
          >
            Alterar Foto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="nome" validators={[RequiredValidator()]}>
          <TextInput label="Nome" placeholder="Nome do tecnico" />
        </FormField>

        <FormField name="telefone" validators={[RequiredValidator(), PhoneValidator()]}>
          <TextInput
            label="Contato"
            placeholder="(00) 00000-0000"
            formatter={formatPhone}
            maxLength={15}
          />
        </FormField>

        <FormField name="cpf" validators={[RequiredValidator(), CpfValidator()]}>
          <TextInput
            label="CPF"
            placeholder="000.000.000-00"
            formatter={formatCPFCNPJ}
            maxLength={14}
          />
        </FormField>

        <FormField name="email" validators={[RequiredValidator(), EmailValidator()]}>
          <TextInput label="E-mail" placeholder="email@exemplo.com" />
        </FormField>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full md:w-[400px]" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : tecnico ? "Salvar alteracoes" : "Adicionar Tecnico"}
        </Button>
      </div>

      <ImageCropperDialog
        open={isCropperOpen}
        onOpenChange={setIsCropperOpen}
        imageSrc={selectedImageForCrop}
        onCropComplete={handleCropComplete}
      />
    </Form>
  );
};
