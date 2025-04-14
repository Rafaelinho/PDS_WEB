import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../context/AuthContext';
import styles from './LeilaoPage.module.css';

const LeilaoPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const loggedUser = {
    name: user?.name || "Utilizador",
    image: user?.image || null
  };

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    // Buscar leilões apenas quando tiver o utilizador carregado
    if (user) {
      fetchAuctions();
    }
  }, [user, authLoading, navigate]);

  const fetchAuctions = async (search = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      let url = `http://localhost:5218/local-leiloes?userID=${user.id}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`  // Inclui o token para autenticação
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar leilões');
      }

      const data = await response.json();

      const formattedData = data.map(auction => ({
        id: auction.leilaoID,
        title: auction.descricao,
        initialBid: auction.valorInicial,
        currentBid: auction.valorAtual,
        imageUrl: auction.leilaoImagem,
        startDate: auction.dataInicio,
        status: auction.estado
      }));

      setAuctions(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAuctions(searchTerm);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getAuctionStatus = (status, startDate) => {
    if (status === "Fechado") {
      return "Encerrado";
    }
    
    const startDateObj = new Date(startDate);
    const now = new Date();
    const difference = now - startDateObj;
    
    if (difference < 0) {
      return "Aguardando início";
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    
    return `Ativo há ${days}d`;
  };

  if (authLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div>
      <Navbar 
        userName={user?.name} 
        userImage={user?.image}
      />

      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Pesquisar leilões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Pesquisar
            </button>
          </form>
        </div>

        <p className={styles.userLocation}>Leilões na sua área: {user?.codigoPostal}</p>

        {loading && <p className={styles.loading}>Carregando leilões...</p>}
        {error && <p className={styles.error}>Erro: {error}</p>}
        
        {!loading && auctions.length === 0 && (
          <p className={styles.noResults}>Nenhum leilão encontrado com o termo pesquisado.</p>
        )}

        <div className={styles.auctionGrid}>
          {auctions.map(auction => (
            <div key={auction.id} className={styles.auctionCard}>
              <div className={styles.auctionImage}>
                <img src={auction.imageUrl} alt={auction.title} />
                <div className={styles.statusBadge}>{auction.status}</div>
              </div>
              <div className={styles.auctionDetails}>
                <h3 className={styles.title}>{auction.title}</h3>
                <div className={styles.dateInfo}>
                  <span className={styles.dateLabel}>Data de início:</span>
                  <span className={styles.dateValue}>{formatDate(auction.startDate)}</span>
                </div>
                <div className={styles.statusInfo}>
                  <span className={styles.statusLabel}>Estado:</span>
                  <span className={styles.statusValue}>{getAuctionStatus(auction.status, auction.startDate)}</span>
                </div>
                <div className={styles.bidInfo}>
                  <div className={styles.bidRow}>
                    <span className={styles.bidLabel}>Valor Inicial:</span>
                    <span className={styles.initialAmount}>{formatCurrency(auction.initialBid)}</span>
                  </div>
                  <div className={styles.bidRow}>
                    <span className={styles.bidLabel}>Lance Atual:</span>
                    <span className={styles.currentAmount}>{formatCurrency(auction.currentBid)}</span>
                  </div>
                </div>
                <button className={styles.bidButton} disabled={auction.status === "Fechado"}>
                  {auction.status === "Fechado" ? "Leilão Encerrado" : "Fazer Lance"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeilaoPage;