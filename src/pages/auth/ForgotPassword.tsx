import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { Input } from "@/atomic/atm.input/input.component";
import { Label } from "@/atomic/atm.label/label.component";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "E-mail enviado",
      description: "Se o e-mail existir, você receberá as instruções de recuperação.",
      variant: "default",
      className:
        "bg-feedback-success-light border-feedback-success-medium text-feedback-success-dark",
    });

    navigate(ROUTES.AUTH.LOGIN.CLIENT);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grayscale-x-light p-6">
      <div className="flex w-full overflow-hidden rounded-2xl justify-center gap-lg lg:grid-cols-[1fr_1.15fr]">
        <div className="flex w-full max-w-[820px] items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-xl font-black leading-tight text-grayscale-x-dark">
                Recuperação de senha
              </h1>
              <p className="text-sm leading-normal text-grayscale-medium">
                Insira o e-mail cadastrado para receber o código para recuperação de senha
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <Label htmlFor="email" className="text-xxs font-medium text-grayscale-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-lg border-grayscale-light bg-grayscale-white px-4 text-xs text-grayscale-x-dark placeholder:text-grayscale-medium focus-visible:ring-brand-primary-medium"
                />
              </div>

              <Button type="submit" className="h-12 w-full cursor-pointer">
                Enviar e-mail de recuperação
              </Button>
            </form>

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
