import React, { useState } from 'react';
import styles from './CadastrarObjeto.module.css';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:5000/usuarios";

const CadastrarObjeto = () => {
  const [objeto, setObjeto] = useState('');
  const [encontradoPor, setEncontradoPor] = useState('');
  const [cpf, setCpf] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState(null);
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");
  const navigate = useNavigate();

   const handleCancelar = () => {
    navigate('/home');
  };

    const handleFotoUpload = (e) => {
      setFoto(e.target.files[0]);
  };

  // variaveis pro alerta
 


  const handleSubmit = async (e) => {
      e.preventDefault();
      // Lógica para enviar os dados ao backend
      console.log({ objeto, encontradoPor, cpf, horarioEntrada, observacoes, foto });
      e.preventDefault();
    if (objeto != "") {
      if (encontradoPor != "") {
        if ( cpf!= "") {
          const user = { objeto, encontradoPor, cpf };
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });

          alert("Usuário cadastrado com sucesso");
          setObjeto("");
          setEncontradoPor("");
          setCpf("");
          navigate("/home");
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("O campo tipo não pode ser vazio");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo preço não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo objeto não pode ser vazio");
    }

  
    };

  return (
    <div className={styles.container}>
        <h2>Cadastro de objeto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Objeto encontrado"
                    value={objeto}
                    onChange={(e) => setObjeto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Encontrado por"
                    value={encontradoPor}
                    onChange={(e) => setEncontradoPor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="time"
                    placeholder="Horário de entrada"
                    value={horarioEntrada}
                    onChange={(e) => setHorarioEntrada(e.target.value)}
                />
                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    onChange={handleFotoUpload}
                />
                <button type="submit">Cadastrar</button>
                 <button 
                  onClick={handleCancelar}
                  className={styles.buttonCancelar}
                > 
                  Cancelar
                </button>
            </form>
    </div>
  );
}

export default CadastrarObjeto