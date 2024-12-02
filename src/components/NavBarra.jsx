import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import styles from './NavBarra.module.css';
import logo from "../images/logo-senai.png";

const NavBarra = () => {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Recupera o tipo de usuário do localStorage
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType'); // Remove o tipo de usuário também
    navigate('/');
  };

  const handleReturnOnImage = () => {
    navigate('/home');
  };

  const handleUsuarios = () => {
    navigate('/listausuarios');
  };

  const buscarObjetos = async (termo) => {
    if (!termo) {
      setSugestoes([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/objetos/buscar?termo=${termo}`);
      const data = await response.json();
      setSugestoes(data);
    } catch (error) {
      console.error("Erro ao buscar objetos:", error);
    }
  };

  const handleChange = (e) => {
    const termo = e.target.value;
    setTermoBusca(termo);
    buscarObjetos(termo);
  };

  return (
    <Navbar className={styles.navbar} expand={false}>
      <Container fluid className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo Senai" className={styles.logo} onClick={handleReturnOnImage} />
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={termoBusca}
            onChange={handleChange}
          />
          <button className={styles.searchButton}>
            <img
              src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPjxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPjwvc3ZnPg=="} // Ícone de busca em Base64
              alt="Buscar"
              className={styles.searchIcon}
            />
          </button>
          {sugestoes.length > 0 && (
            <ul className={styles.suggestions}>
              {sugestoes.map((sugestao) => (
                <li
                  key={sugestao.id_objeto}
                  onClick={() => navigate(`/infoobjetos/${sugestao.id_objeto}`)}
                  className={styles.suggestionItem}
                >
                  {sugestao.nome_objeto}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Navbar.Toggle aria-controls="navbar-nav" className={styles.toggleButton}>
          <span className={styles.hamburgerIcon}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {userType === 'administrador' && (
              <Nav.Link onClick={handleUsuarios} className={styles.navLink}>
                <FaUsers className={styles.navIcon} />
                Usuários
              </Nav.Link>
            )}
            <Nav.Link onClick={handleLogout} className={styles.navLink}>
              <FaSignOutAlt className={styles.navIcon} />
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarra;
