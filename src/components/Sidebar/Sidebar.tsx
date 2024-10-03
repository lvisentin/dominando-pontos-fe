import { faCog, faPlane, faMagnifyingGlass, faDollarSign, faHome } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "../SidebarLink/SidebarLink";
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';

const Sidebar = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')!))
  }, [])

  return <aside className="w-full md:w-[15%] md:min-w-[250px] pt-4 pb-4 md:pb-0">
    <ul>
      <SidebarLink icon={faHome} to="/home" label="Home" />
      <SidebarLink icon={faCog} to="/config" label="Configurar alertas de pontos" />
      {/* {userData && userData?.invitationCode?.toLowerCase() === 'heron' && ( */}
      <div className='flex items-center'>
        <SidebarLink icon={faPlane} to="/alerts" label="Emissões" disabled />
        <Badge className={`bg-green-600`}>Em Breve</Badge>
      </div>
      {/* )} */}

      {/* {userData && userData?.invitationCode?.toLowerCase() !== 'heron' && (
        <>
          <SidebarLink icon={faPlane} to="/alerts" label="Emissões" />
          <SidebarLink icon={faMagnifyingGlass} to="/ticket-search" label="Busca por passagens" />
          <SidebarLink icon={faDollarSign} to="/plans" label="Minha Assinatura" />
        </>
      )} */}

    </ul>
  </aside>
}

export default Sidebar;