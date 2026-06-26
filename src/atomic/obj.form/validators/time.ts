import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { isValidTime } from "@/utils/is-valid-time";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function TimeValidator<T extends FieldValues>(
  message: string = strings.time,
): ValidatorReturnType<T> {
  const schema = z
    .string()
    .optional()
    .refine((val) => !val || isValidTime(val), { message });

  return ZodValidator(schema);
}
