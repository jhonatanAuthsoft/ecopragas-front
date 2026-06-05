import { Pesticides } from "@/assets/vectors/pesticides";
import { Body1, H1 } from "@/atomic/atm.typography";

type DefaultPlaceholders = 404 | 500;

const defaultPlaceholderMap: Record<
  DefaultPlaceholders,
  {
    error: {
      code: number;
      message: string;
    };
    title: string;
    description: string;
    placeholder: React.ReactNode;
  }
> = {
  404: {
    error: {
      code: 404,
      message: "Página não encontrada",
    },
    title: "Não encontramos essa página",
    description:
      "Não localizamos o conteúdo solicitado. Verifique o endereço ou retorne à página inicial.",
    placeholder: <Pesticides />,
  },
  500: {
    error: {
      code: 500,
      message: "Erro interno do servidor",
    },
    title: "Erro no servidor",
    description:
      "Tivemos um problema interno, mas já estamos trabalhando para resolver. Tente novamente em alguns instantes",
    placeholder: <Pesticides />,
  },
};

interface ErrorPlaceholderProps {
  title?: string;
  description?: string;
  error?: {
    code: number;
    message: string;
  };
  placeholder?: React.ReactNode;
  defaultPlaceholder?: DefaultPlaceholders;
}

export const ErrorPlaceholder = (props: ErrorPlaceholderProps) => {
  const { defaultPlaceholder } = props;

  const defaultPlaceholderData = defaultPlaceholderMap[defaultPlaceholder];

  if (defaultPlaceholderData) {
    return <ErrorPlaceholderUI {...defaultPlaceholderData} />;
  }

  return <ErrorPlaceholderUI {...props} />;
};

export const ErrorPlaceholderUI = (props: ErrorPlaceholderProps) => {
  const { title, description, error, placeholder } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-xl">
      <div className="flex flex-col items-center justify-center gap-2xs max-w-[500px] text-center">
        <Body1 className="font-normal text-grayscale-dark">
          Erro {error.code} ({error.message})
        </Body1>
        <H1>{title}</H1>
        <Body1 className="font-normal text-grayscale-dark">{description}</Body1>
      </div>

      {placeholder}
    </div>
  );
};
