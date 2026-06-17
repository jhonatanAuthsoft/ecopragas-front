import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { isValidCNPJ } from "@/utils/is-valid-cnpj";
import { isValidCPF } from "@/utils/is-valid-cpf";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function CpfCnpjValidator<T extends FieldValues>(
  message: string = strings.cpfCnpj,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) {
          return true;
        }

        const digits = value.replace(/\D/g, "");

        if (digits.length === 11) {
          return isValidCPF(value);
        }

        if (digits.length === 14) {
          return isValidCNPJ(value);
        }

        return false;
      },
      { message },
    );

  return ZodValidator(schema);
}
