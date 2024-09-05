import AlertCategorySelect from "@/components/AlertCategorySelect/AlertCategorySelect";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form, FormControl, FormField, FormItem, FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { homeService } from "@/services/home/HomeService";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    const [filters, setFilters] = useState({ livelo: false, esfera: false });
    const [categoryFilter, setCategoryFilter] = useState(1);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            search: "",
        },
    });

    const fetchLoyaltyPrograms = () => {
        setLoading(true);
        homeService
            .getLoyaltyPrograms(filters, categoryFilter, form.getValues().search)
            .then((response) => setLoyaltyPrograms(response))
            .catch(console.log)
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('authorization')
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            console.log('here')
            window.location.href = `${import.meta.env.VITE_APP_URL}`;
        }

        fetchLoyaltyPrograms();
    }, []);


    useEffect(() => {
        fetchLoyaltyPrograms();
    }, [filters, categoryFilter])

    const filter = (filterValue: string) => {
        if (filterValue === 'livelo') {
            if (filters.livelo) {
                setFilters({ livelo: false, esfera: false });
                console.log('already has livelo')
                return;
            }
            console.log('set livelo')

            setFilters({ livelo: true, esfera: false });

        }

        if (filterValue === 'esfera') {
            if (filters.esfera) {
                setFilters({ esfera: false, livelo: false });
                return;
            }

            setFilters({ esfera: true, livelo: false });
        }
    }


    return (
        <div className="flex flex-col text-left ">
            <h1 className="text-2xl mb-2 font-bold">Bem vindo, {userInfo?.name}</h1>
            <h2 className="text-lg mb-4">
                Últimas novidades
            </h2>

            <div className="filters mb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(fetchLoyaltyPrograms)} className="flex flex-wrap items-center gap-4" >
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem className="text-left w-full md:w-[300px]">
                                    <FormControl>
                                        <Input
                                            placeholder="Busque por uma loja específica"
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <AlertCategorySelect
                            value={categoryFilter}
                            onSelect={(value: number) =>
                                setCategoryFilter(value)
                            }
                            disabled={loading}
                        />

                        <Button disabled={loading} type="button" variant={filters.livelo ? "default" : "outline"} onClick={() => filter('livelo')}> Livelo </Button>
                        <Button disabled={loading} type="button" variant={filters.esfera ? "default" : "outline"} onClick={() => filter('esfera')}> Esfera </Button>

                        <LoadingButton loading={loading} text={"Buscar"} type="submit" />
                    </form>
                </Form>


            </div>

            <div className="flex flex-wrap items-start justify-around lg:justify-start gap-4">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : loyaltyPrograms && loyaltyPrograms.map((lProgram: LoyaltyProgram, key) => (
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