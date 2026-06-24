import { useMemo, useState } from "react";
import { Body1, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useGetDashboardMetricas, useGetDashboardVisaoGeral } from "@/domain/dashboard";
import { RelatoriosCharts } from "./components/RelatoriosCharts";
import { RelatoriosMetrics } from "./components/RelatoriosMetrics";
import {
  buildRelatoriosMetrics,
  mapFaturamentoMensal,
  mapServicosPorMes,
  mapStatusOS,
  mapTiposServico,
} from "./relatorios.utils";

interface DateRange {
  start: Date;
  end: Date;
}

const Relatorios = () => {
  const [dateFilter, setDateFilter] = useState<Date | DateRange | undefined>(undefined);

  // TODO: mapear dateFilter para params quando o back suportar filtro de periodo
  const { visaoGeral, visaoGeralError, isVisaoGeralLoading } = useGetDashboardVisaoGeral();
  const { metricas, metricasError, isMetricasLoading } = useGetDashboardMetricas();

  const metrics = useMemo(() => buildRelatoriosMetrics(visaoGeral), [visaoGeral]);
  const servicosPorMes = useMemo(() => mapServicosPorMes(metricas), [metricas]);
  const faturamentoMensal = useMemo(() => mapFaturamentoMensal(metricas), [metricas]);
  const tiposServico = useMemo(() => mapTiposServico(metricas), [metricas]);
  const statusOS = useMemo(() => mapStatusOS(metricas), [metricas]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col">
          <div className="flex flex-col gap-xs">
            <H1>Relatórios e Gráficos</H1>
            <Body1 className="font-normal text-grayscale-dark">
              Visualize o desempenho e métricas do seu negócio
            </Body1>
          </div>

          <CalendarDropdown
            className="self-end"
            value={dateFilter}
            onChange={(val) =>
              setDateFilter(
                val instanceof Date
                  ? val
                  : val.start
                    ? { start: val.start as Date, end: val.end as Date }
                    : undefined,
              )
            }
            maxDate={new Date()}
            label="Selecione o período"
          />
        </div>

        <RelatoriosMetrics
          metrics={metrics}
          isLoading={isVisaoGeralLoading}
          hasError={!!visaoGeralError}
          hasData={!!visaoGeral}
        />

        <RelatoriosCharts
          servicosPorMes={servicosPorMes}
          faturamentoMensal={faturamentoMensal}
          tiposServico={tiposServico}
          statusOS={statusOS}
          isLoading={isMetricasLoading}
          hasError={!!metricasError}
          hasData={!!metricas}
        />
      </div>
    </MainLayout>
  );
};

export default Relatorios;
