import { User } from "@/services/auth/auth.model";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './header.module.css'
import { useNavigate } from "react-router-dom";

const LoggedInHeader = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authorization');
    localStorage.removeItem('userData');
    window.location.reload();
    navigate("/signIn");
  }

  return <header className="px-6 flex items-center justify-between w-full bg-primary text-white font-bold py-4">
    <span className="hidden md:block text-white">
      Dominando Pontos
    </span>
    
    <span className="block md:hidden text-white">
      DP
    </span>

    <div className="actions text-white text-sm flex items-center gap-2">
      Bem vindo, {user.name}
      <div className="cursor-pointer">
        <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} className={styles.logoutIcon} />
      </div>
    </div>
  </header>
}

const LoggedOutHeader = () => {
  return <header className="flex items-center justify-center w-full bg-primary text-white font-bold py-4">
    Dominando Pontos
  </header>
}

const Header = () => {
  const isLoggedIn = localStorage.getItem('authorization')
  const userData = localStorage.getItem('userData')!
  const userInfo = JSON.parse(userData)

  return isLoggedIn ? <LoggedInHeader user={userInfo} /> : <LoggedOutHeader />
}

export default Header;