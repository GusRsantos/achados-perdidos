import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastrarUsuario.module.css';
import Form from "react-bootstrap/Form";

const CadastrarUsuario = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [tipo, setTipo] = useState("gerente");
  
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificações de campo
    if (!nome == "") {
      if (!cpf == "") {
        if (!senha == "") {
          
          // Cria um objeto com as informações preenchidas
          const user = { nome, cpf, senha, tipo };
          
          // Faz a requisição a api pra criar o usuário
          const req = await fetch("http://localhost:5000/usuario/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          
          //Guarda o retorno da requisição na variável res
          const res = req.json();

          //Caso o retorno da requisição tenha "cpf_usuario", significa que já existe um usuário com este email, logo não posso cadastrá-lo
          res.then((resultado) => {
              if (resultado.includes("cpf_usuario")) {
                setAlertaClass("mb-3");
                setAlertaMensagem("Já existe usuário com este CPF cadastrado")
              } 
              else {
                alert("Usuário cadastrado com sucesso");
                setNome("");
                setCpf("");
                setSenha("");
                setTipo("");
                navigate("/listausuarios");
              }
              console.log(resultado);
            })
            .catch((erro) => console.error(erro));
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("As senhas não são iguais");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo email não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo nome não pode ser vazio");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Cadastro de usuários</h2>
        {erro && <p className={styles.erro}>{erro}</p>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <br />
            <br />
            <label htmlFor="nome">Nome completo:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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

          <Form.Group controlId="formGridTipo" className="mb-3">
            <Form.Label>Tipo de usuário</Form.Label>
            <Form.Select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
            >
               <option value="administrador">Administrador</option>
              <option value="funcionario">Funcionário</option>
            </Form.Select>
          </Form.Group>


          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarUsuario;