import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './LeilaoPage.module.css';

const LeilaoPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedUser = {
    name: "Carlos Silva",
    image: null
  };

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('https://localhost:7296/local-leiloes?codigoPostal=4705-157');

        if (!response.ok) {
          throw new Error('Erro ao buscar leilões');
        }

        const data = await response.json();

        const formattedData = data.map(auction => ({
          id: auction.leilaoID,
          title: auction.descricao,
          currentBid: auction.valorAtual,
          imageUrl: auction.leilaoImagem,
          endDate: auction.dataInicio,
          description: auction.descricao // ou outro campo, se tiver mais info
        }));

        setAuctions(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
