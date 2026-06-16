import type { LoginInput, LoginResponse } from "@/model/rest/auth";
import { serverRequest } from "@/rest/server-request";

export async function loginDatasource(body: LoginInput) {
  const { data } = await serverRequest.post<LoginResponse>("/usuarios/login", body);
  return data;
}
