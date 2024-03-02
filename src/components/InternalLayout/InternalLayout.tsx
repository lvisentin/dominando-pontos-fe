import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../header/Header";
import { Toaster } from "../ui/toaster";
import { useEffect } from "react";

const InternalLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authorization')) {
      navigate('/')
    }
  }, [])

  return <div className="flex flex-col">
    <Header />
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <main className="w-full bg-slate-50 px-6 py-6">
        <Outlet />
      </main>
    </div>
  </div>
}

export default InternalLayout