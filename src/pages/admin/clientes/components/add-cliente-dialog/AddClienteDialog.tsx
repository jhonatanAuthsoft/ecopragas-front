import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Tabs, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { H2 } from "@/atomic/atm.typography";
import { Form } from "@/atomic/obj.form";
import { DadosBasicosTab } from "./tabs/DadosBasicosTab";
import { DocumentacaoTab } from "./tabs/DocumentacaoTab";
import { EnderecoTab } from "./tabs/EnderecoTab";
import {
  DEFAULT_VALUES,
  DADOS_FIELDS,
  ENDERECO_FIELDS,
  TAB_TRIGGER_CLASS,
} from "./add-cliente-dialog.data";
import type {
  AddClienteDialogProps,
  ClienteDialogTab,
  ClienteEndereco,
  ClienteFormValues,
} from "./add-cliente-dialog.types";
import {
  buildClientePayload,
  clearAddressFields,
  createEnderecoFromForm,
  filesToBase64,
  getAddressValidationErrors,
} from "./add-cliente-dialog.utils";

export const AddClienteDialog = ({
  open,
  onOpenChange,
  onAddCliente,
  initialData,
}: AddClienteDialogProps) => {
  const [activeTab, setActiveTab] = useState<ClienteDialogTab>("dados");
  const [enderecos, setEnderecos] = useState<ClienteEndereco[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const formMethods = useForm<ClienteFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });
  const { isSubmitting } = formMethods.formState;

  useEffect(() => {
    if (initialData && open) {
      formMethods.reset({ ...DEFAULT_VALUES, ...initialData });
    }
  }, [initialData, open, formMethods]);

  const resetDialog = () => {
    formMethods.reset(DEFAULT_VALUES);
    setEnderecos([]);
    setFiles([]);
    setActiveTab("dados");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialog();
    }
    onOpenChange(nextOpen);
  };

  const applyAddressErrors = (values: ClienteFormValues) => {
    const errors = getAddressValidationErrors(values, enderecos);

    for (const field of ENDERECO_FIELDS) {
      formMethods.clearErrors(field);
    }

    for (const field of ENDERECO_FIELDS) {
      const message = errors[field];
      if (message) {
        formMethods.setError(field, { type: "manual", message });
      }
    }

    return Object.keys(errors).length === 0;
  };

  const handleNextDados = async () => {
    const isValid = await formMethods.trigger([...DADOS_FIELDS]);
    if (isValid) {
      setActiveTab("endereco");
    }
  };

  const handleNextEndereco = () => {
    const values = formMethods.getValues();
    if (applyAddressErrors(values)) {
      setActiveTab("documentacao");
    }
  };

  const handleAddEndereco = () => {
    const values = formMethods.getValues();
    const novoEndereco = createEnderecoFromForm(values);

    if (!novoEndereco) {
      applyAddressErrors(values);
      return;
    }

    setEnderecos((prev) => [...prev, novoEndereco]);
    formMethods.reset({ ...values, ...clearAddressFields() });
  };

  const handleRemoveEndereco = (index: number) => {
    setEnderecos((prev) => prev.filter((_, enderecoIndex) => enderecoIndex !== index));
  };

  const handleInvalid = (errors: FieldErrors<ClienteFormValues>) => {
    const errorFields = Object.keys(errors);
    const hasDadosError = errorFields.some((field) =>
      (DADOS_FIELDS as readonly string[]).includes(field),
    );

    setActiveTab(hasDadosError ? "dados" : "endereco");
  };

  const handleSubmit = async (values: ClienteFormValues) => {
    if (!applyAddressErrors(values)) {
      setActiveTab("endereco");
      return;
    }

    const arquivos = await filesToBase64(files);
    const payload = buildClientePayload(values, enderecos, arquivos);
    const success = await onAddCliente(payload);

    if (success) {
      resetDialog();
    }
  };

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
              enderecos={enderecos}
              onAddEndereco={handleAddEndereco}
              onRemoveEndereco={handleRemoveEndereco}
              onNext={handleNextEndereco}
            />
            <DocumentacaoTab files={files} onFilesChange={setFiles} isSubmitting={isSubmitting} />
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
