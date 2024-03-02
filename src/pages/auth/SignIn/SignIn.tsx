import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import LoadingButton from "@/components/LoadingButton/LoadingButton"
import Header from "@/components/header/Header"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { authService } from "@/services/auth/AuthService"
import { SignInResponse } from "@/services/auth/auth.model"

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Por favor, digite seu email",
    }).email("Por favor, digite um email válido"),
    password: z.string().min(6, {
      message: "Por favor, digite sua senha",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    setLoading(true);
    authService.signIn({ email, password }).then((r: SignInResponse) => {
      localStorage.setItem('authorization', r.accessToken)
      localStorage.setItem('userData', JSON.stringify(r.user))
      navigate('/config')
    }).catch((e) => toast({ description: 'Email ou senha incorretos' })).finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="mx-auto flex flex-col items-center justify-center h-full w-full">
        <div className="w-full text-left max-w-md">
          <h1 className="w-full text-left text-lg mb-2 font-bold">Acessar conta</h1>
          <h2 className="text-md mb-6">Informe os dados para acessar sua conta</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" gap-4 w-full max-w-md flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading} text={'Entrar'} type="submit" />

            <p className="m-0 w-full text-left">Não tem uma conta? <NavLink to='/signup' className="font-bold text-primary">Faça seu cadastro</NavLink></p>
          </form>
        </Form>
      </div>
    </div>
  )


}

export default SignIn