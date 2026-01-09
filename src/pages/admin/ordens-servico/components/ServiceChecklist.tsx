import { useState } from "react";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { Label } from "@/atomic/atm.label/label.component";
import { Card } from "@/atomic/mol.card/card.component";
import { Progress } from "@/atomic/mol.progress/progress.component";

interface ServiceChecklistProps {
  tipoServico: string;
}

const checklists = {
  "Dedetização Residencial": [
    "Inspeção visual de todos os cômodos",
    "Identificação de focos de infestação",
    "Aplicação de inseticida em rodapés",
    "Tratamento de ralos e tubulações",
    "Aplicação em frestas e rachaduras",
    "Orientação ao cliente sobre prevenção",
    "Registro de produtos utilizados",
    "Assinatura do cliente no relatório",
  ],
  "Dedetização Comercial": [
    "Inspeção completa das instalações",
    "Mapeamento de áreas críticas",
    "Aplicação de gel em pontos estratégicos",
    "Tratamento de áreas externas",
    "Instalação de iscas quando necessário",
    "Registro fotográfico de pontos tratados",
    "Entrega de certificado de dedetização",
    "Agendamento de manutenção preventiva",
  ],
  "Limpeza de Caixa D'água": [
    "Fechamento do registro de entrada",
    "Esvaziamento total da caixa",
    "Remoção de sedimentos e impurezas",
    "Lavagem com escovas adequadas",
    "Enxágue completo da caixa",
    "Desinfecção com cloro",
    "Verificação de vazamentos",
    "Teste de qualidade da água",
  ],
  Descupinização: [
    "Inspeção detalhada da estrutura",
    "Identificação do tipo de cupim",
    "Perfuração de pontos estratégicos",
    "Aplicação de cupinicida",
    "Tratamento de madeiras",
    "Instalação de barreiras químicas",
    "Orientação sobre prevenção",
    "Garantia de tratamento documentada",
  ],
};

export function ServiceChecklist({ tipoServico }: ServiceChecklistProps) {
  const items =
    checklists[tipoServico as keyof typeof checklists] || checklists["Dedetização Residencial"];
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const handleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / items.length) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Checklist do Serviço</h3>
          <span className="text-sm text-muted-foreground">
            {checkedItems.size} de {items.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <Checkbox
              id={`item-${index}`}
              checked={checkedItems.has(index)}
              onCheckedChange={() => handleCheck(index)}
              className="mt-1"
            />
            <Label
              htmlFor={`item-${index}`}
              className={`text-sm leading-relaxed cursor-pointer ${
                checkedItems.has(index) ? "line-through text-muted-foreground" : ""
              }`}
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}
