import type { AxiosError } from "axios";

// TODO: devia vir do back
export type ErrorResponse = {
  message?: string[];
};

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export interface UseCaseBaseParams<T = void, TError = AxiosErrorResponse> {
  onSuccess?: (data: T) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: T, error: TError | null) => void;
}
