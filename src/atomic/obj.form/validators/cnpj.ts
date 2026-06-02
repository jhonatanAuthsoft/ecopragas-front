import type { FieldValues } from "react-hook-form";

import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { isValidCNPJ } from "@/utils/is-valid-cnpj";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function CnpjValidator<T extends FieldValues>(
  message: string = strings.cnpj,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine((val) => !val || isValidCNPJ(val), { message });

  return ZodValidator(schema);
}
