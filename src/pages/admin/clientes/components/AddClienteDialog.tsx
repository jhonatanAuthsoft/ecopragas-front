import { Plus, Trash2, Upload, X, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";

interface AddClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCliente: (cliente: any) => Promise<boolean>;
  initialData?: any;
}

export const AddClienteDialog = ({ open, onOpenChange, onAddCliente, initialData }: AddClienteDialogProps) => {
  const [activeTab, setActiveTab] = useState("dados");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (initialData && open) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData, open]);

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
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFileTypes = (selectedFiles: File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const isValid = selectedFiles.every(file => validTypes.includes(file.type));
    
    if (!isValid) {
      setFileError("Este formato de arquivo não é suportado.");
      return false;
    }
    
    setFileError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      if (validateFileTypes(selectedFiles)) {
        setFiles(selectedFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (validateFileTypes(droppedFiles)) {
        setFiles(droppedFiles);
      }
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

  const validateDados = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome) newErrors.nome = "Campo Obrigatório";
    if (!formData.cpfCnpj) newErrors.cpfCnpj = "Campo Obrigatório";
    if (!formData.tipoCliente) newErrors.tipoCliente = "Campo Obrigatório";
    if (!formData.status) newErrors.status = "Campo Obrigatório";
    if (!formData.email) newErrors.email = "Campo Obrigatório";
    if (!formData.telefone) newErrors.telefone = "Campo Obrigatório";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateEndereco = () => {
    const newErrors: Record<string, string> = {};
    const isAddressEmpty = !formData.cep && !formData.estado && !formData.cidade && !formData.bairro && !formData.endereco && !formData.numero && !formData.complemento;
    
    if (enderecos.length === 0 || !isAddressEmpty) {
      if (!formData.cep) newErrors.cep = "Campo Obrigatório";
      if (!formData.estado) newErrors.estado = "Campo Obrigatório";
      if (!formData.cidade) newErrors.cidade = "Campo Obrigatório";
      if (!formData.bairro) newErrors.bairro = "Campo Obrigatório";
      if (!formData.endereco) newErrors.endereco = "Campo Obrigatório";
      if (!formData.numero) newErrors.numero = "Campo Obrigatório";
      if (!formData.complemento) newErrors.complemento = "Campo Obrigatório";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNextDados = () => {
    setErrors({});
    if (validateDados()) {
      setActiveTab("endereco");
    }
  };

  const handleNextEndereco = () => {
    // Limpa erros anteriores de endereço
    const currentErrors = { ...errors };
    Object.keys(currentErrors).forEach(key => {
        if (['cep', 'estado', 'cidade', 'bairro', 'endereco', 'numero', 'complemento'].includes(key)) {
            delete currentErrors[key];
        }
    });
    setErrors(currentErrors);

    if (validateEndereco()) {
      setActiveTab("documentacao");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});
    const isDadosValid = validateDados();
    const isEnderecoValid = validateEndereco();

    if (!isDadosValid) {
        setActiveTab("dados");
        return;
    }
    if (!isEnderecoValid) {
        setActiveTab("endereco");
        return;
    }
    
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
      setFileError(null);
      setActiveTab("dados");
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      className={cn("pr-10 rounded-lg h-12", errors.nome ? "border-feedback-error-medium" : "border-grayscale-light")}
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
                  {errors.nome && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.nome}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj" className="text-base font-normal text-grayscale-dark">CPF/CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: formatCPFCNPJ(e.target.value) })}
                    className={cn("rounded-lg h-12", errors.cpfCnpj ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="EX. 123.456.789/0001"
                    maxLength={18}
                  />
                  {errors.cpfCnpj && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.cpfCnpj}</span>}
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
                    <SelectTrigger id="tipoCliente" className={cn("rounded-lg h-12 text-muted-foreground", errors.tipoCliente ? "border-feedback-error-medium" : "border-grayscale-light")}>
                      <SelectValue placeholder="Selecione o tipo de cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixo">Fixo</SelectItem>
                      <SelectItem value="recorrente">Recorrente</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipoCliente && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.tipoCliente}</span>}
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
                    <SelectTrigger id="status" className={cn("rounded-lg h-12 text-muted-foreground", errors.status ? "border-feedback-error-medium" : "border-grayscale-light")}>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.status}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-normal text-grayscale-dark">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn("rounded-lg h-12", errors.email ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="Ex. contato@empresa.com"
                  />
                  {errors.email && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.email}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-base font-normal text-grayscale-dark">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                    className={cn("rounded-lg h-12", errors.telefone ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="Ex.(11) 987765-4321"
                    maxLength={15}
                  />
                  {errors.telefone && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.telefone}</span>}
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
                  onClick={handleNextDados}
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
                    className={cn("rounded-lg h-12", errors.cep ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="Ex.48000-000"
                    maxLength={9}
                  />
                  {errors.cep && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.cep}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-base font-normal text-grayscale-dark">Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value })}
                  >
                    <SelectTrigger id="estado" className={cn("rounded-lg h-12 text-muted-foreground", errors.estado ? "border-feedback-error-medium" : "border-grayscale-light")}>
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
                  {errors.estado && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.estado}</span>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cidade" className="text-base font-normal text-grayscale-dark">Cidade</Label>
                  <Input
                     id="cidade"
                     value={formData.cidade}
                     onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                     className={cn("rounded-lg h-12", errors.cidade ? "border-feedback-error-medium" : "border-grayscale-light")}
                     placeholder="Ex. Cruz das Almas"
                  />
                  {errors.cidade && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.cidade}</span>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bairro" className="text-base font-normal text-grayscale-dark">Bairro</Label>
                  <Input
                     id="bairro"
                     value={formData.bairro}
                     onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                     className={cn("rounded-lg h-12", errors.bairro ? "border-feedback-error-medium" : "border-grayscale-light")}
                     placeholder="Ex. Centro"
                  />
                  {errors.bairro && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.bairro}</span>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco" className="text-base font-normal text-grayscale-dark">Endereço</Label>
                  <div className="relative">
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      className={cn("pr-10 rounded-lg h-12", errors.endereco ? "border-feedback-error-medium" : "border-brand-primary-medium border-2")}
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
                  {errors.endereco && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.endereco}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-base font-normal text-grayscale-dark">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className={cn("rounded-lg h-12", errors.numero ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="Ex. 123"
                  />
                  {errors.numero && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.numero}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento" className="text-base font-normal text-grayscale-dark">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    className={cn("rounded-lg h-12", errors.complemento ? "border-feedback-error-medium" : "border-grayscale-light")}
                    placeholder="Ex. Apto 101"
                  />
                  {errors.complemento && <span className="text-xs text-feedback-error-dark mt-1 block">× {errors.complemento}</span>}
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
                  type="button" 
                  className="bg-brand-primary-medium hover:bg-brand-primary-dark text-white font-medium h-12 rounded-lg"
                  onClick={handleNextEndereco}
                >
                  Avançar
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documentacao" className="space-y-6">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors",
                  fileError ? "border-feedback-error-medium" : "border-grayscale-light"
                )}
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

              {fileError && (
                <div className="bg-feedback-error-light border border-feedback-error-light rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-feedback-error-medium" />
                    <span className="text-sm font-medium text-feedback-error-dark">{fileError}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFileError(null)}
                    className="text-feedback-error-dark hover:text-feedback-error-medium"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

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
