import styles from "./ImageBanner.module.css";

const ImageBanner = ({ src, alt, text }) => {
return (
    <div className={styles.imageWrapper}>
      <img src={src} alt={alt} />
      <span className={styles.bannerText}>{text}</span>
    </div>
  );
};
export default ImageBanner;
