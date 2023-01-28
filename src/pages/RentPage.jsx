import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import DropdownText from "../components/DropdownText";
import HostInfos from "../components/HostInfos";
import ScoreVisualizer from "../components/ScoreVisualizer";
import Tag from "../components/Tag";
import { useGetRentData } from "../utils/hooks/useGetRentData";
import styles from "./RentPage.module.css";

const RentPage = () => {
  let { id } = useParams();
  const { data } = useGetRentData({ id, timeout: 1000 });

  // Depuis l'implémentation des data router dans la v6 l'utilisateur peut être automatiquement redirigé vers la page d'erreur quand on lance une exception
  // Cela nous évite d'utiliser useNavigate
  // https://reactrouter.com/en/main/route/error-element
  if (data === "Not Found") {
    throw new Error("La location que vous cherchiez n'existe pas");
  }
  window.scrollTo(0, 0);

  return (
    <div className={styles.mainContainer}>
      <Carousel images={data?.pictures} />
      <section className={styles.titleSection}>
        <div className={styles.titleContainer}>
          <h1>{data?.title || "Loading..."}</h1>
          <p>{data?.location || "-"}</p>
          <div className={styles.tagContainer}>{data ? data.tags.map((tag) => <Tag tag={tag} key={tag} />) : null}</div>
        </div>
        <div className={styles.sectionColumn}>
          <HostInfos fullName={data?.host.name} picture={data?.host.picture} />
          <ScoreVisualizer rating={data?.rating} />
        </div>
      </section>
      <section className={styles.infoSection}>
        <DropdownText title={data ? "Description" : "-"} content={<p>{data?.description}</p>} width={"50%"} />
        <DropdownText
          title={data ? "Équipements" : "-"}
          content={
            <ul className={styles.equipments}>
              {data?.equipments.map((equipment) => (
                <li key={equipment}>{equipment}</li>
              ))}
            </ul>
          }
          width={"50%"}
        />
      </section>
    </div>
  );
};
export default RentPage;
