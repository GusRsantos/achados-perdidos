import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../images/logo-senai.png'; // Certifique-se de que o caminho está correto

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validação de email e senha
    if (email === "login@gmail.com" && senha === "12345") {
      navigate('/home'); // Redireciona para a página Home
    } else {
      alert('E-mail ou senha incorretos.'); // Mensagem de erro
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo Senai" className={styles.logo} />
        <input
          type="text"
          placeholder="Digite seu CPF"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          className={styles.input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
        />
        <button className={styles.button} onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;
