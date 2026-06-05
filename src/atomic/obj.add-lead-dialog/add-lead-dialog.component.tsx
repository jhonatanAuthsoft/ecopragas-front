import { useForm } from "react-hook-form";
import { Button } from "@/atomic/atm.button/button.component";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { TextareaInput } from "@/atomic/atm.textarea-input";
import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import { Form, FormField, PhoneValidator, RequiredValidator } from "@/atomic/obj.form";
import type { Lead } from "@/pages/leads/leads.types";
import { cleanDigits, formatCurrency, formatPhone } from "@/utils/formatters";
import { DEFAULT_VALUES, ORIGIN_OPTIONS, STATUS_OPTIONS } from "./add-lead-dialog.data";

export type AddLeadFormValues = {
  name: string;
  company: string;
  phone: string;
  origin: Lead["origin"] | "";
  value: string;
  status: Lead["status"] | "";
  notes: string;
};

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Omit<Lead, "id" | "createdAt">) => Promise<void> | void;
}

export const AddLeadDialog = (props: AddLeadDialogProps) => {
  const formMethods = useForm<AddLeadFormValues>();
  const { isSubmitting } = formMethods.formState;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formMethods.reset(DEFAULT_VALUES);
    }
    props.onOpenChange(nextOpen);
  };

  const handleSubmit = async (data: AddLeadFormValues) => {
    await props.onAddLead({
      name: data.name,
      company: data.company,
      phone: data.phone,
      origin: data.origin as Lead["origin"],
      value: Number(cleanDigits(data.value)) / 100 || 0,
      status: data.status as Lead["status"],
      notes: data.notes || undefined,
    });

    formMethods.reset(DEFAULT_VALUES);
  };

  return (
    <Dialog open={props.open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <H2>Adicionar novo lead</H2>
          </div>
        </DialogHeader>

        <Form formMethods={formMethods} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="name" validators={[RequiredValidator()]}>
              <TextInput label="Nome" placeholder="Ex. João Silva" hasClearButton />
            </FormField>

            <FormField name="company" validators={[RequiredValidator()]}>
              <TextInput label="Empresa" placeholder="Ex. Empresa ABC" />
            </FormField>

            <FormField name="phone" validators={[RequiredValidator(), PhoneValidator()]}>
              <TextInput
                label="Telefone"
                placeholder="Ex. (11) 90076-0010"
                formatter={formatPhone}
                maxLength={15}
              />
            </FormField>

            <FormField name="origin" validators={[RequiredValidator()]}>
              <SelectInput label="Origem" placeholder="Ex. Google Ads" options={ORIGIN_OPTIONS} />
            </FormField>

            <FormField name="status" validators={[RequiredValidator()]}>
              <SelectInput label="Status Inicial" placeholder="Ex. Novo" options={STATUS_OPTIONS} />
            </FormField>

            <FormField name="value" validators={[RequiredValidator()]}>
              <TextInput
                label="Valor Estimado (R$)"
                placeholder="Ex. 2.000,00"
                formatter={formatCurrency}
              />
            </FormField>
          </div>

          <FormField name="notes">
            <TextareaInput
              label="Observações"
              placeholder="Informacoes adicionais sobre o lead..."
            />
          </FormField>

          <div className="pt-6 flex justify-center">
            <Button type="submit" className="h-11 w-full md:w-[400px]" disabled={isSubmitting}>
              {isSubmitting ? "Adicionando..." : "Adicionar Lead"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
