import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.status}>404</h1>
        <p className={styles.message}>Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/" className={styles.homepageLink}>
          Retourner sur la page d'acceuil
        </Link>
      </div>
    </>
  );
};
export default NotFound;
