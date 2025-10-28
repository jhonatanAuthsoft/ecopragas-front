import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Lead":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Inativo":
        return "bg-muted text-muted-foreground hover:bg-muted";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes Recentes</CardTitle>
      </CardHeader>
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
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{client.type}</TableCell>
                <TableCell className="text-muted-foreground">{client.lastService}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
