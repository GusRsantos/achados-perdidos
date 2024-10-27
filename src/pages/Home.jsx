import styles from './Home.module.css';
import CartaoObjeto from "../components/CartaoObjeto";

const url = "http://localhost:5000/usuario";

const Home = () => {
  const objects = [
    { name: 'Garrafa Stanley', status: 'Achado' },
    { name: 'Garrafa Farm', status: 'Perdido' },
    // Outros objetos
  ];

  return (
    <div className={styles.container}>
      <h1>Achados e Perdidos</h1>
      <div className={styles.cards}>
        {objects.map((obj, index) => (
          <CartaoObjeto key={index} name={obj.name} status={obj.status}/>
        ))}
      </div>
    </div>
  );
};

export default Home;