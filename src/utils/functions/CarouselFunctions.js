export const goToNextImage = ({ onGoingAnim, state, images, styles, dispatch, cssAnimDuration }) => {
  onGoingAnim.current = true;
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
    onGoingAnim.current = false;
  }, cssAnimDuration);
};
export const goToPrevImage = ({ onGoingAnim, state, images, styles, dispatch, cssAnimDuration }) => {
  onGoingAnim.current = true;
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
    onGoingAnim.current = false;
  }, cssAnimDuration);
};
