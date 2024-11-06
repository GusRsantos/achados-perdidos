import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RetirarObjeto.module.css';
import { useObjects } from '../context/ObjectContext';

const url = "http://localhost:5000/objetosOriginais";

const RetirarObjeto = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioRetirada, setHorarioRetirada] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { removeObject } = useObjects();

  const objeto = location.state?.objeto || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/${objeto.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        removeObject(objeto.id);
        alert(`O objeto ${objeto.nome} foi retirado`);
        navigate('/home');
      } else {
        throw new Error('Falha ao retirar o objeto');
      }
    } catch (error) {
      console.error('Erro ao retirar o objeto:', error);
      alert('Ocorreu um erro ao tentar retirar o objeto.');
    }
  };

  const handleVoltarHome = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h2>Tela de Retirada</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="time"
          placeholder="Horário de retirada"
          value={horarioRetirada}
          onChange={(e) => setHorarioRetirada(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Confirmar</button>
        <button 
          onClick={handleVoltarHome}
          className={styles.buttonCancelar}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default RetirarObjeto;
