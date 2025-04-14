// src/Leilão/MeusLeiloes.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './MeusLeiloes.module.css';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';

const MeusLeiloes = () => {
  const { user } = useContext(AuthContext);
  const [leiloes, setLeiloes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoLeilao, setNovoLeilao] = useState({
    titulo: '',
    descricao: '',
    valor: '', 
    dataTermino: '',
    imagem: null 
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserLeiloes();
    }
  }, [user]);

  const fetchUserLeiloes = async () => {
    setIsLoading(true);
    try {
      // Chamada real à API com o ID do utilizador autenticado
      const response = await fetch(`http://localhost:5218/myLeiloes?userID=${user.id}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar leilões');
      }
      
      const data = await response.json();
      setLeiloes(data);
    } catch (error) {
      console.error('Erro ao buscar leilões:', error);
      // Em caso de erro, podemos optar por exibir alguma mensagem ao utilizador
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLeilao(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNovoLeilao(prev => ({
      ...prev,
      imagem: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Preparar dados para envio usando FormData para suportar upload de ficheiros
      const formData = new FormData();
      formData.append('descricao', novoLeilao.titulo + ' - ' + novoLeilao.descricao);
      formData.append('valor', novoLeilao.valor);
      formData.append('dataInicio', new Date().toISOString());
      formData.append('dataFim', new Date(novoLeilao.dataTermino).toISOString());
      formData.append('estado', 'ativo');
      formData.append('utilizadorId', user.id);
      
      if (novoLeilao.imagem) {
        formData.append('imagem', novoLeilao.imagem);
      }

      // Fazer chamada à API para criar leilão
      const response = await fetch('http://localhost:5218/create?userID=${user.id}', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao criar leilão');
      }

      const leilaoId = await response.json();
      
      // Atualizar a lista de leilões após criação bem-sucedida
      fetchUserLeiloes();
      
      // Resetar formulário e fechar modal
      setNovoLeilao({
        titulo: '',
        descricao: '',
        valor: '',
        dataTermino: '',
        imagem: null
      });
      setModalOpen(false);
      
      alert('Leilão criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar leilão:', error);
      alert('Erro ao criar leilão. Por favor, tente novamente.');
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-PT');
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar 
        userName={user?.name} 
        userImage={user?.image}
      />
      <div className={styles.meusLeiloesContainer}>
        <div className={styles.header}>
          <h1>Meus Leilões</h1>
          <button 
            className={styles.btnCriarLeilao}
            onClick={() => setModalOpen(true)}
          >
            Criar Novo Leilão
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Carregando leilões...</div>
        ) : leiloes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Você ainda não tem leilões criados.</p>
            <button 
              className={styles.btnCriarLeilao}
              onClick={() => setModalOpen(true)}
            >
              Criar Meu Primeiro Leilão
            </button>
          </div>
        ) : (
          <div className={styles.leiloesList}>
            {leiloes.map(leilao => (
              <div key={leilao.leilaoId} className={styles.leilaoCard}>
                <div className={styles.leilaoImage}>
                  {leilao.leilaoImagem ? (
                    <img src={`/api/images/${leilao.leilaoImagem}`} alt={leilao.descricao} />
                  ) : (
                    <img src="https://via.placeholder.com/150" alt="Sem imagem" />
                  )}
                  <span className={styles.statusBadge} data-status={leilao.estado.toLowerCase()}>
                    {leilao.estado === 'ATIVO' ? 'Ativo' : 'Fechado'}
                  </span>
                </div>
                <div className={styles.leilaoInfo}>
                  <h3>{leilao.descricao.split(' - ')[0]}</h3>
                  <p className={styles.descricao}>{leilao.descricao.split(' - ')[1] || leilao.descricao}</p>
                  <div className={styles.detalhes}>
                    <div>
                      <span className={styles.label}>Valor Inicial:</span>
                      <span className={styles.valor}>{leilao.valorInicial.toFixed(2)}€</span>
                    </div>
                    <div>
                      <span className={styles.label}>Valor Atual:</span>
                      <span className={styles.valorAtual}>{leilao.valorAtual.toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className={styles.detalhes}>
                    <div>
                      <span className={styles.label}>Início:</span>
                      <span>{formatarData(leilao.dataInicio)}</span>
                    </div>
                    <div>
                      <span className={styles.label}>Término:</span>
                      <span>{formatarData(leilao.dataFim)}</span>
                    </div>
                  </div>
                  <div className={styles.acoes}>
                    <button className={styles.btnDetalhes}>Ver Detalhes</button>
                    {leilao.estado === 'ATIVO' && (
                      <button className={styles.btnEncerrar}>Encerrar</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal para criar leilão */}
        {modalOpen && (
          <Modal title="Criar Novo Leilão" onClose={() => setModalOpen(false)}>
            <form onSubmit={handleSubmit} className={styles.formLeilao}>
              <div className={styles.formGroup}>
                <label htmlFor="titulo">Título*</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={novoLeilao.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="descricao">Descrição*</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={novoLeilao.descricao}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="valor">Valor Inicial (€)*</label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    min="0"
                    step="0.01"
                    value={novoLeilao.valor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="dataTermino">Data de Término*</label>
                  <input
                    type="date"
                    id="dataTermino"
                    name="dataTermino"
                    value={novoLeilao.dataTermino}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="imagem">Imagem do Leilão</label>
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              
              <div className={styles.formActions}>
                <button type="button" className={styles.btnCancelar} onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Criar Leilão
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MeusLeiloes;