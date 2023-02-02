import logo from "../assets/kasa-logo-white.svg";
import styles from "./Footer.module.css";

/**
 * Footer du site
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="Kasa logo white version" />
      <p data-testid="copyrightNotice">© 2020 Kasa. All rights reserved</p>
    </footer>
  );
}

export default Footer;
