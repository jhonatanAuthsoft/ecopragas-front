import type { FieldValues } from "react-hook-form";
import type { ZodSchema } from "zod";
import type { ValidateFunctionType, ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { CustomValidator } from "./custom-validator";

export function ZodValidator<T extends FieldValues>(schema: ZodSchema): ValidatorReturnType<T> {
  const validate: ValidateFunctionType<T> = (value) => {
    const result = schema.safeParse(value);
    return result.success || result.error.issues[0]?.message;
  };
  return CustomValidator(validate);
}
