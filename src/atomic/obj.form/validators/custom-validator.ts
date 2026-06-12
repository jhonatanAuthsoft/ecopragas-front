import type { FieldValues } from "react-hook-form";
import type { ValidateFunctionType, ValidatorReturnType } from "@/atomic/obj.form/form.types";

export function CustomValidator<T extends FieldValues>(
  validate: ValidateFunctionType<T>,
): ValidatorReturnType<T> {
  return {
    validate,
  };
}
