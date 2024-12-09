import React from "react";
import { BsArrowClockwise } from "react-icons/bs";
import styles from "./styles.module.css";

const LoadingComponent: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <BsArrowClockwise className={styles.loadingIcon} />
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingComponent;
