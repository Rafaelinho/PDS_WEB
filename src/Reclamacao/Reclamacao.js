import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Reclamacao.css";

function Reclamacao() {
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarReclamacao = async () => {
    const reclamacao = { assunto, descricao };

    try {
      const resposta = await fetch("/api/reclamacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reclamacao),
      });

      if (resposta.ok) {
        setMensagem(" Reclamação enviada com sucesso!");
        setAssunto("");
        setDescricao("");
      } else {
        setMensagem(" Erro ao enviar reclamação!");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro de rede!");
    }
  };

  return (
    <>
      <Navbar /> 
  
      <div className="reclamacao-container">
        <Link to="/" className="reclamacao-voltar">← Voltar</Link> 
  
        <h2 className="reclamacao-titulo">Criar Reclamação</h2>
  
        <input
          type="text"
          placeholder="Assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className="reclamacao-input"
        />
  
        <textarea
          placeholder="Descrição detalhada"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="reclamacao-textarea"
        />
  
        <button onClick={enviarReclamacao} className="reclamacao-botao">
          Enviar Reclamação
        </button>
  
        {mensagem && <p className="reclamacao-mensagem">{mensagem}</p>}
      </div>
    </>
  );
}
  
export default Reclamacao;