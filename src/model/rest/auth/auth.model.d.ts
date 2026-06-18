import type { components, operations } from "../api-types";

export type AuthUser = components["schemas"]["UsuarioResponseDTO"];
export type LoginDTO = components["schemas"]["LoginUsuarioResponseDTO"];
export type LogoutDTO = components["schemas"]["StandardResponseBoolean"];
export type RedefinirSenhaDTO = components["schemas"]["StandardResponseBoolean"];

export type LoginInput = operations["login"]["requestBody"]["content"]["application/json"];
export type LoginResponse = operations["login"]["responses"][200]["content"]["*/*"];

export type LogoutResponse = operations["logout"]["responses"][200]["content"]["*/*"];

export type RedefinirSenhaInput =
  operations["redefinirSenha"]["requestBody"]["content"]["application/json"];
export type RedefinirSenhaResponse =
  operations["redefinirSenha"]["responses"][200]["content"]["*/*"];
