import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { FileUpload } from "@/atomic/atm.file-upload";
import { SelectorGroup } from "@/atomic/atm.selector-group";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { TextInput } from "@/atomic/atm.text-input/text-input.component";
import { TextareaInput } from "@/atomic/atm.textarea-input/textarea-input.component";
import { H3 } from "@/atomic/atm.typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { useIsMobile } from "@/hooks/use-mobile";

const RodentStationDetails = ({ onEdit }: { onEdit: () => void }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-md pt-sm text-grayscale-dark">
      <SelectorGroup
        label="Porta Isca Raticida"
        value={"consumida"}
        options={[
          { label: "Isca Consumida", value: "consumida" },
          { label: "Isca Danificada", value: "danificada" },
          { label: "Isca Extraviada", value: "extraviada" },
          { label: "Porta Isca Extraviado", value: "porta_isca_extraviado" },
          { label: "Isca em conformidade", value: "conformidade" },
        ]}
        className="pointer-events-none"
      />
      <SelectorGroup
        label="Armadilha Adesiva"
        value={"conformidade"}
        options={[
          { label: "Cola danificada", value: "cola_danificada" },
          { label: "Porta adesivo Quebrado", value: "porta_adesivo_quebrado" },
          { label: "Porta adesivo extraviado", value: "porta_adesivo_extraviado" },
          { label: "Em conformidade", value: "conformidade" },
        ]}
        className="pointer-events-none"
      />

      <Separator className="bg-muted-foreground/20" />

      <H3 className="text-grayscale-dark font-bold text-lg">Controle</H3>
      {isMobile ? (
        <div className="flex flex-col gap-sm border border-grayscale-light rounded-md p-md">
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs">Produto</span>
            <span className="text-xs">Raticida Granulado</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs">Quantidade</span>
            <span className="text-xs">2</span>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-grayscale-light overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold h-auto py-sm text-xs">Produto</TableHead>
                <TableHead className="font-bold h-auto py-sm text-xs text-right">
                  Quantidade
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent border-0">
                <TableCell className="py-md text-xs">Raticida Granulado</TableCell>
                <TableCell className="py-md text-xs text-right">2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <Separator className="bg-muted-foreground/20" />

      <H3 className="text-grayscale-dark font-bold text-lg">Pontos Variáveis</H3>
      {isMobile ? (
        <div className="flex flex-col gap-sm border border-grayscale-light rounded-md p-md">
          <div className="flex flex-col gap-2xs pb-sm border-b border-grayscale-light/30">
            <span className="font-bold text-xs">Local</span>
            <span className="text-xs">Despensa Principal</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs">Produto</span>
            <span className="text-xs">Bloco Parafinado</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xs">Quantidade</span>
            <span className="text-xs">1</span>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-grayscale-light overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold h-auto py-sm text-xs">Local</TableHead>
                <TableHead className="font-bold h-auto py-sm text-xs">Produto</TableHead>
                <TableHead className="font-bold h-auto py-sm text-xs text-right">
                  Quantidade
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent border-0">
                <TableCell className="py-md text-xs">Despensa Principal</TableCell>
                <TableCell className="py-md text-xs">Bloco Parafinado</TableCell>
                <TableCell className="py-md text-xs text-right">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <Separator className="bg-muted-foreground/20" />

      <div className="flex flex-col gap-md">
        <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>
        <div className="grid grid-cols-3 gap-xs">
          {[1, 2, 3].map((img) => (
            <div
              key={img}
              className="aspect-[3/2] bg-grayscale-x-dark rounded-md flex flex-col items-center justify-center text-white p-xs text-center relative overflow-hidden"
            >
              <div
                className="absolute inset-0 border-[0.5px] border-white/20"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)",
                }}
              ></div>
              <span className="text-2xl font-bold z-10">3:2</span>
              <span className="text-[8px] z-10">Replace with Image</span>
              <span className="text-[6px] z-10">@solo_cube's aspect ratio keeper</span>
            </div>
          ))}
        </div>

        {/* Pagination Mock */}
        <div className="flex items-center justify-center gap-md text-xs text-grayscale-medium pt-sm">
          <button className="flex items-center gap-xs text-grayscale-light hover:text-grayscale-medium transition-colors">
            <ArrowLeft size={12} /> Anterior
          </button>
          <div className="flex items-center gap-sm">
            <button className="w-6 h-6 rounded-sm bg-brand-primary-medium text-white flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark">
              2
            </button>
            <span>...</span>
            <button className="w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark">
              3
            </button>
          </div>
          <button className="flex items-center gap-xs text-grayscale-x-dark hover:text-grayscale-dark transition-colors font-medium">
            Seguinte <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-xs pt-md">
        <p className="text-xs text-grayscale-dark">Observações gerais</p>
        <p className="text-xs text-grayscale-medium leading-relaxed text-justify">
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
          pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
          bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum
          tellus.
        </p>
        <p className="text-xs text-grayscale-medium leading-relaxed text-justify mt-sm">
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed
          ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
          sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus,
          porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum
          eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis
          eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae
          facilisis nisi, ac posuere leo.
        </p>
      </div>
    </div>
  );
};

const RodentStationForm = ({ pointId, onSave }: { pointId: number; onSave: () => void }) => {
  const [portaIsca, setPortaIsca] = useState<string | undefined>(undefined);
  const [adhesiveTrap, setAdhesiveTrap] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-md pt-sm">
      <SelectorGroup
        label="Porta Isca Raticida"
        value={portaIsca}
        onChange={setPortaIsca}
        options={[
          { label: "Isca Consumida", value: "consumida" },
          { label: "Isca Danificada", value: "danificada" },
          { label: "Isca Extraviada", value: "extraviada" },
          { label: "Porta Isca Extraviado", value: "porta_isca_extraviado" },
          { label: "Isca em conformidade", value: "conformidade" },
        ]}
      />
      <SelectorGroup
        label="Armadilha Adesiva"
        value={adhesiveTrap}
        onChange={setAdhesiveTrap}
        options={[
          { label: "Cola danificada", value: "cola_danificada" },
          { label: "Porta adesivo Quebrado", value: "porta_adesivo_quebrado" },
          { label: "Porta adesivo extraviado", value: "porta_adesivo_extraviado" },
          { label: "Em conformidade", value: "conformidade" },
        ]}
      />

      <Separator className="bg-muted-foreground/20" />

      <H3 className="text-grayscale-dark font-bold text-lg">Controle</H3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <TextInput label="Produto" placeholder="Informe o produto" />
        <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" />
      </div>

      <Button
        variant="link"
        className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
      >
        <Plus size={16} />
        Adicionar outro controle
      </Button>

      <Separator className="bg-muted-foreground/20" />

      <H3 className="text-grayscale-dark font-bold text-lg">Pontos Variáveis</H3>

      <div className="flex flex-col gap-md">
        <TextInput label="Local" placeholder="Informe o local" className="w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <TextInput label="Produto" placeholder="Informe o produto" />
          <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" />
        </div>
      </div>

      <Button
        variant="link"
        className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
      >
        <Plus size={16} />
        Adicionar outro ponto
      </Button>

      <Separator className="bg-muted-foreground/20" />

      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <p className="text-xs font-medium text-grayscale-dark">Fotos do Serviço</p>
          <FileUpload
            id={`fotos-servico-roedores-${pointId}`}
            onFilesChange={(files) => console.log(`Files for service point ${pointId}:`, files)}
          />
        </div>

        <div className="flex flex-col gap-xs">
          <p className="text-xs font-medium text-grayscale-dark">Porta-isca</p>
          <FileUpload
            id={`fotos-porta-isca-${pointId}`}
            onFilesChange={(files) => console.log(`Files for trap point ${pointId}:`, files)}
          />
        </div>

        <TextareaInput
          label="Observações gerais"
          placeholder="Registre informações importantes sobre a execução do serviço..."
        />
      </div>

      <div className="flex justify-center pt-md">
        <Button
          className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md"
          onClick={onSave}
        >
          Salvar estação
        </Button>
      </div>
    </div>
  );
};

export const RodentStationContainer = ({ stationId }: { stationId: number }) => {
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <RodentStationDetails onEdit={() => setIsSaved(false)} />
  ) : (
    <RodentStationForm pointId={stationId} onSave={() => setIsSaved(true)} />
  );
};
