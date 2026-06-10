import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function MinNumberValidator<T extends FieldValues>(
  min: number,
  message?: string,
): ValidatorReturnType<T> {
  const finalMessage = message ?? strings.minNumber(min);

  return {
    validate: (val: number) => val >= min || finalMessage,
  };
}
