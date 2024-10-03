import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InternalLayout from './components/InternalLayout/InternalLayout'
import { Toaster } from './components/ui/toaster'
import Alerts from './pages/Alerts/Alerts'
import Config from './pages/Config/Config'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import NewPass from './pages/auth/NewPass/NewPass'
import SignIn from './pages/auth/SignIn/SignIn'
import SignUp from './pages/auth/SignUp/SignUp'

const App = () => {
  // const [invitationCode, setInvitationCode] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('authorization')

    if (isLoggedIn && window.location.pathname === '/') {
      window.location.href = `${import.meta.env.VITE_APP_URL}/config`;
    }

    // if (localStorage.getItem('userData')) {
    //   setInvitationCode(JSON.parse(localStorage.getItem('userData')!)?.invitationCode)
    // }
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
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/config' element={<Config />} />
          <Route path='/alerts' element={<Alerts />} />
          {/* {invitationCode?.toLowerCase() !== 'heron' && (
            <>
              <Route path='/alerts/create' element={<AlertsCreate />} />
              <Route path='/ticket-search' element={<TicketSearch />} />
              <Route path='/plans' element={<Plans />} />
            </>
          )} */}

        </Route>

        <Route path="**" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
