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
import { authService } from "@/services/auth/AuthService"
import { SignUpResponse } from "@/services/auth/auth.model"
import { handleFetchErrorMessage } from "@/shared/utils/errors/handleFetchErrorMessage"
import { cleanPhone, phoneMask } from "@/shared/utils/phoneMask"
import { useMaskito } from '@maskito/react'
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const maskedInputRef = useMaskito({ options: phoneMask });

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Por favor, digite seu nome",
    }),
    phone: z.string().min(8, {
      message: "Por favor, digite seu telefone",
    }),
    email: z.string().min(2, {
      message: "Por favor, digite seu email",
    }).email("Por favor, digite um email válido"),
    password: z.string().min(6, {
      message: "Por favor, digite sua senha",
    }),
    invitationCode: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
      invitationCode: "",
    },
  })

  function onSubmit({ email, name, password, phone, invitationCode }: z.infer<typeof formSchema>) {
    setLoading(true);
    authService.signUp({ email, name, password, invitationCode, phone: cleanPhone(phone) }).then((r: SignUpResponse) => {
      localStorage.setItem('authorization', r.accessToken)
      localStorage.setItem('userData', JSON.stringify(r.user))
      navigate('/home')
    })
      .catch((err) => toast({ description: handleFetchErrorMessage(err.message).message }))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="mx-auto flex flex-col items-center justify-center h-full w-full px-8 md:px-0">
        <div className="w-full text-left max-w-md">
          <h1 className="w-full text-left text-lg mb-2 font-bold">Criar conta</h1>
          <h2 className="text-md mb-6">Informe os dados para criar uma conta</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" gap-4 w-full max-w-md flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="phone"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu telefone" {...field} ref={maskedInputRef} onInput={(evt: any) => {
                      form.setValue("phone", evt.currentTarget.value)
                    }} />
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

            <FormField
              control={form.control}
              name="invitationCode"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Código de convite</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu código de convite" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading} text={'Criar Conta'} type="submit" />

            <p className="m-0 w-full text-left">Já tem uma conta? <NavLink to='/signin' className="font-bold text-primary">Faça login aqui</NavLink></p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp