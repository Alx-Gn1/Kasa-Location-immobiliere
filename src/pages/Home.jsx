import ImageBanner from "../components/ImageBanner";
import bannerImage from "../assets/banner-Home.jpg";
import styles from "./Home.module.css";
import { useDummyData } from "../utils/hooks/useDummyData";
import { RentingCard, RentingCardSkeleton } from "../components/RentingCard";

/**
 * Home page
 */
const Home = () => {
  const DummyDatas = useDummyData(1000);

  return (
    <div className={styles.mainContainer}>
      <ImageBanner src={bannerImage} alt="Bannière de la page d'acceuil" text="Chez vous, partout et ailleurs" />
      <section className={styles.cardContainer}>
        {DummyDatas ? (
          DummyDatas.data.map((rentingData, index) => (
            <RentingCard data={rentingData} key={rentingData.id} index={index} />
          ))
        ) : (
          <>
            <RentingCardSkeleton index={1} />
            <RentingCardSkeleton index={2} />
            <RentingCardSkeleton index={3} />
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
