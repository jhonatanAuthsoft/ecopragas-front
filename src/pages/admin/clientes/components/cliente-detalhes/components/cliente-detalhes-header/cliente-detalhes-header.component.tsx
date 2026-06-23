import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { ROUTES } from "@/constants/routes";

export const ClienteDetalhesHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="link"
        className="self-start hover:no-underline"
        onClick={() => navigate(ROUTES.ADMIN.CLIENT.BASE)}
        leftIcon={<ChevronLeft className="size-md" />}
      >
        Voltar para Clientes
      </Button>

      <div className="flex flex-col self-start gap-xs">
        <H1>Perfil do Cliente</H1>
        <Body1 className="font-normal text-grayscale-dark">
          Visualize informações sobre o cliente
        </Body1>
      </div>
    </>
  );
};
