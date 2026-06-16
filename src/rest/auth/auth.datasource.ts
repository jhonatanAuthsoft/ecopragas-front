import type {
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RedefinirSenhaInput,
  RedefinirSenhaResponse,
} from "@/model/rest/auth";
import { serverRequest } from "@/rest/server-request";

export async function loginDatasource(body: LoginInput) {
  const { data } = await serverRequest.post<LoginResponse>("/usuarios/login", body);
  return data;
}

export async function logoutDatasource() {
  const { data } = await serverRequest.post<LogoutResponse>("/usuarios/logout");
  return data;
}

export async function redefinirSenhaDatasource(body: RedefinirSenhaInput) {
  const { data } = await serverRequest.post<RedefinirSenhaResponse>(
    "/usuarios/redefinir-senha",
    body,
  );
  return data;
}
