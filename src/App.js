import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ObjectProvider } from './context/ObjectContext';

import NavBarra from "./components/NavBarra";
import Login from "./pages/Login";
import CadastrarObjeto from "./pages/CadastrarObjeto";
import RetirarObjeto from "./pages/RetirarObjeto";
import Home from './pages/Home';
import InfoObjetos from './pages/InfoObjetos';
import CadastrarUsuario from "./pages/CadastrarUsuario";
import ListaUsuarios from './pages/ListaUsuarios';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userType = localStorage.getItem('userType'); // Recupera o tipo de usuário (admin ou funcionario)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Permitir acesso apenas se o tipo de usuário for adequado
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/home" replace />; // Redireciona para a home ou outra página se o tipo for inválido
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <ObjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={['administrador', 'funcionario']}>
                  <NavBarra />
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/infoobjetos/:id"
              element={
                <ProtectedRoute allowedRoles={['administrador', 'funcionario']}>
                  <NavBarra />
                  <InfoObjetos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cadastrarobjeto"
              element={
                <ProtectedRoute allowedRoles={['administrador', 'funcionario']}>
                  <NavBarra />
                  <CadastrarObjeto />
                </ProtectedRoute>
              }
            />

            <Route
              path="/retirarobjeto"
              element={
                <ProtectedRoute allowedRoles={['administrador', 'funcionario']}>
                  <NavBarra />
                  <RetirarObjeto />
                </ProtectedRoute>
              }
            />

            <Route
              path="/listausuarios"
              element={
                <ProtectedRoute allowedRoles={['administrador']}>
                  <NavBarra />
                  <ListaUsuarios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cadastrarusuario"
              element={
                <ProtectedRoute allowedRoles={['administrador']}>
                  <NavBarra />
                  <CadastrarUsuario />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ObjectProvider>
    </div>
  );
}

export default App;
