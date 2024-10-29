import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo-senai.png'; // Corrigido para o caminho correto

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBarra from "./components/NavBarra";
import Login from "./pages/Login";
import CadastrarObjeto from "./pages/CadastrarObjeto";
import RetirarObjeto from "./pages/RetirarObjeto";
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} /> {/* Rota da tela de login sem NavBarra */}
          <Route element={<NavBarra />}> {/* NavBarra será exibida em rotas aninhadas */}
            <Route path='/home' element={<Home />} />
            <Route path='/navbarra' element={<NavBarra />} />
            <Route path='/cadastrarobjeto' element={<CadastrarObjeto />} />
            <Route path='/retirarobjeto' element={<RetirarObjeto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
