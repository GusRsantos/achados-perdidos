import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Importar o gerenciador de tarefas
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBarra from "./components/NavBarra";
import Login from "./pages/Login";
import CadastrarObjeto from "./pages/CadastrarObjeto";
import RetirarObjeto from "./pages/RetirarObjeto";
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <NavBarra></NavBarra>
     <Routes>
    <Route path='/navbarra' element={<NavBarra/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/cadastrarobjeto' element={<CadastrarObjeto/>}/>
    <Route path='/retirarobjeto' element={<RetirarObjeto/>}/>
     </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
