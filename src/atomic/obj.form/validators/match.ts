import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function MatchValidator<T extends FieldValues>(
  match: string | undefined,
  message: string = strings.match,
): ValidatorReturnType<T> {
  return ZodValidator(
    z
      .string()
      .optional()
      .refine((val) => !val || val === match, { message }),
  );
}
