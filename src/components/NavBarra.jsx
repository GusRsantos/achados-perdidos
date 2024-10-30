import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './NavBarra.module.css';
import logo from "../images/logo-senai.png";

const NavBarra = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav>
      <div>
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className={styles.navbar}>
            <Container fluid>
              <img src={logo} alt="Logo Senai" className={styles.logo} />
              <input type="text" placeholder="Buscar..." className={styles.searchBar} />
              <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggle}/>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Perfil</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </nav>
  );
};

export default NavBarra;