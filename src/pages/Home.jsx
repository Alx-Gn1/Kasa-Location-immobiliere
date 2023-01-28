import ImageBanner from "../components/ImageBanner";
import bannerImage from "../assets/banner-Home.jpg";
import styles from "./Home.module.css";
import { useDummyData } from "../utils/hooks/useDummyData";
import { RentingCard, RentingCardSkeleton } from "../components/RentingCard";

const Home = () => {
  const { data } = useDummyData(1000);

  return (
    <div className={styles.mainContainer}>
      <ImageBanner src={bannerImage} alt="Bannière de la page d'acceuil" text="Chez vous, partout et ailleurs" />
      <section className={styles.cardContainer}>
        {data ? (
          data.data.map((rentingData, index) => <RentingCard data={rentingData} key={rentingData.id} index={index} />)
        ) : (
          <>
            <RentingCardSkeleton />
            <RentingCardSkeleton />
            <RentingCardSkeleton />
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
