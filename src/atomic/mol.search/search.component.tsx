import { MagnifierIcon } from "@/assets/icons/magnifier";
import { TextInput, type TextInputProps } from "@/atomic/atm.text-input";

export interface SearchInputProps extends TextInputProps {}

export const SearchInput = (props: SearchInputProps) => {
  const {
    placeholder = "Buscar",
    className = "max-w-[335px]",
    iconLeft = <MagnifierIcon title="Pesquisar" />,
    ...rest
  } = props;

  return (
    <TextInput className={className} placeholder={placeholder} iconLeft={iconLeft} {...rest} />
  );
};
