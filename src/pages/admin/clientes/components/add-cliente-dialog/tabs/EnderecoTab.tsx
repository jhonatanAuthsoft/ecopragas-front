import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import { FormField } from "@/atomic/obj.form";
import { formatCEP, formatNumber } from "@/utils/formatters";
import { ESTADO_OPTIONS } from "../add-cliente-dialog.data";
import type { ClienteEndereco, ClienteFormValues } from "../add-cliente-dialog.types";
import { fetchAddressByCep } from "../add-cliente-dialog.utils";

interface EnderecoTabProps {
  enderecos: ClienteEndereco[];
  onAddEndereco: () => void;
  onRemoveEndereco: (index: number) => void;
  onNext: () => void;
}

export const EnderecoTab = ({
  enderecos,
  onAddEndereco,
  onRemoveEndereco,
  onNext,
}: EnderecoTabProps) => {
  const { setValue, watch } = useFormContext<ClienteFormValues>();
  const salvarEnderecoPadrao = watch("salvarEnderecoPadrao");

  const handleCepChange = async (value: string | number | boolean) => {
    const address = await fetchAddressByCep(String(value));

    if (!address) {
      return;
    }

    setValue("endereco", address.logradouro);
    setValue("bairro", address.bairro);
    setValue("cidade", address.localidade);
    setValue("estado", address.uf);
  };

  return (
    <TabsContent value="endereco" forceMount className="space-y-6 data-[state=inactive]:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="cep" onChange={handleCepChange}>
          <TextInput label="CEP" placeholder="Ex.48000-000" formatter={formatCEP} maxLength={9} />
        </FormField>

        <FormField name="estado">
          <SelectInput label="Estado" placeholder="Selecione o estado" options={ESTADO_OPTIONS} />
        </FormField>

        <FormField name="cidade" className="md:col-span-2">
          <TextInput label="Cidade" placeholder="Ex. Cruz das Almas" />
        </FormField>

        <FormField name="bairro" className="md:col-span-2">
          <TextInput label="Bairro" placeholder="Ex. Centro" />
        </FormField>

        <FormField name="endereco" className="md:col-span-2">
          <TextInput label="Endereço" placeholder="Rua Leonidio Melo Sacramento" hasClearButton />
        </FormField>

        <FormField name="numero">
          <TextInput label="Número" placeholder="Ex. 123" formatter={formatNumber} />
        </FormField>

        <FormField name="complemento">
          <TextInput label="Complemento" placeholder="Ex. Apto 101" />
        </FormField>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="padrao"
          checked={salvarEnderecoPadrao}
          onCheckedChange={(checked) =>
            setValue("salvarEnderecoPadrao", checked === true, { shouldDirty: true })
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
          key={`${addr.cep}-${addr.endereco}-${addr.numero}-${index}`}
          className="border border-grayscale-light rounded-lg p-4 flex justify-between items-start mt-4"
        >
          <div>
            <p className="font-medium text-grayscale-dark">
              {addr.endereco}, {addr.numero}
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
