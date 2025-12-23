import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Download, Eye, FileText } from "lucide-react";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { Contrato } from "@/pages/Contratos";

interface ContratosTableProps {
  contratos: Contrato[];
}

const statusConfig = {
  ativo: {
    label: "Ativo",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  pendente: {
    label: "Pendente Assinatura",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  vencido: {
    label: "Vencido",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  cancelado: {
    label: "Cancelado",
    className: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
};

export const ContratosTable = ({ contratos }: ContratosTableProps) => {
  if (contratos.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground">Nenhum contrato encontrado</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Contrato</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Tipo de Serviço</TableHead>
            <TableHead>Valor Mensal</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assinado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contratos.map((contrato) => (
            <TableRow key={contrato.id}>
              <TableCell className="font-medium">{contrato.numeroContrato}</TableCell>
              <TableCell>{contrato.clienteNome}</TableCell>
              <TableCell className="text-muted-foreground">{contrato.clienteCpfCnpj}</TableCell>
              <TableCell>{contrato.tipoServico}</TableCell>
              <TableCell className="font-semibold text-primary">
                R$ {contrato.valorMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell>{format(contrato.dataInicio, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
              <TableCell>
                {format(contrato.dataVencimento, "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                <Badge className={statusConfig[contrato.status].className}>
                  {statusConfig[contrato.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                {contrato.assinadoEm ? (
                  <span className="text-sm text-muted-foreground">
                    {format(contrato.assinadoEm, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground italic">Não assinado</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {contrato.urlDocumento && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
