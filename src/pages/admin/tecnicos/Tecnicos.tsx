import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { Tecnico, tecnicosService, UpdateTecnicoDTO, CreateTecnicoDTO } from "@/services/tecnicos.service";
import { TecnicosTable } from "./components/TecnicosTable";
import { EditTecnicoDialog } from "@/atomic/obj.edit-tecnico-dialog/edit-tecnico-dialog.component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/atomic/mol.alert-dialog/alert-dialog.component";

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);
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

  useEffect(() => {
    fetchTecnicos();
  }, []);

  useEffect(() => {
    const results = tecnicos.filter((tecnico) =>
      tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnico.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnico.cpfCnpj.includes(searchTerm)
    );
    setFilteredTecnicos(results);
  }, [searchTerm, tecnicos]);

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Técnicos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os técnicos vinculados a Plataforma
            </p>
          </div>
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
          
          <TecnicosTable 
            tecnicos={filteredTecnicos} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <EditTecnicoDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          tecnico={selectedTecnico}
          onSave={handleSave}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente o técnico
                <span className="font-bold text-foreground"> {tecnicoToDelete?.nome} </span>
                e removerá seus dados de nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-feedback-error-medium hover:bg-feedback-error-dark text-white"
              >
                Sim, excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default Tecnicos;
