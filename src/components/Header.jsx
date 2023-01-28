import { NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/kasa-logo.svg";
import styles from "./Header.module.css";

/**
 * Header principal du site
 */
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="Kasa Logo" className={styles.logo} />
        <nav className={styles.nav}>
          <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/">
            Accueil
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/about">
            A Propos
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
