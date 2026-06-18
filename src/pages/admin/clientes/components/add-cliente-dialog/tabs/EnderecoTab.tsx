import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import { FormField, RequiredValidator } from "@/atomic/obj.form";
import type { ClienteFormValues } from "@/model/rest/cliente";
import { formatCEP, formatNumber } from "@/utils/formatters";
import { ESTADO_OPTIONS } from "../add-cliente-dialog.data";
import { fetchAddressByCep } from "../add-cliente-dialog.utils";

interface EnderecoTabProps {
  onAddEndereco: () => void;
  onRemoveEndereco: (index: number) => void;
  onNext: () => void;
}

export const EnderecoTab = ({ onAddEndereco, onRemoveEndereco, onNext }: EnderecoTabProps) => {
  const { setValue, watch } = useFormContext<ClienteFormValues>();
  const enderecos = watch("enderecos");
  const salvarEnderecoPadrao = watch("enderecoDraft.padrao");

  const fillAddressFromCep = async (cep: string) => {
    const address = await fetchAddressByCep(cep);
    if (!address) {
      return;
    }

    setValue("enderecoDraft.rua", address.logradouro, { shouldDirty: true });
    setValue("enderecoDraft.bairro", address.bairro, { shouldDirty: true });
    setValue("enderecoDraft.cidade", address.localidade, { shouldDirty: true });
    setValue("enderecoDraft.estado", address.uf, { shouldDirty: true });
  };

  return (
    <TabsContent value="endereco" forceMount className="space-y-6 data-[state=inactive]:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="enderecoDraft.cep"
          validators={[RequiredValidator()]}
          onChange={(value) => void fillAddressFromCep(String(value))}
        >
          <TextInput label="CEP" placeholder="Ex.48000-000" formatter={formatCEP} maxLength={9} />
        </FormField>

        <FormField name="enderecoDraft.estado" validators={[RequiredValidator()]}>
          <SelectInput label="Estado" placeholder="Selecione o estado" options={ESTADO_OPTIONS} />
        </FormField>

        <FormField
          name="enderecoDraft.cidade"
          validators={[RequiredValidator()]}
          className="md:col-span-2"
        >
          <TextInput label="Cidade" placeholder="Ex. Cruz das Almas" />
        </FormField>

        <FormField
          name="enderecoDraft.bairro"
          validators={[RequiredValidator()]}
          className="md:col-span-2"
        >
          <TextInput label="Bairro" placeholder="Ex. Centro" />
        </FormField>

        <FormField
          name="enderecoDraft.rua"
          validators={[RequiredValidator()]}
          className="md:col-span-2"
        >
          <TextInput label="Endereço" placeholder="Rua Leonidio Melo Sacramento" />
        </FormField>

        <FormField name="enderecoDraft.numero" validators={[RequiredValidator()]}>
          <TextInput label="Número" placeholder="Ex. 123" formatter={formatNumber} />
        </FormField>

        <FormField name="enderecoDraft.complemento" validators={[RequiredValidator()]}>
          <TextInput label="Complemento" placeholder="Ex. Apto 101" />
        </FormField>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="padrao"
          checked={salvarEnderecoPadrao ?? false}
          onCheckedChange={(checked) =>
            setValue("enderecoDraft.padrao", checked === true, { shouldDirty: true })
          }
          className="data-[state=checked]:bg-brand-primary-medium border-grayscale-medium"
        />
        <label
          htmlFor="padrao"
          className="text-sm font-normal text-grayscale-dark leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Salvar endereco como padrao
        </label>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="ghost"
          className="text-brand-primary-medium hover:text-brand-primary-dark hover:bg-transparent p-0 h-auto font-medium flex items-center gap-2"
          onClick={onAddEndereco}
        >
          <Plus className="h-4 w-4" />
          Adicionar outro endereco
        </Button>
      </div>

      {enderecos.map((addr, index) => (
        <div
          key={`${addr.cep}-${addr.rua}-${addr.numero}-${index}`}
          className="border border-grayscale-light rounded-lg p-4 flex justify-between items-start mt-4"
        >
          <div>
            <p className="font-medium text-grayscale-dark">
              {addr.rua}, {addr.numero}
              {addr.complemento ? ` - ${addr.complemento}` : ""}
            </p>
            <p className="text-xxs font-normal text-grayscale-medium">
              {addr.bairro}, {addr.cidade} - {addr.estado}, {addr.cep}
            </p>
            {addr.padrao && (
              <p className="text-xxs font-normal text-brand-primary-medium">Padrao</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="text-feedback-error-medium hover:text-feedback-error-dark hover:bg-transparent p-0 h-auto"
            onClick={() => onRemoveEndereco(index)}
          >
            <Trash2 className="h-5 w-5 cursor-pointer" />
          </Button>
        </div>
      ))}

      <div className="pt-6 flex justify-center">
        <Button type="button" className="w-[400px] h-[43px]" onClick={onNext}>
          Avancar
        </Button>
      </div>
    </TabsContent>
  );
};
