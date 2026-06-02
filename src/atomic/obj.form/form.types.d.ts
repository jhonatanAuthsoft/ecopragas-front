import type {
  ArrayPath,
  FieldArray,
  FieldArrayPathValue,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  SubmitHandler as RHFSubmitHandler,
  Validate,
} from "react-hook-form";

export type RulesType<T extends FieldValues> = Omit<
  RegisterOptions<T, FieldPath<T>>,
  "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
>;

export type ArrayFieldRulesType<T extends FieldValues> = {
  validate?: Validate<FieldArray<T>[], T> | Record<string, Validate<FieldArray<T>[], T>>;
} & Pick<RegisterOptions<T>, "maxLength" | "minLength" | "required">;

export interface InputProps<TInput> {
  defaultValue?: TInput;
}

export type FieldStateType = {
  invalid?: boolean;
};

export type InputType<T extends FieldValues> = {
  name: FieldPath<T>;
  defaultValue?: PathValue<T, Path<T>>;
  validators?: RulesType<T>[];
  disabled?: boolean;
};

export type ValidatorReturnType<T extends FieldValues> = Omit<RulesType<T>, "deps">;

export type ValidateFunctionType<T extends FieldValues> = Validate<
  PathValue<T, Path<T>> | FieldArray<T>[],
  T
>;

export interface InputProps<TInput> {
  onValueChange?: (value?: TInput) => void;
  error?: string;
  value?: TInput;
  isRequired?: boolean;
}

export type SubmitHandler<TFieldValues extends FieldValues> = RHFSubmitHandler<TFieldValues>;

export type FieldValuesType = FieldValues;

export type ArrayPathType<T extends FieldValues> = ArrayPath<T>;

export type PathType<T extends FieldValues> = Path<T>;

export type FieldPathValueType<T extends FieldValues> = PathValue<T, Path<T>>;

export type FieldArrayPathValueType<T extends FieldValues> = FieldArrayPathValue<T, ArrayPath<T>>;
