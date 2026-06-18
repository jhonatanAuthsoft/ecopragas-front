/**
 * Runtime Environment Configuration
 *
 * Este módulo fornece acesso type-safe às variáveis de ambiente
 * que são injetadas em runtime via ConfigMap do Kubernetes.
 *
 * As variáveis são carregadas do arquivo /env-config.js que é
 * gerado dinamicamente no startup do container.
 */

// Definição de tipos para as variáveis de ambiente
interface RuntimeEnv {
  VITE_API_URL: string;
}

// Estende a interface Window para incluir ENV
declare global {
  interface Window {
    ENV?: RuntimeEnv;
  }
}

/**
 * Obtém uma variável de ambiente com fallback
 * Prioriza window.ENV (runtime) sobre import.meta.env (build time)
 */
function getEnvVar(key: keyof RuntimeEnv, fallback: string = ""): string {
  // Primeiro tenta obter do window.ENV (runtime - ConfigMap)
  if (typeof window !== "undefined" && window.ENV && window.ENV[key]) {
    return window.ENV[key];
  }

  // Fallback para import.meta.env (build time - para desenvolvimento local)
  const metaEnvValue = import.meta.env[key];
  if (metaEnvValue !== undefined) {
    return metaEnvValue as string;
  }

  return fallback;
}

// Obtém a URL base da API
const baseUrl = getEnvVar("VITE_API_URL", "http://localhost:8080");

/**
 * Configuração de ambiente acessível em toda a aplicação
 */
export const env = {
  // Base URLs
  baseUrl: baseUrl,
  apiBaseUrl: `${baseUrl}`,
  wsBaseUrl: baseUrl,

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Log da configuração carregada (apenas em desenvolvimento)
// Log removido para produção

export default env;
