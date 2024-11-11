import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RetirarObjeto.module.css';
import { useObjects } from '../context/ObjectContext';

const RetirarObjeto = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioRetirada, setHorarioRetirada] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { removeObject } = useObjects();

  // Verifica se o objeto foi passado pela navegação
  const objeto = location.state?.objeto;

  // Se o objeto não for encontrado, redireciona para a página inicial
  if (!objeto) {
    navigate('/home');
    return null;
  }

  // Função para manipular o evento de retirada
  const handleSubmit = (e) => {
    e.preventDefault();
    removeObject(objeto.id);
    alert(`O objeto "${objeto.nome}" foi retirado.`);
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h2>Retirar Objeto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Horário de retirada"
          value={horarioRetirada}
          onChange={(e) => setHorarioRetirada(e.target.value)}
        />
        <button type="submit">Confirmar</button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className={styles.buttonCancelar}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default RetirarObjeto;
