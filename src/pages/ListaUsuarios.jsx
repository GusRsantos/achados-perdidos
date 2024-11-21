import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ListaUsuarios.module.css';

const ListaUsuarios = () => {

  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  const handleNovoUsuario = () => {
    navigate('/cadastrarusuario');
  };

  const handleEditar = (id) => {
    console.log('Editar usuário:', id);
    // Implementar lógica de edição
  };

  const handleExcluir = (id) => {
    console.log('Excluir usuário:', id);
    // Implementar lógica de exclusão
  };

// Resgate de dados da api para pegar os produtos
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch("http://localhost:5000/usuario");
      const users = await res.json();
      setUsuarios(users);
    } catch (error) {
      console.error("Erro ao buscar objetos:", error.message);
    }
  }

  fetchData();
}, []); // Chama o `useEffect` apenas quando o componente for mon

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={handleNovoUsuario}
          className={styles.addButton}
        >
          + USUÁRIO
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Senha</th>
              <th colSpan="3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome_usuario}</td>
                <td>{user. cpf_usuario}</td>
                <td>{user.senha_usuario}</td>
                <td>{user.tipo_usuario}</td>
                <td>******</td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => handleExcluir(usuarios.id)}
                    className={styles.excluirButton}
                  >
                    EXCLUIR
                  </button>
                </td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => handleEditar(usuarios.id)}
                    className={styles.editarButton}
                  >
                    EDITAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaUsuarios;