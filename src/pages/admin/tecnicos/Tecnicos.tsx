import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { Tecnico, tecnicosService } from "@/services/tecnicos.service";
import { TecnicosTable } from "./components/TecnicosTable";

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const handleEdit = (tecnico: Tecnico) => {
    console.log("Edit", tecnico);
  };

  const handleDelete = (tecnico: Tecnico) => {
    console.log("Delete", tecnico);
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
            <Button size="lg" className="bg-brand-primary-medium hover:bg-brand-primary-dark">
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
      </div>
    </MainLayout>
  );
};

export default Tecnicos;
