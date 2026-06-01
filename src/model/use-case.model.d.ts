import type { AxiosError } from "axios";
import type { components } from "./rest/api-types";

export type ErrorResponse = components["schemas"]["ErrorResponse"];

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export interface UseCaseBaseParams<T = void> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosErrorResponse) => void;
  onSettled?: (data: T, error: AxiosErrorResponse | null) => void;
}
