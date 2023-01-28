import styles from "./ImageBanner.module.css";

/**
 * Affiche une bannière en haut de l'écran, le texte est un argument optionnel
 * @param {String} param0 src de l'image
 * @param {String} param0 alt de l'image
 * @param {String} param0 texte à afficher par dessus l'image
 * @returns
 */
const ImageBanner = ({ src, alt, text }) => {
  return (
    <div className={styles.imageWrapper}>
      <img src={src} alt={alt} />
      <span className={styles.bannerText}>{text}</span>
    </div>
  );
};
export default ImageBanner;
