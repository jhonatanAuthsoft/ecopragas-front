import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";

export function MinArrayLengthValidator<T extends FieldValues>(
	min: number,
	message?: string,
): ValidatorReturnType<T> {
	const resolvedMessage = message ?? strings.minArrayLength(min);

	return {
		validate: (value: unknown) => {
			if (value == null) {
				return resolvedMessage;
			}
			if (!Array.isArray(value)) {
				return resolvedMessage;
			}
			return value.length >= min ? true : resolvedMessage;
		},
	};
}

export function AtLeastOneArrayItemValidator<T extends FieldValues>(
	message?: string,
): ValidatorReturnType<T> {
	return MinArrayLengthValidator<T>(1, message);
}
