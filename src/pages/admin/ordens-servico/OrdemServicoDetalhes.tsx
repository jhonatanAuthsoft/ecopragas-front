import {
  ArrowLeft,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { Textarea } from "@/atomic/atm.textarea/textarea.component";
import { Card } from "@/atomic/mol.card/card.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/atomic/mol.tabs/tabs.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { PhotoUpload } from "./components/PhotoUpload";
import { QRCodeScanner } from "./components/QRCodeScanner";
import { ServiceChecklist } from "./components/ServiceChecklist";

export default function OrdemServicoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observacoes, setObservacoes] = useState("");

  const ordem = {
    id: id || "1",
    numeroOS: "OS-2024-001",
    cliente: "João Silva",
    tipoServico: "Dedetização Residencial",
    endereco: "Rua das Flores, 123 - Centro",
    dataAgendamento: "2024-01-15",
    horaAgendamento: "14:00",
    status: "Em Andamento",
    valorServico: 350.0,
  };

  const handleConcluir = () => {
    toast.success("Ordem de Serviço concluída com sucesso!");
    navigate(ROUTES.SERVICE_ORDER.BASE);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.SERVICE_ORDER.BASE)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold mb-2">{ordem.numeroOS}</h1>
              <p className="text-muted-foreground">{ordem.cliente}</p>
            </div>
            <Badge className="text-sm">{ordem.status}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium">{ordem.dataAgendamento}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="font-medium">{ordem.horaAgendamento}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Endereço</p>
                <p className="font-medium">{ordem.endereco}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Serviço</p>
                <p className="font-medium">{ordem.tipoServico}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="checklist" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checklist">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Checklist
            </TabsTrigger>
            <TabsTrigger value="qrcode">
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="fotos">
              <Camera className="h-4 w-4 mr-2" />
              Fotos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="mt-6">
            <ServiceChecklist tipoServico={ordem.tipoServico} />
          </TabsContent>

          <TabsContent value="qrcode" className="mt-6">
            <QRCodeScanner ordemId={ordem.id} />
          </TabsContent>

          <TabsContent value="fotos" className="mt-6">
            <PhotoUpload ordemId={ordem.id} />
          </TabsContent>
        </Tabs>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Observações</h3>
          <Textarea
            placeholder="Adicione observações sobre o serviço realizado..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={4}
          />
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(ROUTES.SERVICE_ORDER.BASE)}
          >
            Salvar Rascunho
          </Button>
          <Button className="flex-1" onClick={handleConcluir}>
            Concluir Serviço
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
