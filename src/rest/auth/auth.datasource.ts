import type { LoginInput, LoginResponse, LogoutResponse } from "@/model/rest/auth";
import { serverRequest } from "@/rest/server-request";

export async function loginDatasource(body: LoginInput) {
  const { data } = await serverRequest.post<LoginResponse>("/usuarios/login", body);
  return data;
}

export async function logoutDatasource() {
  const { data } = await serverRequest.post<LogoutResponse>("/usuarios/logout");
  return data;
}
