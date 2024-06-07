import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InternalLayout from './components/InternalLayout/InternalLayout'
import { Toaster } from './components/ui/toaster'
import Alerts from './pages/Alerts/Alerts'
import AlertsCreate from './pages/Alerts/Create'
import Config from './pages/Config/Config'
import Dashboard from './pages/Dashboard/Dashboard'
import NewPass from './pages/auth/NewPass/NewPass'
import SignIn from './pages/auth/SignIn/SignIn'
import SignUp from './pages/auth/SignUp/SignUp'
import TicketSearch from './pages/TicketSearch/TicketSearch'

const App = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('authorization')

    if (isLoggedIn && window.location.pathname === '/') {
      window.location.href = `${import.meta.env.VITE_APP_URL}/config`;
    }
  }, [])

  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/newPass' element={<NewPass />} />

        <Route element={<InternalLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/config' element={<Config />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/alerts/create' element={<AlertsCreate />} />
          <Route path='/ticket-search' element={<TicketSearch />} />
          {/* <Route path='/plans' element={<Plans />} /> */}
        </Route>

        <Route path="**" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
