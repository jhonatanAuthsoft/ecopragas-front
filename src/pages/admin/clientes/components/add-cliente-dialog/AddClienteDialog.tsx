import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Tabs, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { Form } from "@/atomic/obj.form";
import { useUploadManyArquivos } from "@/domain/arquivo";
import { useCreateCliente } from "@/domain/cliente";
import type { CadastrarClienteInput, Cliente, ClienteFormValues } from "@/model/rest/cliente";
import {
  DADOS_FIELDS,
  DEFAULT_VALUES,
  ENDERECO_DRAFT_FIELDS,
  TAB_TRIGGER_CLASS,
} from "./add-cliente-dialog.data";
import type { ClienteDialogTab, InitialClienteData } from "./add-cliente-dialog.types";
import {
  appendEndereco,
  buildCadastrarClienteInput,
  resetEnderecoDraftFields,
  shouldValidateEnderecoDraft,
} from "./add-cliente-dialog.utils";
import { DadosBasicosTab } from "./tabs/DadosBasicosTab";
import { DocumentacaoTab } from "./tabs/DocumentacaoTab";
import { EnderecoTab } from "./tabs/EnderecoTab";

export interface AddClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClienteCreated?: (cliente: Cliente) => void;
  initialData?: InitialClienteData | null;
}

export const AddClienteDialog = ({
  open,
  onOpenChange,
  onClienteCreated,
  initialData,
}: AddClienteDialogProps) => {
  const [activeTab, setActiveTab] = useState<ClienteDialogTab>("dados");

  const { uploadManyArquivosAsync, isUploadManyArquivosLoading } = useUploadManyArquivos();

  const { createCliente, isCreateClienteLoading } = useCreateCliente({
    onSuccess: (cliente) => {
      onClienteCreated?.(cliente.data);
      toast.success("Cliente cadastrado com sucesso!");
      resetDialog();
      onOpenChange(false);
    },
  });

  const formMethods = useForm<ClienteFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (initialData && open) {
      formMethods.reset({ ...DEFAULT_VALUES, ...initialData });
    }
  }, [initialData, open, formMethods]);

  const resetDialog = () => {
    formMethods.reset(DEFAULT_VALUES);
    setActiveTab("dados");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialog();
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

    formMethods.setValue("enderecos", appendEndereco(enderecos, enderecoDraft), {
      shouldDirty: true,
    });
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

  const handleInvalid = (errors: FieldErrors<ClienteFormValues>) => {
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

  const handleSubmit = async (values: ClienteFormValues) => {
    const isEnderecoValid = await validateEnderecoDraft();
    if (!isEnderecoValid) {
      setActiveTab("endereco");
      return;
    }

    let documentos: CadastrarClienteInput["documentos"];

    if (values.documentos.length > 0) {
      documentos = await uploadManyArquivosAsync(values.documentos);
    }

    const input = buildCadastrarClienteInput(values, documentos);
    await createCliente(input);
  };

  const isSubmitting = isUploadManyArquivosLoading || isCreateClienteLoading;
  const submitLabel = isUploadManyArquivosLoading
    ? "Enviando documentos..."
    : isCreateClienteLoading
      ? "Cadastrando..."
      : "Cadastrar cliente";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <H2 className="text-2xl font-bold">Cadastrar novo cliente</H2>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as ClienteDialogTab)}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger value="dados" className={TAB_TRIGGER_CLASS}>
                Dados basicos
              </TabsTrigger>
              <TabsTrigger value="endereco" className={TAB_TRIGGER_CLASS}>
                Endereco do cliente
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
            <DocumentacaoTab isSubmitting={isSubmitting} submitLabel={submitLabel} />
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
