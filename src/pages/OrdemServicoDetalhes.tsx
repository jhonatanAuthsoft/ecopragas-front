import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Camera,
  CheckCircle2,
  QrCode,
} from "lucide-react";
import { QRCodeScanner } from "@/components/OrdensServico/QRCodeScanner";
import { PhotoUpload } from "@/components/OrdensServico/PhotoUpload";
import { ServiceChecklist } from "@/components/OrdensServico/ServiceChecklist";
import { toast } from "sonner";

export default function OrdemServicoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observacoes, setObservacoes] = useState("");

  // Mock data - substituir por dados reais
  const ordem = {
    id: id || "1",
    numeroOS: "OS-2024-001",
    cliente: "João Silva",
    tipoServico: "Dedetização Residencial",
    endereco: "Rua das Flores, 123 - Centro",
    dataAgendamento: "2024-01-15",
    horaAgendamento: "14:00",
    status: "Em Andamento",
    valorServico: 350.00,
  };

  const handleConcluir = () => {
    toast.success("Ordem de Serviço concluída com sucesso!");
    navigate("/ordens-servico");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/ordens-servico")}
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

        {/* Info Cards */}
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

        {/* Tabs */}
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

        {/* Observações */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Observações</h3>
          <Textarea
            placeholder="Adicione observações sobre o serviço realizado..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={4}
          />
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/ordens-servico")}
          >
            Salvar Rascunho
          </Button>
          <Button 
            className="flex-1"
            onClick={handleConcluir}
          >
            Concluir Serviço
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
