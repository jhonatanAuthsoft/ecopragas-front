import { X } from "lucide-react";
import { Children, cloneElement, isValidElement, useId } from "react";
import {
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { Caption } from "@/atomic/atm.caption";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";
import type { InputType } from "./form.types";
import { getRulesFromValidators } from "./form.utils";

export type DefaultValueType = string | number | boolean;

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends Omit<InputType<TFieldValues>, "name" | "defaultValue"> {
  name: TFieldName;
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
  onChange?: (value: DefaultValueType) => void;
  className?: string;
}

const DefaultValues: Record<string, unknown> = {
  CheckboxInput: false,
  RadioInput: false,
  SelectInput: "",
  InfiniteSelectInput: "",
  StepperInput: 0,
  SwitchInput: false,
  TextareaInput: "",
  TextInput: "",
  TimeInput: "",
  PasswordInput: "",
  ComboBoxInput: [],
  InfiniteComboBoxInput: [],
  MultiSelectInput: [],
};

export const FormField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  props: React.PropsWithChildren<FormFieldProps<TFieldValues, TFieldName>>,
) => {
  const { validators = [], disabled, defaultValue: componentDefaultValue } = props;
  const id = useId();

  const formContext = useFormContext();

  if (!formContext) {
    throw new Error("FormField component should be used inside Form component");
  }

  const childrenInputs = Children.toArray(props.children).filter(
    (child) =>
      isValidElement(child) && (child.type as React.ComponentType)?.displayName?.endsWith("Input"),
  );

  if (childrenInputs.length === 0) {
    throw new Error("FormField component should have at least one input field as a child");
  }

  const defaultValue = (componentDefaultValue ??
    (isValidElement(childrenInputs[0]) &&
      DefaultValues[(childrenInputs[0]?.type as React.ComponentType)?.displayName ?? ""]) ??
    undefined) as FieldPathValue<TFieldValues, TFieldName> | undefined;

  const rules = getRulesFromValidators(validators);
  const { field, fieldState } = useController<TFieldValues, TFieldName>({
    name: props.name,
    rules,
    defaultValue,
  });

  const isFieldset = Children.count(props.children) > 1;

  const FieldElement = isFieldset ? "fieldset" : "div";

  return (
    <FieldElement id={props.name} className={cn(props.className, "w-full")}>
      {Children.map(props.children, (child) => {
        if (
          isValidElement(child) &&
          (child.type as React.ComponentType)?.displayName?.endsWith("Input")
        ) {
          return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            ...(child.props as Record<string, unknown>),
            id,
            invalid: fieldState.invalid,
            ref: field.ref,
            name: field.name,
            value: field.value,
            onChange: (value: DefaultValueType) => {
              field.onChange(value);
              props.onChange?.(value);
            },
            onBlur: field.onBlur,
            disabled: disabled || (child.props as Record<string, unknown>).disabled,
          });
        }

        return child;
      })}

      {fieldState.error && (
        <>
          <Separator size="2xs" />
          <div className="flex items-center gap-2xs">
            <X className="size-md text-feedback-error-medium" />
            <Caption htmlFor={id} status="error">
              {fieldState.error.message}
            </Caption>
          </div>
        </>
      )}
    </FieldElement>
  );
};
