import { useRef, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Tabs, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { Form } from "@/atomic/obj.form";
import type { OrdemServico } from "@/model/rest/ordem-servico";
import {
  DADOS_FIELDS,
  TAB_TRIGGER_CLASS,
} from "../../add-ordem-servico-dialog/add-ordem-servico-dialog.data";
import type {
  OrdemServicoDialogTab,
  OrdemServicoFormValues,
} from "../../add-ordem-servico-dialog/add-ordem-servico-dialog.types";
import { DadosServicoTab } from "../../add-ordem-servico-dialog/tabs/DadosServicoTab";
import {
  EnderecoServicoTab,
  type EnderecoServicoTabHandle,
} from "../../add-ordem-servico-dialog/tabs/EnderecoServicoTab";
import {
  buildOrdemServicoUpdatePayload,
  mapOrdemToFormValues,
  resolveInitialEnderecoId,
} from "../edit-ordem-servico-dialog.utils";

export interface EditOrdemServicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ordem: OrdemServico;
  onSubmit: (ordem: OrdemServico) => void;
}

export function EditOrdemServicoDialog({
  open,
  onOpenChange,
  ordem,
  onSubmit,
}: EditOrdemServicoDialogProps) {
  const [activeTab, setActiveTab] = useState<OrdemServicoDialogTab>("dados");
  const enderecoTabRef = useRef<EnderecoServicoTabHandle>(null);
  const initialEnderecoId = resolveInitialEnderecoId(ordem);

  const formMethods = useForm<OrdemServicoFormValues>({
    mode: "onChange",
    defaultValues: mapOrdemToFormValues(ordem),
  });
  const { isSubmitting } = formMethods.formState;
  const clienteId = formMethods.watch("clienteId");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formMethods.reset(mapOrdemToFormValues(ordem));
      setActiveTab("dados");
    }
    onOpenChange(nextOpen);
  };

  const handleTabChange = (tab: OrdemServicoDialogTab) => {
    if (tab === "endereco" && !clienteId) return;
    setActiveTab(tab);
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

    const updatedOrdem = buildOrdemServicoUpdatePayload(ordem, values, selectedEndereco);
    onSubmit(updatedOrdem);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <H2>Editar ordem de serviço</H2>
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

            <DadosServicoTab onNext={handleNextDados} statusLabel="Status" />
            <EnderecoServicoTab
              ref={enderecoTabRef}
              isSubmitting={isSubmitting}
              submitLabel="Salvar alterações"
              initialSelectedEnderecoId={initialEnderecoId}
            />
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
