import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastrarObjeto.module.css';
import { useObjects } from '../context/ObjectContext';
import Form from "react-bootstrap/Form";

const CadastrarObjeto = () => {
  const [objeto, setObjeto] = useState('');
  const [encontradoPor, setEncontradoPor] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { addObject } = useObjects();
  const [status, setStatus] = useState('');

  const handleCancelar = () => {
    navigate('/home');
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!objeto || !encontradoPor || !cpf) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      const newObject = {
        nome: objeto,
        encontradoPor,
        cpf,
        horarioEntrada,
        observacoes,
        foto: fotoPreview,
        status,
        dataEncontro: new Date().toLocaleDateString()
      };

      addObject(newObject);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao cadastrar objeto:', error);
      setErro('Ocorreu um erro ao cadastrar o objeto. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cadastro de objeto</h2>
      {erro && <p className={styles.erro}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Objeto encontrado"
          value={objeto}
          onChange={(e) => setObjeto(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Encontrado por"
          value={encontradoPor}
          onChange={(e) => setEncontradoPor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
          <Form.Group controlId="formGridTipo">
            <Form.Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
              }}
            >
              <option>Achado</option>
              <option>Perdido</option>
            </Form.Select>
          </Form.Group>
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
        <div className={styles.fileUpload}>
          <input
            type="file"
            onChange={handleFotoUpload}
            accept="image/*"
          />
          {fotoPreview && (
            <img 
              src={fotoPreview} 
              alt="Preview" 
              className={styles.preview}
            />
          )}
        </div>
        <button type="submit">Cadastrar</button>
        <button 
          type="button"
          onClick={handleCancelar}
          className={styles.buttonCancelar}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CadastrarObjeto;