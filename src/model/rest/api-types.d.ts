/**
 * Atualmente gerado manualmente.
 * Aguardando a disponibilidade do Swagger do backend para gerar automaticamente.
 */

export interface paths {
  "/admin/authenticate": {
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["AuthenticateRequest"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["AuthenticateResponse"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    ErrorResponse: {
      detail?: string;
      message?: string;
      title?: string;
      status?: number;
    };
    AuthenticateRequest: {
      username: string;
      password: string;
    };
    AuthenticateResponse: {
      token: string;
      usuarioResponse: Record<string, unknown>;
    };
  };
}
