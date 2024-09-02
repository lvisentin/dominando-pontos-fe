import { Card } from "@/components/ui/card";
import { homeService } from "@/services/home/HomeService"
import { useEffect, useState } from "react"

interface LoyaltyProgram {
    id: number;
    partnerId: number;
    externalCode: string;
    programName: string;
    programLink: string;
    partnerLink: string;
    baseValue: number;
    parity: number;
    parityClub: number;
    separator: string;
    regulationDocumentUrl: string;
    currency: null;
    promotion: true;
    legalTerms: string;
    createdAt: string;
    updatedAt: string;
    partner: {
        id: number;
        name: string;
        logoUrl: string;
        createdAt: string;
        updatedAt: string;
    }

}

const Home = () => {
    const [loyaltyPrograms, setLoyaltyPrograms] = useState([]);
    const userData = localStorage.getItem('userData')!;
    const userInfo = JSON.parse(userData);

    const fetchLoyaltyPrograms = () => {
        homeService
            .getLoyaltyPrograms()
            .then((response) => setLoyaltyPrograms(response))
            .catch(console.log);
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('authorization')
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            console.log('here')
            window.location.href = `${import.meta.env.VITE_APP_URL}`;
        }

        fetchLoyaltyPrograms();
    }, [])


    return (
        <div className="flex flex-col text-left ">
            <h1 className="text-2xl mb-2 font-bold">Bem vindo, {userInfo?.name}</h1>
            <h2 className="text-lg mb-4">
                Últimas novidades
            </h2>

            <div className="flex flex-wrap items-start justify-around lg:justify-start gap-4">
                {loyaltyPrograms && loyaltyPrograms.map((lProgram: LoyaltyProgram, key) => (
                    lProgram.currency ? <Card key={key} className="w-full sm:w-[45%] lg:w-[250px] flex flex-col items-center justify-center h-[250px]">
                        <div className="flex flex-col justify-center items-center">
                            <img src={lProgram.partner.logoUrl} className="h-[80px] w-auto mx-auto" />
                            <div className="flex items-center">
                                <span className="text-xs">{lProgram.currency}</span>
                                <p className="text-xl font-bold ml-2"> {lProgram.baseValue} </p>
                                <p className="text-xl font-bold ml-1"> {lProgram.separator} </p>
                                <p className="text-xl font-bold ml-1 mr-2"> {lProgram.parityClub} </p>
                                <span className="text-xs"> pontos <br /> {lProgram.programName}</span>
                            </div>
                            <a href={lProgram.programLink} target="_blank" className="cursor-pointer py-2 px-4 hover:bg-primary/80 transition-all bg-primary text-white rounded-full text-xs text-center mx-2 mt-4">Ir para a página do parceiro</a>
                        </div>
                    </Card> : <></>
                ))}
            </div>
        </div>
    )
}

export default Home;