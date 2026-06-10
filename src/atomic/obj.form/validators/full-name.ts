import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function FullNameValidator<T extends FieldValues>(
  message: string = strings.fullName,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const parts = val.trim().split(/\s+/);
        return parts.length >= 2;
      },
      { message },
    );

  return ZodValidator(schema);
}
