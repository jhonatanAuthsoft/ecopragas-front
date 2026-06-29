import { endOfDay, format, formatISO, parse, set, startOfDay } from "date-fns";
import type { AgendaWeeklyItem } from "@/atomic/org.agenda-weekly";
import type { Agendamento, ListAgendamentosParams, TecnicoResumo } from "@/model/rest/agendamento";
import { formatTipoServico } from "@/utils/formatters";
import { formatEndereco } from "./components/agendamento-detalhes/agendamento-detalhes.utils";

// TODO: possivelmente excluir apos integrar listagem
export interface AdminAgendaWeeklyItem extends AgendaWeeklyItem {
  clienteNome: string;
  endereco: string;
  status?: Agendamento["status"];
  recorrencia?: Agendamento["recorrencia"];
}

export const buildListAgendamentosParams = (
  weekDays: Date[],
  filtroTecnico?: string,
): ListAgendamentosParams => {
  const start = weekDays[0];
  const end = weekDays[weekDays.length - 1];
  const tecnicos = filtroTecnico
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    // TODO: ver estrategia para melhorar listagem
    limit: 200,
    dataInicio: formatISO(startOfDay(start)),
    dataFim: formatISO(endOfDay(end)),
    tecnico: tecnicos?.length ? tecnicos : undefined,
  };
};

export const formatDateHour = (date: Date, hour: string): string => {
  const parsedHour = parse(hour, "HH:mm", new Date());
  const dateTime = set(date, {
    hours: parsedHour.getHours(),
    minutes: parsedHour.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });

  return format(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
};

export const formatTecnicosLabel = (tecnicos?: TecnicoResumo[]): string => {
  if (!tecnicos?.length) return "-";

  const nomes = tecnicos.map((tecnico) => tecnico.nome).filter(Boolean);
  return nomes.length > 0 ? nomes.join(", ") : "-";
};

export const getTecnicosNomes = (agendamento: Pick<Agendamento, "tecnicos">): string[] => {
  return agendamento.tecnicos?.map((tecnico) => tecnico.nome ?? "").filter(Boolean) ?? [];
};

// TODO: ver possibilidade de não precisar mapear
export const mapAgendamentoToAgendaWeeklyItem = (
  agendamento: Agendamento,
): AdminAgendaWeeklyItem | null => {
  if (!agendamento.id || !agendamento.dataHoraServico) {
    return null;
  }

  const dataObj = new Date(agendamento.dataHoraServico);

  if (Number.isNaN(dataObj.getTime())) {
    return null;
  }

  const tecnicosNomes = getTecnicosNomes(agendamento);

  return {
    id: agendamento.id,
    tipoServico: formatTipoServico(agendamento.tipoServico),
    horario: format(dataObj, "HH:mm"),
    data: dataObj,
    tecnico: tecnicosNomes[0] ?? "",
    tecnicos: tecnicosNomes.length > 0 ? tecnicosNomes : undefined,
    clienteNome: agendamento.clienteNome ?? "",
    endereco: formatEndereco(agendamento),
    status: agendamento.status,
    recorrencia: agendamento.recorrencia,
  };
};
