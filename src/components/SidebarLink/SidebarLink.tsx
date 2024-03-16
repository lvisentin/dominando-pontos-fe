import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SidebarLink.module.css';

type SidebarLinkProps = {
  to: string;
  label: string;
  icon: any;
}

const SidebarLink = ({ to, label, icon }: SidebarLinkProps) => {
  return <li className="text-sm text-left">
    <NavLink to={to} className={({ isActive }) => (isActive ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`)}>
      <FontAwesomeIcon icon={icon} className="text-lg mr-2"/>{label}
    </NavLink>
  </li>
}

export default SidebarLink;