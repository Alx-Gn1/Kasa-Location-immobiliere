import styles from "./AboutUs.module.css";
import ImageBanner from "../components/ImageBanner";
import bannerImage from "../assets/banner-A-propos.jpg";
import DropdownText from "../components/DropdownText";
import collapsesList from "../utils/Datas/collapses.json";

/**
 * Page "à propos"
 */
const AboutUs = () => {
  return (
    <div className={styles.mainContainer}>
      <ImageBanner src={bannerImage} alt="Bannière de la page 'à propos'" />
      <section className={styles.collapsesContainer}>
        {collapsesList.map(({ title, content }) => (
          <DropdownText title={title} content={<p>{content}</p>} key={title} />
        ))}
      </section>
    </div>
  );
};
export default AboutUs;
