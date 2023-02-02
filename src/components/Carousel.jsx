import styles from "./Carousel.module.css";
import whiteArrow from "../assets/WhiteArrow.svg";
import { useReducer } from "react";
import imageIcon from "../assets/image-icon.png";
import { goToNextImage, goToPrevImage } from "../utils/functions/CarouselFunctions";
import { useEffect } from "react";
import { useRef } from "react";

/**
 * Affiche un Carousel/Slideshow d'image, qui défilent automatiquement
 * On peut également faire défiler vers l'image suivante ou précédente en cliquant sur les boutons
 * @param {[String]} param0
 * @returns
 */
const Carousel = ({ images, testDispatch, testGetCurrentState }) => {
  // Si on atteint la dernière image, la fonction next image ramène l'utilisateur à la 1e image
  // Si on est à la 1e image, la fonction prev image ramène l'utilisateur à la dernière image
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
  // Permet de lancer un increment ou decrement et de vérifier que le state est bien modifié correctement
  if (testGetCurrentState) testGetCurrentState(state);
  if (testDispatch) testDispatch(dispatch);
  if (testGetCurrentState) testGetCurrentState(state);

  // La transition se fait en css (on retrouve la durée de l'animation sur les classes .right .left et .center)
  // On adapte notre code javascript pour actualiser notre state une fois l'animation terminée
  const cssAnimDuration = 600;
  // onGoingAnim permet d'éviter à l'utilisateur de spam click sur une flèche, ce qui peut poser des erreurs visuelles dans l'animation
  // La variable passe à true quand une animation est en cours
  const onGoingAnim = useRef(false);
  // Interval pour faire défiler les images automatiquement

  const resetInterval = useRef(null);
  useEffect(() => {
    const canBeExecuted = onGoingAnim.current === false && images && images.length > 1;
    const nextImg = () => goToNextImage({ onGoingAnim, state, images, styles, dispatch, cssAnimDuration });
    let nextImageInterval = setInterval(() => {
      if (canBeExecuted) nextImg();
    }, 6000);
    // On ne veut pas que le défilement automatique perturbe l'utilisateur quand il fait défiler manuellement les images
    // La fonction reset se lance à chaque appuie sur les boutons Next ou Prev
    resetInterval.current = () => {
      clearInterval(nextImageInterval);
      nextImageInterval = setInterval(() => {
        if (canBeExecuted) nextImg();
      }, 6000);
    };

    return () => clearInterval(nextImageInterval);
  }, [images, state]);

  // Component vide dans le cas où les data n'auraient pas encore été chargées par la page
  if (!images)
    return (
      <div data-testid="CarouselLoading" className={`${styles.mainContainer} ${styles.loading}`}>
        <img src={imageIcon} alt="icon" className={styles.emptyImage} />
      </div>
    );

  return (
    <div data-testid="CarouselLoaded" className={styles.mainContainer}>
      <div data-testid="imageContainer" className={styles.imagesContainer}>
        {images.map((src, index) => {
          const splitSrc = src.split("/");
          const fileName = splitSrc.at(-1).split(".").slice(0, -1).join(".");
          let Classname = [];
          if (index === state.currentImage) Classname.push(styles.center);
          return (
            <img
              data-testid="carouselSlide"
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
        {/* S'il y a 1 seule image les boutons précédent et suivant ne s'affichent pas */}
        {images.length <= 1 ? null : (
          <>
            <button
              data-testid="carouselPrev"
              className={styles.prevButton}
              onClick={() => {
                resetInterval.current();
                if (onGoingAnim.current === false) {
                  goToPrevImage({ onGoingAnim, state, images, styles, dispatch, cssAnimDuration });
                }
              }}
            >
              <img src={whiteArrow} alt="go to previous slide button" />
            </button>
            <span>{state.currentImage + 1 + "/" + images.length}</span>
            <button
              data-testid="carouselNext"
              className={styles.nextButton}
              onClick={() => {
                resetInterval.current();
                if (onGoingAnim.current === false) {
                  goToNextImage({ onGoingAnim, state, images, styles, dispatch, cssAnimDuration });
                }
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
