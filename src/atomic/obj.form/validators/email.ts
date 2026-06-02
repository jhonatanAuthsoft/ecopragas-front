import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function EmailValidator<T extends FieldValues>(
  message: string = strings.email,
): ValidatorReturnType<T> {
  return ZodValidator(
    z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, { message }),
  );
}
