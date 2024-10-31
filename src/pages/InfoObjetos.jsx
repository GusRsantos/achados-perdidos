import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import styles from './InfoObjetos.module.css';

export default function InfoObjetos() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { objeto } = location.state || {};

  if (!objeto) {
    return <div>Objeto não encontrado</div>;
  }

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleRetirar = () => {
    setShowModal(true);
  };

  const handleConfirmarRetirada = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Informações do objeto</h2>
        
        <div className={styles.formContainer}>
          <div className={styles.mainSection}>
            <div className={styles.imageContainer}>
              <img 
                src={objeto.foto || "https://via.placeholder.com/200"} 
                alt={objeto.nome} 
                className={styles.objectImage} 
              />
            </div>
            <div className={styles.fieldsContainer}>
              <input
                type="text"
                value={objeto.nome}
                readOnly
                className={styles.input}
              />
              <input
                type="text"
                value={objeto.dataEncontro}
                readOnly
                className={styles.input}
              />
              <input
                type="text"
                value={objeto.localEncontro}
                readOnly
                className={styles.input}
              />
              <input
                type="text"
                value={objeto.encontradoPor}
                readOnly
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.bottomSection}>
            <div className={styles.statusSection}>
              <label>Status:</label>
              <input
                type="text"
                value={objeto.status}
                readOnly
                className={styles.statusInput}
              />
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
              </div>
            </div>
            
            <div className={styles.observacoesSection}>
              <label>Observações:</label>
              <textarea
                value={objeto.observacoes}
                readOnly
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