import type { FieldValues } from "react-hook-form";
import * as z from "zod";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "./validators.strings";
import { ZodValidator } from "./zod-validator";

export function RequiredBooleanValidator<T extends FieldValues>(
	message: string = strings.required,
): ValidatorReturnType<T> {
	const schema = z
		.boolean({ message })
		.refine((val) => typeof val === "boolean", {
			message,
		});

	return ZodValidator(schema);
}
