import { useFormContext } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TextareaInput } from "@/atomic/atm.textarea-input";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import { FormField, RequiredValidator } from "@/atomic/obj.form";
import { formatCurrency } from "@/utils/formatters";
import {
  getClienteOptions,
  getTecnicoOptions,
  getTipoServicoVariacao,
  STATUS_OPTIONS,
  TIPO_SERVICO_OPTIONS,
} from "../add-ordem-servico-dialog.data";
import type { OrdemServicoFormValues } from "../add-ordem-servico-dialog.types";
import { MonitoramentoInsetosFields } from "./variations/MonitoramentoInsetosFields";
import { MonitoramentoRoedoresFields } from "./variations/MonitoramentoRoedoresFields";

interface DadosServicoTabProps {
  onNext: () => void;
  statusLabel?: string;
}

export const DadosServicoTab = ({ onNext, statusLabel = "Status inicial" }: DadosServicoTabProps) => {
  const { watch } = useFormContext<OrdemServicoFormValues>();
  const tipoServico = watch("tipoServico");
  const variacao = getTipoServicoVariacao(tipoServico);

  return (
    <TabsContent
      value="dados"
      forceMount
      className="flex flex-col gap-lg data-[state=inactive]:hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="clienteId" validators={[RequiredValidator()]}>
          <SelectInput
            label="Cliente"
            placeholder="Selecione o cliente"
            options={getClienteOptions()}
          />
        </FormField>

        <FormField name="tipoServico" validators={[RequiredValidator()]}>
          <SelectInput
            label="Tipo de serviço"
            placeholder="Selecione o tipo de serviço"
            options={TIPO_SERVICO_OPTIONS}
          />
        </FormField>

        <FormField name="tecnicoId" validators={[RequiredValidator()]}>
          <SelectInput
            label="Técnico responsável"
            placeholder="Selecione o tecnico"
            options={getTecnicoOptions()}
          />
        </FormField>

        <FormField name="valorServico" validators={[RequiredValidator()]}>
          <TextInput
            label="Valor do serviço (R$)"
            placeholder="R$ 450,00"
            formatter={formatCurrency}
          />
        </FormField>

        <FormField name="status" validators={[RequiredValidator()]}>
          <SelectInput
            label={statusLabel}
            placeholder="Selecione o status"
            options={STATUS_OPTIONS}
          />
        </FormField>
      </div>

      <FormField name="observacoes">
        <TextareaInput
          label="Observações"
          placeholder="Informações adicionais sobre o serviço..."
        />
      </FormField>

      {variacao === "monitoramento_insetos" && <MonitoramentoInsetosFields />}
      {variacao === "monitoramento_roedores" && <MonitoramentoRoedoresFields />}

      <div className="pt-xs flex justify-center">
        <Button type="button" className="w-[400px] h-[43px]" onClick={onNext}>
          Avançar
        </Button>
      </div>
    </TabsContent>
  );
};
