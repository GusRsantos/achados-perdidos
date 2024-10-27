import React, { useState } from 'react';
import styles from './CadastrarObjeto.module.css';

const url = "http://localhost:5000/usuarios";

const CadastrarObjeto = () => {
  const [objeto, setObjeto] = useState('');
  const [encontradoPor, setEncontradoPor] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState(null);

  const handleFotoUpload = (e) => {
      setFoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para enviar os dados ao backend
      console.log({ objeto, encontradoPor, cpf, horarioEntrada, observacoes, foto });
  };

  return (
    <div className={styles.container}>
        <h2>Cadastro de objeto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Objeto encontrado"
                    value={objeto}
                    onChange={(e) => setObjeto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Encontrado por"
                    value={encontradoPor}
                    onChange={(e) => setEncontradoPor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Horário de entrada"
                    value={horarioEntrada}
                    onChange={(e) => setHorarioEntrada(e.target.value)}
                />
                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    onChange={handleFotoUpload}
                />
                <button type="submit">Cadastrar</button>
            </form>
    </div>
  );
}

export default CadastrarObjeto