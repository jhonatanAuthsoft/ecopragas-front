import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { useLogin } from "@/domain/auth";
import { useToast } from "@/hooks/use-toast";
import { type AuthUser, useAuthStore } from "@/store/auth.store";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const setSession = useAuthStore((s) => s.setSession);

  const { login, isLoading } = useLogin({
    onSuccess: (data) => {
      if (data?.token) {
        setSession(data.token, data.usuarioResponse as AuthUser);
        toast({
          title: "Login realizado com sucesso",
          variant: "default",
          className:
            "bg-feedback-success-light border-feedback-success-medium text-feedback-success-dark",
        });
        navigate("/");
      }
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

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      username: loginEmail,
      password: loginPassword,
    });
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
              <p className="text-xs leading-normal text-grayscale-medium">
                Faça login para entrar na plataforma
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-10 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xxs font-medium text-grayscale-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="h-12 rounded-lg border-grayscale-light bg-grayscale-white px-4 text-xs text-grayscale-x-dark placeholder:text-grayscale-medium focus-visible:ring-brand-primary-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xxs font-medium text-grayscale-black">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="h-12 rounded-lg border-grayscale-light bg-grayscale-white px-4 pr-11 text-xs text-grayscale-x-dark placeholder:text-grayscale-medium focus-visible:ring-brand-primary-medium"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-grayscale-medium hover:text-grayscale-dark"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="text-left text-xs font-medium text-brand-primary-dark hover:underline"
              >
                Esqueceu a senha?
              </button>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-lg bg-brand-primary-medium text-sm font-medium text-grayscale-white hover:bg-brand-primary-dark"
              >
                {isLoading ? "Acessando..." : "Acessar"}
              </Button>

              <button
                type="button"
                className="w-full text-center text-xs font-medium text-brand-primary-dark hover:underline"
              >
                Acessar como técnico
              </button>
            </form>

            <div className="mt-10 flex items-center justify-center">
              <img src="/logo.png" alt="ECOPRAGAS" className="h-12 object-contain" />
            </div>
          </div>
        </div>

        <img
          src="/presentation-frame.png"
          alt=""
          className="object-cover rounded-2xl border-2 border-brand-primary-light"
        />
      </div>
    </div>
  );
}
