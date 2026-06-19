import { useParams } from "react-router-dom";
import { LoadingState } from "@/atomic/obj.loading-state";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { useGetCliente } from "@/domain/cliente";
import {
  ClienteDetalhesContent,
  ClienteDetalhesError,
  ClienteDetalhesHeader,
  ClienteDetalhesSkeleton,
} from "./components/cliente-detalhes";

const ClienteDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { cliente, getClienteError, isGetClienteLoading, refetchCliente } = useGetCliente({ id });

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <ClienteDetalhesHeader />

        <LoadingState loading={isGetClienteLoading} error={!!getClienteError} data={!!cliente}>
          <LoadingState.Shimmer>
            <ClienteDetalhesSkeleton />
          </LoadingState.Shimmer>

          <LoadingState.Error>
            <ClienteDetalhesError />
          </LoadingState.Error>

          {cliente && (
            <ClienteDetalhesContent cliente={cliente} onClienteUpdated={refetchCliente} />
          )}
        </LoadingState>
      </div>
    </MainLayout>
  );
};

export default ClienteDetalhes;
