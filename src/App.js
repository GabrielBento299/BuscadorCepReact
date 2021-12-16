import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './Services/api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert('prencha cep!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert('Erro ao buscar');
      setInput("");
    }
  }

  return (
    <div className="container">


      <h1 className="title">Buscador CEP</h1>

      <div className="container-Input">
        <input
          type="text"
          placeholder="Digite Seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={35} />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className="main">
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento} </span>
          <span>{cep.bairro} </span>
          <span>{cep.localidade} </span>
        </main>
      )}




    </div>

  );
}

export default App;
