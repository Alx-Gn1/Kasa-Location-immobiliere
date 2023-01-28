import styles from "./Tag.module.css";

/**
 * Affiche un tag d'une location
 * @param {String} param0 contenu du tag
 * @returns
 */
const Tag = ({ tag }) => {
  return (
    <div className={styles.container}>
      <p>{tag}</p>
    </div>
  );
};
export default Tag;
