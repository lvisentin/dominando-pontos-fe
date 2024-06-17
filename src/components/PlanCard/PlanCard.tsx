import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  benefits: string[];
}

export interface PlanCardProps {
  selectPlan: (planId: number) => void;
  plan: Plan;
  active: boolean;
  loading: boolean;
}

const PlanCard = ({ plan, selectPlan, active, loading }: PlanCardProps) => {
  return (
    <Card className=" w-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-bold mb-4">
          {plan.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}/mês
        </h1>
          
        <ul className="list-disc mb-4 pl-4">
          {plan.benefits.map((benefit, index) => (
            <li key={index}>
              <p dangerouslySetInnerHTML={{ __html: benefit }}></p>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => selectPlan(plan.id)}
          className={`w-full ${loading && 'bg-white border border-primary'}`}
          disabled={active || loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            : (active ? "Ativo" : "Assinar")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
