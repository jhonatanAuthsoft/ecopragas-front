import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { ErrorPlaceholder } from "@/atomic/org.error-placeholder";
import { ROUTES } from "@/constants/routes";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-2xl items-center justify-center min-h-screen bg-background">
      <ErrorPlaceholder defaultPlaceholder={404} />
      <Link to={ROUTES.HOME}>
        <Button variant="tertiary">Voltar para a página inicial</Button>
      </Link>
    </div>
  );
};

export default NotFound;
