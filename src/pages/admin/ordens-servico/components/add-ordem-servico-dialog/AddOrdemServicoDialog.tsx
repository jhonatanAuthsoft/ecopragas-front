import { useEffect, useMemo, useRef, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Tabs, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { Form } from "@/atomic/obj.form";
import { useGetCliente } from "@/domain/cliente";
import { useCreateOrdemServico, useEditOrdemServico } from "@/domain/ordem-servico";
import type { OrdemServico } from "@/model/rest/ordem-servico";
import { DADOS_FIELDS, DEFAULT_VALUES, TAB_TRIGGER_CLASS } from "./add-ordem-servico-dialog.data";
import type {
  OrdemServicoDialogTab,
  OrdemServicoFormValues,
} from "./add-ordem-servico-dialog.types";
import {
  buildOrdemServicoMutationInput,
  mapClienteEnderecoToServicoEndereco,
  mapOrdemServicoToFormValues,
  resolveInitialEnderecoId,
} from "./add-ordem-servico-dialog.utils";
import { DadosServicoTab } from "./tabs/DadosServicoTab";
import { EnderecoServicoTab, type EnderecoServicoTabHandle } from "./tabs/EnderecoServicoTab";

export interface AddOrdemServicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ordemServico?: OrdemServico;
  onOrdemServicoUpdated?: (ordem: OrdemServico) => void;
}

export const AddOrdemServicoDialog = ({
  open,
  onOpenChange,
  ordemServico,
  onOrdemServicoUpdated,
}: AddOrdemServicoDialogProps) => {
  const isEditMode = !!ordemServico?.id;
  const [activeTab, setActiveTab] = useState<OrdemServicoDialogTab>("dados");
  const enderecoTabRef = useRef<EnderecoServicoTabHandle>(null);

  const formMethods = useForm<OrdemServicoFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });
  const { isSubmitting } = formMethods.formState;
  const clienteId = formMethods.watch("clienteId");

  const { cliente } = useGetCliente({ id: isEditMode ? clienteId : "" });

  const initialEnderecoId = useMemo(() => {
    if (!isEditMode || !ordemServico || !cliente?.enderecos) {
      return undefined;
    }

    const clienteEnderecos = cliente.enderecos
      .map(mapClienteEnderecoToServicoEndereco)
      .filter((endereco) => endereco.id);

    return resolveInitialEnderecoId(ordemServico, clienteEnderecos);
  }, [cliente?.enderecos, isEditMode, ordemServico]);

  const { createOrdemServico, isCreateOrdemServicoLoading } = useCreateOrdemServico({
    onSuccess: () => {
      toast.success("Ordem de serviço cadastrada com sucesso!");
      resetDialog();
      onOpenChange(false);
    },
  });

  const { editOrdemServico, isEditOrdemServicoLoading } = useEditOrdemServico({
    onSuccess: (response) => {
      if (response.data) {
        onOrdemServicoUpdated?.(response.data);
      }
      toast.success("Ordem de serviço atualizada com sucesso!");
      resetDialog();
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (!open) return;

    if (ordemServico) {
      formMethods.reset(mapOrdemServicoToFormValues(ordemServico));
    } else {
      formMethods.reset(DEFAULT_VALUES);
    }

    setActiveTab("dados");
  }, [formMethods, open, ordemServico]);

  useEffect(() => {
    if (!clienteId) {
      setActiveTab((currentTab) => (currentTab === "endereco" ? "dados" : currentTab));
    }
  }, [clienteId]);

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

  const handleTabChange = (tab: string) => {
    if (tab === "endereco" && !clienteId) {
      return;
    }

    setActiveTab(tab as OrdemServicoDialogTab);
  };

  const handleNextDados = async () => {
    const isValid = await formMethods.trigger([...DADOS_FIELDS]);
    if (isValid && clienteId) {
      setActiveTab("endereco");
    }
  };

  const handleInvalid = (errors: FieldErrors<OrdemServicoFormValues>) => {
    const errorFields = Object.keys(errors);
    const hasDadosError = errorFields.some((field) =>
      (DADOS_FIELDS as readonly string[]).includes(field),
    );

    setActiveTab(hasDadosError ? "dados" : "endereco");
  };

  const handleSubmit = (values: OrdemServicoFormValues) => {
    const selectedEndereco = enderecoTabRef.current?.resolveSelectedEndereco(values);

    if (!selectedEndereco) {
      setActiveTab("endereco");
      return;
    }

    if (isEditMode && ordemServico?.id) {
      const payload = buildOrdemServicoMutationInput(values, selectedEndereco);
      if (!payload) {
        setActiveTab("dados");
        return;
      }

      editOrdemServico({ id: ordemServico.id, body: payload });
      return;
    }

    const payload = buildOrdemServicoMutationInput(values, selectedEndereco);
    if (!payload) {
      setActiveTab("dados");
      return;
    }

    createOrdemServico(payload);
  };

  const isMutationLoading = isCreateOrdemServicoLoading || isEditOrdemServicoLoading;
  const isLoading = isSubmitting || isMutationLoading;

  const submitLabel = isMutationLoading
    ? isEditMode
      ? "Salvando..."
      : "Criando..."
    : isEditMode
      ? "Salvar alterações"
      : "Criar ordem de serviço";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <H2>{isEditMode ? "Editar ordem de serviço" : "Criar nova ordem de serviço"}</H2>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-lg bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger value="dados" className={TAB_TRIGGER_CLASS}>
                Dados do serviço
              </TabsTrigger>
              <TabsTrigger value="endereco" className={TAB_TRIGGER_CLASS} disabled={!clienteId}>
                Endereço do serviço
              </TabsTrigger>
            </TabsList>

            <DadosServicoTab onNext={handleNextDados} />
            <EnderecoServicoTab
              ref={enderecoTabRef}
              isSubmitting={isLoading}
              submitLabel={submitLabel}
              initialSelectedEnderecoId={initialEnderecoId}
            />
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
