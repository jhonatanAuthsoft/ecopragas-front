import type { StandardResponse } from "@/model/use-case.model";

export function getErrorMessages(response: StandardResponse<unknown> | undefined): string {
  if (!response) {
    return "";
  }

  const detailMessages =
    response.errors
      ?.map((error) => error.detail)
      .filter((detail): detail is string => Boolean(detail)) ?? [];

  if (detailMessages.length > 0) {
    return detailMessages.join("\n");
  }

  return response.message?.trim() ?? "";
}
