import DataTable from "@/components/DataTable/DataTable";
import { TableColumn } from "@/components/DataTable/DataTable.model";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { categoriesService } from "@/services/categories/CategoriesService";
import { Category } from "@/services/categories/categories.model";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Config = () => {
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const fetchCategories = () => {
    setLoading(true);
    categoriesService
      .listAll()
      .then((r) => {
        setAllCategories(r);
      })
      .catch(() => toast({ description: "Ocorreu um erro" }))
      .finally(() => setLoading(false));
  };

  const toggleCategory = (category: Category) => {
    categoriesService
      .toggleCategory(category.key)
      .then(() => fetchCategories())
      .catch(() => toast({ description: "Ocorreu um erro" }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns: TableColumn[] = [
    {
      field: "name",
      name: "Categoria",
    },
    {
      field: "status",
      name: "Ativo",
      transformData: (data: Category) => {
        return (
          <Switch
            checked={data.active}
            onCheckedChange={() => toggleCategory(data)}
          />
        );
      },
    },
  ];

  return (
    <div className="flex flex-col text-left ">
      <h1 className="text-base mb-2 font-bold">Alertas de promoções</h1>
      <h2 className="text-base mb-4">
        Selecione as categorias que você gostaria de receber alertas.
      </h2>

      {loading ? (
        <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" />
      ) : (
        <DataTable columns={columns} data={allCategories} />
      )}
    </div>
  );
};

export default Config;
