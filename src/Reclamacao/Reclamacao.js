import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Reclamacao.css";

function Reclamacao() {
  const [assunto, setAssunto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const utilizadorId = localStorage.getItem("userId");

  const enviarReclamacao = async () => {
    const novaReclamacao = { assunto, descricao, utilizadorId };

    try {
      const resposta = await fetch("/api/Reclamacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaReclamacao),
      });

      if (resposta.ok) {
        setMensagem("Reclamação enviada com sucesso!");
        setAssunto("");
        setDescricao("");
      } else {
        setMensagem("Erro ao enviar reclamação!");
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
        </button> <br/>

        {mensagem && <p className="reclamacao-mensagem">{mensagem}</p>}

        <button onClick={() => navigate("/minhas-reclamacoes")} className="reclamacao-historico">
          Ver Histórico
        </button>
      </div>
    </>
  );
}

export default Reclamacao;