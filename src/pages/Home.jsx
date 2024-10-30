import React from 'react';
import styles from './Home.module.css';
import logo from "../images/logo-senai.png";
import CartaoObjeto from '../components/CartaoObjeto';

function Home() {
  const objetos = [
    { name: 'Garrafa Stanley', status: 'Achado' },
    { name: 'Garrafa Farm', status: 'Perdido' },
    { name: 'Garrafa Pacco', status: 'Achado' },
    { name: 'Garrafa Tupperware', status: 'Perdido' },
  ];
  console.log(objetos);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo Senai" className={styles.logo} />
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Buscar..." className={styles.searchInput} />
          <i className="bi bi-search" style={{ color: 'blue', marginLeft: '8px' }}></i>
        </div>
      </header>

      <hr className={styles.divider} />

      <button className={styles.addButton}>+ OBJETO</button>

      <main className={styles.mainContent}>
        <div className={styles.legend}>
          <span className={styles.achado}>Achado</span>
          <span className={styles.perdido}>Perdido</span>
        </div>

        <div className={styles.cartoesContainer}>
          {objetos.map((objeto, index) => (
            <CartaoObjeto key={index} name={objeto.name} status={objeto.status} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
