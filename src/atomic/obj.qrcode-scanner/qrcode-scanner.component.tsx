import { Html5QrcodeScanner } from "html5-qrcode";
import { CheckCircle2, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Card } from "@/atomic/mol.card/card.component";

interface QRCodeScannerProps {
  ordemId: string;
}

interface ScanResult {
  codigo: string;
  timestamp: string;
  tipo: string;
}

export function QRCodeScanner({ ordemId }: QRCodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    setScanning(true);

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false,
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        // Sucesso no scan
        const newScan: ScanResult = {
          codigo: decodedText,
          timestamp: new Date().toLocaleString("pt-BR"),
          tipo: "Porta-isca",
        };

        setScanResults((prev) => [newScan, ...prev]);
        toast.success(`QR Code registrado: ${decodedText}`);

        // Parar scanner após sucesso
        html5QrcodeScanner.clear();
        setScanning(false);
        setScanner(null);
      },
      (error) => {
        // Erro silencioso durante scan
        console.log(error);
      },
    );

    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setScanning(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center">
          <QrCode className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Scanner de QR Code</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Escaneie o QR Code das porta-iscas para registrar o monitoramento
          </p>

          {!scanning ? (
            <Button onClick={startScanning} className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Iniciar Scanner
            </Button>
          ) : (
            <div>
              <div id="qr-reader" className="mb-4"></div>
              <Button onClick={stopScanning} variant="outline" className="w-full">
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Histórico de Scans */}
      {scanResults.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Registros de Monitoramento</h3>
          <div className="space-y-3">
            {scanResults.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-feedback-success-medium mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{result.tipo}</p>
                  <p className="text-sm text-muted-foreground">{result.codigo}</p>
                  <p className="text-xs text-muted-foreground mt-1">{result.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
