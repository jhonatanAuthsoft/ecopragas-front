import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { cleanDigits, formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { DEFAULT_VALUES } from "./tecnico-form-dialog.data";

export const mapTecnicoToFormValues = (tecnico: Tecnico): CadastrarTecnicoInput => ({
  nome: tecnico.nome ?? "",
  email: tecnico.email ?? "",
  cpf: formatCPFCNPJ(tecnico.cpf ?? ""),
  contato: tecnico.contato ? formatPhone(tecnico.contato) : "",
  fotoUrl: tecnico.fotoUrl ?? "",
});

export const getTecnicoFormDefaultValues = (tecnico: Tecnico | null): CadastrarTecnicoInput =>
  tecnico ? mapTecnicoToFormValues(tecnico) : DEFAULT_VALUES;

export const sanitizeTecnicoInput = (values: CadastrarTecnicoInput): CadastrarTecnicoInput => ({
  ...values,
  cpf: values.cpf ? cleanDigits(values.cpf) : values.cpf,
  contato: values.contato ? cleanDigits(values.contato) : values.contato,
});
