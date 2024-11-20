import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastrarUsuario.module.css';

const CadastrarUsuario = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    if (!nomeCompleto || !cpf || !senha || !confirmaSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    // Aqui você pode adicionar a lógica de cadastro quando implementar o backend
    console.log('Usuário cadastrado com sucesso!');
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Cadastro de usuários</h2>
        
        {erro && <p className={styles.erro}>{erro}</p>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nomeCompleto">Nome completo:</label>
            <input
              type="text"
              id="nomeCompleto"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmaSenha">Confirma senha:</label>
            <input
              type="password"
              id="confirmaSenha"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarUsuario;