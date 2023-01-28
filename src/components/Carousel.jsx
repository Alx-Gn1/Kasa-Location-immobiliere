import styles from "./Carousel.module.css";
import whiteArrow from "../assets/WhiteArrow.svg";
import { useReducer } from "react";
import imageIcon from "../assets/image-icon.png";

const Carousel = ({ images }) => {
  const cssAnimDuration = 600;
  function reducer(state, action) {
    switch (action) {
      case "increment":
        return state.currentImage < images.length - 1 ? { currentImage: state.currentImage + 1 } : { currentImage: 0 };
      case "decrement":
        return state.currentImage > 0 ? { currentImage: state.currentImage - 1 } : { currentImage: images.length - 1 };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, { currentImage: 0 });

  // Fonctions pour faire défiler les images
  let onGoingAnim = false;
  const goToNextImage = () => {
    onGoingAnim = true;
    // Get current & next image
    const currentImage = document.querySelector(`[data-index="${state.currentImage}"]`);
    const nextImage =
      state.currentImage < images.length - 1
        ? document.querySelector(`[data-index="${state.currentImage + 1}"]`)
        : document.querySelector(`[data-index="0"]`);

    // Setup starting position, then ending position, transition is done in css
    nextImage.className = styles.right;
    setTimeout(() => {
      currentImage.className = styles.left;
      nextImage.className = styles.center;
    }, 100);
    setTimeout(() => {
      currentImage.removeAttribute("class");
      dispatch("increment");
    }, cssAnimDuration);
  };
  const goToPrevImage = () => {
    onGoingAnim = true;
    // Get current & next image
    const currentImage = document.querySelector(`[data-index="${state.currentImage}"]`);
    const prevImage =
      state.currentImage > 0
        ? document.querySelector(`[data-index="${state.currentImage - 1}"]`)
        : document.querySelector(`[data-index="${images.length - 1}"]`);

    // Setup starting position, then ending position, transition is done in css
    prevImage.className = styles.left;
    setTimeout(() => {
      currentImage.className = styles.right;
      prevImage.className = styles.center;
    }, 100);
    setTimeout(() => {
      currentImage.removeAttribute("class");
      dispatch("decrement");
    }, cssAnimDuration);
  };

  // Interval pour faire défiler les images automatiques
  let nextImageInterval = setInterval(() => {
    if (onGoingAnim === false && images.length > 1) goToNextImage();
  }, 8000);
  const resetInterval = () => {
    clearInterval(nextImageInterval);
    nextImageInterval = setInterval(() => {
      if (onGoingAnim === false && images.length > 1) goToNextImage();
    }, 8000);
  };

  if (!images)
    return (
      <div className={`${styles.mainContainer} ${styles.loading}`}>
        <img src={imageIcon} alt="icon" className={styles.emptyImage} />
      </div>
    );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imagesContainer}>
        {images.map((image, index) => {
          const src = image;
          const splitSrc = src.split("/");
          const fileName = splitSrc.at(-1).split(".").slice(0, -1).join(".");
          let Classname = [];
          if (index === state.currentImage) Classname.push(styles.center);
          return (
            <img
              src={src}
              alt={fileName}
              key={index}
              data-index={index}
              className={index === state.currentImage ? styles.center : null}
            />
          );
        })}
      </div>
      <div className={styles.uiContainer}>
        {images.length <= 1 ? null : (
          <>
            <button
              className={styles.prevButton}
              onClick={() => {
                resetInterval();
                if (onGoingAnim === false) goToPrevImage();
              }}
            >
              <img src={whiteArrow} alt="go to previous slide button" />
            </button>
            <span>{state.currentImage + 1 + "/" + images.length}</span>
            <button
              className={styles.nextButton}
              onClick={() => {
                resetInterval();
                if (onGoingAnim === false) goToNextImage();
              }}
            >
              <img src={whiteArrow} alt="go to next slide button" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Carousel;
