import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function MaxLengthValidator<T extends FieldValues>(
	value: number,
	message?: string,
): ValidatorReturnType<T> {
	const finalMessage = message ?? strings.maxLength(value);

	return {
		maxLength: {
			value,
			message: finalMessage,
		},
	};
}
