import {
  type FieldErrors,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useForm,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  className?: string;
  onSubmit: (data: T) => void;
  onInvalid?: (errors: FieldErrors<T>) => void;
  children: React.ReactNode;
  formMethods?: UseFormReturn<T>;
}

export function Form<T extends FieldValues>(props: FormProps<T>) {
  const defaultForm = useForm<T>();
  const form = props.formMethods ?? defaultForm;

  const handleComplete = (e: React.BaseSyntheticEvent) => {
    form.handleSubmit(props.onSubmit, props.onInvalid)(e);
  };

  return (
    <FormProvider {...form}>
      <form className={props.className} onSubmit={handleComplete}>
        {props.children}
      </form>
    </FormProvider>
  );
}
