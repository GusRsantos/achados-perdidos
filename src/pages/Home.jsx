import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import styles from './Home.module.css';

// Dados de exemplo - você pode substituir por dados reais da sua API
const sugestoes = [
  "Garrafa Stanley",
  "Garrafa Farm",
  "Garrafa Pacco"
];

const objetos = [
  { id: 1, nome: "Garrafa Stanley", status: "Achado", foto: "https://via.placeholder.com/200" },
  { id: 2, nome: "Garrafa Farm", status: "Perdido", foto: "https://via.placeholder.com/200" },
  { id: 3, nome: "Garrafa Pacco", status: "Achado", foto: "https://via.placeholder.com/200" },
  { id: 4, nome: "Garrafa Tupperware", status: "Perdido", foto: "https://via.placeholder.com/200" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className={styles.container}>
      {/* Barra de Pesquisa com Sugestões */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className={styles.searchInput}
            />
            <InputGroup.Text className={styles.searchIcon}>
              <BsSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
        
        {showSuggestions && (
          <div className={styles.suggestions}>
            {sugestoes.map((sugestao, index) => (
              <div key={index} className={styles.suggestionItem}>
                <BsSearch className={styles.suggestionIcon} />
                {sugestao}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botão Adicionar Objeto */}
      <Link to="/cadastrarobjeto">
        <Button className={styles.addButton}>+ OBJETO</Button>
      </Link>

      {/* Legenda */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dotAchado} />Achado
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dotPerdido} />Perdido
        </span>
      </div>

      {/* Grid de Objetos */}
      <div className={styles.grid}>
        {objetos.map((objeto) => (
          <div key={objeto.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={objeto.foto} alt={objeto.nome} className={styles.objectImage} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.objectName}>{objeto.nome}</h3>
              <span className={objeto.status === "Achado" ? styles.statusAchado : styles.statusPerdido}>
                • {objeto.status}
              </span>
              <Button variant="primary" className={styles.selectButton}>
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}