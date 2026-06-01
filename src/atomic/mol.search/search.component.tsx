import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../atm.input/input.component";

export interface SearchInputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
}

export const SearchInput = ({ containerClassName, className, ...props }: SearchInputProps) => {
  return (
    <div className={cn("flex-1 max-w-75", containerClassName)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className={cn("pl-9", className)}
          placeholder="Buscar clientes, ordens de serviço..."
          {...props}
        />
      </div>
    </div>
  );
};
