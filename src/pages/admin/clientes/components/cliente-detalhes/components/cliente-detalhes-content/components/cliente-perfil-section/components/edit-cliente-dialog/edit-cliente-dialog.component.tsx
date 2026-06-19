import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Tabs, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { Form } from "@/atomic/obj.form";
import { useUploadManyArquivos } from "@/domain/arquivo";
import { useEditCliente } from "@/domain/cliente";
import type { Cliente, ClienteDocumentoInput, EditClienteFormValues } from "@/model/rest/cliente";
import {
  DADOS_FIELDS,
  ENDERECO_DRAFT_FIELDS,
  TAB_TRIGGER_CLASS,
} from "../../../../../../../add-cliente-dialog/add-cliente-dialog.data";
import type { ClienteDialogTab } from "../../../../../../../add-cliente-dialog/add-cliente-dialog.types";
import {
  resetEnderecoDraftFields,
  shouldValidateEnderecoDraft,
} from "../../../../../../../add-cliente-dialog/add-cliente-dialog.utils";
import { DadosBasicosTab } from "../../../../../../../add-cliente-dialog/tabs/DadosBasicosTab";
import { DocumentacaoTab } from "../../../../../../../add-cliente-dialog/tabs/DocumentacaoTab";
import { EnderecoTab } from "../../../../../../../add-cliente-dialog/tabs/EnderecoTab";
import { buildEditClienteInput, mapClienteToFormValues } from "./edit-cliente-dialog.utils";

export interface EditClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente;
  onClienteUpdated?: (cliente: Cliente) => void;
}

export const EditClienteDialog = ({
  open,
  onOpenChange,
  cliente,
  onClienteUpdated,
}: EditClienteDialogProps) => {
  const [activeTab, setActiveTab] = useState<ClienteDialogTab>("dados");

  const { uploadManyArquivosAsync, isUploadManyArquivosLoading } = useUploadManyArquivos();

  const { editCliente, isEditClienteLoading } = useEditCliente({
    onSuccess: (response) => {
      if (response.data) {
        onClienteUpdated?.(response.data);
      }
      toast.success("Cliente atualizado com sucesso!");
      onOpenChange(false);
    },
  });

  const formMethods = useForm<EditClienteFormValues>({
    mode: "onChange",
    defaultValues: mapClienteToFormValues(cliente),
  });

  useEffect(() => {
    if (open) {
      formMethods.reset(mapClienteToFormValues(cliente));
      setActiveTab("dados");
    }
  }, [cliente, open, formMethods]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formMethods.reset(mapClienteToFormValues(cliente));
      setActiveTab("dados");
    }
    onOpenChange(nextOpen);
  };

  const validateEnderecoDraft = async () => {
    const enderecos = formMethods.getValues("enderecos");
    const enderecoDraft = formMethods.getValues("enderecoDraft");

    if (!shouldValidateEnderecoDraft(enderecoDraft, enderecos.length)) {
      formMethods.clearErrors([...ENDERECO_DRAFT_FIELDS]);
      return true;
    }

    return formMethods.trigger([...ENDERECO_DRAFT_FIELDS]);
  };

  const handleNextDados = async () => {
    const isValid = await formMethods.trigger([...DADOS_FIELDS]);
    if (isValid) {
      setActiveTab("endereco");
    }
  };

  const handleNextEndereco = async () => {
    const isValid = await validateEnderecoDraft();
    if (isValid) {
      setActiveTab("documentacao");
    }
  };

  const handleAddEndereco = async () => {
    const isValid = await formMethods.trigger([...ENDERECO_DRAFT_FIELDS]);
    if (!isValid) {
      return;
    }

    const enderecos = formMethods.getValues("enderecos");
    const enderecoDraft = formMethods.getValues("enderecoDraft");

    formMethods.setValue("enderecos", [...enderecos, enderecoDraft], { shouldDirty: true });
    resetEnderecoDraftFields(formMethods.resetField);
  };

  const handleRemoveEndereco = (index: number) => {
    const enderecos = formMethods.getValues("enderecos");
    formMethods.setValue(
      "enderecos",
      enderecos.filter((_, enderecoIndex) => enderecoIndex !== index),
      { shouldDirty: true },
    );
  };

  const handleRemoveExistingDocumento = (index: number) => {
    const documentosExistentes = formMethods.getValues("documentosExistentes");
    formMethods.setValue(
      "documentosExistentes",
      documentosExistentes.filter((_, documentoIndex) => documentoIndex !== index),
      { shouldDirty: true },
    );
  };

  const handleInvalid = (errors: FieldErrors<EditClienteFormValues>) => {
    const errorFields = Object.keys(errors);
    const hasDadosError = errorFields.some((field) =>
      (DADOS_FIELDS as readonly string[]).includes(field),
    );
    const hasEnderecoError = errorFields.some((field) => field.startsWith("enderecoDraft"));

    if (hasDadosError) {
      setActiveTab("dados");
      return;
    }

    if (hasEnderecoError) {
      setActiveTab("endereco");
      return;
    }

    setActiveTab("documentacao");
  };

  const handleSubmit = async (values: EditClienteFormValues) => {
    const isEnderecoValid = await validateEnderecoDraft();
    if (!isEnderecoValid) {
      setActiveTab("endereco");
      return;
    }

    if (!cliente.id) {
      return;
    }

    let novosDocumentos: ClienteDocumentoInput[] = [];

    if (values.documentos.length > 0) {
      novosDocumentos = await uploadManyArquivosAsync(values.documentos);
    }

    const body = buildEditClienteInput(values, novosDocumentos);
    editCliente({ id: cliente.id, body });
  };

  const isSubmitting = isUploadManyArquivosLoading || isEditClienteLoading;
  const submitLabel = isUploadManyArquivosLoading
    ? "Enviando documentos..."
    : isEditClienteLoading
      ? "Salvando..."
      : "Salvar alterações";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <H2 className="text-2xl font-bold">Editar cliente</H2>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as ClienteDialogTab)}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger value="dados" className={TAB_TRIGGER_CLASS}>
                Dados básicos
              </TabsTrigger>
              <TabsTrigger value="endereco" className={TAB_TRIGGER_CLASS}>
                Endereço do cliente
              </TabsTrigger>
              <TabsTrigger value="documentacao" className={TAB_TRIGGER_CLASS}>
                Documentação
              </TabsTrigger>
            </TabsList>

            <DadosBasicosTab onNext={handleNextDados} />
            <EnderecoTab
              onAddEndereco={handleAddEndereco}
              onRemoveEndereco={handleRemoveEndereco}
              onNext={handleNextEndereco}
            />
            <DocumentacaoTab
              isSubmitting={isSubmitting}
              submitLabel={submitLabel}
              existingDocumentos={formMethods.watch("documentosExistentes")}
              onRemoveExistingDocumento={handleRemoveExistingDocumento}
            />
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
