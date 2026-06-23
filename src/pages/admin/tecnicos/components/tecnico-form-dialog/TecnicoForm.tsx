import { Camera, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { useUploadArquivo } from "@/domain/arquivo";
import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { dataUrlToFile } from "@/utils/data-url-to-file";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { getTecnicoFormDefaultValues, sanitizeTecnicoInput } from "./tecnico-form-dialog.utils";

interface TecnicoFormProps {
  tecnico: Tecnico | null;
  isSubmitting?: boolean;
  onSubmit: (data: CadastrarTecnicoInput, id?: string) => void;
}

export const TecnicoForm = ({ tecnico, isSubmitting, onSubmit }: TecnicoFormProps) => {
  const formMethods = useForm<CadastrarTecnicoInput>({
    mode: "onChange",
    defaultValues: getTecnicoFormDefaultValues(tecnico),
  });

  const { uploadArquivoAsync, isUploadArquivoLoading } = useUploadArquivo();

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImageForCrop, setSelectedImageForCrop] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();

  const fotoUrl = formMethods.watch("fotoUrl");
  const displayFotoUrl = photoPreview ?? fotoUrl;
  const isPhotoLoading = isUploadArquivoLoading;
  const isFormLoading = isSubmitting || isPhotoLoading;

  const handleSubmit = (values: CadastrarTecnicoInput) => {
    onSubmit(sanitizeTecnicoInput(values), tecnico?.id);
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

  const handleCropComplete = async (croppedImage: string) => {
    setPhotoPreview(croppedImage);
    setIsCropperOpen(false);
    setSelectedImageForCrop(null);

    try {
      const file = dataUrlToFile(croppedImage, "tecnico-foto.jpg");
      const response = await uploadArquivoAsync(file);
      const url = response.data;

      if (!url) {
        toast.error("Nao foi possivel enviar a foto. Tente novamente.");
        setPhotoPreview(undefined);
        return;
      }

      formMethods.setValue("fotoUrl", url, { shouldDirty: true });
      setPhotoPreview(undefined);
    } catch {
      setPhotoPreview(undefined);
    }
  };

  return (
    <Form formMethods={formMethods} onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-sm mb-lg">
        <Avatar className="size-[128px]">
          <AvatarImage src={displayFotoUrl} />
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
            isLoading={isPhotoLoading}
            onClick={() => document.getElementById("tecnico-foto-upload")?.click()}
            leftIcon={<Upload className="size-md" />}
          >
            {isPhotoLoading ? "Enviando foto..." : "Alterar Foto"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="nome" validators={[RequiredValidator()]}>
          <TextInput label="Nome" placeholder="Nome do tecnico" />
        </FormField>

        <FormField name="contato" validators={[RequiredValidator(), PhoneValidator()]}>
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
        <Button
          type="submit"
          className="w-full md:w-[400px]"
          size="lg"
          disabled={isFormLoading}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : tecnico ? "Salvar alterações" : "Adicionar Técnico"}
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
