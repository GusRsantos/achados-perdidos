import React from 'react';
import styles from './Home.module.css';
import logo from "../images/logo-senai.png"; // Importe sua logo

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="Logo Senai" className={styles.logo} />
        <div className={styles.searchContainer}>
          <i className="bi bi-search" style={{ color: 'blue', marginRight: '8px' }}></i>
          <input type="text" placeholder="Buscar..." className={styles.searchInput} />
        </div>
      </div>

      {/* Adicionando a linha abaixo do cabeçalho */}
      <hr className={styles.divider} />

      {/* Botão "+ OBJETO" */}
      <button className={styles.addButton}>+ OBJETO</button>
    </div>
  );
}

export default Home;
