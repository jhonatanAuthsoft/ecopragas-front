import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function MinLengthValidator<T extends FieldValues>(
	value: number,
	message?: string,
): ValidatorReturnType<T> {
	const finalMessage = message ?? strings.minLength(value);

	return {
		minLength: {
			value,
			message: finalMessage,
		},
	};
}
