import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item/detail-item.component";
import { FileUpload } from "@/atomic/atm.file-upload";
import { SelectInput } from "@/atomic/atm.select-input/select-input.component";
import { SelectorGroup } from "@/atomic/atm.selector-group";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { TextInput } from "@/atomic/atm.text-input/text-input.component";
import { TextareaInput } from "@/atomic/atm.textarea-input/textarea-input.component";
import { H3 } from "@/atomic/atm.typography";
import { ImageCarousel } from "@/atomic/mol.image-carousel";

export interface MonitoringPointData {
  grauInfestacao?: string;
  produtoUtilizado?: string;
  quantidade?: string;
  adesivaTrocada?: string;
  luminosaTrocada?: string;
  lote?: string;
  validade?: string;
  produto?: string;
  dosagem?: string;
  refilLuminosa?: boolean | string;
  quantidadeRefil?: string | number;
  fotos?: (File | { url?: string; base64?: string } | string)[];
  observacoes?: string;
}

const MonitoringPointDetails = ({ data, onEdit }: { data: MonitoringPointData; onEdit: () => void }) => {
  return (
    <div className="flex flex-col gap-md pt-sm text-grayscale-dark">
      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Grau de Infestação</p>
          <p className="text-xs capitalize">{data.grauInfestacao || "Não informado"}</p>
        </div>
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Produto utilizado</p>
          <p className="text-xs">{data.produtoUtilizado || "Não informado"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Adesiva Trocada</p>
          <p className="text-xs">{data.adesivaTrocada || "NA"}</p>
        </div>
      </div>

      <Separator className="bg-muted-foreground/20" />

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Produto</p>
          <p className="text-xs">{data.produto || "Não informado"}</p>
        </div>
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">ml/L ou g/m³</p>
          <p className="text-xs">{data.dosagem || "Não informado"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Refil Luminosa</p>
          <p className="text-xs">{data.refilLuminosa ? "Sim" : "Não"}</p>
        </div>
        {data.quantidadeRefil && data.quantidadeRefil !== "0" && data.quantidadeRefil !== 0 && (
          <div className="flex flex-col gap-2xs">
            <p className="font-bold text-xs">Quantidade</p>
            <p className="text-xs">{data.quantidadeRefil}</p>
          </div>
        )}
      </div>

      <Separator className="bg-muted-foreground/20" />

      {data.fotos && data.fotos.length > 0 && (
        <div className="flex flex-col gap-md pt-md">
          <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>
          <ImageCarousel
            pageSize={3}
            images={(data.fotos || []).map((file: File | { url?: string; base64?: string } | string) => {
              if (typeof file === "string") return file;
              if (file instanceof File || file instanceof Blob) return URL.createObjectURL(file);
              if (file && typeof file === "object" && file.url) return file.url;
              if (file && typeof file === "object" && file.base64)
                return `data:image/jpeg;base64,${file.base64}`;
              return "";
            })}
          />
        </div>
      )}

      {data.observacoes && (
        <div className="flex flex-col gap-xs pt-md">
          <p className="text-xs text-grayscale-dark">Observações gerais</p>
          <p className="text-xs text-grayscale-medium leading-relaxed text-justify whitespace-pre-wrap">
            {data.observacoes}
          </p>
        </div>
      )}

      <div className="flex justify-center pt-md">
        <Button
          variant="outline"
          className="min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md text-brand-cta-dark border-brand-cta-dark hover:bg-brand-cta-dark/10"
          onClick={onEdit}
        >
          Editar informações
        </Button>
      </div>
    </div>
  );
};

const MonitoringPointForm = ({
  pointId,
  onSave,
  initialData,
}: {
  pointId: number;
  onSave: (data: MonitoringPointData) => void;
  initialData?: MonitoringPointData;
}) => {
  const [grauInfestacao, setGrauInfestacao] = useState<string | undefined>(
    initialData?.grauInfestacao,
  );
  const [produtoUtilizado, setProdutoUtilizado] = useState(initialData?.produtoUtilizado || "");
  const [adesivaTrocada, setAdesivaTrocada] = useState(initialData?.adesivaTrocada || "");
  const [produto, setProduto] = useState(initialData?.produto || "");
  const [dosagem, setDosagem] = useState(initialData?.dosagem || "");
  const [refilLuminosa, setRefilLuminosa] = useState<string | boolean | undefined>(
    initialData?.refilLuminosa,
  );
  const [quantidadeRefil, setQuantidadeRefil] = useState(initialData?.quantidadeRefil || "");
  const [observacoes, setObservacoes] = useState(initialData?.observacoes || "");
  const [fotos, setFotos] = useState<(File | { url?: string; base64?: string } | string)[]>(initialData?.fotos || []);

  return (
    <div className="flex flex-col gap-md pt-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <SelectInput
          label="Grau de Infestação"
          placeholder="Selecione o grau"
          value={grauInfestacao}
          onChange={setGrauInfestacao}
          options={[
            { label: "Baixo", value: "baixo" },
            { label: "Médio", value: "medio" },
            { label: "Alto", value: "alto" },
          ]}
        />
        <TextInput
          label="Produto Utilizado"
          placeholder="Informe o produto"
          value={produtoUtilizado}
          onChange={setProdutoUtilizado}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <TextInput
          label="Adesiva Trocada"
          placeholder="Informe a quantidade"
          value={adesivaTrocada}
          onChange={setAdesivaTrocada}
        />
      </div>

      <Separator className="bg-muted-foreground/20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <TextInput
          label="Produto"
          placeholder="Informe o produto"
          value={produto}
          onChange={setProduto}
        />
        <TextInput
          label="ml/L ou g/m³"
          placeholder="Informe a dosagem"
          value={dosagem}
          onChange={setDosagem}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md items-start">
        <SelectorGroup
          label="Refil Luminosa"
          value={refilLuminosa}
          onChange={setRefilLuminosa}
          options={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />
        {refilLuminosa && (
          <TextInput
            label="Quantidade(unidades)"
            placeholder="Ex: 2"
            type="number"
            value={quantidadeRefil}
            onChange={setQuantidadeRefil}
          />
        )}
      </div>

      <div className="flex flex-col gap-md pt-md">
        <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>
        <FileUpload id={`fotos-ponto-${pointId}`} onFilesChange={setFotos} initialFiles={fotos} />
        <TextareaInput
          label="Observações gerais"
          placeholder="Registre informações importantes sobre a execução do serviço..."
          value={observacoes}
          onChange={setObservacoes}
        />
      </div>

      <div className="flex justify-center pt-md">
        <Button
          className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md"
          onClick={() =>
            onSave({
              grauInfestacao,
              produtoUtilizado,
              adesivaTrocada,
              produto,
              dosagem,
              refilLuminosa,
              quantidadeRefil,
              observacoes,
              fotos,
            })
          }
        >
          Salvar área
        </Button>
      </div>
    </div>
  );
};

export const MonitoringPointContainer = ({
  pointId,
  externalData,
  onExternalSave,
}: {
  pointId: number;
  externalData?: MonitoringPointData;
  onExternalSave?: (d: MonitoringPointData) => void;
}) => {
  const [isSaved, setIsSaved] = useState(!!externalData);
  const [data, setData] = useState<MonitoringPointData | null>(externalData || null);

  return isSaved ? (
    <MonitoringPointDetails data={data} onEdit={() => setIsSaved(false)} />
  ) : (
    <MonitoringPointForm
      pointId={pointId}
      initialData={data}
      onSave={(d) => {
        setData(d);
        setIsSaved(true);
        if (onExternalSave) onExternalSave(d);
      }}
    />
  );
};
