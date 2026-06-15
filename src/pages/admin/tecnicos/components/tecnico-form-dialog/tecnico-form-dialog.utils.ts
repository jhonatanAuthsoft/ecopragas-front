import type { Tecnico, UpdateTecnicoDTO } from "@/model/rest/tecnico";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { DEFAULT_VALUES } from "./tecnico-form-dialog.data";
import type { TecnicoFormValues } from "./tecnico-form-dialog.types";

export const mapTecnicoToFormValues = (tecnico: Tecnico): TecnicoFormValues => ({
  nome: tecnico.nome,
  email: tecnico.email,
  cpfCnpj: formatCPFCNPJ(tecnico.cpfCnpj),
  telefone: tecnico.telefone ? formatPhone(tecnico.telefone) : "",
  foto: tecnico.foto || "",
});

export const getTecnicoFormDefaultValues = (tecnico: Tecnico | null): TecnicoFormValues =>
  tecnico ? mapTecnicoToFormValues(tecnico) : DEFAULT_VALUES;

export const buildTecnicoPayload = (values: TecnicoFormValues): UpdateTecnicoDTO => ({
  nome: values.nome,
  email: values.email,
  cpf: values.cpfCnpj.replace(/\D/g, ""),
  foto: values.foto,
  telefone: values.telefone.replace(/\D/g, ""),
});
