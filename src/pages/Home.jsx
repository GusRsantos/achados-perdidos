import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import CartaoObjeto from "../components/CartaoObjeto";

const Home = () => {
  const navigate = useNavigate();
  const [objetos, setObjetos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState(null); // Estado para filtro

  // Função para navegar para a página de detalhes de um objeto
  const handleSelect = (id) => {
    navigate(`/infoobjetos/${id}`);
  };

  // Função para navegar para a página de cadastro de objeto
  const handleSubmitObject = () => {
    navigate("/cadastrarobjeto");
  };

  // Função para aplicar filtro
  const btnFilter = (status) => {
    setFiltroStatus(status);
  };

  // Objetos filtrados com base no filtroStatus
  const objetosFiltrados = filtroStatus
    ? objetos.filter((obj) => obj.status.toLowerCase() === filtroStatus.toLowerCase())
    : objetos;

  // Buscar objetos do backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/objetos");
        const objs = await res.json();
        setObjetos(objs);
      } catch (error) {
        console.error("Erro ao buscar objetos:", error.message);
      }
    }

    fetchData();
  }, []);


    // Função para remover um objeto do estado
    const handleDeleteObject = (id) => {
      setObjetos(objetos.filter((objeto) => objeto.id_objeto !== id));
    };

  return (
    <div className={styles.container}>
      <button onClick={handleSubmitObject} className={styles.addButton}>
        + OBJETO
      </button>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <button
            onClick={() => btnFilter("achado")}
            className={styles.btnAchado}
          ></button>
          <span
            onClick={() => btnFilter("achado")}
            className={`${styles.legendText} ${
              filtroStatus === "achado" ? styles.active : ""
            }`}
          >
            Achado
          </span>
        </div>
        <div className={styles.legendItem}>
          <button
            onClick={() => btnFilter("perdido")}
            className={styles.btnPerdido}
          ></button>
          <span
            onClick={() => btnFilter("perdido")}
            className={`${styles.legendText} ${
              filtroStatus === "perdido" ? styles.active : ""
            }`}
          >
            Perdido
          </span>
        </div>
        <div className={styles.legendItem}>
          <button
            onClick={() => setFiltroStatus(null)} // Reseta o filtro
            className={styles.btnMostrarTodos}
          ></button>
          <span
            onClick={() => setFiltroStatus(null)}
            className={`${styles.legendText} ${
              filtroStatus === null ? styles.active : ""
            }`}
          >
            Todos
          </span>
        </div>
      </div>

      <div className={styles.listaObjetos}>
        {objetosFiltrados.map((obj) => (
          <CartaoObjeto
            key={obj.id_objeto}
            id={obj.id_objeto}
            nome={obj.nome_objeto}
            status={obj.status}
            imagemUrl={`http://localhost:5000/images/${obj.foto}`}
            Selecionar={() => handleSelect(obj.id_objeto)}
            onDelete={handleDeleteObject}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;