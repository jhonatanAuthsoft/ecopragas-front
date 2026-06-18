# Arquitetura e Estrutura do Projeto

Este projeto segue uma versão adaptada do **Atomic Design**, organizada para separar componentes genéricos de componentes ligados ao domínio do negócio.

## 1. Atomic Design (`src/atomic/`)

A estrutura é dividida em prefixos que indicam a complexidade e a responsabilidade de cada componente:

- **`atm.*` (Atoms)**:
  - Componentes base indivisíveis (ex: `Button`, `Input`, `Badge`, `Typography`).
  - São agnósticos ao contexto e altamente reutilizáveis.
  - Devem ser puramente visuais, recebendo dados e callbacks via props.
- **`mol.*` (Molecules)**:
  - Combinações de dois ou mais átomos (ex: `Accordion`, `Card`, `Select`).
  - Representam padrões de UI simples e reutilizáveis.
- **`org.*` (Organisms)**:
  - Componentes complexos e **genéricos** (ex: `EmptyPlaceholder`, `ErrorPlaceholder`).
  - Podem conter lógica interna, mas não são vinculados a uma entidade específica do negócio.
- **`obj.*` (Objects)**:
  - Componentes complexos e **específicos do domínio** (ex: `LeadCard`, `LeadKanban`, `CobrancasTable`).
  - São "Organismos" que possuem conhecimento sobre as entidades do projeto (Leads, Contratos, etc).
  - É onde a lógica de negócio costuma se integrar com a UI.
- **`tpl.*` (Templates)**:
  - Definem o layout das páginas (ex: `MainLayout`).
  - Organizam onde os organismos e objetos serão posicionados, mas não possuem conteúdo real (usam slots/children).

## 2. Padronização de Componentes

Cada pasta de componente deve seguir este padrão:
- `nome.component.tsx`: Implementação React e JSX.
- `nome.style.ts`: Definição de variantes e estilos usando `tailwind-variants` (tv).
- `index.ts`: Exportação simplificada do componente (ex: `export * from "./nome.component"`).

**Exemplo de Estilização (`tailwind-variants`):**
```typescript
import { tv } from "tailwind-variants";

export const style = tv({
  base: "flex items-center ...",
  variants: {
    status: {
      active: "bg-green-500",
      inactive: "bg-gray-500",
    },
  },
});
```

## 3. Outras Camadas do Projeto

- **`src/domain/`**: Contém regras de negócio puras, tipos de domínio e mutações customizadas que podem ser compartilhadas.
- **`src/services/`**: Camada de comunicação com a API. Centraliza as chamadas de dados (ex: `leads.service.ts`).
- **`src/store/`**: Gerenciamento de estado global utilizando **Zustand** (ex: `auth.ts`, `sidebar.ts`).
- **`src/rest/`**: Configurações de infraestrutura de rede e provedores (ex: React Query `QueryProvider`).
- **`src/pages/`**: Componentes de página que organizam as rotas. Elas consomem os templates e injetam os objetos (`obj.*`) necessários.
- **`src/assets/`**:
  - `icons/`: Ícones exportados como componentes React funcionais.
  - `vectors/`: Ilustrações e SVGs complexos.
- **`src/utils/`**: Funções utilitárias puras (formatadores, validadores como CNPJ).

## 4. Fluxo de Desenvolvimento Recomendado

1.  **Componente UI Genérico**: Se precisar de um novo elemento visual básico, crie em `atm.*` ou `mol.*`.
2.  **Serviço de Dados**: Defina a interface e as chamadas de API em `src/services/`.
3.  **Componente de Negócio**: Crie um Objeto (`obj.*`) para representar a entidade (ex: `UserTable`) usando os componentes genéricos.
4.  **Página**: Integre tudo em `src/pages/`, usando um Template (`tpl.*`) para estruturar o layout.
