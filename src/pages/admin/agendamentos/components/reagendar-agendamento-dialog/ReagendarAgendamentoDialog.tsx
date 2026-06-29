import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { DateInput } from "@/atomic/atm.date-input";
import { InfiniteMultiSelectInput } from "@/atomic/atm.infinite-multi-select-input";
import { InfiniteSelectInput } from "@/atomic/atm.infinite-select-input";
import { SelectInput } from "@/atomic/atm.select-input";
import { TimeInput } from "@/atomic/atm.time-input";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Form, FormField, RequiredValidator, TimeValidator } from "@/atomic/obj.form";
import { strings } from "@/atomic/obj.form/validators/validators.strings";
import { useEditAgendamento } from "@/domain/agendamento";
import { clientesInfiniteSelectConfig } from "@/domain/cliente";
import type { InfiniteSelectQueryConfig } from "@/domain/infinite-list";
import { ordensServicoInfiniteSelectConfig } from "@/domain/ordem-servico";
import { tecnicosInfiniteSelectConfig } from "@/domain/tecnico";
import type { Agendamento, CadastrarAgendamentoFormValues } from "@/model/rest/agendamento";
import { RECORRENCIA_OPTIONS } from "../add-agendamento-dialog/add-agendamento-dialog.data";
import {
  buildEditAgendamentoInput,
  buildReagendarDisplayLabels,
  buildReagendarFormValues,
  buildReagendarPayload,
} from "./reagendar-agendamento-dialog.utils";

const disabledInfiniteSelectConfig = <TItem,>(config: InfiniteSelectQueryConfig<TItem>) => ({
  ...config,
  enabled: false,
});

interface ReagendarAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: Agendamento;
}

export function ReagendarAgendamentoDialog({
  open,
  onOpenChange,
  agendamento,
}: ReagendarAgendamentoDialogProps) {
  const formMethods = useForm<CadastrarAgendamentoFormValues>({
    mode: "onChange",
    defaultValues: buildReagendarFormValues(agendamento),
  });

  const displayLabels = useMemo(() => buildReagendarDisplayLabels(agendamento), [agendamento]);

  const { editAgendamento, isEditAgendamentoLoading } = useEditAgendamento({
    onSuccess: () => {
      toast.success("Agendamento reagendado com sucesso!");
      onOpenChange(false);
    },
  });

  const clientesQueryConfig = useMemo(
    () => disabledInfiniteSelectConfig(clientesInfiniteSelectConfig),
    [],
  );
  const ordensServicoQueryConfig = useMemo(
    () => disabledInfiniteSelectConfig(ordensServicoInfiniteSelectConfig),
    [],
  );
  const tecnicosQueryConfig = useMemo(
    () => disabledInfiniteSelectConfig(tecnicosInfiniteSelectConfig),
    [],
  );

  useEffect(() => {
    if (open) {
      formMethods.reset(buildReagendarFormValues(agendamento));
    }
  }, [agendamento, formMethods, open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formMethods.reset(buildReagendarFormValues(agendamento));
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (values: CadastrarAgendamentoFormValues) => {
    const payload = buildReagendarPayload(values);
    if (!payload || !agendamento.id) return;

    const body = buildEditAgendamentoInput(agendamento, payload);
    if (!body) return;

    editAgendamento({ id: agendamento.id, body });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col gap-lg sm:max-w-[728px] p-lg">
        <DialogHeader>
          <H2>Reagendar</H2>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <FormField name="clienteId" disabled>
              <InfiniteSelectInput
                key={`${agendamento.id}-cliente`}
                label="Cliente"
                placeholder="Selecione o cliente"
                searchPlaceholder="Buscar cliente"
                queryConfig={clientesQueryConfig}
                selectedLabel={displayLabels.clienteNome}
              />
            </FormField>

            <FormField name="ordemServicoId" disabled>
              <InfiniteSelectInput
                key={`${agendamento.id}-ordem-servico`}
                label="Ordem de serviço"
                placeholder="Vincule uma O.S."
                searchPlaceholder="Buscar ordem de serviço"
                queryConfig={ordensServicoQueryConfig}
                selectedLabel={displayLabels.ordemServicoLabel}
              />
            </FormField>

            <FormField name="tecnicosIds" disabled>
              <InfiniteMultiSelectInput
                key={`${agendamento.id}-tecnico`}
                label="Técnico Responsável"
                placeholder="Selecione o(s) técnico(s)"
                searchPlaceholder="Buscar técnico"
                queryConfig={tecnicosQueryConfig}
                selectedOptions={displayLabels.tecnicoOptions}
              />
            </FormField>

            <FormField name="recorrencia" disabled>
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

          <div className="flex gap-md w-full pt-lg">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              isLoading={isEditAgendamentoLoading}
            >
              {isEditAgendamentoLoading ? "Reagendando..." : "Confirmar"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
