
import React, { useState } from 'react';
import styles from './RetirarObjeto.module.css';

const url = "http://localhost:5000/usuarios";

const RetirarObjeto = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioRetirada, setHorarioRetirada] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para confirmar a retirada do objeto
      console.log({ nome, cpf, horarioRetirada });
  };
  
  return (
    <div className={styles.container}>
       <h2>Tela de retirada</h2>
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
                <button type="submit">Confirmar</button>
            </form>
    </div>
  );
}

export default RetirarObjeto