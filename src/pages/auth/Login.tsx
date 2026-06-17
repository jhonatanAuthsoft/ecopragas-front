import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "@/domain/auth";
import type { LoginInput } from "@/model/rest/auth";
import { getDefaultAuthenticatedRoute } from "@/router/get-default-authenticated-route";
import { useAuthStore } from "@/store/auth";
import { buildLoginRequest, LoginForm } from "./components/login-form";

export default function Login() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  const { login, isLoginLoading } = useLogin({
    onSuccess: (data) => {
      setSession(data.token, data.usuario);
      navigate(getDefaultAuthenticatedRoute(data.usuario?.perfil));
      toast.success("Login realizado com sucesso");
    },
  });

  const handleSubmit = (values: LoginInput) => {
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
