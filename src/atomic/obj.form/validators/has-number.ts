import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function HasNumberValidator<T extends FieldValues>(
  message: string = strings.hasNumber,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine((val) => !val || /[0-9]/.test(val), { message });
  return ZodValidator(schema);
}
