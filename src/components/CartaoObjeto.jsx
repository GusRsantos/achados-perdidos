import React from 'react';
import styles from './CartaoObjeto.module.css';

const CartaoObjeto = ({ name, status }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>Foto do objeto</div>
      <h3>{name}</h3>
      <p className={status === 'Achado' ? styles.achado : styles.perdido}>
        {status}
      </p>
      <button className={styles.selectButton}>Selecionar</button>
    </div>
  );
};

export default CartaoObjeto;
