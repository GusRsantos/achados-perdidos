import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useObjects } from '../context/ObjectContext';
import CartaoObjeto from "../components/CartaoObjeto";


const Home = () => {
  const navigate = useNavigate();

  const handleSelectObject = (objeto) => {
    navigate(`/info-objeto/${objeto.id}`, { state: { objeto } });
  };

  const handleSubmitObject = () => {
    navigate("/cadastrarobjeto");
  };

  const btnFilter = () =>{
    {/*If (nameInput === name) {
 Alert(name)
} else {
Alert(Não encontrado)

}

} */}
  } 

const [objetos, setObjetos] = useState([]);


// Resgate de dados da api para pegar os produtos
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch("http://localhost:5000/objetos");
      const objs = await res.json();
      setObjetos(objs);
    } catch (error) {
      console.error("Erro ao buscar objetos:", error.message);
    }
  }

  fetchData();
}, []); // Chama o `useEffect` apenas quando o componente for montado


 
  return (
    <div className={styles.container}>
      <button onClick={handleSubmitObject} 
        className={styles.addButton}>+ OBJETO</button>
  
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <button onClick={btnFilter} className={styles.btnAchado}></button>
          Achado
        </div>
        <div className={styles.legendItem}>
          <button className={styles.btnPerdido}></button>
          Perdido
        </div>
      </div>

      <div className={styles.listaObjetos}>
  {objetos.map((obj) => (
    <CartaoObjeto
      key={obj.id_objeto}
      id={obj.id_objeto}
      nome={obj.nome_objeto}
      status={obj.status}
      imagemUrl={obj.img}
      onSelecionar={handleSelectObject}
    />
  ))}
</div>

    </div>
  );
};

export default Home;