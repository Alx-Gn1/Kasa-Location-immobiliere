import { Link, useRouteError } from "react-router-dom";
import Header from "../components/Header";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  const status = error.status;
  const message = error.statusText || error.message;
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.status}>{status}</h1>
        <p className={styles.message}>
          {status === 404
            ? "Oups! La page que vous demandez n'existe pas."
            : `Une erreur est survenue : ${message}`}
        </p>
        <Link to="/" className={styles.homepageLink}>
          Retourner sur la page d'acceuil
        </Link>
      </div>
    </>
  );
}
