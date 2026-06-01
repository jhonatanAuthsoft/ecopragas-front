import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/atomic/atm.avatar/avatar.component";
import { Button } from "@/atomic/atm.button/button.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import type { Tecnico } from "@/services/tecnicos.service";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface TecnicosTableProps {
  tecnicos: Tecnico[];
  onEdit: (tecnico: Tecnico) => void;
  onDelete: (tecnico: Tecnico) => void;
}

export const TecnicosTable = ({ tecnicos, onEdit, onDelete }: TecnicosTableProps) => {
  if (tecnicos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-foreground">Nenhum técnico encontrado</p>
        <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Técnico</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tecnicos.map((tecnico) => (
            <TableRow key={tecnico.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={tecnico.foto} alt={tecnico.nome} />
                    <AvatarFallback>{tecnico.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{tecnico.nome}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatCPFCNPJ(tecnico.cpfCnpj)}
              </TableCell>
              <TableCell>{tecnico.telefone ? formatPhone(tecnico.telefone) : "-"}</TableCell>
              <TableCell className="text-muted-foreground">{tecnico.email}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => onEdit(tecnico)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-feedback-error-medium hover:text-feedback-error-dark hover:bg-feedback-error-light/10"
                    onClick={() => onDelete(tecnico)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
