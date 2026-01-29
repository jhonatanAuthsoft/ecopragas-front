import { Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Textarea } from "@/atomic/atm.textarea/textarea.component";
import {
  Dialog,
  DialogContent,
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
import { Cliente } from "../types";
import { formatCEP, formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface AddClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCliente: (cliente: any) => Promise<boolean>;
}

export const AddClienteDialog = ({ open, onOpenChange, onAddCliente }: AddClienteDialogProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpfCnpj: "",
    tipoCliente: "" as Cliente["tipoCliente"],
    email: "",
    telefone: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
    status: "" as Cliente["status"],
    observacoes: "",
    salvarEnderecoPadrao: false,
  });

  const [enderecos, setEnderecos] = useState<Array<{
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: string;
    complemento: string;
    padrao: boolean;
  }>>([]);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handleAddEndereco = () => {
    if (!formData.cep || !formData.endereco || !formData.numero) return;

    setEnderecos([
      ...enderecos,
      {
        cep: formData.cep,
        estado: formData.estado,
        cidade: formData.cidade,
        bairro: formData.bairro,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        padrao: formData.salvarEnderecoPadrao,
      },
    ]);

    setFormData((prev) => ({
      ...prev,
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      endereco: "",
      numero: "",
      complemento: "",
      salvarEnderecoPadrao: false,
    }));
  };

  const handleRemoveEndereco = (index: number) => {
    setEnderecos(enderecos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payloadEnderecos = [];
    
    if (enderecos.length > 0) {
      enderecos.forEach(addr => {
        payloadEnderecos.push({
          rua: addr.endereco,
          numero: addr.numero,
          complemento: addr.complemento,
          endereco: addr.bairro,
          cidade: addr.cidade,
          estado: addr.estado,
          cep: addr.cep.replace(/\D/g, ""),
          principal: addr.padrao
        });
      });
    }

    const hasCurrentAddress = formData.cep && formData.endereco && formData.numero;
    if (hasCurrentAddress) {
       if (enderecos.length === 0) {
          payloadEnderecos.push({
            rua: formData.endereco,
            numero: formData.numero,
            complemento: formData.complemento,
            endereco: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep.replace(/\D/g, ""),
            principal: formData.salvarEnderecoPadrao
          });
       }
    }
    
    const filePromises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    });

    const base64Files = await Promise.all(filePromises);

    const payload = {
      dados: {
        nome: formData.nome,
        email: formData.email,
        cpfCnpj: formData.cpfCnpj.replace(/\D/g, ""),
        telefone: formData.telefone.replace(/\D/g, ""),
        tipoCliente: formData.tipoCliente ? formData.tipoCliente.toUpperCase() : "FIXO",
        observacoes: formData.observacoes || "",
        status: (formData.status || "ativo").toUpperCase(),
        enderecos: payloadEnderecos
      },
      arquivos: base64Files
    };

    const success = await onAddCliente(payload);

    if (success) {
      setFormData({
        nome: "",
        cpfCnpj: "",
        tipoCliente: "" as any,
        email: "",
        telefone: "",
        endereco: "",
        bairro: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        cep: "",
        status: "" as any,
        observacoes: "",
        salvarEnderecoPadrao: false,
      });
      setEnderecos([]);
      setFiles([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Cadastrar novo cliente</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="dados" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger 
                value="dados" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium pb-2 bg-transparent data-[state=active]:bg-transparent shadow-none"
              >
                Dados básicos
              </TabsTrigger>
              <TabsTrigger 
                value="endereco" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium pb-2 bg-transparent data-[state=active]:bg-transparent shadow-none"
              >
                Endereço do cliente
              </TabsTrigger>
              <TabsTrigger 
                value="documentacao" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary-medium data-[state=active]:text-brand-primary-medium pb-2 bg-transparent data-[state=active]:bg-transparent shadow-none"
              >
                Documentação
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-base font-normal text-grayscale-dark">Nome/ Razão Social</Label>
                  <div className="relative">
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="pr-10 border-grayscale-light rounded-lg h-12"
                      placeholder="João Silva"
                    />
                    {formData.nome && (
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, nome: "" })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-feedback-error-medium hover:text-feedback-error-dark"
                      >
                        <X className="h-5 w-5 rounded-full border border-current p-0.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj" className="text-base font-normal text-grayscale-dark">CPF/CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: formatCPFCNPJ(e.target.value) })}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="EX. 123.456.789/0001"
                    maxLength={18}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoCliente" className="text-base font-normal text-grayscale-dark">Tipo de cliente</Label>
                  <Select
                    value={formData.tipoCliente}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tipoCliente: value as Cliente["tipoCliente"],
                      })
                    }
                  >
                    <SelectTrigger id="tipoCliente" className="border-grayscale-light rounded-lg h-12 text-muted-foreground">
                      <SelectValue placeholder="Selecione o tipo de cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixo">Fixo</SelectItem>
                      <SelectItem value="recorrente">Recorrente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-base font-normal text-grayscale-dark">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Cliente["status"],
                      })
                    }
                  >
                    <SelectTrigger id="status" className="border-grayscale-light rounded-lg h-12 text-muted-foreground">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-normal text-grayscale-dark">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="Ex. contato@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-base font-normal text-grayscale-dark">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="Ex.(11) 987765-4321"
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes" className="text-base font-normal text-grayscale-dark">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre o cliente"
                  className="border-grayscale-light rounded-lg min-h-[100px] resize-none"
                />
              </div>
              
              <div className="pt-4 flex justify-center">
                <Button 
                  type="button" 
                  className="bg-brand-primary-medium hover:bg-brand-primary-dark text-white font-medium h-12 rounded-lg"
                  onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const enderecoTab = tabs?.querySelector('[data-state="inactive"][value="endereco"]') as HTMLElement;
                    enderecoTab?.click();
                  }}
                >
                  Avançar
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="endereco" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-base font-normal text-grayscale-dark">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
                    onBlur={handleCepBlur}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="Ex.48000-000"
                    maxLength={9}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-base font-normal text-grayscale-dark">Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value })}
                  >
                    <SelectTrigger id="estado" className="border-grayscale-light rounded-lg h-12 text-muted-foreground">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cidade" className="text-base font-normal text-grayscale-dark">Cidade</Label>
                  <Input
                     id="cidade"
                     value={formData.cidade}
                     onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                     className="border-grayscale-light rounded-lg h-12"
                     placeholder="Ex. Cruz das Almas"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bairro" className="text-base font-normal text-grayscale-dark">Bairro</Label>
                  <Input
                     id="bairro"
                     value={formData.bairro}
                     onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                     className="border-grayscale-light rounded-lg h-12"
                     placeholder="Ex. Centro"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco" className="text-base font-normal text-grayscale-dark">Endereço</Label>
                  <div className="relative">
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      className="pr-10 border-brand-primary-medium rounded-lg h-12 border-2"
                      placeholder="Rua Leonidio Melo Sacramento"
                    />
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, endereco: "" })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary-medium"
                    >
                      <X className="h-5 w-5 rounded-full border border-current p-0.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-base font-normal text-grayscale-dark">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="Ex. 123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento" className="text-base font-normal text-grayscale-dark">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    className="border-grayscale-light rounded-lg h-12"
                    placeholder="Ex. Apto 101"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="padrao" 
                  checked={formData.salvarEnderecoPadrao}
                  onCheckedChange={(checked) => setFormData({ ...formData, salvarEnderecoPadrao: checked as boolean })}
                  className="data-[state=checked]:bg-brand-primary-medium border-grayscale-medium"
                />
                <label
                  htmlFor="padrao"
                  className="text-sm font-normal text-grayscale-dark leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Salvar endereço como padrão
                </label>
              </div>

              <div className="pt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-brand-primary-medium hover:text-brand-primary-dark hover:bg-transparent p-0 h-auto font-medium flex items-center gap-2"
                  onClick={handleAddEndereco}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar outro endereço
                </Button>
              </div>

              {enderecos.map((addr, index) => (
                <div key={index} className="border border-grayscale-light rounded-lg p-4 flex justify-between items-start mt-4">
                  <div>
                    <p className="font-medium text-grayscale-dark">{addr.endereco}, {addr.numero}{addr.complemento ? ` - ${addr.complemento}` : ""}</p>
                    <p className="text-sm text-grayscale-medium">{addr.bairro}, {addr.cidade} - {addr.estado}, {addr.cep}</p>
                    {addr.padrao && <p className="text-xs text-brand-primary-medium font-medium mt-1">Padrão</p>}
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-feedback-error-medium hover:text-feedback-error-dark hover:bg-transparent p-0 h-auto"
                    onClick={() => handleRemoveEndereco(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}

              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-brand-primary-medium hover:bg-brand-primary-dark text-white font-medium h-12 rounded-lg"
                >
                  Cadastrar cliente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documentacao" className="space-y-6">
              <div 
                className="border-2 border-dashed border-grayscale-light rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,application/pdf"
                />
                <div className="bg-pink-50 p-2 rounded-full mb-4">
                  <Upload className="h-6 w-6 text-pink-500" />
                </div>
                <p className="text-grayscale-dark font-medium mb-1">Arraste e solte arquivos, ou <span className="text-brand-secondary-medium cursor-pointer">Browse</span></p>
                <p className="text-sm text-grayscale-medium">Accepted formats: JPEG, PNG, of PDF</p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-grayscale-dark">Arquivos selecionados:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between border border-grayscale-light rounded-lg p-3">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="bg-gray-100 p-2 rounded">
                           <Upload className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-grayscale-dark truncate max-w-[200px]">{file.name}</p>
                          <p className="text-xs text-grayscale-medium">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="text-feedback-error-medium hover:text-feedback-error-dark p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-brand-primary-medium hover:bg-brand-primary-dark text-white font-medium h-12 rounded-lg"
                >
                  Cadastrar cliente
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
};
