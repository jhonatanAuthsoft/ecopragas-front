import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { cleanDigits, formatCPFCNPJ } from "@/utils/formatters";
import { DEFAULT_VALUES } from "./tecnico-form-dialog.data";

export const mapTecnicoToFormValues = (tecnico: Tecnico): CadastrarTecnicoInput => ({
  nome: tecnico.nome ?? "",
  email: tecnico.email ?? "",
  cpf: formatCPFCNPJ(tecnico.cpf ?? ""),
  fotoUrl: tecnico.fotoUrl ?? "",
});

export const getTecnicoFormDefaultValues = (tecnico: Tecnico | null): CadastrarTecnicoInput =>
  tecnico ? mapTecnicoToFormValues(tecnico) : DEFAULT_VALUES;

export const sanitizeTecnicoInput = (values: CadastrarTecnicoInput): CadastrarTecnicoInput => ({
  ...values,
  cpf: values.cpf ? cleanDigits(values.cpf) : values.cpf,
});
