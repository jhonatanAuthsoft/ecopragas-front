import type { AxiosError } from "axios";
import type { components } from "./rest/api-types";

export type ErrorResponse = components["schemas"]["ErrorResponse"];

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export interface UseCaseBaseParams<T = void, TError = AxiosErrorResponse> {
  onSuccess?: (data: T) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: T, error: TError | null) => void;
}
