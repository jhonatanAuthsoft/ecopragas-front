import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";

import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function NumberValidator<T extends FieldValues>(
	message: string = strings.number,
): ValidatorReturnType<T> {
	const numberSchema = z
		.string()
		.regex(/^\d+$/, { message })
		.or(z.literal(""))
		.optional();

	return ZodValidator(numberSchema);
}
