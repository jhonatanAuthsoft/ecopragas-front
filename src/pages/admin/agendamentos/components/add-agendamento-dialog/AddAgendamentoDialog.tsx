import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { DateInput } from "@/atomic/atm.date-input";
import { InfiniteMultiSelectInput } from "@/atomic/atm.infinite-multi-select-input";
import { InfiniteSelectInput } from "@/atomic/atm.infinite-select-input";
import { SelectInput } from "@/atomic/atm.select-input";
import { TimeInput } from "@/atomic/atm.time-input";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import {
  AtLeastOneArrayItemValidator,
  Form,
  FormField,
  RequiredValidator,
  TimeValidator,
} from "@/atomic/obj.form";
import { strings } from "@/atomic/obj.form/validators/validators.strings";
import { clientesInfiniteSelectConfig } from "@/domain/cliente";
import { ordensServicoInfiniteSelectConfig } from "@/domain/ordem-servico";
import { tecnicosInfiniteSelectConfig } from "@/domain/tecnico";
import type { OrdemServico } from "@/model/rest/ordem-servico/ordem-servico.model";
import { formatTipoServico } from "@/utils/formatters";
import { formatEnderecoFromOrdemServico } from "@/utils/ordem-servico";
import { DEFAULT_VALUES, RECORRENCIA_OPTIONS } from "./add-agendamento-dialog.data";
import type {
  AddAgendamentoFormValues,
  AddAgendamentoSubmitPayload,
} from "./add-agendamento-dialog.types";
import {
  type AddAgendamentoSelectionLabels,
  buildAddAgendamentoPayload,
} from "./add-agendamento-dialog.utils";

export interface AddAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (payload: AddAgendamentoSubmitPayload) => void;
}

const EMPTY_SELECTION_LABELS: AddAgendamentoSelectionLabels = {
  clienteNome: "",
  tecnicoNomes: [],
};

export const AddAgendamentoDialog = ({ open, onOpenChange, onAdd }: AddAgendamentoDialogProps) => {
  const formMethods = useForm<AddAgendamentoFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const { isSubmitting } = formMethods.formState;
  const clienteId = formMethods.watch("clienteId");
  const [selectionLabels, setSelectionLabels] =
    useState<AddAgendamentoSelectionLabels>(EMPTY_SELECTION_LABELS);

  const ordemServicoQueryConfig = useMemo(
    () => ({
      ...ordensServicoInfiniteSelectConfig,
      enabled: !!clienteId,
      filterItem: (ordemServico: OrdemServico) => ordemServico.clienteId === clienteId,
    }),
    [clienteId],
  );

  const resetDialog = () => {
    formMethods.reset(DEFAULT_VALUES);
    setSelectionLabels(EMPTY_SELECTION_LABELS);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialog();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = (values: AddAgendamentoFormValues) => {
    const payload = buildAddAgendamentoPayload(values, selectionLabels);

    if (!payload) {
      return;
    }

    onAdd(payload);
    resetDialog();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col gap-lg sm:max-w-[728px] p-lg">
        <DialogHeader>
          <H2>Novo Agendamento</H2>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <FormField name="clienteId" validators={[RequiredValidator()]}>
              <InfiniteSelectInput
                label="Cliente"
                placeholder="Selecione o cliente"
                searchPlaceholder="Buscar cliente"
                queryConfig={clientesInfiniteSelectConfig}
                onOptionSelect={(option) => {
                  setSelectionLabels((current) => ({
                    ...current,
                    clienteNome: option.label,
                    ordemServicoTipoServico: undefined,
                    ordemServicoEndereco: undefined,
                  }));
                  formMethods.setValue("ordemServicoId", "");
                }}
              />
            </FormField>

            <FormField name="ordemServicoId">
              <InfiniteSelectInput
                label="Ordem de serviço"
                placeholder="Vincule uma O.S."
                searchPlaceholder="Buscar ordem de serviço"
                queryConfig={ordemServicoQueryConfig}
                disabled={!clienteId}
                onItemSelect={(ordemServico) => {
                  setSelectionLabels((current) => ({
                    ...current,
                    ordemServicoTipoServico: ordemServico.tipoServico
                      ? formatTipoServico(ordemServico.tipoServico)
                      : undefined,
                    ordemServicoEndereco: formatEnderecoFromOrdemServico(ordemServico),
                  }));
                }}
              />
            </FormField>

            <FormField name="tecnicoIds" validators={[AtLeastOneArrayItemValidator()]}>
              <InfiniteMultiSelectInput
                label="Técnico Responsável"
                placeholder="Selecione o(s) técnico(s)"
                searchPlaceholder="Buscar técnico"
                queryConfig={tecnicosInfiniteSelectConfig}
                onOptionsChange={(options) => {
                  setSelectionLabels((current) => ({
                    ...current,
                    tecnicoNomes: options.map((option) => option.label),
                  }));
                }}
              />
            </FormField>

            <FormField name="recorrencia" validators={[RequiredValidator()]}>
              <SelectInput
                label="Recorrência"
                placeholder="Selecione a recorrência"
                options={RECORRENCIA_OPTIONS}
              />
            </FormField>

            <Controller
              name="data"
              control={formMethods.control}
              rules={{ required: strings.required }}
              render={({ field, fieldState }) => (
                <DateInput
                  label="Data do Agendamento"
                  placeholder="00/00/0000"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                />
              )}
            />

            <FormField name="horario" validators={[RequiredValidator(), TimeValidator()]}>
              <TimeInput label="Horário do Agendamento" placeholder="12:30" />
            </FormField>
          </div>

          <div className="flex justify-center pt-lg">
            <Button
              type="submit"
              className="w-full max-w-[400px] h-[43px]"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Adicionando..." : "Adicionar Agendamento"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
