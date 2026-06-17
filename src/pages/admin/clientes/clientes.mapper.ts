import type { Cliente as ClienteDTO } from "@/model/rest/cliente";
import type { Cliente } from "./types";

// TODO: apagar apos integrar listagem
export const mapClienteDTotoCliente = (dto: ClienteDTO): Cliente => {
  const enderecoPrincipal = dto.enderecos?.[0];

  return {
    id: dto.id ?? "",
    nome: dto.nomeRazaoSocial ?? "",
    cpfCnpj: dto.cnpjCpf ?? "",
    tipoCliente: dto.tipo === "ESPORADICO" ? "esporadico" : "fixo",
    email: dto.email ?? "",
    telefone: dto.telefone ?? "",
    endereco: enderecoPrincipal?.rua ?? "",
    cidade: dto.cidade ?? enderecoPrincipal?.cidade ?? "",
    estado: dto.estado ?? enderecoPrincipal?.estado ?? "",
    cep: enderecoPrincipal?.cep ?? "",
    status: dto.status === "INATIVO" ? "inativo" : "ativo",
    datacadastro: new Date(),
    ultimoServico: dto.dataUltimoServico ? new Date(dto.dataUltimoServico) : undefined,
    observacoes: dto.observacoes,
  };
};
