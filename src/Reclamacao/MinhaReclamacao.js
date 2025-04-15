import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Reclamacao.css";

function MinhasReclamacoes() {
  const [reclamacoes, setReclamacoes] = useState([]);
  const utilizadorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReclamacoes = async () => {
      try {
        const response = await fetch(`/api/Reclamacao/utilizador/${utilizadorId}`);
        if (response.ok) {
          const data = await response.json();
          setReclamacoes(data);
        } else {
          console.error("Erro ao carregar reclamações do utilizador");
        }
      } catch (err) {
        console.error("Erro de rede ao carregar reclamações:", err);
      }
    };

    if (utilizadorId) {
      fetchReclamacoes();
    }
  }, [utilizadorId]);

  return (
    <>
      <Navbar />
      <div className="reclamacao-container">
        <Link to="/reclamacao" className="reclamacao-voltar">Criar Reclamação</Link>

        <h2 className="reclamacao-titulo">Histórico de Reclamações</h2>

        {reclamacoes.length === 0 ? (
          <p className="reclamacao-vazio">Ainda não foram criadas reclamações.</p>
        ) : (
          <ul className="reclamacao-lista">
            {reclamacoes.map((rec) => (
              <li key={rec.reclamacaoId} className="reclamacao-item">
                <strong>{rec.assunto}</strong>
                <p>{rec.descricao}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default MinhasReclamacoes;
