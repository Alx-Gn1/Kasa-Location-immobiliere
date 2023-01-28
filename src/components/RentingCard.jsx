import { Link } from "react-router-dom";
import styles from "./RentingCard.module.css";
import imageIcon from "../assets/image-icon.png";
import { useState } from "react";
import { useEffect } from "react";

export const RentingCardSkeleton = () => (
  <div className={styles.skeletonContainer}>
    <img src={imageIcon} alt="icon" />
    <div className={styles.fakeText}></div>
  </div>
);

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
