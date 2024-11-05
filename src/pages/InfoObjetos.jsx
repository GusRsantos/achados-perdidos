import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import styles from './InfoObjetos.module.css';
import { useObjects } from '../context/ObjectContext';
import Form from "react-bootstrap/Form";

export default function InfoObjetos() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { objects, updateObject } = useObjects();
  const [objetoAtual, setObjetoAtual] = useState(location.state?.objeto || {});

  useEffect(() => {
    const objetoId = location.pathname.split('/').pop();
    const objetoEncontrado = objects.find(obj => obj.id === objetoId) || location.state?.objeto || {};
    setObjetoAtual(objetoEncontrado);
  }, [location, objects]);

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleRetirar = () => {
    setShowModal(true);
  };

  const handleConfirmarRetirada = () => {
    setShowModal(false);
    navigate('/retirarobjeto');
  };

  const handleEditar = () => {
    setIsEditing(true);
  };

  const handleSalvar = () => {
    updateObject(objetoAtual);
    setIsEditing(false);
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
                src={objetoAtual.foto || "https://via.placeholder.com/200"} 
                alt={objetoAtual.nome} 
                className={styles.objectImage} 
              />
            </div>
            <div className={styles.fieldsContainer}>
              <input
                type="text"
                name="nome"
                value={objetoAtual.nome || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
              <input
                type="text"
                name="dataEncontro"
                value={objetoAtual.dataEncontro || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
              <input
                type="text"
                name="localEncontro"
                value={objetoAtual.localEncontro || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
              <input
                type="text"
                name="encontradoPor"
                value={objetoAtual.encontradoPor || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.bottomSection}>
            <div className={styles.statusSection}>
            <Form.Group controlId="formGridStatus">
          <Form.Select
           value={objetoAtual.status}
                name="status"
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.Input}
          >
            <option>Achado</option>
            <option>Perdido</option>
        
          </Form.Select>
        </Form.Group>
              
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
            </div>
            
            <div className={styles.observacoesSection}>
              <label>Observações:</label>
              <textarea
                name="observacoes"
                value={objetoAtual.observacoes || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={styles.observacoesInput}
              />
            </div>
          </div>
        </div>
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
  );
}