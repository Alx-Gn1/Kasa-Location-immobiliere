import { Link } from "react-router-dom";
import styles from "./RentingCard.module.css";
import imageIcon from "../assets/image-icon.png";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Skeleton loader en attendant que le site ait chargé les données de location
 */
export const RentingCardSkeleton = () => (
  <div className={styles.skeletonContainer}>
    <img src={imageIcon} alt="icon" />
    <div className={styles.fakeText}></div>
  </div>
);

/**
 * Reçoit les données de la location, affiche une carte avec l'image et titre de la location,
 * Créer un lien qui mène vers la page de cette même location
 * @param {Object} param0 Données de la location
 * @param {Number} param0 index dans la liste de la homepage, sert pour l'animation de chargement
 * @returns
 */
export const RentingCard = ({ data, index }) => {
  const [containerClasses, setContainerClasses] = useState(`${styles.container} ${styles.hidden}`);

  useEffect(() => {
    setTimeout(() => {
      setContainerClasses(styles.container);
    }, index * 50);
  }, [index]);

  return (
    <div className={containerClasses}>
      <img src={data.cover} alt={data.title + " " + data.location} />
      <Link className={styles.link} to={"/rent/" + data.id}>
        {data.title}
      </Link>
    </div>
  );
};
