import React, { useState, useEffect, useRef } from 'react';
import { json, useNavigate } from 'react-router-dom';
import styles from './CadastrarObjeto.module.css';
import { useObjects } from '../context/ObjectContext';
import { Form } from 'react-bootstrap';

const CadastrarObjeto = () => {
  const [nome, setNome] = useState('');
  const [hora, setHora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [img, setImagem] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erro, setErro] = useState('');

  
  
  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");

  // variavel pro navigate
  const navigate = useNavigate();


  const handleCancelar = () => {
    navigate('/home');
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
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
  
    if (nome && hora && descricao && img) {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("hora", hora);
      formData.append("descricao", descricao);
      formData.append("img", img); // Adiciona a imagem
  
      try {
        const req = await fetch("http://localhost:5000/objetos/criar", {
          method: "POST",
          body: formData, // FormData no corpo
        });
  
        if (req.ok) {
          alert("Produto cadastrado com sucesso");
          setNome("");
          setHora("");
          setImagem("");
          setDescricao("");
          navigate("/home");
        } else {
          alert("Erro ao cadastrar");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição. Verifique o console.");
      }
    } else {
      if (!nome) {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo nome do objeto não pode ser vazio");
      } else if (!hora) {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo hora não pode ser vazio");
      } else if (!descricao) {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo descrição não pode ser vazio");
      } else if (!img) {
        setAlertaClass("mb-3");
        setAlertaMensagem("A imagem não pode ser vazia");
      }
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Horário de entrada"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
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
        <button type="submit"
        onClick={handleSubmit}>Cadastrar</button>
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
