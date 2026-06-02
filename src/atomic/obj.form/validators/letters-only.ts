import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";

import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function LettersOnlyValidator<T extends FieldValues>(
	message: string = strings.lettersOnly,
): ValidatorReturnType<T> {
	const lettersSchema = z
		.string()
		.regex(/^[A-Za-z]+$/, { message })
		.or(z.literal(""))
		.optional();

	return ZodValidator(lettersSchema);
}
