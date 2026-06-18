import type { AxiosError } from "axios";

export type ErrorDetail = components["schemas"]["ErrorDetail"];

export interface StandardResponse<T> {
  success?: boolean;
  timestamp?: string;
  message?: string;
  data?: T;
  errors?: ErrorDetail[];
}

export type AxiosErrorResponse = AxiosError<StandardResponse<unknown>>;

export interface UseCaseBaseParams<T = void, TError = AxiosErrorResponse> {
  onSuccess?: (data: T) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: T, error: TError | null) => void;
}
