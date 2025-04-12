// src/Leilão/LeilaoPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './LeilaoPage.module.css';

const LeilaoPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simulando um usuário logado
  const loggedUser = {
    name: "Carlos Silva",
    image: null // Pode ser substituído pelo caminho da imagem quando disponível
  };

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        // Substitua pela sua API real
        const response = await fetch('https://sua-api.com/api/auctions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        setAuctions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        // Dados fictícios para preview
        setAuctions([
          {
            id: 1,
            title: "Carro Antigo - Volkswagen Fusca 1972",
            currentBid: 15000,
            imageUrl: "/placeholder-fusca.jpg", // Substitua pelo caminho real da imagem
            endDate: "2025-05-15T18:00:00",
            description: "Fusca em ótimo estado de conservação, motor original"
          },
          {
            id: 2,
            title: "Quadro - Pintura a Óleo",
            currentBid: 3500,
            imageUrl: "/placeholder-quadro.jpg", // Substitua pelo caminho real da imagem
            endDate: "2025-05-10T20:00:00",
            description: "Obra de arte assinada pelo artista João Freitas"
          },
          {
            id: 3,
            title: "Coleção de Moedas Raras",
            currentBid: 8000,
            imageUrl: "/placeholder-moedas.jpg", // Substitua pelo caminho real da imagem
            endDate: "2025-05-20T22:00:00",
            description: "Coleção com 12 moedas raras do século XIX"
          },
          // Você pode adicionar mais leilões aqui se desejar testar a rolagem
          {
            id: 4,
            title: "Violão Vintage",
            currentBid: 2500,
            imageUrl: "/placeholder-violao.jpg",
            endDate: "2025-05-25T15:00:00",
            description: "Violão acústico vintage em perfeito estado"
          },
          {
            id: 5,
            title: "Console de Jogos Raro",
            currentBid: 4200,
            imageUrl: "/placeholder-console.jpg",
            endDate: "2025-05-18T12:00:00",
            description: "Console de jogos em edição limitada"
          },
          {
            id: 6,
            title: "Relógio de Pulso Antigo",
            currentBid: 5800,
            imageUrl: "/placeholder-relogio.jpg",
            endDate: "2025-05-30T10:00:00",
            description: "Relógio de pulso suíço feito em 1925"
          }
        ]);
      }
    };

    fetchAuctions();
  }, []);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };
  
  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    
    if (difference <= 0) {
      return "Encerrado";
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  };

  return (
    <div>
      <Navbar userName={loggedUser.name} userImage={loggedUser.image} />
      
      <div className={styles.container}>
        <h1 className={styles.heading}>Leilões Disponíveis</h1>
        
        {loading && <p className={styles.loading}>Carregando leilões...</p>}
        {error && <p className={styles.error}>Erro: {error}</p>}
        
        <div className={styles.auctionGrid}>
          {auctions.map(auction => (
            <div key={auction.id} className={styles.auctionCard}>
              <div className={styles.auctionImage}>
                <img src={auction.imageUrl} alt={auction.title} />
                <div className={styles.timeLeft}>{calculateTimeLeft(auction.endDate)}</div>
              </div>
              <div className={styles.auctionDetails}>
                <h3 className={styles.title}>{auction.title}</h3>
                <p className={styles.description}>{auction.description}</p>
                <div className={styles.bidInfo}>
                  <span className={styles.bidLabel}>Lance Atual:</span>
                  <span className={styles.bidAmount}>{formatCurrency(auction.currentBid)}</span>
                </div>
                <button className={styles.bidButton}>Fazer Lance</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeilaoPage;