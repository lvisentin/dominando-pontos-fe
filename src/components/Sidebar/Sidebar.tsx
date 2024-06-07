import { faCog, faPlane, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "../SidebarLink/SidebarLink";

const Sidebar = () => {
  return <aside className="w-full md:w-[15%] md:min-w-[250px] pt-4 pb-4 md:pb-0">
    <ul>
      <SidebarLink icon={faCog} to="/config" label="Configurar alertas" />
      <SidebarLink icon={faPlane} to="/alerts" label="Alertas de passagens" />
      <SidebarLink icon={faMagnifyingGlass} to="/ticket-search" label="Busca por passagens" />
      {/* <SidebarLink icon={faDollarSign} to="/plans" label="Minha Assinatura" /> */}
    </ul>
  </aside>
}

export default Sidebar;