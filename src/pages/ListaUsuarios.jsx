import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ListaUsuarios.module.css';

const ListaUsuarios = (props) => {

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null); // Usuário para edição
  const [isEditVisible, setIsEditVisible] = useState(false); // Mostrar formulário de edição
  const navigate = useNavigate();

  const handleNovoUsuario = () => {
    navigate('/cadastrarusuario');
  };


  //fdjkdjkdjkdj

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

  const handleEditUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/usuario/editar/${usuarioEdit.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEdit),
      });
  
      if (res.ok) {
        alert("Usuário atualizado com sucesso!");
        setUsuarios(
          usuarios.map((u) =>
            u.id_usuario === usuarioEdit.id_usuario ? usuarioEdit : u
          )
        );
        setIsEditVisible(false);
      } else {
        alert("Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error.message);
    }
  };
  


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
              <th colSpan="2">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome_usuario}</td>
                <td>{user.cpf_usuario}</td>
                <td>{user.senha_usuario}</td>
                <td>{user.tipo_usuario}</td>
                <td>******</td>
                <td className={styles.actionCell}>
                  <button
                    onClick={async () => {
                      try {
                        const req = await fetch(`http://localhost:5000/usuario/excluir/${user.id_usuario}`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                        });

                        if (req.ok) {
                          alert("Usuário deletado com sucesso");
                          setUsuarios(usuarios.filter((u) => u.id_usuario !== user.id_usuario));
                        } else {
                          const error = await req.text();
                          alert(`Erro ao deletar: ${error}`);
                        }
                      } catch (error) {
                        console.error("Erro ao excluir usuário:", error.message);
                        alert("Erro ao excluir usuário");
                      }
                    }}
                    className={styles.excluirButton}
                  >
                    EXCLUIR
                  </button>
                </td>

                <td className={styles.actionCell}>
                <button onClick={handleEditUser}
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