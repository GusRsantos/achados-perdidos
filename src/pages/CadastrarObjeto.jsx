import React, { useState, useEffect, useRef } from 'react';
import CartaoObjeto from '../components/CartaoObjeto';
import { useNavigate } from 'react-router-dom';
import styles from './CadastrarObjeto.module.css';
import { useObjects } from '../context/ObjectContext';
import { Form } from 'react-bootstrap';

const CadastrarObjeto = () => {
  const [nomeObjeto, setNomeObjeto] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erro, setErro] = useState('');
  const { addObject } = useObjects();
  const [status, setStatus] = useState('Achado');
  
  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");

  // variavel pro navigate
  const navigate = useNavigate();

  // Referência para o campo de input do arquivo
  const fileInputRef = useRef(null);

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

  // Resgate de dados da api para preencher o select de categoria
  useEffect(() => {
    async function fetchData() {
      try {
        // busca os dados
        const req = await fetch("http://localhost:5000/objetos");
        // converte o resultado pra json
       
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Cliquei");
    if (!nomeObjeto == "") {
      if (!horaEntrada == "") {
        if (!descricao == "") {

          const formData = new FormData();
          formData.append("nome", nomeObjeto);
          formData.append("hora", horaEntrada);
          formData.append("descrição", descricao);
          const req = await fetch("http://localhost:5000/objetos/criar", {
            method: "POST",
            body: formData,
          });
          alert("Produto cadastrado com sucesso");
          setNomeObjeto("");
          setHoraEntrada("");
          setFoto("");
          setDescricao(null);
          fileInputRef.current.value = ""; // Limpa o valor do input file
          navigate("/home");
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("O campo descrição não pode ser vazio");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo hora não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo nome do objeto não pode ser vazio");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cadastro de objeto</h2>
      {erro && <p className={styles.erro}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do objeto"
          value={nomeObjeto}
          onChange={(e) => setNomeObjeto(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Horário de entrada"
          value={horaEntrada}
          onChange={(e) => setHoraEntrada(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
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
