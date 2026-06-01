import type { LoginRequest, LoginResponse } from "@/model/rest/auth";
import { serverRequest } from "@/rest/server-request";

export async function loginDatasource(body: LoginRequest) {
  const { data } = await serverRequest.post<LoginResponse>("/admin/authenticate", body);
  return data;
}
