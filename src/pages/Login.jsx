import React from 'react';
import styles from './Login.module.css';

const url = "http://localhost:5000/usuarios";
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img src="./" alt="Logo Senai" className={styles.logo} /> 
        <input type="text" placeholder="Digite seu CPF" className={styles.input} />
        <input type="password" placeholder="Digite sua senha" className={styles.input} />
        <button className={styles.loginButton}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;