import type { Tecnico } from "@/model/rest/tecnico";

export const MOCK_TECNICOS: Tecnico[] = [
  {
    id: "tecnico-1",
    nome: "John Doe",
    email: "john.doe@example.com",
    cpf: "12345678900",
    fotoUrl: "https://github.com/teste.png",
  },
  {
    id: "tecnico-2",
    nome: "John Smith",
    email: "john.smith@example.com",
    cpf: "12345678900",
    fotoUrl: "https://github.com/shadcn.png",
  },
  {
    id: "tecnico-3",
    nome: "John Doe",
    email: "john.doe@example.com",
    cpf: "12345678900",
    fotoUrl: "",
  },
  {
    id: "tecnico-4",
    nome: "John Doe",
    email: "john.doe@example.com",
    cpf: "12345678900",
    fotoUrl: "https://github.com/shadcn.png",
  },
];
