import styles from "./AboutUs.module.css";
import ImageBanner from "../components/ImageBanner";
import bannerImage from "../assets/banner-A-propos.jpg";
import DropdownText from "../components/DropdownText";

const contents = {
  fiabilite: (
    <p>
      Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et
      toutes les informations sont régulièrement vérifiées par nos équipes.
    </p>
  ),
  respect: (
    <p>
      La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation
      du voisinage entraînera une exclusion de notre plateforme.
    </p>
  ),
  service: (
    <p>
      Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous
      contacter si vous avez la moindre question.
    </p>
  ),
  securite: (
    <p>
      La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond
      aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela
      permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur
      la sécurité domestique pour nos hôtes.
    </p>
  ),
};

const AboutUs = () => {
  return (
    <div className={styles.mainContainer}>
      <ImageBanner src={bannerImage} alt="Bannière de la page 'à propos'" />
      <section className={styles.collapsesContainer}>
        <DropdownText title="Fiabilité" content={contents.fiabilite} />
        <DropdownText title="Respect" content={contents.respect} />
        <DropdownText title="Service" content={contents.service} />
        <DropdownText title="Sécurité" content={contents.securite} />
      </section>
    </div>
  );
};
export default AboutUs;
