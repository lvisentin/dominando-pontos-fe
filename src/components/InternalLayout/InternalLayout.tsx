import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AlertMessage from "../AlertMessage/AlertMessage";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";

const InternalLayout = () => {
  const navigate = useNavigate();
  const [hasTelegramBotSetup, setHasTelegramBotSetup] = useState(undefined);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")!)

    if (!userData) {
      navigate('/');
    } else {
      setHasTelegramBotSetup(userData.telegramChatId);
    }
  }, [])

  function redirectTelegramBot() {
    window.open('https://t.me/pontos_dominando_pontos_bot', '_blank')
  }

  return <div className="flex flex-col">
    <Header />

    {!hasTelegramBotSetup ? (
      <AlertMessage
        message="Você ainda não configurou seus alertas no Telegram."
        buttonTitle="Configure agora"
        action={redirectTelegramBot}
      />
    ) : null}

    <div className="block md:flex h-full min-h-screen">
      <Sidebar />
      <main className="w-full  min-h-screen bg-slate-50 p-4 md:p-6">
        <Outlet />
      </main>

      <a target="_blank" href="https://api.whatsapp.com/send?phone=+551132808660&text=Ol%C3%A1%2C+gostaria+de+ajuda+sobre+o+Dominando+Pontos" className="fixed bottom-4 right-4 rounded-full bg-primary hover:bg-primary/80 cursor-pointer transition-all text-white py-4 px-8 flex items-center gap-2">
        <img src="/whatsapp.svg" className="w-5 h-5" />
        <span className="text-white font-semibold">Suporte</span>
      </a>
    </div>
  </div>
}

export default InternalLayout