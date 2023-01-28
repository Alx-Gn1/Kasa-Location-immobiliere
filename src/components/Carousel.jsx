import styles from "./Carousel.module.css";
import whiteArrow from "../assets/WhiteArrow.svg";
import { useReducer } from "react";
import imageIcon from "../assets/image-icon.png";

/**
 * Affiche un Carousel/Slideshow d'image, qui défilent automatiquement
 * On peut également faire défiler vers l'image suivante ou précédente en cliquant sur les boutons
 * @param {[String]} param0
 * @returns
 */
const Carousel = ({ images }) => {
  // La transition se fait en css (on retrouve la durée pour les classes .right .left et .center)
  // On adapte notre code javascript pour actualiser notre state une fois l'animation terminée
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

  // Fonctions pour faire défiler les images :
  // onGoingAnim permet d'éviter à l'utilisateur de spam click sur une flèche, ce qui peut poser des erreurs visuelles dans l'animation
  let onGoingAnim = false;

  const goToNextImage = () => {
    onGoingAnim = true;
    // Get current & next image
    const currentImage = document.querySelector(`[data-index="${state.currentImage}"]`);
    const nextImage =
      state.currentImage < images.length - 1
        ? document.querySelector(`[data-index="${state.currentImage + 1}"]`)
        : document.querySelector(`[data-index="0"]`);

    // L'image actuelle commence au centre (classe ".center"), l'image suivant doit venir de droite donc on lui applique la classe .right
    // L'image actuelle doit "partir" à gauche et la nouvelle image se retrouver au centre,
    // on applique les classes avec un décalage pour que la transition se fasse uniquement à l'aide du css
    //
    // Une fois l'animation terminée l'ancienne image est masqué (la variable est currentImage puisqu'on a pas encore actualisé le state)
    // La nouvelle image garde sa class ".center" pour le prochain défilement d'images
    // On actualise ensuite le state
    nextImage.className = styles.right;
    setTimeout(() => {
      currentImage.className = styles.left;
      nextImage.className = styles.center;
    }, 10);
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

    // Même raisonnement que pour la fonction goToNextImage() sauf qu'on inverse la gauche et la droite
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

  // Interval pour faire défiler les images automatiquement
  // On ne veut pas que le défilement automatique perturbe l'utilisateur quand il fait défiler manuellement les images
  // Donc la fonction reset se lance à chaque appuie sur les boutons Next ou Prev
  let nextImageInterval = setInterval(() => {
    if (onGoingAnim === false && images.length > 1) goToNextImage();
  }, 8000);
  const resetInterval = () => {
    clearInterval(nextImageInterval);
    nextImageInterval = setInterval(() => {
      if (onGoingAnim === false && images.length > 1) goToNextImage();
    }, 8000);
  };

  // Component vide dans le cas où les data n'auraient pas encore été chargées par la page
  if (!images)
    return (
      <div className={`${styles.mainContainer} ${styles.loading}`}>
        <img src={imageIcon} alt="icon" className={styles.emptyImage} />
      </div>
    );
  //
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
        {/* S'il y a 1 seule image les boutons précédent et suivant ne s'affichent pas */}
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
