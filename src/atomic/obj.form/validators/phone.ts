import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function PhoneValidator<T extends FieldValues>(
  message: string = strings.phone,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;

        const digits = val.replace(/\D/g, "");

        if (digits.length < 7 || digits.length > 15) return false;

        if (val.trim().startsWith("+")) {
          return /^\+\d{7,15}$/.test(val.replace(/\s+/g, ""));
        }

        return true;
      },
      { message },
    );

  return ZodValidator(schema);
}
