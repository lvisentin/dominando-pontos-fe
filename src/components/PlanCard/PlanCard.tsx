import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
}

const PlanCard = ({ plan, selectPlan, active }: PlanCardProps) => {
  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-bold mb-4">
          {plan.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
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
          className="w-full"
          disabled={active}
        >
          {active ? "Ativo" : "Assinar"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
