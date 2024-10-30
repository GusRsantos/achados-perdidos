import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBarra from "./components/NavBarra";
import Login from "./pages/Login";
import CadastrarObjeto from "./pages/CadastrarObjeto";
import RetirarObjeto from "./pages/RetirarObjeto";
import Home from './pages/Home';

// Componente para proteger rotas
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Rotas protegidas */}
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
    </div>
  );
}

export default App;