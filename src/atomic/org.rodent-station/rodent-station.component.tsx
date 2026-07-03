import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/atomic/atm.button/button.component";
import { FileUpload } from "@/atomic/atm.file-upload";
import { SelectorGroup } from "@/atomic/atm.selector-group";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { TextInput } from "@/atomic/atm.text-input/text-input.component";
import { TextareaInput } from "@/atomic/atm.textarea-input/textarea-input.component";
import { H3 } from "@/atomic/atm.typography";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/atomic/mol.accordion/accordion.component";
import { Trash2 } from "lucide-react";
import { ImageCarousel } from "@/atomic/mol.image-carousel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { useIsMobile } from "@/hooks/use-mobile";

const RodentStationDetails = ({ data, onEdit }: { data: any, onEdit: () => void }) => {
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

      {data.controles && data.controles.length > 0 && (
        <>
          <H3 className="text-grayscale-dark font-bold text-lg">Controle</H3>
          {isMobile ? (
            <div className="flex flex-col gap-sm">
              {data.controles.map((ctrl: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-sm border border-grayscale-light rounded-md p-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">Produto</span>
                    <span className="text-xs">{ctrl.produto || "Não informado"}</span>
                  </div>
                  {ctrl.quantidade && ctrl.quantidade !== "0" && ctrl.quantidade !== 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs">Quantidade</span>
                      <span className="text-xs">{ctrl.quantidade}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-grayscale-light overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-bold h-auto py-sm text-xs">Produto</TableHead>
                    {data.controles.some((c: any) => c.quantidade && c.quantidade !== "0" && c.quantidade !== 0) && (
                      <TableHead className="font-bold h-auto py-sm text-xs text-right">Quantidade</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.controles.map((ctrl: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-transparent border-0">
                      <TableCell className="py-md text-xs">{ctrl.produto || "Não informado"}</TableCell>
                      {data.controles.some((c: any) => c.quantidade && c.quantidade !== "0" && c.quantidade !== 0) && (
                        <TableCell className="py-md text-xs text-right">{ctrl.quantidade && ctrl.quantidade !== "0" && ctrl.quantidade !== 0 ? ctrl.quantidade : "-"}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <Separator className="bg-muted-foreground/20" />
        </>
      )}

      {data.pontos && data.pontos.length > 0 && (
        <>
          <H3 className="text-grayscale-dark font-bold text-lg">Pontos Variáveis</H3>
          {isMobile ? (
            <div className="flex flex-col gap-sm">
              {data.pontos.map((pnt: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-sm border border-grayscale-light rounded-md p-md">
                  <div className="flex flex-col gap-2xs pb-sm border-b border-grayscale-light/30">
                    <span className="font-bold text-xs">Local</span>
                    <span className="text-xs">{pnt.local || "Não informado"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">Produto</span>
                    <span className="text-xs">{pnt.produto || "Não informado"}</span>
                  </div>
                  {pnt.quantidade && pnt.quantidade !== "0" && pnt.quantidade !== 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs">Quantidade</span>
                      <span className="text-xs">{pnt.quantidade}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-grayscale-light overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-bold h-auto py-sm text-xs">Local</TableHead>
                    <TableHead className="font-bold h-auto py-sm text-xs">Produto</TableHead>
                    {data.pontos.some((p: any) => p.quantidade && p.quantidade !== "0" && p.quantidade !== 0) && (
                      <TableHead className="font-bold h-auto py-sm text-xs text-right">Quantidade</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.pontos.map((pnt: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-transparent border-0">
                      <TableCell className="py-md text-xs">{pnt.local || "Não informado"}</TableCell>
                      <TableCell className="py-md text-xs">{pnt.produto || "Não informado"}</TableCell>
                      {data.pontos.some((p: any) => p.quantidade && p.quantidade !== "0" && p.quantidade !== 0) && (
                        <TableCell className="py-md text-xs text-right">{pnt.quantidade && pnt.quantidade !== "0" && pnt.quantidade !== 0 ? pnt.quantidade : "-"}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <Separator className="bg-muted-foreground/20" />
        </>
      )}

      {data.fotosServico && data.fotosServico.length > 0 && (
        <div className="flex flex-col gap-md">
          <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>
          <ImageCarousel
            pageSize={3}
            images={data.fotosServico.map((file: any) => {
              if (typeof file === "string") return file;
              if (file instanceof File || file instanceof Blob) return URL.createObjectURL(file);
              if (file && typeof file === "object" && file.url) return file.url;
              if (file && typeof file === "object" && file.base64) return `data:image/jpeg;base64,${file.base64}`;
              return "";
            })}
          />
        </div>
      )}

      {data.fotosPortaIsca && data.fotosPortaIsca.length > 0 && (
        <div className="flex flex-col gap-md pt-md">
          <H3 className="text-grayscale-dark font-bold text-lg">Fotos Porta-isca</H3>
          <ImageCarousel
            pageSize={3}
            images={data.fotosPortaIsca.map((file: any) => {
              if (typeof file === "string") return file;
              if (file instanceof File || file instanceof Blob) return URL.createObjectURL(file);
              if (file && typeof file === "object" && file.url) return file.url;
              if (file && typeof file === "object" && file.base64) return `data:image/jpeg;base64,${file.base64}`;
              return "";
            })}
          />
        </div>
      )}

      <div className="flex flex-col gap-xs pt-md">
        <p className="text-xs text-grayscale-dark">Observações gerais</p>
        <p className="text-xs text-grayscale-medium leading-relaxed text-justify whitespace-pre-wrap">
          {data.observacoes || "Nenhuma observação informada."}
        </p>
      </div>
    </div>
  );
};

const RodentStationForm = ({ pointId, onSave, initialData }: { pointId: number; onSave: (d: any) => void; initialData?: any }) => {
  const [portaIsca, setPortaIsca] = useState<string | undefined>(initialData?.portaIsca);
  const [adhesiveTrap, setAdhesiveTrap] = useState<string | undefined>(initialData?.adhesiveTrap);
  
  const [controles, setControles] = useState<{id: string, produto: string, quantidade: string}[]>(initialData?.controles || []);
  const [currentControle, setCurrentControle] = useState({ id: "draft", produto: "", quantidade: "" });

  const [pontos, setPontos] = useState<{id: string, local: string, produto: string, quantidade: string}[]>(initialData?.pontos || []);
  const [currentPonto, setCurrentPonto] = useState({ id: "draft", local: "", produto: "", quantidade: "" });
  
  const [observacoes, setObservacoes] = useState(initialData?.observacoes || "");
  const [fotosServico, setFotosServico] = useState<File[]>(initialData?.fotosServico || []);
  const [fotosPortaIsca, setFotosPortaIsca] = useState<File[]>(initialData?.fotosPortaIsca || []);

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
        <TextInput label="Produto" placeholder="Informe o produto" value={currentControle.produto} onChange={(v) => setCurrentControle(prev => ({ ...prev, produto: v }))} />
        <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" value={currentControle.quantidade} onChange={(v) => setCurrentControle(prev => ({ ...prev, quantidade: v }))} />
      </div>

      <Button
        variant="link"
        onClick={() => {
          setControles(prev => [...prev, { ...currentControle, id: Date.now().toString() }]);
          setCurrentControle({ id: "draft", produto: "", quantidade: "" });
        }}
        className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
      >
        <Plus size={16} />
        Adicionar outro controle
      </Button>

      {controles.length > 0 && (
        <Accordion type="single" collapsible className="w-full flex flex-col gap-md mb-md">
          {controles.map((ctrl, index) => (
            <AccordionItem key={ctrl.id} value={`controle-${ctrl.id}`} className="bg-white rounded-large! border border-muted-foreground/20 px-xl">
              <AccordionTrigger className="hover:no-underline py-md">
                <div className="flex items-center justify-between w-full pr-sm">
                  <div className="flex flex-col items-start gap-2xs text-left">
                    <span className="font-bold text-grayscale-dark text-md">Controle {index + 1}</span>
                    <span className="text-grayscale-medium text-xs font-normal">{ctrl.produto || "Sem produto"}</span>
                  </div>
                  <Button variant="ghost" className="p-2 h-auto text-feedback-error-medium" onClick={(e) => { e.stopPropagation(); setControles(prev => prev.filter(c => c.id !== ctrl.id)); }}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-md pb-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <TextInput label="Produto" placeholder="Informe o produto" value={ctrl.produto} onChange={(v) => setControles(prev => prev.map(c => c.id === ctrl.id ? { ...c, produto: v } : c))} />
                  <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" value={ctrl.quantidade} onChange={(v) => setControles(prev => prev.map(c => c.id === ctrl.id ? { ...c, quantidade: v } : c))} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Separator className="bg-muted-foreground/20" />

      <H3 className="text-grayscale-dark font-bold text-lg">Pontos Variáveis</H3>

      <div className="flex flex-col gap-md">
        <TextInput label="Local" placeholder="Informe o local" className="w-full" value={currentPonto.local} onChange={(v) => setCurrentPonto(prev => ({ ...prev, local: v }))} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <TextInput label="Produto" placeholder="Informe o produto" value={currentPonto.produto} onChange={(v) => setCurrentPonto(prev => ({ ...prev, produto: v }))} />
          <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" value={currentPonto.quantidade} onChange={(v) => setCurrentPonto(prev => ({ ...prev, quantidade: v }))} />
        </div>
      </div>

      <Button
        variant="link"
        onClick={() => {
          setPontos(prev => [...prev, { ...currentPonto, id: Date.now().toString() }]);
          setCurrentPonto({ id: "draft", local: "", produto: "", quantidade: "" });
        }}
        className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
      >
        <Plus size={16} />
        Adicionar outro ponto
      </Button>

      {pontos.length > 0 && (
        <Accordion type="single" collapsible className="w-full flex flex-col gap-md mb-md mt-sm">
          {pontos.map((pnt, index) => (
            <AccordionItem key={pnt.id} value={`ponto-${pnt.id}`} className="bg-white rounded-large! border border-muted-foreground/20 px-xl">
              <AccordionTrigger className="hover:no-underline py-md">
                <div className="flex items-center justify-between w-full pr-sm">
                  <div className="flex flex-col items-start gap-2xs text-left">
                    <span className="font-bold text-grayscale-dark text-md">Ponto {index + 1}</span>
                    <span className="text-grayscale-medium text-xs font-normal">{pnt.local || "Sem local"}</span>
                  </div>
                  <Button variant="ghost" className="p-2 h-auto text-feedback-error-medium" onClick={(e) => { e.stopPropagation(); setPontos(prev => prev.filter(p => p.id !== pnt.id)); }}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-md pb-xl">
                <div className="flex flex-col gap-md">
                  <TextInput label="Local" placeholder="Informe o local" className="w-full" value={pnt.local} onChange={(v) => setPontos(prev => prev.map(p => p.id === pnt.id ? { ...p, local: v } : p))} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <TextInput label="Produto" placeholder="Informe o produto" value={pnt.produto} onChange={(v) => setPontos(prev => prev.map(p => p.id === pnt.id ? { ...p, produto: v } : p))} />
                    <TextInput label="Quantidade" placeholder="Informe a quantidade" type="number" value={pnt.quantidade} onChange={(v) => setPontos(prev => prev.map(p => p.id === pnt.id ? { ...p, quantidade: v } : p))} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Separator className="bg-muted-foreground/20" />

      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <p className="text-xs font-medium text-grayscale-dark">Fotos do Serviço</p>
          <FileUpload
            id={`fotos-servico-roedores-${pointId}`}
            onFilesChange={setFotosServico}
            initialFiles={fotosServico}
          />
        </div>

        <div className="flex flex-col gap-xs">
          <p className="text-xs font-medium text-grayscale-dark">Porta-isca</p>
          <FileUpload
            id={`fotos-porta-isca-${pointId}`}
            onFilesChange={setFotosPortaIsca}
            initialFiles={fotosPortaIsca}
          />
        </div>

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
          onClick={() => {
            const allControles = [...controles];
            if (currentControle.produto || currentControle.quantidade) allControles.push(currentControle);
            const allPontos = [...pontos];
            if (currentPonto.local || currentPonto.produto || currentPonto.quantidade) allPontos.push(currentPonto);
            onSave({ portaIsca, adhesiveTrap, controles: allControles, pontos: allPontos, observacoes, fotosServico, fotosPortaIsca });
          }}
        >
          Salvar estação
        </Button>
      </div>
    </div>
  );
};

export const RodentStationContainer = ({ stationId, externalData, onExternalSave }: { stationId: number, externalData?: any, onExternalSave?: (d: any) => void }) => {
  const [isSaved, setIsSaved] = useState(!!externalData);
  const [data, setData] = useState<any>(externalData || null);

  return isSaved ? (
    <RodentStationDetails data={data} onEdit={() => setIsSaved(false)} />
  ) : (
    <RodentStationForm pointId={stationId} initialData={data} onSave={(d) => { 
      setData(d); 
      setIsSaved(true); 
      if (onExternalSave) onExternalSave(d);
    }} />
  );
};
