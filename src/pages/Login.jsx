import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './Login.module.css';
import logo from "../images/logo-senai.png";

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/usuario/entrar?cpf=${cpf}&senha=${senha}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const user = await res.json();

        // Gravar dados do usuário autenticado no localStorage
        localStorage.setItem('user', JSON.stringify(user[0])); // Assume que o backend retorna um array com o usuário
        localStorage.setItem('isAuthenticated', 'true');

        alert("Login realizado com sucesso!");
        navigate('/home');
      } else {
        setError('CPF ou senha incorretos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo Senai" className={styles.logo} />
        </div>

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            disabled={isLoading}
            required
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={isLoading}
            required
            className={styles.input}
          />
        </Form.Group>

        <Button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
