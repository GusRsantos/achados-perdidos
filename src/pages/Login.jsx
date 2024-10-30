import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../images/logo-senai.png';
import { Form, Button, Alert } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulando uma verificação de login
      if (email === "login@gmail.com" && senha === "12345") {
        // Simulando um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Armazenar informação de que o usuário está logado
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirecionar para a página home
        navigate('/home');
      } else {
        setError('E-mail ou senha incorretos');
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
        <img src={logo} alt="Logo Senai" className={styles.logo} />
        
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Digite seu CPF"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
}

export default Login;