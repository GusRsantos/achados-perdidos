import React from 'react';
import styles from './NavBarra.module.css';

const NavBarra = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Logo Senai" />
      </div>
      <input type="text" placeholder="Buscar..." className={styles.searchBar} />
      <button className={styles.hamburguerMenu}>☰</button>
      <div className={styles.navLinks}>
        <a href="/perfil">Perfil</a>
        <a href="/usuarios">Usuários</a>
        <a href="/sair">Sair</a>
      </div>
    </nav>
  );
};

export default NavBarra;