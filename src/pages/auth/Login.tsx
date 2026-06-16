import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useLogin } from "@/domain/auth";
import { useToast } from "@/hooks/use-toast";
import { type AuthUser, useAuthStore } from "@/store/auth";
import { buildLoginRequest, LoginForm, type LoginFormValues } from "./components/login-form";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = useAuthStore((s) => s.token);
  const setSession = useAuthStore((s) => s.setSession);

  const { login, isLoginLoading } = useLogin({
    onSuccess: (data) => {
      setSession(data.token, data.usuarioResponse as AuthUser);
      toast({
        title: "Login realizado com sucesso",
        variant: "default",
        className:
          "bg-feedback-success-light border-feedback-success-medium text-feedback-success-dark",
      });
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      toast({
        title: "Erro ao fazer login",
        description:
          error.response?.data?.message ??
          error.response?.data?.detail ??
          "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!token) return;
    navigate(ROUTES.HOME);
  }, [navigate, token]);

  const handleSubmit = (values: LoginFormValues) => {
    login(buildLoginRequest(values));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grayscale-x-light p-6">
      <div className="flex w-full overflow-hidden rounded-2xl justify-center gap-lg lg:grid-cols-[1fr_1.15fr]">
        <div className="flex w-full max-w-[820px] items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-xl font-black leading-tight text-grayscale-x-dark">
                Boas-vindas!
              </h1>
              <p className="text-sm leading-normal text-grayscale-dark">
                Faça login para entrar na plataforma
              </p>
            </div>

            <LoginForm isLoading={isLoginLoading} onSubmit={handleSubmit} />

            <div className="mt-10 flex items-center justify-center">
              <img src="/logo.png" alt="ECOPRAGAS" className="h-12 object-contain" />
            </div>
          </div>
        </div>

        <img
          src="/presentation-frame.png"
          alt=""
          className="hidden object-cover rounded-2xl border-2 border-brand-primary-light lg:block"
        />
      </div>
    </div>
  );
}
