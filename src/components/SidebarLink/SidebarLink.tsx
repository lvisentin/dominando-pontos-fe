import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SidebarLinkProps = {
  to: string;
  label: string;
  icon: any;
}

const SidebarLink = ({ to, label, icon }: SidebarLinkProps) => {
  return <li className="text-sm text-left px-4 py-2">
    <NavLink to={to} className={({ isActive }) => (isActive ? 'font-bold' : 'flex items-center')}>
      <FontAwesomeIcon icon={icon} color='green' className="text-lg mr-2"/>{label}
    </NavLink>
  </li>
}

export default SidebarLink;