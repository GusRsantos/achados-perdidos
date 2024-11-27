import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './InfoObjetos.module.css';
import { Modal } from 'react-bootstrap';
import { useObjects } from '../context/ObjectContext';
export default function InfoObjetos() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
 const { objects, updateObject } = useObjects(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [objetoAtual, setObjetoAtual] = useState({});

  useEffect(() => {
    async function fetchObjectData() {
      try {
        const response = await fetch(`http://localhost:5000/objetos/edicao/${id}`);
        const data = await response.json();
        console.log("Dados retornados pela API:", data);
  
        if (data) {
          setObjetoAtual(data[0]); // Ajuste aqui se a API já retorna o objeto diretamente
        }
      } catch (error) {
        console.error("Erro ao buscar dados do objeto:", error);
      }
    }
  
    fetchObjectData();
  }, [id]);
  

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleRetirar = () => {
    setShowModal(true);
  };

  const handleConfirmarRetirada = () => {
    navigate('/retirarobjeto');
  };

  const handleEditar = () => {
    setIsEditing(true);
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/objetos/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: objetoAtual.nome_objeto,
          hora: objetoAtual.hora_entrada,
          descricao: objetoAtual.descricao,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar as alterações.");
      }
  
      const data = await response.json();
      console.log("Alterações salvas com sucesso:", data);
  
      setIsEditing(false);
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Não foi possível salvar as alterações.");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjetoAtual(prev => ({ ...prev, [name]: value }));
  };  


  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
  
        <h2 className={styles.title}>Informações do objeto</h2>
       
          <div className={styles.formContainer}>
          <div className={styles.mainSection}>
            <div className={styles.imageContainer}>
              <img
                src={objetoAtual.foto ? `http://localhost:5000/images/${objetoAtual.foto}` : "https://via.placeholder.com/200"}
                alt={objetoAtual.nome_objeto}
                className={styles.objectImage}
              />
            </div>

            <div className={styles.fieldsContainer}>
              <label>descrição</label>
              <input
                type="text"
                 name="nome"
                value={objetoAtual.nome_objeto || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
              <input
                type="text"
                name="hora"
                value={objetoAtual.hora_entrada || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
              <input
                type="text"
                name="descricao"
                value={objetoAtual.descricao || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />           
            </div>
          </div>

          <div className={styles.bottomSection}>
          <div className={styles.buttonGroup}>
                <button 
                  onClick={handleVoltar}
                  className={styles.buttonVoltar}
                > 
                  Voltar
                </button>
                <button 
                  onClick={handleRetirar}
                  className={styles.buttonRetirar}
                >
                  Retirar Objeto
                </button>
                {isEditing ? (
                  <button 
                    onClick={handleSalvar}
                    className={styles.buttonEditar}
                  >
                    Salvar
                  </button>
                ) : (
                  <button 
                    onClick={handleEditar}
                    className={styles.buttonEditar}
                  >
                    Editar
                  </button>
                )}
              </div>
              <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
        className={styles.modal}
      >
        <Modal.Body className={styles.modalBody}>
          <p>Tem certeza que deseja retirar este objeto?</p>
          <div className={styles.modalButtons}>
            <button 
              onClick={() => setShowModal(false)}
              className={styles.buttonCancelar}
            >
              Cancelar
            </button>
            <button 
              onClick={handleConfirmarRetirada}
              className={styles.buttonContinuar}
            >
              Continuar
            </button>
          </div>
        </Modal.Body>
      </Modal>


          </div>
        </div>
      </div>
    </div>
  );
}

