import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H1 } from "@/atomic/atm.typography";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { DeleteTecnicoDialog } from "@/atomic/obj.delete-tecnico-dialog/delete-tecnico-dialog.component";
import { EditTecnicoDialog } from "@/atomic/obj.edit-tecnico-dialog/edit-tecnico-dialog.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import {
  type CreateTecnicoDTO,
  type Tecnico,
  tecnicosService,
  type UpdateTecnicoDTO,
} from "@/services/tecnicos.service";
import { TecnicosTable } from "./components/TecnicosTable";

const TECHNICIANS_MOCK: Tecnico[] = [
  {
    id: "mock-1",
    nome: "John Doe",
    email: "john.doe@example.com",
    cpfCnpj: "1234567890",
    telefone: "1234567890",
    foto: "https://via.placeholder.com/150",
    observacoes: "Lorem ipsum dolor sit amet",
    status: "ATIVO",
    permissao: "ADMIN",
  },
  {
    id: "mock-2",
    nome: "John Smith",
    email: "john.smith@example.com",
    cpfCnpj: "123.456.789-00",
    telefone: "(11) 99999-9999",
    foto: "https://github.com/shadcn.png",
    observacoes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    status: "INATIVO",
    permissao: "TECNICO",
  },
];

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>(TECHNICIANS_MOCK);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Edit/Create State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState<Tecnico | null>(null);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tecnicoToDelete, setTecnicoToDelete] = useState<Tecnico | null>(null);

  const fetchTecnicos = async () => {
    try {
      setIsLoading(true);
      const data = await tecnicosService.getAll();
      setTecnicos(data);
      setFilteredTecnicos(data);
    } catch (error) {
      console.error("Erro ao buscar técnicos:", error);
      toast.error("Erro ao carregar técnicos");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTecnicos();
  // }, []);

  // useEffect(() => {
  //   const results = tecnicos.filter(
  //     (tecnico) =>
  //       tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       tecnico.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       tecnico.cpfCnpj.includes(searchTerm),
  //   );
  //   setFilteredTecnicos(results);
  // }, [searchTerm, tecnicos]);

  const handleCreate = () => {
    setSelectedTecnico(null);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (tecnico: Tecnico) => {
    setSelectedTecnico(tecnico);
    setIsEditDialogOpen(true);
  };

  const handleSave = async (data: UpdateTecnicoDTO | CreateTecnicoDTO, id?: string) => {
    try {
      if (id) {
        await tecnicosService.update(id, data);
        toast.success("Técnico atualizado com sucesso!");
      } else {
        await tecnicosService.create(data as CreateTecnicoDTO);
        toast.success("Técnico cadastrado com sucesso!");
      }
      fetchTecnicos();
    } catch (error) {
      console.error("Erro ao salvar técnico:", error);
      toast.error("Erro ao salvar técnico");
      throw error;
    }
  };

  const handleDelete = (tecnico: Tecnico) => {
    setTecnicoToDelete(tecnico);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!tecnicoToDelete) return;

    try {
      await tecnicosService.delete(tecnicoToDelete.id);
      toast.success("Técnico excluído com sucesso!");
      fetchTecnicos();
    } catch (error) {
      console.error("Erro ao excluir técnico:", error);
      toast.error("Erro ao excluir técnico");
    } finally {
      setIsDeleteDialogOpen(false);
      setTecnicoToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
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
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              size="lg"
              className="bg-brand-primary-medium hover:bg-brand-primary-dark"
              onClick={handleCreate}
            >
              <Plus className="mr-2 h-5 w-5" />
              Novo
            </Button>
          </div>

          <TecnicosTable tecnicos={filteredTecnicos} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <EditTecnicoDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          tecnico={selectedTecnico}
          onSave={handleSave}
        />

        <DeleteTecnicoDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          tecnico={tecnicoToDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </MainLayout>
  );
};

export default Tecnicos;
