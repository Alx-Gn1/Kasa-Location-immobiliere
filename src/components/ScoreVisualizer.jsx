import styles from "./ScoreVisualizer.module.css";
import redStar from "../assets/star-rate-red.svg";
import grayStar from "../assets/star-rate-gray.svg";

const ScoreVisualizer = ({ rating }) => {
  const maxRating = 5;
  let starList = [];

  for (let i = 0; i < maxRating; i++) {
    starList.push(i < rating ? { active: true } : { active: false });
  }

  return (
    <div className={styles.starContainer}>
      {starList.map(({ active }, index) => (
        <img src={active ? redStar : grayStar} alt={active ? "red star" : "empty or gray star"} key={index} />
      ))}
    </div>
  );
};
export default ScoreVisualizer;
