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

const MonitoringPointDetails = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <div className="flex flex-col gap-md pt-sm text-grayscale-dark">
      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Grau de Infestação</p>
          <p className="text-xs">Alto</p>
        </div>
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Produto utilizado</p>
          <p className="text-xs">J Sanetização</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Adesiva</p>
          <p className="text-xs">NA</p>
        </div>
      </div>

      <Separator className="bg-muted-foreground/20" />

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Produto</p>
          <p className="text-xs">Hipoalérgico</p>
        </div>
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">ml/L ou g/m³</p>
          <p className="text-xs">1000</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Refil Luminosa</p>
          <p className="text-xs">Sim</p>
        </div>
        <div className="flex flex-col gap-2xs">
          <p className="font-bold text-xs">Quantidade</p>
          <p className="text-xs">12</p>
        </div>
      </div>

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

const MonitoringPointForm = ({ pointId, onSave }: { pointId: number; onSave: () => void }) => {
  const [refilLuminosa, setRefilLuminosa] = useState<boolean | undefined>(undefined);

  return (
    <div className="flex flex-col gap-md pt-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <SelectInput
          label="Grau de Infestação"
          placeholder="Selecione o grau"
          options={[
            { label: "Baixo", value: "baixo" },
            { label: "Médio", value: "medio" },
            { label: "Alto", value: "alto" },
          ]}
        />
        <TextInput label="Produto Utilizado" placeholder="Informe o produto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <TextInput label="Adesiva Trocada" placeholder="Informe a quantidade" />
      </div>

      <Separator className="bg-muted-foreground/20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <TextInput label="Produto" placeholder="Informe o produto" />
        <TextInput label="ml/L ou g/m³" placeholder="Informe a dosagem" />
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
          <TextInput label="Quantidade(unidades)" placeholder="Ex: 2" type="number" />
        )}
      </div>

      <div className="flex flex-col gap-md pt-md">
        <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>
        <FileUpload
          id={`fotos-ponto-${pointId}`}
          onFilesChange={(files) => console.log(`Files for point ${pointId}:`, files)}
        />
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
          Salvar área
        </Button>
      </div>
    </div>
  );
};

export const MonitoringPointContainer = ({ pointId }: { pointId: number }) => {
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <MonitoringPointDetails onEdit={() => setIsSaved(false)} />
  ) : (
    <MonitoringPointForm pointId={pointId} onSave={() => setIsSaved(true)} />
  );
};
