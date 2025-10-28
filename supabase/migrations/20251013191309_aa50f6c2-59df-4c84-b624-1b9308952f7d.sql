-- Criar enum para tipos de pagamento
CREATE TYPE payment_type AS ENUM ('boleto', 'pix', 'cartao');

-- Criar enum para status de pagamento
CREATE TYPE payment_status AS ENUM ('pendente', 'pago', 'vencido', 'cancelado');

-- Tabela de cobranças
CREATE TABLE public.cobrancas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ordem_servico_id TEXT NOT NULL,
  cliente_nome TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  tipo_pagamento payment_type NOT NULL,
  status payment_status NOT NULL DEFAULT 'pendente',
  data_emissao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_vencimento DATE NOT NULL,
  data_pagamento TIMESTAMP WITH TIME ZONE,
  codigo_barras TEXT,
  pix_qrcode TEXT,
  pix_copia_cola TEXT,
  transaction_id TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de régua de cobrança
CREATE TABLE public.regua_cobranca (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cobranca_id UUID NOT NULL REFERENCES public.cobrancas(id) ON DELETE CASCADE,
  dias_apos_vencimento INTEGER NOT NULL,
  tipo_acao TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  enviado BOOLEAN NOT NULL DEFAULT false,
  data_envio TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cobrancas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regua_cobranca ENABLE ROW LEVEL SECURITY;

-- Policies para permitir acesso público temporário (ajustar conforme necessário com autenticação)
CREATE POLICY "Permitir leitura de cobranças" ON public.cobrancas
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserção de cobranças" ON public.cobrancas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização de cobranças" ON public.cobrancas
  FOR UPDATE USING (true);

CREATE POLICY "Permitir leitura de régua de cobrança" ON public.regua_cobranca
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserção de régua de cobrança" ON public.regua_cobranca
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização de régua de cobrança" ON public.regua_cobranca
  FOR UPDATE USING (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cobrancas_updated_at
  BEFORE UPDATE ON public.cobrancas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX idx_cobrancas_ordem_servico ON public.cobrancas(ordem_servico_id);
CREATE INDEX idx_cobrancas_status ON public.cobrancas(status);
CREATE INDEX idx_cobrancas_vencimento ON public.cobrancas(data_vencimento);
CREATE INDEX idx_regua_cobranca_cobranca_id ON public.regua_cobranca(cobranca_id);
