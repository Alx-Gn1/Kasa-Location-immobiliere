import { useState } from "react";
import styles from "./DropdownText.module.css";
import whiteArrow from "../assets/WhiteArrow.svg";

/**
 * Affiche un bouton, lorsqu'on clique dessus un texte se déroule, si l'on reclique le texte se cache à nouveau
 * @param {String} param0 Titre, s'affiche sur le bouton sur lequel on clique pour ouvrir ou fermer la collapse
 * @param {String} param0 Le texte qui s'affiche quand on ouvre la collapse
 * @param {String} param0 La largeur, sert pour alterner entre les collapse qui prennent toute la largeur de l'écran et celles qui ne prennent que la moitié (sur la Rent page)
 * @returns
 */
const DropdownText = ({ title, content, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={width === "50%" ? `${styles.container} ${styles.half}` : styles.container}
      style={width === "50%" ? null : { width: width }}
    >
      <button
        onClick={() => {
          isOpen === false ? setIsOpen(true) : setIsOpen(false);
        }}
        className={isOpen ? `${styles.openButton} ${styles.active}` : styles.openButton}
      >
        {title}
        <img src={whiteArrow} alt="white arrow logo" />
      </button>
      <div className={isOpen ? `${styles.dropdownContent} ${styles.active}` : styles.dropdownContent}>{content}</div>
    </div>
  );
};
export default DropdownText;
