import type { components, operations } from "../api-types";

export type AuthUser = components["schemas"]["UsuarioResponseDTO"];
export type LoginDTO = components["schemas"]["LoginUsuarioResponseDTO"];
export type LogoutDTO = components["schemas"]["StandardResponseBoolean"];
export type RedefinirSenhaDTO = components["schemas"]["StandardResponseBoolean"];

export type LoginInput = operations["usuario_login"]["requestBody"]["content"]["application/json"];
export type LoginResponse =
  operations["usuario_login"]["responses"][200]["content"]["application/json"];

export type LogoutResponse =
  operations["usuario_logout"]["responses"][200]["content"]["application/json"];

export type RedefinirSenhaInput =
  operations["usuario_redefinir_senha"]["requestBody"]["content"]["application/json"];
export type RedefinirSenhaResponse =
  operations["usuario_redefinir_senha"]["responses"][200]["content"]["application/json"];
