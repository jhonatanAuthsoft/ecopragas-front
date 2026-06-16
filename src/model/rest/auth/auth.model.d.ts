import type { components, operations } from "../api-types";

export type AuthUser = components["schemas"]["UsuarioResponseDTO"];

export type LoginInput = operations["login"]["requestBody"]["content"]["application/json"];
export type LoginResponse = operations["login"]["responses"][200]["content"]["*/*"];

export type LogoutResponse = operations["logout"]["responses"][200]["content"]["*/*"];

export type RedefinirSenhaInput =
  operations["redefinirSenha"]["requestBody"]["content"]["application/json"];
export type RedefinirSenhaResponse =
  operations["redefinirSenha"]["responses"][200]["content"]["*/*"];
