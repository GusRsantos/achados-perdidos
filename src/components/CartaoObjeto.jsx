import React from "react";
import styles from "./CartaoObjeto.module.css";
import { useNavigate } from "react-router-dom";

const CartaoObjeto = (props) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/infoobjetos/${props.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {props.imagemUrl ? (
          <img
            src={props.imagemUrl}
            alt={`Imagem de ${props.nome}`}
            className={styles.objectImage}
          />
        ) : (
          <span className={styles.photoText}>Sem imagem</span>
        )}
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.objectName}>{props.nome}</h4>
        <div className={styles.statusContainer}>
          <span
            className={`${styles.statusText} ${
              props.status === "achado"
                ? styles.textAchado
                : styles.textPerdido
            }`}
          >
            {props.status === "achado" ? "Achado" : "Perdido"}
          </span>
        </div>
        <p className={styles.descricao}>{props.descricao}</p>
        <button className={styles.selectButton} onClick={handleSelect}>
          Selecionar
        </button>
      </div>
    </div>
  );
};

export default CartaoObjeto;
