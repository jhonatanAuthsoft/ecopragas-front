import type { FieldValues } from "react-hook-form";
import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import {
	HasNumberValidator,
	LowerCaseValidator,
	MinLengthValidator,
	NoSpacesValidator,
	RequiredValidator,
	SpecialCharValidator,
	UpperCaseValidator,
} from "@/atomic/obj.form/validators";
import { strings } from "./validators.strings";

export function PasswordValidator<T extends FieldValues>(
	message: string = strings.password,
): ValidatorReturnType<T>[] {
	return [
		RequiredValidator(),
		MinLengthValidator(8),
		UpperCaseValidator(message),
		LowerCaseValidator(message),
		HasNumberValidator(message),
		SpecialCharValidator(message),
		NoSpacesValidator(),
	];
}
