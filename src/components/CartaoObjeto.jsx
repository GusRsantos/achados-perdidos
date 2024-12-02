import React from "react";
import styles from "./CartaoObjeto.module.css";
import { useNavigate } from "react-router-dom";

const CartaoObjeto = (props) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/infoobjetos/${props.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este objeto?")) return;

    try {
      const response = await fetch(`http://localhost:5000/objetos/excluir/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao tentar excluir o objeto.");
      }

      const data = await response.json();
      alert(`Objeto "${props.nome}" com ID ${data.id} foi excluído com sucesso.`);

      // Callback para informar o componente pai sobre a exclusão
      if (props.onDelete) {
        props.onDelete(props.id);
      }
    } catch (error) {
      console.error("Erro ao excluir o objeto:", error);
      alert("Erro ao excluir o objeto. Tente novamente.");
    }
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
        <button className={styles.deleteButton} onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CartaoObjeto;
