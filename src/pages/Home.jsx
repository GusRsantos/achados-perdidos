import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import CartaoObjeto from "../components/CartaoObjeto";

const Home = () => {
  const navigate = useNavigate();
  const [objetos, setObjetos] = useState([]);


  const handleSelect = (id) => {
    navigate(`/infoobjetos/${id}`);
  };

  const handleSubmitObject = () => {
    navigate("/cadastrarobjeto");
  };

  const [filtroStatus, setFiltroStatus] = useState(null);


  const btnFilter = (status) => {
    setFiltroStatus(status);
  };

  const objetosFiltrados = filtroStatus
  ? objetos.filter((obj) => obj.status.toLowerCase() === filtroStatus.toLowerCase())
  : objetos;

  

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

  return (
    <div className={styles.container}>
      <button onClick={handleSubmitObject} className={styles.addButton}>+ OBJETO</button>
  
      <div className={styles.legend}>
  <div className={styles.legendItem}>
    <button
      onClick={() => btnFilter("achado")}
      className={`${styles.btnAchado} ${filtroStatus === "achado" ? styles.active : ""}`}
    ></button>
    Achado
  </div>
  <div className={styles.legendItem}>
    <button
      onClick={() => btnFilter("perdido")}
      className={`${styles.btnPerdido} ${filtroStatus === "perdido" ? styles.active : ""}`}
    ></button>
    Perdido
  </div>
  <div className={styles.legendItem}>
    <button
      onClick={() => btnFilter(null)}
      className={styles.filterButton}
    >
      Todos
    </button>
  </div>
</div>


      <div className={styles.listaObjetos}>
        {objetos.map((obj) => (
          <CartaoObjeto
            key={obj.id_objeto}
            id={obj.id_objeto}
            nome={obj.nome_objeto}
            status={obj.status}
            imagemUrl={`http://localhost:5000/images/${obj.foto}`} 
            Selecionar={() => handleSelect(obj.id_objeto)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;