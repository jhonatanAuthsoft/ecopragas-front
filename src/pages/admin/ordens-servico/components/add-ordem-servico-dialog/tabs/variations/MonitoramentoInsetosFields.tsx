import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BeakerFilledIcon } from "@/assets/icons/beaker-filled";
import { BugAntIcon } from "@/assets/icons/bug-ant";
import { PencilSquareFilledIcon } from "@/assets/icons/pencil-square-filled";
import { TrashIcon } from "@/assets/icons/trash";
import { Button } from "@/atomic/atm.button/button.component";
import { MultiSelectInput } from "@/atomic/atm.multi-select-input";
import { SelectInput } from "@/atomic/atm.select-input";
import { TextInput } from "@/atomic/atm.text-input";
import { Body2, H3, H4, InputCaption } from "@/atomic/atm.typography/typography.component";
import { cn } from "@/lib/utils";
import {
  EMPTY_AREA_MONITORAMENTO_INSETOS_DRAFT,
  PRAGA_ALVO_OPTIONS,
  TRATAMENTO_OPTIONS,
} from "../../add-ordem-servico-dialog.data";
import type {
  AreaMonitoramentoInsetosDraft,
  OrdemServicoFormValues,
} from "../../add-ordem-servico-dialog.types";
import {
  getMultiSelectOptionLabels,
  getSelectOptionLabel,
} from "../../add-ordem-servico-dialog.utils";

export const MonitoramentoInsetosFields = () => {
  const { watch, setValue } = useFormContext<OrdemServicoFormValues>();
  const areas = watch("areasMonitoramentoInsetos");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AreaMonitoramentoInsetosDraft>(
    EMPTY_AREA_MONITORAMENTO_INSETOS_DRAFT,
  );

  const trimmedArea = draft.areaMonitorada.trim();
  const canConfirm = trimmedArea.length > 0 && draft.pragasAlvo.length > 0 && !!draft.tratamento;

  const resetForm = () => {
    setIsFormVisible(false);
    setEditingId(null);
    setDraft(EMPTY_AREA_MONITORAMENTO_INSETOS_DRAFT);
  };

  const handleShowForm = () => {
    setEditingId(null);
    setDraft(EMPTY_AREA_MONITORAMENTO_INSETOS_DRAFT);
    setIsFormVisible(true);
  };

  const handleAddOrUpdate = () => {
    if (!canConfirm) return;

    const areaData = {
      areaMonitorada: trimmedArea,
      pragasAlvo: draft.pragasAlvo,
      tratamento: draft.tratamento,
    };

    if (editingId) {
      setValue(
        "areasMonitoramentoInsetos",
        areas.map((area) => (area.id === editingId ? { ...area, ...areaData } : area)),
      );
    } else {
      setValue("areasMonitoramentoInsetos", [...areas, { id: `area-${Date.now()}`, ...areaData }]);
    }

    resetForm();
  };

  const handleEdit = (id: string) => {
    const area = areas.find((item) => item.id === id);
    if (!area) return;

    setEditingId(id);
    setDraft({
      areaMonitorada: area.areaMonitorada ?? "",
      pragasAlvo: area.pragasAlvo ?? [],
      tratamento: area.tratamento ?? "",
    });
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    setValue(
      "areasMonitoramentoInsetos",
      areas.filter((area) => area.id !== id),
    );

    if (editingId === id) {
      resetForm();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddOrUpdate();
    }
  };

  return (
    <>
      <div className="h-px bg-grayscale-light" />
      <div className="flex flex-col gap-xs">
        <div className="flex items-center justify-between">
          <H3>Monitoramento de insetos</H3>
          {!isFormVisible && (
            <Button
              type="button"
              variant="link"
              leftIcon={<PlusIcon className="size-md" />}
              onClick={handleShowForm}
            >
              Adicionar nova área
            </Button>
          )}
        </div>

        {areas.length || isFormVisible ? (
          areas.map((area) => (
            <AreaCard
              key={area.id}
              areaMonitorada={area.areaMonitorada ?? ""}
              pragasAlvo={getMultiSelectOptionLabels(PRAGA_ALVO_OPTIONS, area.pragasAlvo ?? [])}
              tratamento={getSelectOptionLabel(TRATAMENTO_OPTIONS, area.tratamento ?? "")}
              isEditing={editingId === area.id}
              onEdit={() => handleEdit(area.id)}
              onDelete={() => handleDelete(area.id)}
            />
          ))
        ) : (
          <Body2 className="text-grayscale-dark">Nenhuma área monitorada</Body2>
        )}

        {isFormVisible && (
          <AddNewAreaCard
            draft={draft}
            isEditing={!!editingId}
            canConfirm={canConfirm}
            onDraftChange={setDraft}
            onConfirm={handleAddOrUpdate}
            onCancel={resetForm}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </>
  );
};

interface AddNewAreaCardProps {
  draft: AreaMonitoramentoInsetosDraft;
  isEditing: boolean;
  canConfirm: boolean;
  onDraftChange: (draft: AreaMonitoramentoInsetosDraft) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const AddNewAreaCard = ({
  draft,
  isEditing,
  canConfirm,
  onDraftChange,
  onConfirm,
  onCancel,
  onKeyDown,
}: AddNewAreaCardProps) => (
  <div className="flex flex-col gap-md p-md border border-grayscale-light rounded-2xl">
    <div className="flex items-center justify-between">
      <H4 className="text-grayscale-dark">{isEditing ? "Editar área" : "Nova área"}</H4>
    </div>

    <TextInput
      label="Área monitorada"
      placeholder="Ex. Área 1"
      value={draft.areaMonitorada}
      onChange={(value) => onDraftChange({ ...draft, areaMonitorada: value })}
      onKeyDown={onKeyDown}
    />

    <div className="flex flex-col md:flex-row gap-md">
      <MultiSelectInput
        className="w-full max-w-[360px]"
        label="Praga alvo"
        placeholder="Selecione a(s) praga(s)"
        options={PRAGA_ALVO_OPTIONS}
        value={draft.pragasAlvo}
        onChange={(value) => onDraftChange({ ...draft, pragasAlvo: value })}
      />
      <SelectInput
        label="Tratamento"
        placeholder="Selecione o tratamento"
        options={TRATAMENTO_OPTIONS}
        value={draft.tratamento}
        onChange={(value) => onDraftChange({ ...draft, tratamento: value })}
      />
    </div>
    <div className="flex items-center justify-between gap-xs">
      <Button
        type="button"
        className="text-feedback-error-medium hover:text-feedback-error-dark"
        fullWidth
        size="lg"
        variant="link"
        onClick={onCancel}
        leftIcon={<TrashIcon className="size-md" />}
      >
        Limpar campos
      </Button>
      <Button type="button" fullWidth size="lg" onClick={onConfirm} disabled={!canConfirm}>
        Salvar área
      </Button>
    </div>
  </div>
);

interface AreaCardProps {
  areaMonitorada: string;
  pragasAlvo: string;
  tratamento: string;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const AreaCard = ({
  areaMonitorada,
  pragasAlvo,
  tratamento,
  isEditing,
  onEdit,
  onDelete,
}: AreaCardProps) => (
  <div
    className={cn(
      "flex flex-col gap-xs p-md border border-grayscale-light rounded-2xl",
      isEditing && "border-brand-primary-medium bg-brand-primary-light/10",
    )}
  >
    <div className="flex items-center justify-between">
      <H4 className="text-grayscale-dark">{areaMonitorada}</H4>
      <div className="flex items-center gap-xs">
        <button type="button" onClick={onEdit} className="cursor-pointer">
          <PencilSquareFilledIcon className="size-lg text-brand-primary-medium" />
        </button>
        <button type="button" onClick={onDelete} className="cursor-pointer">
          <TrashIcon className="size-lg text-feedback-error-medium" />
        </button>
      </div>
    </div>

    <div className="flex items-center gap-2xs">
      <BugAntIcon className="size-md text-grayscale-dark" />
      <InputCaption>{pragasAlvo}</InputCaption>
      <BeakerFilledIcon className="size-md text-grayscale-dark" />
      <InputCaption>{tratamento}</InputCaption>
    </div>
  </div>
);
