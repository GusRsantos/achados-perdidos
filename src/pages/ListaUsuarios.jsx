import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ListaUsuarios.module.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nome_usuario: '',
    cpf_usuario: '',
    senha_usuario: '',
    tipo_usuario: ''
  });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleNovoUsuario = () => {
    navigate('/cadastrarusuario');
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setEditingUser(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/usuario");
      const users = await res.json();
      setUsuarios(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id_usuario);
    setEditForm({
      nome_usuario: user.nome_usuario,
      cpf_usuario: user.cpf_usuario,
      senha_usuario: user.senha_usuario,
      tipo_usuario: user.tipo_usuario
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (user) => {
    try {
      const res = await fetch(`http://localhost:5000/usuario/editar/${user.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: editForm.nome_usuario,
          cpf: editForm.cpf_usuario,
          senha: editForm.senha_usuario,
          tipo: editForm.tipo_usuario
        })
      });

      if (res.ok) {
        alert("Os dados foram editados com sucesso!");
        setUsuarios(usuarios.map(u => 
          u.id_usuario === user.id_usuario ? { ...u, ...editForm } : u
        ));
        setEditingUser(null);
      } else {
        alert("Erro ao editar usuário");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error.message);
      alert("Erro ao editar usuário");
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button 
        onClick={handleNovoUsuario}
        className={styles.addButton}
      >
        + USUÁRIO
      </button>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Senha</th>
              <th>Tipo</th>
              <th>******</th>
              <th colSpan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id_usuario}>
                <td>
                  {editingUser === user.id_usuario ? (
                    <input
                      type="text"
                      name="nome_usuario"
                      value={editForm.nome_usuario}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    user.nome_usuario
                  )}
                </td>
                <td>
                  {editingUser === user.id_usuario ? (
                    <input
                      type="text"
                      name="cpf_usuario"
                      value={editForm.cpf_usuario}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    user.cpf_usuario
                  )}
                </td>
                <td>
                  {editingUser === user.id_usuario ? (
                    <input
                      type="password"
                      name="senha_usuario"
                      value={editForm.senha_usuario}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    "******"
                  )}
                </td>
                <td>
                  {editingUser === user.id_usuario ? (
                    <select
                      name="tipo_usuario"
                      value={editForm.tipo_usuario}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    >
                      <option value="administrador">administrador</option>
                      <option value="funcionario">funcionario</option>
                    </select>
                  ) : (
                    user.tipo_usuario
                  )}
                </td>
                <td>******</td>
                <td>
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
                <td>
                  {editingUser === user.id_usuario ? (
                    <button
                      onClick={() => handleEditSubmit(user)}
                      className={styles.editarButton}
                    >
                      SALVAR
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className={styles.editarButton}
                    >
                      EDITAR
                    </button>
                  )}
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