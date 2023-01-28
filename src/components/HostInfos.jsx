import { Fragment } from "react";
import styles from "./HostInfos.module.css";
import defaultProfilePicture from "../assets/profile1.jpg";

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
