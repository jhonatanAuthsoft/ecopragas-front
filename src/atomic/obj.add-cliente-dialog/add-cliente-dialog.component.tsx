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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import type { Cliente } from "@/pages/Clientes";

interface AddClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCliente: (cliente: Omit<Cliente, "id" | "datacadastro">) => void;
}

export const AddClienteDialog = ({ open, onOpenChange, onAddCliente }: AddClienteDialogProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpfCnpj: "",
    tipoCliente: "fixo" as Cliente["tipoCliente"],
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "SP",
    cep: "",
    status: "ativo" as Cliente["status"],
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCliente({
      ...formData,
      observacoes: formData.observacoes || undefined,
    });

    // Reset form
    setFormData({
      nome: "",
      cpfCnpj: "",
      tipoCliente: "fixo",
      email: "",
      telefone: "",
      endereco: "",
      cidade: "",
      estado: "SP",
      cep: "",
      status: "ativo",
      observacoes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente. Os campos marcados com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="dados" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dados">Dados Básicos</TabsTrigger>
              <TabsTrigger value="endereco">Endereço</TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome / Razão Social *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    placeholder="Restaurante ABC ou João Silva"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF / CNPJ *</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    required
                    placeholder="123.456.789-00 ou 12.345.678/0001-90"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
                  <Select
                    value={formData.tipoCliente}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tipoCliente: value as Cliente["tipoCliente"],
                      })
                    }
                  >
                    <SelectTrigger id="tipoCliente">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixo">Fixo (Contrato Recorrente)</SelectItem>
                      <SelectItem value="esporadico">Esporádico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Cliente["status"],
                      })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="contato@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    placeholder="(11) 98765-4321"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre o cliente..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="endereco" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    required
                    placeholder="Rua das Flores, 123 - Sala 45"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    required
                    placeholder="São Paulo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value })}
                  >
                    <SelectTrigger id="estado">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    required
                    placeholder="01234-567"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-6 mt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Cliente</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
