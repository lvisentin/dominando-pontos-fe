import { faCog, faPlane } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "../SidebarLink/SidebarLink";

const Sidebar = () => {
  return <aside className="w-full md:w-[15%] md:min-w-[250px] pt-4 pb-4 md:pb-0">
    <ul>
      {/* <SidebarLink icon={faTableColumns} to="/dashboard" label="Dashboard" /> */}
      <SidebarLink icon={faCog} to="/config" label="Configurar alertas" />
      <SidebarLink icon={faPlane} to="/alerts" label="Alertas de passagens" />
    </ul>
  </aside>
}

export default Sidebar;