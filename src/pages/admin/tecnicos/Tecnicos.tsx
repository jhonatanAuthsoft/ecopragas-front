import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { DeleteTecnicoDialog } from "@/atomic/obj.delete-tecnico-dialog/delete-tecnico-dialog.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import {
  useCreateTecnico,
  useDeleteTecnico,
  useEditTecnico,
  useListTecnicos,
} from "@/domain/tecnico";
import { useDebounce } from "@/hooks/use-debounce";
import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { TecnicosTable } from "./components/TecnicosTable";
import { TecnicoFormDialog } from "./components/tecnico-form-dialog";

const PAGE_SIZE = 5;

const Tecnicos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [page, setPage] = useState(0);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState<Tecnico | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tecnicoToDelete, setTecnicoToDelete] = useState<Tecnico | null>(null);

  const { tecnicos, pagination, listTecnicosError, isListTecnicosLoading } = useListTecnicos({
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    searchText: debouncedSearch.trim() || undefined,
  });

  const { createTecnico, isCreateTecnicoLoading } = useCreateTecnico({
    onSuccess: () => {
      toast.success("Tecnico cadastrado com sucesso!");
      setPage(0);
      setIsEditDialogOpen(false);
    },
  });
  const { editTecnico, isEditTecnicoLoading } = useEditTecnico({
    onSuccess: () => {
      toast.success("Tecnico atualizado com sucesso!");
      setIsEditDialogOpen(false);
    },
  });
  const { deleteTecnico, isDeleteTecnicoLoading } = useDeleteTecnico({
    onSuccess: () => {
      toast.success("Tecnico excluido com sucesso!");
      setIsDeleteDialogOpen(false);
      setTecnicoToDelete(null);
    },
  });

  const currentPage = page + 1;

  const handleCreateButtonClick = () => {
    setSelectedTecnico(null);
    setIsEditDialogOpen(true);
  };

  const handleEditButtonClick = (tecnico: Tecnico) => {
    setSelectedTecnico(tecnico);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = (data: CadastrarTecnicoInput, id?: string) => {
    if (id) {
      editTecnico({ id, body: data });
      return;
    }

    createTecnico(data);
  };

  const handleDeleteButtonClick = (tecnico: Tecnico) => {
    setTecnicoToDelete(tecnico);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!tecnicoToDelete?.id) return;
    deleteTecnico({ id: tecnicoToDelete.id });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <H1>Técnicos</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Gerencie os técnicos vinculados a plataforma
          </Body1>
        </div>

        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Buscar por nome, e-mail ou CPF/CNPJ..."
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setPage(0);
              }}
            />
            <Button
              size="lg"
              leftIcon={<Plus className="size-md" />}
              onClick={handleCreateButtonClick}
            >
              Novo
            </Button>
          </div>

          <TecnicosTable
            tecnicos={tecnicos}
            currentPage={currentPage}
            totalPages={pagination?.totalPages ?? 1}
            isLoading={isListTecnicosLoading}
            error={!!listTecnicosError}
            onPageChange={(nextPage) => setPage(nextPage - 1)}
            onEdit={handleEditButtonClick}
            onDelete={handleDeleteButtonClick}
          />
        </div>

        <TecnicoFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          tecnico={selectedTecnico}
          isSubmitting={isCreateTecnicoLoading || isEditTecnicoLoading}
          onSubmit={handleSubmit}
        />

        <DeleteTecnicoDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          tecnico={tecnicoToDelete}
          onConfirm={handleDelete}
          isLoading={isDeleteTecnicoLoading}
        />
      </div>
    </MainLayout>
  );
};

export default Tecnicos;
