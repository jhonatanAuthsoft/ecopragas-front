import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckIcon } from "@/assets/icons/check";
import { PencilSquareFilledIcon } from "@/assets/icons/pencil-square-filled";
import { TrashIcon } from "@/assets/icons/trash";
import { TextInput } from "@/atomic/atm.text-input";
import { H3, H4 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";
import type { OrdemServicoFormValues } from "../../add-ordem-servico-dialog.types";

export const MonitoramentoRoedoresFields = () => {
  const { watch, setValue } = useFormContext<OrdemServicoFormValues>();
  const estacoes = watch("estacoesMonitoramento");

  const [draftNome, setDraftNome] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const trimmedDraft = draftNome.trim();
  const canConfirm = trimmedDraft.length > 0;

  const handleAddOrUpdate = () => {
    if (!canConfirm) return;

    if (editingId) {
      setValue(
        "estacoesMonitoramento",
        estacoes.map((estacao) =>
          estacao.id === editingId ? { ...estacao, nome: trimmedDraft } : estacao,
        ),
      );
      setEditingId(null);
    } else {
      setValue("estacoesMonitoramento", [
        ...estacoes,
        { id: `estacao-${Date.now()}`, nome: trimmedDraft },
      ]);
    }

    setDraftNome("");
  };

  const handleEdit = (id: string, nome: string) => {
    setEditingId(id);
    setDraftNome(nome);
  };

  const handleDelete = (id: string) => {
    setValue(
      "estacoesMonitoramento",
      estacoes.filter((estacao) => estacao.id !== id),
    );

    if (editingId === id) {
      setEditingId(null);
      setDraftNome("");
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
      <div className="flex flex-col gap-md">
        <H3>Estações de Monitoramento</H3>
        <div className="flex flex-col gap-xs">
          <TextInput
            placeholder={editingId ? "Edite o nome da estação..." : "Adicione uma estação..."}
            value={draftNome}
            onChange={setDraftNome}
            onKeyDown={handleKeyDown}
            iconRight={
              canConfirm ? (
                <button type="button" onClick={handleAddOrUpdate} className="cursor-pointer">
                  <CheckIcon className="text-feedback-success-medium" />
                </button>
              ) : undefined
            }
          />

          {estacoes.map((estacao) => (
            <EstacaoCard
              key={estacao.id}
              nome={estacao.nome}
              isEditing={editingId === estacao.id}
              onEdit={() => handleEdit(estacao.id, estacao.nome)}
              onDelete={() => handleDelete(estacao.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

interface EstacaoCardProps {
  nome: string;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const EstacaoCard = ({ nome, isEditing, onEdit, onDelete }: EstacaoCardProps) => (
  <div
    className={cn(
      "flex justify-between p-md border border-grayscale-light rounded-2xl",
      isEditing && "border-brand-primary-medium bg-brand-primary-light/10",
    )}
  >
    <H4 className="text-grayscale-dark">{nome}</H4>
    <div className="flex items-center gap-xs">
      <button type="button" onClick={onEdit} className="cursor-pointer">
        <PencilSquareFilledIcon className="size-lg text-brand-primary-medium" />
      </button>
      <button type="button" onClick={onDelete} className="cursor-pointer">
        <TrashIcon className="text-feedback-error-medium" />
      </button>
    </div>
  </div>
);
