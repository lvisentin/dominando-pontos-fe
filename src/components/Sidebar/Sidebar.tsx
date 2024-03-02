import { faCog } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "../SidebarLink/SidebarLink";

const Sidebar = () => {
  return <aside className="w-[15%] min-w-[250px] pt-4">
    <ul>
      {/* <SidebarLink icon={faTableColumns} to="/dashboard" label="Dashboard" /> */}
      <SidebarLink icon={faCog} to="/config" label="Configurar alertas" />
      {/* <SidebarLink icon={faEnvelope} to="/alerts" label="Alertas de passagens" /> */}
    </ul>
  </aside>
}

export default Sidebar;