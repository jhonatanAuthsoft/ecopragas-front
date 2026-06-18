import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { PasswordInput } from "@/atomic/atm.password-input";
import { TextInput } from "@/atomic/atm.text-input";
import { CustomValidator, Form, FormField, RequiredValidator } from "@/atomic/obj.form";
import { ROUTES } from "@/constants/routes";
import type { LoginInput } from "@/model/rest/auth";
import {
  detectLoginIdentifierType,
  formatLoginField,
  validateLoginField,
} from "./login-form.utils";

const defaultValues: LoginInput = {
  login: "",
  senha: "",
};

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (values: LoginInput) => void;
}

export function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  const navigate = useNavigate();
  const formMethods = useForm<LoginInput>({
    mode: "onChange",
    defaultValues,
  });

  const login = formMethods.watch("login");
  const identifierType = detectLoginIdentifierType(login);

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className="mt-10 space-y-5">
      <FormField<LoginInput, "login">
        name="login"
        validators={[RequiredValidator(), CustomValidator(validateLoginField)]}
      >
        <TextInput
          label="Email ou CPF"
          placeholder="Digite seu email ou CPF"
          formatter={formatLoginField}
          maxLength={identifierType === "cpf" ? 14 : undefined}
        />
      </FormField>

      <FormField<LoginInput, "senha"> name="senha" validators={[RequiredValidator()]}>
        <PasswordInput label="Senha" placeholder="Digite sua senha" />
      </FormField>

      <button
        type="button"
        onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
        className="text-left text-xs font-medium text-brand-primary-dark hover:underline"
      >
        Esqueceu a senha?
      </button>

      <Button type="submit" disabled={isLoading} className="h-12 w-full cursor-pointer">
        {isLoading ? "Acessando..." : "Acessar"}
      </Button>
    </Form>
  );
}
