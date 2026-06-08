import type { Cliente } from "../../types";

export type ClienteDialogTab = "dados" | "endereco" | "documentacao";

export type ClienteTipoForm = "fixo" | "recorrente";

export type ClienteFormValues = {
  nome: string;
  cpfCnpj: string;
  tipoCliente: ClienteTipoForm | "";
  email: string;
  telefone: string;
  endereco: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  status: Cliente["status"] | "";
  observacoes: string;
  salvarEnderecoPadrao: boolean;
};

export type ClienteEndereco = {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  padrao: boolean;
};

export type ClienteEnderecoPayload = {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
};

export type AddClientePayload = {
  dados: {
    nome: string;
    email: string;
    cpfCnpj: string;
    telefone: string;
    tipoCliente: string;
    observacoes: string;
    status: string;
    enderecos: ClienteEnderecoPayload[];
  };
  arquivos: string[];
};

export type InitialClienteData = Partial<
  Pick<ClienteFormValues, "nome" | "email" | "telefone" | "observacoes">
>;

export interface AddClienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCliente: (payload: AddClientePayload) => Promise<boolean>;
  initialData?: InitialClienteData | null;
}

export type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};
