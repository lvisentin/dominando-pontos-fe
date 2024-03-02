import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/auth/SignIn/SignIn'
import SignUp from './pages/auth/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import InternalLayout from './components/InternalLayout/InternalLayout'
import Config from './pages/Config/Config'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route element={<InternalLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/config' element={<Config />} />
        </Route>

        <Route path="**" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
