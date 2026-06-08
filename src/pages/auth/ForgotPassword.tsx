import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { TextInput } from "@/atomic/atm.text-input";
import { EmailValidator, Form, FormField, RequiredValidator } from "@/atomic/obj.form";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isTechnician = location.state?.isTechnician;

  function handleSubmit() {
    toast({
      title: "E-mail enviado",
      description: "Em desenvolvimento...",
      variant: "default",
      className:
        "bg-feedback-success-light border-feedback-success-medium text-feedback-success-dark",
    });

    navigate(isTechnician ? ROUTES.AUTH.LOGIN.TECHNICIAN : ROUTES.AUTH.LOGIN.ADMIN);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grayscale-x-light p-6">
      <div className="flex w-full overflow-hidden rounded-2xl justify-center gap-lg lg:grid-cols-[1fr_1.15fr]">
        <div className="flex w-full max-w-[820px] items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-xl font-black leading-tight text-grayscale-x-dark">
                Recuperação de senha
              </h1>
              <p className="text-sm leading-normal text-grayscale-dark max-w-[500px] mx-auto">
                Insira o e-mail cadastrado para receber o código para recuperação de senha
              </p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-lg mt-lg">
              <FormField name="email" validators={[RequiredValidator(), EmailValidator()]}>
                <TextInput 
                  label="Email" 
                  placeholder="Digite seu email" 
                />
              </FormField>

              <Button type="submit" className="h-12 w-full cursor-pointer">
                Enviar e-mail de recuperação
              </Button>
            </Form>

            <div className="mt-10 flex items-center justify-center">
              <img src="/logo.png" alt="ECOPRAGAS" className="h-12 object-contain" />
            </div>
          </div>
        </div>

        <img
          src={isTechnician ? "/presentation-tech.png" : "/presentation-frame.png"}
          alt=""
          className="hidden object-cover rounded-2xl border-2 border-brand-primary-light lg:block"
        />
      </div>
    </div>
  );
}
