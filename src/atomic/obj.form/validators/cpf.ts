import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { isValidCPF } from "@/utils/is-valid-cpf";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function CpfValidator<T extends FieldValues>(
  message: string = strings.cpf,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine((val) => !val || isValidCPF(val), { message });

  return ZodValidator(schema);
}
