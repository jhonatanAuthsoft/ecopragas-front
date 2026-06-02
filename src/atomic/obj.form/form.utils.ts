import type { FieldValues } from "react-hook-form";
import type {
	ArrayFieldRulesType,
	RulesType,
} from "@/atomic/obj.form/form.types";

export function getRulesFromValidators<T extends FieldValues>(
	validators: RulesType<T>[] | ArrayFieldRulesType<T>[],
) {
	if (!validators) return {};

	const result: Record<string, unknown> = {};

	for (let i = 0; i < validators.length; i++) {
		const rule = validators[i];

		if (rule.validate) {
			const validateKey = `validate-${i}`;

			if (typeof rule.validate === "function") {
				result.validate = {
					...(result.validate as object),
					[validateKey]: rule.validate,
				};
			} else {
				result.validate = {
					...(result.validate as object),
					...rule.validate,
				};
			}
		} else {
			Object.assign(result, rule);
		}
	}

	return result;
}
