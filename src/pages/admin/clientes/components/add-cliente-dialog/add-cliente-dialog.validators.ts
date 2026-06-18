import type { ValidatorReturnType } from "@/atomic/obj.form/form.types";
import { strings } from "@/atomic/obj.form/validators/validators.strings";
import type { ClienteFormValues } from "@/model/rest/cliente";
import { shouldValidateEnderecoDraft } from "./add-cliente-dialog.utils";

export function EnderecoDraftRequiredValidator(): ValidatorReturnType<ClienteFormValues> {
  return {
    validate: (value, formValues) => {
      if (!shouldValidateEnderecoDraft(formValues.enderecoDraft, formValues.enderecos.length)) {
        return true;
      }

      if (value === undefined || value === null || String(value).trim() === "") {
        return strings.required;
      }

      return true;
    },
  };
}
