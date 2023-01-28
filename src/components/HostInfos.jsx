import { Fragment } from "react";
import styles from "./HostInfos.module.css";
import defaultProfilePicture from "../assets/profile1.jpg";

/**
 * Affiche la photo de profil de l'hôte ainsi que son nom
 * @param {String} param0 Nom à afficher à côté de l'image
 * @param {String} param0 Lien vers l'image
 * @returns
 */
const HostInfos = ({ fullName, picture }) => {
  return (
    <div className={styles.infoContainer}>
      <p>
        {fullName
          ? fullName.split(" ").map((name) => (
              <Fragment key={name}>
                {name}
                <br />
              </Fragment>
            ))
          : null}
      </p>
      <img src={picture || defaultProfilePicture} alt={fullName} />
    </div>
  );
};
export default HostInfos;
