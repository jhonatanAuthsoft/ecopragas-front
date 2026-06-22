import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TextareaInput } from "@/atomic/atm.textarea-input";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Form, FormField, PhoneValidator, RequiredValidator } from "@/atomic/obj.form";
import { useCreateLead } from "@/domain/lead";
import type { CadastrarLeadRequest } from "@/model/rest/lead";
import { formatCurrency, formatPhone } from "@/utils/formatters";
import { DEFAULT_VALUES, ORIGIN_OPTIONS, STATUS_OPTIONS } from "./add-lead-dialog.data";
import { buildCadastrarLeadInput } from "./add-lead-dialog.utils";

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddLeadDialog = ({ open, onOpenChange }: AddLeadDialogProps) => {
  const { createLead, isCreateLeadLoading } = useCreateLead({
    onSuccess: () => {
      toast.success("Lead criado com sucesso!");
      formMethods.reset(DEFAULT_VALUES);
      onOpenChange(false);
    },
  });

  const formMethods = useForm<CadastrarLeadRequest>({
    defaultValues: DEFAULT_VALUES,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formMethods.reset(DEFAULT_VALUES);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (data: CadastrarLeadRequest) => {
    createLead(buildCadastrarLeadInput(data));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <H2>Adicionar novo lead</H2>
          </div>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="nome" validators={[RequiredValidator()]}>
              <TextInput label="Nome" placeholder="Ex. Joao Silva" />
            </FormField>

            <FormField name="empresa" validators={[RequiredValidator()]}>
              <TextInput label="Empresa" placeholder="Ex. Empresa ABC" />
            </FormField>

            <FormField name="telefone" validators={[RequiredValidator(), PhoneValidator()]}>
              <TextInput
                label="Telefone"
                placeholder="Ex. (11) 90076-0010"
                formatter={formatPhone}
                maxLength={15}
              />
            </FormField>

            <FormField name="origem" validators={[RequiredValidator()]}>
              <SelectInput label="Origem" placeholder="Ex. Google Ads" options={ORIGIN_OPTIONS} />
            </FormField>

            <FormField name="status" validators={[RequiredValidator()]}>
              <SelectInput label="Status Inicial" placeholder="Ex. Novo" options={STATUS_OPTIONS} />
            </FormField>

            <FormField name="valorEstimado" validators={[RequiredValidator()]}>
              <TextInput
                label="Valor Estimado (R$)"
                placeholder="Ex. 2.000,00"
                formatter={formatCurrency}
              />
            </FormField>
          </div>

          <FormField name="observacoes">
            <TextareaInput
              label="Observacoes"
              placeholder="Informacoes adicionais sobre o lead..."
            />
          </FormField>

          <div className="pt-6 flex justify-center">
            <Button
              type="submit"
              className="h-11 w-full md:w-[400px]"
              disabled={isCreateLeadLoading}
            >
              {isCreateLeadLoading ? "Adicionando..." : "Adicionar Lead"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
