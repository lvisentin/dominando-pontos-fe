import PlanCard, { Plan } from "@/components/PlanCard/PlanCard";
import { userService } from "@/services/user/UserService";
import { useEffect, useState } from "react";

const Plans = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('authorization')
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      console.log('here')
      window.location.href = `${import.meta.env.VITE_APP_URL}`;
    }
  }, [])


  const sucMsg =
    new URLSearchParams(window.location.search).get("msg") === "success"
      ? "Plano Ativo com Sucesso"
      : undefined;

  const errMsg =
    new URLSearchParams(window.location.search).get("msg") === "failure"
      ? "Ocorreu um erro, tente novamente"
      : undefined;

  const activePlan = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).planId : undefined;
  const plans: Plan[] = [
    {
      id: 7,
      name: "Plano Start",
      description:
        "Ideal para viajantes que querem explorar novos destinos sem gastar muito. Receba alertas personalizados para garantir as melhore emissões de passagens com milhas!",
      oldPrice: 39.9,
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
      oldPrice: 79.9,
      price: 59.9,
      benefits: [
        "<b>10 Trechos</b> com a Azul",
        "<b>Calendário do Mês com Smiles</b> (Calendário mensal)",
      ],
    },
  ];

  const onSelectPlan = (planId: number) => {
    console.log("planId", planId);
    setLoading(true);

    if (activePlan) {
      window.location.href = 'https://api.whatsapp.com/send?phone=554192562255&text=Ol%C3%A1,%20gostaria%20de%20fazer%20mudan%C3%A7a%20no%20meu%20plano%20do%20app%20Dominando%20Pontos';
      return;
    }

    userService
      .createSubscription({ planId })
      .then((r) => {
        window.location.href = r.link;
        console.log(r);
      })
      .catch((r) => {
        console.log(r);
      }).finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col text-left ">
      {sucMsg && <p className="text-xl bg-green-700 rounded-md font-bold text-white mb-4 py-4 px-6">{sucMsg}</p>}
      {errMsg && <p className="text-xl font-bold bg-red-700 rounded-md text-white mb-4 py-4 px-6">{errMsg}</p>}

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
            loading={loading}
          />
        ))}
      </div>
      <p className="mt-4">
        {activePlan && "Você já tem um plano ativo, ao clicar no botão você será redirecionado ao whatsapp para solicitar a mudança de plano"}
      </p>
    </div>
  );
};

export default Plans;
