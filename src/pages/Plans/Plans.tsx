import PlanCard, { Plan } from "@/components/PlanCard/PlanCard";
import { userService } from "@/services/user/UserService";

const Plans = () => {
  const activePlan = JSON.parse(localStorage.getItem("userData")!).planId;
  const plans: Plan[] = [
    {
      id: 7,
      name: "Plano Start",
      description:
        "Ideal para viajantes que querem explorar novos destinos sem gastar muito. Receba alertas personalizados para garantir as melhore emissões de passagens com milhas!",
      price: 29.9,
      benefits: [
        "<b>6 alertas</b> com a Azul",
        "<b>2 alertas</b> com Smiles (calendário de 7 dias)",
      ],
    },
    {
      id: 8,
      name: "Plano Black",
      description:
        "O plano perfeito para viajantes mais exigentes! Tenha acesso exclusivo a uma ampla gama de benefícios e garante viagens incríveis o ano todo.",
      price: 59.9,
      benefits: [
        "<b>10 Trechos</b> com a Azul",
        "<b>Calendário do Mês com Smiles</b> (Calendário mensal)",
      ],
    },
  ];

  const onSelectPlan = (planId: number) => {
    console.log("planId", planId);
    userService
      .createSubscription({ planId })
      .then((r) => {
        window.location.href = r.link;
        console.log(r);
      })
      .catch((r) => {
        console.log(r);
      });
  };

  return (
    <div className="flex flex-col text-left ">
      <h1 className="text-base mb-2 font-bold">Minha assinatura</h1>
      <h2 className="text-base mb-4">
        Veja nossos planos e escolha o que melhor se encaixa para você.
      </h2>

      <div className="plans flex flex-col md:flex-row gap-4">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            selectPlan={onSelectPlan}
            active={activePlan === plan.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Plans;
