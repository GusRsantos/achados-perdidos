import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListaUsuarios.module.css';

const usuarios = [
  { id: 1, nome: "GUSTAVO RESERVA", cpf: "12345678901" },
  { id: 2, nome: "SAMUEL LOUREIRO", cpf: "27534283714" },
  { id: 3, nome: "JOY NICHOLAS", cpf: "40582493857" },
  { id: 4, nome: "JOÃO VICTOR KLEIN", cpf: "10628285916" },
  { id: 5, nome: "DAVI DO SANTOS", cpf: "54067132496" },
  { id: 6, nome: "ARTHUR EVANGELISTA", cpf: "09876432859" }
];

const ListaUsuarios = () => {
  const navigate = useNavigate();

  const handleNovoUsuario = () => {
    navigate('/cadastrar-usuario');
  };

  const handleEditar = (id) => {
    console.log('Editar usuário:', id);
    // Implementar lógica de edição
  };

  const handleExcluir = (id) => {
    console.log('Excluir usuário:', id);
    // Implementar lógica de exclusão
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
              <th>Nome Completo</th>
              <th>CPF</th>
              <th>Senha</th>
              <th colSpan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>******</td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => handleExcluir(usuario.id)}
                    className={styles.excluirButton}
                  >
                    EXCLUIR
                  </button>
                </td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => handleEditar(usuario.id)}
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