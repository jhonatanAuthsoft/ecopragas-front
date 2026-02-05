import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Textarea } from "@/atomic/atm.textarea/textarea.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/atomic/mol.dialog/dialog.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/atomic/mol.select/select.component";
import type { Lead } from "@/pages/leads/Leads";
import { cn } from "@/lib/utils";

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
}

export const AddLeadDialog = ({ open, onOpenChange, onAddLead }: AddLeadDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    origin: "" as Lead["origin"],
    value: "",
    status: "" as Lead["status"],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Campo Obrigatório";
    if (!formData.company) newErrors.company = "Campo Obrigatório";
    if (!formData.phone) newErrors.phone = "Campo Obrigatório";
    if (!formData.origin) newErrors.origin = "Campo Obrigatório";
    if (!formData.status) newErrors.status = "Campo Obrigatório";
    if (!formData.value) newErrors.value = "Campo Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAddLead({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      origin: formData.origin,
      value: parseFloat(formData.value) || 0,
      status: formData.status,
      notes: formData.notes || undefined,
    });

    setFormData({
      name: "",
      company: "",
      phone: "",
      origin: "" as any,
      value: "",
      status: "" as any,
      notes: "",
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
             <DialogTitle className="text-2xl font-bold">Adicionar novo lead</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-normal text-grayscale-dark">Nome</Label>
              <div className="relative">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn("pr-10 rounded-lg h-12", errors.name ? "border-feedback-error-medium" : "border-grayscale-light")}
                  placeholder="João Silva"
                />
                {formData.name && (
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, name: "" })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-feedback-error-medium hover:text-feedback-error-dark"
                  >
                    <X className="h-5 w-5 rounded-full border border-current p-0.5" />
                  </button>
                )}
              </div>
              {errors.name && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.name}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-normal text-grayscale-dark">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={cn("rounded-lg h-12", errors.company ? "border-feedback-error-medium" : "border-grayscale-light")}
                placeholder="Ex. Empresa ABC"
              />
              {errors.company && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.company}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-normal text-grayscale-dark">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={cn("rounded-lg h-12", errors.phone ? "border-feedback-error-medium" : "border-grayscale-light")}
                placeholder="Ex. (11) 90076-0010"
              />
              {errors.phone && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.phone}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin" className="text-base font-normal text-grayscale-dark">Origem</Label>
              <Select
                value={formData.origin}
                onValueChange={(value) =>
                  setFormData({ ...formData, origin: value as Lead["origin"] })
                }
              >
                <SelectTrigger id="origin" className={cn("rounded-lg h-12 text-muted-foreground", errors.origin ? "border-feedback-error-medium" : "border-grayscale-light")}>
                  <SelectValue placeholder="Google Ads" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Indicação">Indicação</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.origin && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.origin}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-base font-normal text-grayscale-dark">Status Inicial</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as Lead["status"] })
                }
              >
                <SelectTrigger id="status" className={cn("rounded-lg h-12 text-muted-foreground", errors.status ? "border-feedback-error-medium" : "border-grayscale-light")}>
                  <SelectValue placeholder="Novo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contato">Em Contato</SelectItem>
                  <SelectItem value="proposta">Proposta Enviada</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.status}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="value" className="text-base font-normal text-grayscale-dark">Valor Estimado (R$)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className={cn("rounded-lg h-12", errors.value ? "border-feedback-error-medium" : "border-grayscale-light")}
                placeholder="Ex.2000"
              />
              {errors.value && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.value}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base font-normal text-grayscale-dark">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informações adicionais sobre o lead..."
              className="border-grayscale-light rounded-lg min-h-[100px] resize-none"
            />
          </div>

          <div className="pt-6 flex justify-center">
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-medium h-12 rounded-lg w-full md:w-auto px-12"
            >
              Adicionar Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
