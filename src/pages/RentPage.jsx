import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import DropdownText from "../components/DropdownText";
import HostInfos from "../components/HostInfos";
import ScoreVisualizer from "../components/ScoreVisualizer";
import Tag from "../components/Tag";
import { useGetRentData } from "../utils/hooks/useGetRentData";
import styles from "./RentPage.module.css";

/**
 * Rent page
 */
const RentPage = ({ timeout, dummy_datas }) => {
  window.scrollTo(0, 0);
  let { id } = useParams();
  // le timeout et les dummy sont là pour des questions de debug
  let data = useGetRentData({ id, timeout: timeout || 1000 });
  if (dummy_datas) data = dummy_datas;

  // Les ? et autres conditions servent à créer le skeleton loader dans le cas où les data n'auraient pas encore chargées
  return (
    <div className={styles.mainContainer}>
      <Carousel images={data?.pictures} />
      <section className={styles.titleSection}>
        <div className={styles.titleContainer}>
          <h1 data-testid="rentTitle">{data?.title || "Loading..."}</h1>
          <p data-testid="rentLocation">{data?.location || "-"}</p>
          <div data-testid="tagContainer" className={styles.tagContainer}>
            {data ? data.tags.map((tag) => <Tag tag={tag} key={tag} />) : null}
          </div>
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
