# Estratégia de Componentização: DetalhesAgendamento (Atomic Design)

O arquivo `DetalhesAgendamento.tsx` cresceu substancialmente (mais de 1500 linhas) devido à adição de fluxos específicos para diferentes tipos de serviço (Limpeza, Higienização, Monitoramento de Insetos e Monitoramento de Roedores). 

Para melhorar a manutenção, legibilidade e performance do código, propomos a seguinte estratégia de componentização em 4 fases, respeitando estritamente o padrão **Atomic Design** já estabelecido no projeto (`@src/atomic/`).

## Problemas Atuais
1. **Monolito de UI na Camada de Página:** O arquivo na camada `pages/` está renderizando diretamente dezenas de componentes de UI, misturando regra de negócio com layout.
2. **Vazamento de Estado (State Bloat):** O componente pai declara estados para *todos* os fluxos (ex: `hasPool`, `reservoirInstallation`, `monitoringPoints`), mesmo que apenas um fluxo seja renderizado por vez. Isso causa poluição de memória e re-renders desnecessários.
3. **Sub-componentes In-line:** Componentes complexos como `MonitoringPointForm` e `RodentStationDetails` estão declarados no mesmo arquivo da página.

## Arquitetura Alvo (Padrão Atomic)

No Atomic Design, os elementos de UI específicos do domínio devem ser classificados como **Organisms** (partes independentes de uma interface) ou **Templates** (estruturas de layout que organizam organismos).

### Mapeamento de Extração

1. **Camada Page (Entrypoint):** 
   - `src/pages/technician/agendamentos/DetalhesAgendamento.tsx` (Fica apenas com routing, fetch de dados e switch de Templates/Organismos).

2. **Camada Organisms (`src/atomic/org.*/`):**
   - *Compartilhados:*
     - `org.agendamento-header`: O card que exibe o Status, OS, Nome do Cliente, CPF, Telefone e Endereço.
     - `org.servico-header`: O card (exibido quando `!isStarted`) que mostra os detalhes do serviço contratado e o botão verde "Iniciar Serviço".
     - `org.servico-fotos`: O card que contém as `FileUpload` de Antes e Depois, e o `TextareaInput` de Observações.
   - *Específicos de Monitoramento:*
     - `org.monitoring-point`: Contém o Container, Form e Details para **Insetos**.
     - `org.rodent-station`: Contém o Container, Form e Details para **Roedores**.

3. **Camada Templates (`src/atomic/tpl.*/`):**
   - Aqui organizaremos os diferentes fluxos (Strategy), combinando os organismos acima com os estados locais pertinentes.
   - `tpl.flow-padrao`: Serviços genéricos / Controle de pragas. (Gerencia estados como `selectedPests`, `areaExterna`, etc).
   - `tpl.flow-higienizacao`: Fluxo de higienização. (Gerencia estados como `selectedEquipment`, `reservoirInstallation`, etc).
   - `tpl.flow-monitoramento-insetos`: Organiza a lista de `org.monitoring-point`.
   - `tpl.flow-monitoramento-roedores`: Organiza a lista de `org.rodent-station`.

## Plano de Ação (Step-by-Step)

### Fase 1: Criação dos Organismos de UI Compartilhados
Isolar as peças estáticas e repetitivas em `src/atomic/org.*/`.
- Criar `org.agendamento-header/agendamento-header.component.tsx`.
- Criar `org.servico-header/servico-header.component.tsx`.
- Criar `org.servico-fotos/servico-fotos.component.tsx` (que receberá callbacks para os uploads).

### Fase 2: Criação dos Organismos Complexos de Monitoramento
Mover os sub-componentes pesados para seus diretórios atômicos.
- Mover `MonitoringPointContainer`, `MonitoringPointForm`, `MonitoringPointDetails` para `src/atomic/org.monitoring-point/`.
- Mover `RodentStationContainer`, `RodentStationForm`, `RodentStationDetails` para `src/atomic/org.rodent-station/`.

### Fase 3: Construção dos Templates de Fluxo (Isolamento de Estado)
Criar os templates que servirão como as diferentes telas do serviço. O estado que antes ficava na "Page" descerá para esses templates.
- Criar `src/atomic/tpl.flow-padrao/`.
- Criar `src/atomic/tpl.flow-higienizacao/`.
- Criar `src/atomic/tpl.flow-monitoramento-insetos/`.
- Criar `src/atomic/tpl.flow-monitoramento-roedores/`.

### Fase 4: Limpeza da Page
Refatorar `DetalhesAgendamento.tsx` para apenas utilizar os novos templates de acordo com a regra de negócio.

**Exemplo do resultado final no arquivo da página:**
```tsx
import { FlowPadrao } from '@/atomic/tpl.flow-padrao';
import { FlowHigienizacao } from '@/atomic/tpl.flow-higienizacao';
// ... imports

const DetalhesAgendamento = () => {
  // ... hooks, routing e fetch de mock data
  const [isStarted, setIsStarted] = useState(false);

  const renderServiceFlow = () => {
    switch (agendamento.serviceType) {
      case 'Monitoramento de Insetos':
        return <FlowMonitoramentoInsetos onCancel={() => setIsStarted(false)} />;
      case 'Monitoramento de Roedores':
        return <FlowMonitoramentoRoedores onCancel={() => setIsStarted(false)} />;
      case 'Higienização':
        return <FlowHigienizacao onCancel={() => setIsStarted(false)} />;
      default:
        return <FlowPadrao onCancel={() => setIsStarted(false)} />;
    }
  };

  return (
    <MainLayout>
      <div className={cn('flex flex-col gap-lg pb-xl', isMobile && 'bg-grayscale-x-light -mx-lg -mt-xl p-lg pt-xl min-h-screen')}>
        <HeaderNavigation />
        <AgendamentoHeader agendamento={agendamento} />
        
        {!isStarted ? (
          <ServicoHeader agendamento={agendamento} onStart={() => setIsStarted(true)} />
        ) : (
          renderServiceFlow()
        )}
      </div>
    </MainLayout>
  );
};
```