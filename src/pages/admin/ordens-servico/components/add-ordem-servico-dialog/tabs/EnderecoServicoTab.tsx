import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RadioButtonCheckedIcon } from "@/assets/icons/radio-button-checked";
import { RadioButtonUncheckedIcon } from "@/assets/icons/radio-button-unchecked";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Caption } from "@/atomic/atm.caption";
import { TextInput } from "@/atomic/atm.text-input";
import { Body2, InputCaption } from "@/atomic/atm.typography";
import { TabsContent } from "@/atomic/mol.tabs/tabs.component";
import { FormField } from "@/atomic/obj.form";
import { cn } from "@/lib/utils";
import { formatCEP, formatNumber } from "@/utils/formatters";
import { ENDERECO_FIELDS, MOCK_CLIENTES, NOVO_ENDERECO_ID } from "../add-ordem-servico-dialog.data";
import type { OrdemServicoFormValues, ServicoEndereco } from "../add-ordem-servico-dialog.types";
import {
  createEnderecoFromForm,
  fetchAddressByCep,
  getAddressValidationErrors,
} from "../add-ordem-servico-dialog.utils";

export type EnderecoServicoTabHandle = {
  resolveSelectedEndereco: (values: OrdemServicoFormValues) => ServicoEndereco | null;
};

interface EnderecoServicoTabProps {
  isSubmitting: boolean;
  submitLabel?: string;
  initialSelectedEnderecoId?: string | null;
}

export const EnderecoServicoTab = forwardRef<EnderecoServicoTabHandle, EnderecoServicoTabProps>(
  ({ isSubmitting, submitLabel = "Criar ordem de serviço", initialSelectedEnderecoId }, ref) => {
    const { setError, clearErrors, watch } = useFormContext<OrdemServicoFormValues>();
    const clienteId = watch("clienteId");

    const [selectedEnderecoId, setSelectedEnderecoId] = useState<string | null>(null);
    const [isNewEnderecoFormVisible, setIsNewEnderecoFormVisible] = useState(false);
    const [selectionError, setSelectionError] = useState<string | null>(null);

    const clienteEnderecos =
      MOCK_CLIENTES.find((cliente) => cliente.id === clienteId)?.enderecos ?? [];

    const isNewEnderecoSelected = selectedEnderecoId === NOVO_ENDERECO_ID;

    useEffect(() => {
      if (initialSelectedEnderecoId === undefined) return;

      setSelectedEnderecoId(initialSelectedEnderecoId);
      setIsNewEnderecoFormVisible(initialSelectedEnderecoId === NOVO_ENDERECO_ID);
      setSelectionError(null);
    }, [initialSelectedEnderecoId]);

    const applyAddressErrors = (values: OrdemServicoFormValues) => {
      const errors = getAddressValidationErrors(values);

      for (const field of ENDERECO_FIELDS) {
        clearErrors(field);
      }

      for (const field of ENDERECO_FIELDS) {
        const message = errors[field];
        if (message) {
          setError(field, { type: "manual", message });
        }
      }
    };

    useImperativeHandle(ref, () => ({
      resolveSelectedEndereco: (values: OrdemServicoFormValues) => {
        if (!selectedEnderecoId) {
          setSelectionError("Selecione um endereço para o serviço");
          return null;
        }

        if (selectedEnderecoId === NOVO_ENDERECO_ID) {
          const novoEndereco = createEnderecoFromForm(values);
          if (!novoEndereco) {
            applyAddressErrors(values);
            setSelectionError("Preencha os dados do novo endereço");
            return null;
          }

          setSelectionError(null);
          return novoEndereco;
        }

        const endereco = clienteEnderecos.find((item) => item.id === selectedEnderecoId);
        if (!endereco) {
          setSelectionError("Selecione um endereço para o serviço");
          return null;
        }

        setSelectionError(null);
        return endereco;
      },
    }));

    const handleSelectEndereco = (enderecoId: string) => {
      setSelectedEnderecoId(enderecoId);
      setSelectionError(null);
    };

    const handleShowNewEnderecoForm = () => {
      setIsNewEnderecoFormVisible(true);
      setSelectedEnderecoId(NOVO_ENDERECO_ID);
      setSelectionError(null);
    };

    return (
      <TabsContent
        value="endereco"
        forceMount
        className="flex flex-col gap-xs data-[state=inactive]:hidden"
      >
        <div className="flex flex-col gap-xs">
          {clienteEnderecos.length === 0 ? (
            <Body2 className="text-grayscale-dark">
              Nenhum endereço cadastrado para este cliente.
              <br /> Adicione um novo endereço abaixo.
            </Body2>
          ) : (
            <div className="flex flex-col gap-xs" role="radiogroup">
              {clienteEnderecos.map((endereco) => (
                <EnderecoCard
                  key={endereco.id}
                  endereco={endereco}
                  isSelected={selectedEnderecoId === endereco.id}
                  onSelect={() => handleSelectEndereco(endereco.id)}
                />
              ))}
            </div>
          )}

          {selectionError && <Caption status="error">{selectionError}</Caption>}
        </div>

        <div>
          {isNewEnderecoFormVisible ? (
            <NovoEnderecoCard
              isSelected={isNewEnderecoSelected}
              onSelect={() => handleSelectEndereco(NOVO_ENDERECO_ID)}
            />
          ) : (
            <Button
              variant="link"
              onClick={handleShowNewEnderecoForm}
              leftIcon={<Plus className="size-md" />}
            >
              Adicionar novo endereço
            </Button>
          )}
        </div>

        <div className="pt-xs flex justify-center">
          <Button type="submit" className="w-[400px] h-[43px]" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      </TabsContent>
    );
  },
);

EnderecoServicoTab.displayName = "EnderecoServicoTab";

interface EnderecoCardProps {
  endereco: ServicoEndereco;
  isSelected: boolean;
  onSelect: () => void;
}

const EnderecoCard = ({ endereco, isSelected, onSelect }: EnderecoCardProps) => (
  <button
    type="button"
    className={cn("w-full p-md border rounded-xs cursor-pointer")}
    onClick={onSelect}
  >
    <div className="flex gap-xs">
      <div className="flex items-center justify-center p-xs">
        {isSelected ? (
          <RadioButtonCheckedIcon className="text-brand-primary-medium" />
        ) : (
          <RadioButtonUncheckedIcon className="text-grayscale-dark" />
        )}
      </div>
      <div className="flex flex-col gap-2xs">
        <div className="flex items-center gap-2xs">
          <Body2>
            {endereco.endereco}, {endereco.numero}
          </Body2>
          {endereco.padrao && <Badge color="neutral">Padrão</Badge>}
        </div>
        <InputCaption>
          {endereco.cep}, {endereco.bairro}, {endereco.cidade}, {endereco.estado}
        </InputCaption>
      </div>
    </div>
  </button>
);

interface NovoEnderecoCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

const NovoEnderecoCard = ({ isSelected, onSelect }: NovoEnderecoCardProps) => {
  const { setValue } = useFormContext<OrdemServicoFormValues>();

  const handleCepChange = async (value: string | number | boolean) => {
    const address = await fetchAddressByCep(String(value));
    if (!address) return;

    setValue("endereco", address.logradouro, { shouldDirty: true });
    setValue("bairro", address.bairro, { shouldDirty: true });
    setValue("cidade", address.localidade, { shouldDirty: true });
    setValue("estado", address.estado, { shouldDirty: true });
  };

  return (
    <div className="w-full p-md border rounded-xs">
      <button
        type="button"
        className="flex items-center w-full cursor-pointer"
        onClick={onSelect}
        aria-pressed={isSelected}
      >
        <div className="flex items-center justify-center gap-sm">
          <div className="flex items-center justify-center p-xs">
            {isSelected ? (
              <RadioButtonCheckedIcon className="text-brand-primary-medium" />
            ) : (
              <RadioButtonUncheckedIcon className="text-grayscale-dark" />
            )}
          </div>
          <Body2 className="text-grayscale-dark">Novo endereço</Body2>
        </div>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-md">
        <FormField name="cep" onChange={handleCepChange}>
          <TextInput label="CEP" placeholder="Ex. 48000-000" formatter={formatCEP} maxLength={9} />
        </FormField>

        <FormField name="estado">
          <TextInput label="Estado" placeholder="Ex. São Paulo" />
        </FormField>

        <FormField name="cidade" className="md:col-span-2">
          <TextInput label="Cidade" placeholder="Ex. Cruz das Almas" />
        </FormField>

        <FormField name="bairro" className="md:col-span-2">
          <TextInput label="Bairro" placeholder="Ex. Centro" />
        </FormField>

        <FormField name="endereco" className="md:col-span-2">
          <TextInput label="Endereço" placeholder="Ex. Rua Leonidio Melo Sacramento" />
        </FormField>

        <FormField name="numero">
          <TextInput label="Número" placeholder="Ex. 123" formatter={formatNumber} />
        </FormField>

        <FormField name="complemento">
          <TextInput label="Complemento" placeholder="Ex. Apto 101" />
        </FormField>
      </div>
    </div>
  );
};
