import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingButton from "@/components/LoadingButton/LoadingButton";
import Header from "@/components/header/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/auth/AuthService";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NewPass = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // const  = uSEquERY();
  const navigate = useNavigate();

  const formSchema = z.object({
    password: z.string().min(6, {
      message: "Por favor, digite sua senha",
    }),
  });

  function onSubmit({ password }: z.infer<typeof formSchema>) {
    setLoading(true);
    const email = new URLSearchParams(window.location.search).get("email");

    if (!email) return;

    authService
      .updatePassword({ email, password })
      .then(() => {
        navigate("/signIn");
      })
      .catch(() => {
        toast({ description: "Email ou senha incorretos" });
      })
      .finally(() => setLoading(false));
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="mx-auto flex flex-col items-center justify-center h-full w-full px-8 md:px-0">
        <div className="w-full text-left max-w-md">
          <h1 className="w-full text-left text-lg mb-2 font-bold">
            Defina sua senha
          </h1>
          <h2 className="text-md mb-6">
            Você ainda não definiu uma senha para acessar o app, por favor
            digite sua nova senha.
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" gap-4 w-full max-w-md flex flex-col"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading} text={"Entrar"} type="submit" />

            <p className="m-0 w-full text-left">
              Não tem uma conta?{" "}
              <NavLink to="/signup" className="font-bold text-primary">
                Faça seu cadastro
              </NavLink>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPass;
