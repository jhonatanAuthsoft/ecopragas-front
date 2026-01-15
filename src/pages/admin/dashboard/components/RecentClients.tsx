import { Badge } from "@/atomic/atm.badge/badge.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/atomic/mol.card/card.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";

const recentClients = [
  {
    id: 1,
    name: "Restaurante Sabor do Sul",
    document: "12.345.678/0001-90",
    status: "Ativo",
    lastService: "15/10/2025",
    type: "Fixo",
  },
  {
    id: 2,
    name: "Hotel Plaza Central",
    document: "98.765.432/0001-10",
    status: "Ativo",
    lastService: "13/10/2025",
    type: "Fixo",
  },
  {
    id: 3,
    name: "Maria Silva",
    document: "123.456.789-00",
    status: "Lead",
    lastService: "-",
    type: "Esporádico",
  },
  {
    id: 4,
    name: "Supermercado Bom Preço",
    document: "11.222.333/0001-44",
    status: "Ativo",
    lastService: "10/10/2025",
    type: "Fixo",
  },
  {
    id: 5,
    name: "João Santos",
    document: "987.654.321-00",
    status: "Inativo",
    lastService: "05/08/2025",
    type: "Esporádico",
  },
];

export const RecentClients = () => {
  const getTipoColor = (tipo: String) => {
    switch (tipo) {
      case "Fixo":
        return "bg-brand-secondary-light/20 text-brand-secondary-medium hover:bg-brand-secondary-light/20 border border-brand-secondary-medium";
      case "Esporádico":
        return "bg-feedback-warning-light text-feedback-warning-dark border border-brand-accessory-orange";
      default:
        return "bg-grayscale-light text-grayscale-dark";
    }
  }
  
  return (
    <div className="flex flex-col gap-md">
      <SearchInput />
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Último Serviço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.document}</TableCell>
                  <TableCell>{client.status}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <Badge className={getTipoColor(client.type)}>{client.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{client.lastService}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationControl 
            className="mt-4"
            currentPage={1}
            totalPages={3}
          />
        </CardContent>
      </Card>
    </div>
  );
};
