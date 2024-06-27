import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AlertMessage from "../AlertMessage/AlertMessage";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";

const InternalLayout = () => {
  const navigate = useNavigate();
  const hasTelegramBotSetup = !!JSON.parse(localStorage.getItem("userData")!).telegramChatId

  useEffect(() => {
    if (!localStorage.getItem('authorization')) {
      navigate('/')
    }
  }, [])

  function redirectTelegramBot() {
    window.open('https://t.me/dominando_pontos_bot', '_blank')
  }

  return <div className="flex flex-col">
    <Header />
    
    {!hasTelegramBotSetup ? (
      <AlertMessage 
        message="Você ainda não configurou nosso bot do Telegram." 
        buttonTitle="Configure agora"
        action={redirectTelegramBot}
      />
    ) : null}

    <div className="block md:flex h-full min-h-screen">
      <Sidebar />
      <main className="w-full  min-h-screen bg-slate-50 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
}

export default InternalLayout