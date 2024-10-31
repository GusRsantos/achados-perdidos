import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const sugestoes = [
  "Garrafa Stanley",
  "Garrafa Farm",
  "Garrafa Pacco"
];

const objetos = [
  { id: 1, nome: "Garrafa Stanley", status: "Achado" },
  { id: 2, nome: "Garrafa Farm", status: "Perdido" },
  { id: 3, nome: "Garrafa Pacco", status: "Achado" },
  { id: 4, nome: "Garrafa Tupperware", status: "Perdido" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSelectObject = (objeto) => {
    navigate(`/info-objeto/${objeto.id}`, { state: { objeto } });
  };

  return (
    <div className={styles.container}>
      
      {/* Botão adicionar objeto */}
      <button className={styles.addButton}>+ OBJETO</button>

      {/* Legenda */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dotAchado}></span>
          Achado
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dotPerdido}></span>
          Perdido
        </div>
      </div>

      {/* Grid de objetos */}
      <div className={styles.grid}>
        {objetos.map((objeto) => (
          <div key={objeto.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <span className={styles.photoText}>Foto do objeto.</span>
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
}