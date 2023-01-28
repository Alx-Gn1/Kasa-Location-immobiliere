import styles from "./Tag.module.css";

const Tag = ({ tag }) => {
  return (
    <div className={styles.container}>
      <p>{tag}</p>
    </div>
  );
};
export default Tag;
