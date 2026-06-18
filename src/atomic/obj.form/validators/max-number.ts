import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function MaxNumberValidator<T extends FieldValues>(
  max: number,
  message?: string,
): ValidatorReturnType<T> {
  const finalMessage = message ?? strings.maxNumber(max);

  return {
    validate: (val: number) => val <= max || finalMessage,
  };
}
