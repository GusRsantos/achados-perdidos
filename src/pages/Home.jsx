import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useObjects } from '../context/ObjectContext';

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


  const todosObjetos = [...objetosOriginais, ...objects];

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

      <div className={styles.grid}>
        {todosObjetos.map((objeto) => (
          <div key={objeto.id} className={styles.card}>
            <div className={styles.imageContainer}>
              {objeto.foto ? (
                <img 
                  src={objeto.foto} 
                  alt={objeto.nome} 
                  className={styles.objectImage}
                />
              ) : (
                <span className={styles.photoText}>Foto do objeto.</span>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.objectName}>{objeto.nome}</h3>
              <div className={styles.statusContainer}>
                <span 
                  className={`${styles.statusDot} ${
                    objeto.status === "Achado" ? styles.dotAchado : styles.dotPerdido
                  }`}
                ></span>
                <span className={`${styles.statusText} ${
                  objeto.status === "Achado" ? styles.textAchado : styles.textPerdido
                }`}>
                  {objeto.status}
                </span>
              </div>
              <button 
                onClick={() => handleSelectObject(objeto)}
                className={styles.selectButton}
              >
                Selecionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;