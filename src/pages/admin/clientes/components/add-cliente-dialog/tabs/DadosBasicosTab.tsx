import { Button } from "@/atomic/atm.button/button.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TextareaInput } from "@/atomic/atm.textarea-input";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import {
  CpfCnpjValidator,
  EmailValidator,
  FormField,
  PhoneValidator,
  RequiredValidator,
} from "@/atomic/obj.form";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { STATUS_OPTIONS, TIPO_CLIENTE_OPTIONS } from "../add-cliente-dialog.data";

interface DadosBasicosTabProps {
  onNext: () => void;
}

export const DadosBasicosTab = ({ onNext }: DadosBasicosTabProps) => (
  <TabsContent value="dados" forceMount className="space-y-6 data-[state=inactive]:hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField name="nomeRazaoSocial" validators={[RequiredValidator()]}>
        <TextInput label="Nome/ Razão Social" placeholder="João Silva" />
      </FormField>

      <FormField name="cnpjCpf" validators={[RequiredValidator(), CpfCnpjValidator()]}>
        <TextInput
          label="CPF/CNPJ"
          placeholder="EX. 123.456.789/0001"
          formatter={formatCPFCNPJ}
          maxLength={18}
        />
      </FormField>

      <FormField name="tipo" validators={[RequiredValidator()]}>
        <SelectInput
          label="Tipo de cliente"
          placeholder="Selecione o tipo de cliente"
          options={TIPO_CLIENTE_OPTIONS}
        />
      </FormField>

      <FormField name="status" validators={[RequiredValidator()]}>
        <SelectInput label="Status" placeholder="Selecione o status" options={STATUS_OPTIONS} />
      </FormField>

      <FormField name="email" validators={[RequiredValidator(), EmailValidator()]}>
        <TextInput label="E-mail" placeholder="Ex. contato@empresa.com" />
      </FormField>

      <FormField name="telefone" validators={[RequiredValidator(), PhoneValidator()]}>
        <TextInput
          label="Telefone"
          placeholder="Ex.(11) 987765-4321"
          formatter={formatPhone}
          maxLength={15}
        />
      </FormField>
    </div>

    <FormField name="observacoes">
      <TextareaInput label="Observações" placeholder="Informações adicionais sobre o cliente" />
    </FormField>

    <div className="pt-4 flex justify-center">
      <Button type="button" className="w-[400px] h-[43px]" onClick={onNext}>
        Avançar
      </Button>
    </div>
  </TabsContent>
);
