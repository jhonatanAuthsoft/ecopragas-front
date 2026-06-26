import { Controller, useForm } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { DateInput } from "@/atomic/atm.date-input";
import { MultiSelectInput } from "@/atomic/atm.multi-select-input";
import { SelectInput } from "@/atomic/atm.select-input";
import { TimeInput } from "@/atomic/atm.time-input";
import { Body1, H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import {
  AtLeastOneArrayItemValidator,
  Form,
  FormField,
  RequiredValidator,
  TimeValidator,
} from "@/atomic/obj.form";
import { strings } from "@/atomic/obj.form/validators/validators.strings";
import { useListClientes } from "@/domain/cliente";
import { useListOrdensServico } from "@/domain/ordem-servico";
import { useListTecnicos } from "@/domain/tecnico";
import { DEFAULT_VALUES, RECORRENCIA_OPTIONS } from "./add-agendamento-dialog.data";
import type {
  AddAgendamentoFormValues,
  AddAgendamentoSubmitPayload,
} from "./add-agendamento-dialog.types";
import {
  buildAddAgendamentoPayload,
  filterOrdensServicoByCliente,
  getClienteOptions,
  getOrdemServicoOptions,
  getTecnicoOptions,
} from "./add-agendamento-dialog.utils";

export interface AddAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (payload: AddAgendamentoSubmitPayload) => void;
}

export const AddAgendamentoDialog = ({ open, onOpenChange, onAdd }: AddAgendamentoDialogProps) => {
  const formMethods = useForm<AddAgendamentoFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const { isSubmitting } = formMethods.formState;
  const clienteId = formMethods.watch("clienteId");

  // TODO: fazer o select infinito, com busca por texto nesses 3
  const { clientes, listClientesError } = useListClientes({ limit: 100 });
  const { ordensServico, listOrdensServicoError } = useListOrdensServico({ limit: 100 });
  const { tecnicos, listTecnicosError } = useListTecnicos({ limit: 100 });

  const ordensServicoDoCliente = filterOrdensServicoByCliente(ordensServico, clienteId);
  const hasLoadError = !!(listClientesError || listOrdensServicoError || listTecnicosError);
  const resetDialog = () => {
    formMethods.reset(DEFAULT_VALUES);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetDialog();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = (values: AddAgendamentoFormValues) => {
    const payload = buildAddAgendamentoPayload(values, clientes, tecnicos, ordensServico);

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
          {hasLoadError && (
            <Body1 className="font-normal text-feedback-error-medium">
              Não foi possível carregar os dados do formulário. Tente novamente.
            </Body1>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* TODO: seleção infinita, com busca por texto */}
            <FormField name="clienteId" validators={[RequiredValidator()]}>
              <SelectInput
                label="Cliente"
                placeholder="Selecione o cliente"
                options={getClienteOptions(clientes)}
              />
            </FormField>

            <FormField name="ordemServicoId">
              <SelectInput
                label="Ordem de serviço"
                placeholder="Vincule uma O.S."
                options={getOrdemServicoOptions(ordensServicoDoCliente)}
                disabled={!clienteId}
              />
            </FormField>

            <FormField name="tecnicoIds" validators={[AtLeastOneArrayItemValidator()]}>
              <MultiSelectInput
                label="Técnico Responsável"
                placeholder="Selecione o(s) técnico(s)"
                options={getTecnicoOptions(tecnicos)}
                // options={[
                //   { value: "1", label: "João da Silva" },
                //   { value: "2", label: "Maria Oliveira" },
                //   { value: "3", label: "Pedro Santos" },
                //   { value: "4", label: "Ana Maria" },
                //   { value: "5", label: "Carlos Ferreira" },
                //   { value: "6", label: "Laura Souza" },
                //   { value: "7", label: "Rafael Oliveira" },
                //   { value: "8", label: "Camila Santos" },
                //   { value: "9", label: "Gustavo Lima" },
                //   { value: "10", label: "Julia Costa" },
                //   { value: "11", label: "Ricardo Almeida" },
                //   { value: "12", label: "Mariana Santos" },
                //   { value: "13", label: "Bruno Oliveira" },
                //   { value: "14", label: "Fernanda Lima" },
                //   { value: "15", label: "André Costa" },
                //   { value: "16", label: "Carla Souza" },
                //   { value: "17", label: "Roberto Oliveira" },
                //   { value: "18", label: "Camila Santos" },
                //   { value: "19", label: "Gustavo Lima" },
                //   { value: "20", label: "Julia Costa" },
                // ]}
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
