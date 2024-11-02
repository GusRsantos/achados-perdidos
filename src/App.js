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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
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
                <ProtectedRoute>
                  <NavBarra />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/info-objeto/:id"
              element={
                <ProtectedRoute>
                  <NavBarra />
                  <InfoObjetos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastrarobjeto"
              element={
                <ProtectedRoute>
                  <NavBarra />
                  <CadastrarObjeto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/retirarobjeto"
              element={
                <ProtectedRoute>
                  <NavBarra />
                  <RetirarObjeto />
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