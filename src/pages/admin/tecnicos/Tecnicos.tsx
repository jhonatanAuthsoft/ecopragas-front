import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { DeleteTecnicoDialog } from "@/atomic/obj.delete-tecnico-dialog/delete-tecnico-dialog.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import type { CadastrarTecnicoInput, Tecnico } from "@/model/rest/tecnico";
import { TecnicosTable } from "./components/TecnicosTable";
import { TecnicoFormDialog } from "./components/tecnico-form-dialog";
import { MOCK_TECNICOS } from "./tecnicos.mock";

const createTecnicoId = () => `tecnico-${crypto.randomUUID()}`;

const Tecnicos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tecnicos, setTecnicos] = useState<Tecnico[]>(MOCK_TECNICOS);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState<Tecnico | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tecnicoToDelete, setTecnicoToDelete] = useState<Tecnico | null>(null);

  const filteredTecnicos = tecnicos.filter(
    (tecnico) =>
      (tecnico.nome ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tecnico.email ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tecnico.cpf ?? "").includes(searchTerm.replace(/\D/g, "")),
  );

  const handleCreateButtonClick = () => {
    setSelectedTecnico(null);
    setIsEditDialogOpen(true);
  };

  const handleEditButtonClick = (tecnico: Tecnico) => {
    setSelectedTecnico(tecnico);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = async (data: CadastrarTecnicoInput, id?: string) => {
    if (id) {
      setTecnicos((prev) =>
        prev.map((tecnico) =>
          tecnico.id === id
            ? {
                ...tecnico,
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                fotoUrl: data.fotoUrl,
              }
            : tecnico,
        ),
      );
      toast.success("Tecnico atualizado com sucesso!");
    } else {
      const newTecnico: Tecnico = {
        id: createTecnicoId(),
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        fotoUrl: data.fotoUrl,
      };
      setTecnicos((prev) => [newTecnico, ...prev]);
      toast.success("Tecnico cadastrado com sucesso!");
    }
  };

  const handleDeleteButtonClick = (tecnico: Tecnico) => {
    setTecnicoToDelete(tecnico);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!tecnicoToDelete) return;

    setTecnicos((prev) => prev.filter((tecnico) => tecnico.id !== tecnicoToDelete.id));
    toast.success("Tecnico excluido com sucesso!");
    setIsDeleteDialogOpen(false);
    setTecnicoToDelete(null);
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
              onChange={setSearchTerm}
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
            tecnicos={filteredTecnicos}
            onEdit={handleEditButtonClick}
            onDelete={handleDeleteButtonClick}
          />
        </div>

        <TecnicoFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          tecnico={selectedTecnico}
          onSubmit={handleSubmit}
        />

        <DeleteTecnicoDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          tecnico={tecnicoToDelete}
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  );
};

export default Tecnicos;
