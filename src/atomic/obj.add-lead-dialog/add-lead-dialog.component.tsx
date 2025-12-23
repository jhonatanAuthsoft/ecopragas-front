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
import type { Lead } from "@/pages/Leads";

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
}

export const AddLeadDialog = ({ open, onOpenChange, onAddLead }: AddLeadDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    origin: "Google" as Lead["origin"],
    value: "",
    status: "novo" as Lead["status"],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddLead({
      name: formData.name,
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone,
      origin: formData.origin,
      value: parseFloat(formData.value) || 0,
      status: formData.status,
      notes: formData.notes || undefined,
    });

    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      origin: "Google",
      value: "",
      status: "novo",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
          <DialogDescription>
            Preencha os dados do lead. Os campos marcados com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Empresa ABC Ltda"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="joao@empresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="(11) 98765-4321"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origem *</Label>
              <Select
                value={formData.origin}
                onValueChange={(value) =>
                  setFormData({ ...formData, origin: value as Lead["origin"] })
                }
              >
                <SelectTrigger id="origin">
                  <SelectValue />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Valor Estimado (R$) *</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                placeholder="1500.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status Inicial *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as Lead["status"] })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contato">Em Contato</SelectItem>
                  <SelectItem value="proposta">Proposta Enviada</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informações adicionais sobre o lead..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Lead</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
