import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/atomic/atm.button/button.component";
import { PasswordInput } from "@/atomic/atm.password-input";
import { TextInput } from "@/atomic/atm.text-input";
import { CustomValidator, Form, FormField, RequiredValidator } from "@/atomic/obj.form";
import { ROUTES } from "@/constants/routes";
import type { LoginFormValues } from "./login-form.types";
import {
  detectLoginIdentifierType,
  formatLoginUsername,
  validateLoginUsername,
} from "./login-form.utils";

const defaultValues: LoginFormValues = {
  username: "",
  password: "",
};

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (values: LoginFormValues) => void;
}

export function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  const navigate = useNavigate();
  const formMethods = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues,
  });

  const username = formMethods.watch("username");
  const identifierType = detectLoginIdentifierType(username);

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className="mt-10 space-y-5">
      <FormField
        name="username"
        validators={[RequiredValidator(), CustomValidator(validateLoginUsername)]}
      >
        <TextInput
          label="Email ou CPF"
          placeholder="Digite seu email ou CPF"
          formatter={formatLoginUsername}
          maxLength={identifierType === "cpf" ? 14 : undefined}
        />
      </FormField>

      <FormField name="password" validators={[RequiredValidator()]}>
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
