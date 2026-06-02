import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function RequiredValidator<T extends FieldValues>(
	message: string = strings.required,
): ValidatorReturnType<T> {
	return {
		required: message,
	};
}
