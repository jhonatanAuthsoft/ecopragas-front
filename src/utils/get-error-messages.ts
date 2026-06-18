import type { StandardResponse } from "@/model/use-case.model";

export function getErrorMessages(response: StandardResponse<unknown>): string[] {
  return response.errors?.map((error) => error.detail) ?? [];
}
