import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useObjects } from '../context/ObjectContext';
import CartaoObjeto from "../components/CartaoObjeto";

const objetosOriginais = [
  { id: '1', nome: "Garrafa Stanley", status: "Achado" },
  { id: '2', nome: "Garrafa Farm", status: "Perdido" },
  { id: '3', nome: "Garrafa Pacco", status: "Achado" },
  { id: '4', nome: "Garrafa Tupperware", status: "Perdido" }
];

const Home = () => {
  const navigate = useNavigate();
  const { objects } = useObjects();

  const handleSelectObject = (objeto) => {
    navigate(`/info-objeto/${objeto.id}`, { state: { objeto } });
  };

  const handleSubmitObject = () => {
    navigate("/cadastrarobjeto");
  };

  const btnFilter = () =>{
    {/*If (nameInput === name) {
 Alert(name)
} else {
Alert(Não encontrado)

}

} */}
  } 

const [objetos, setObjetos] = useState([]);


// Resgate de dados da api para pegar os produtos
useEffect(() => {
  async function fetchData() {
    try {
      // busca os dados
      const res = await fetch("http://localhost:5000/objetos");
      // converte o resultado pra json
      const objs = await res.json();
      setObjetos(objs);
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchData();

  

},);


  return (
    <div className={styles.container}>
      <button onClick={handleSubmitObject} 
        className={styles.addButton}>+ OBJETO</button>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <button onClick={btnFilter} className={styles.btnAchado}></button>
          Achado
        </div>
        <div className={styles.legendItem}>
          <button className={styles.btnPerdido}></button>
          Perdido
        </div>
      </div>
// aassklkslks
      <div className={styles.grid}>
        {objetos.map((obj) =>
          <div key={obj.id} className={styles.card}>
            <div className={styles.imageContainer}>
              
              {obj.foto ? (
                <img 
                  src={obj.foto} 
                  alt={obj.nome} 
                  className={styles.objectImage}
                />
              ) : (
                <span className={styles.photoText}>Foto do objeto.</span>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.objectName}>{obj.nome}</h3>
              <div className={styles.statusContainer}>
                <span 
                  className={`${styles.statusDot} ${
                    obj.status === "Achado" ? styles.dotAchado : styles.dotPerdido
                  }`}
                ></span>
                <span className={`${styles.statusText} ${
                  obj.status === "Achado" ? styles.textAchado : styles.textPerdido
                }`}>
                  {obj.status}
                </span>
              </div>
              <button 
                onClick={() => handleSelectObject(obj)}
                className={styles.selectButton}
              >
                Selecionar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;