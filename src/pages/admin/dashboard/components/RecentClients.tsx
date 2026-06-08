import { Badge } from "@/atomic/atm.badge/badge.component";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";

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
    status: "Ativo",
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
  return (
    <div className="flex flex-col gap-md">
      <SearchInput placeholder="Buscar clientes" />
      <div className="rounded-xs border border-border p-lg">
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
              <TableRow key={client.id}>
                <TableCell className="text-grayscale-x-dark">{client.name}</TableCell>
                <TableCell>{client.document}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  <Badge color={client.type === "Fixo" ? "blue" : "orange"}>{client.type}</Badge>
                </TableCell>
                <TableCell>{client.lastService}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <PaginationControl className="mt-4" currentPage={1} totalPages={3} />
      </div>
    </div>
  );
};
