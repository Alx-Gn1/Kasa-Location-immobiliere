import { useState } from "react";
import styles from "./DropdownText.module.css";
import whiteArrow from "../assets/WhiteArrow.svg";

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
