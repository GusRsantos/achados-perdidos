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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome && hora && descricao && img) {
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("hora", hora);
        formData.append("descricao", descricao);
        formData.append("imagem", img); // Nome corrigido para coincidir com o backend

        try {
            const response = await fetch("http://localhost:5000/objetos/criar", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Produto cadastrado com sucesso!");
                setNome("");
                setHora("");
                setDescricao("");
                setImagem(null);
                setFotoPreview(null);
                navigate("/home");
            } else {
                const error = await response.json();
                alert(error.error || "Erro ao cadastrar o produto.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na requisição. Verifique o console.");
        }
    } else {
        alert("Todos os campos são obrigatórios!");
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
