import { useState, useEffect } from 'react'; // Adicionando importação necessária
import './Angariacao.module.css';
import 'boxicons/css/boxicons.min.css';

function Angariacao() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://api.example.com/items'); // Substituir pela API real
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        };

        fetchItems(); //  Agora chamamos a função dentro do useEffect
    }, []); //  Dependência vazia [] significa que executa apenas ao montar o componente

    return (
        <>
            <nav>
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                    <h1>NeighbourhoodNews</h1>
                </div>

                <ul>
                    <li><a href="#">Leilões</a></li>
                    <li><a href="#">Angariações</a></li>
                    <li><a href="#">Reclamações</a></li>
                </ul>

                <div className="user-info">
                    <h2>Nome do Utilizador</h2>
                    <img src="/profilePic.png" alt="User" />
                </div>
            </nav>

            <main>
                <div className="angariacao-header">
                    <div className="search-bar">
                        <input type="text" placeholder="Procurar..." />
                        <button><i className="bx bx-search"></i></button>
                    </div>
                    <div className="filter">
                        <button className="filter-button">Recente</button>
                        <button className="filter-button">Preço Ascendente</button>
                        <button className="filter-button">Preço Descendente</button>
                    </div>
                </div>

                {/* Só exibe os cards se houver itens  */}
                {items.length > 0 ? (
                    <div className="angariacao-list">
                        {items.map((item) => (
                            <div key={item.id} className="angariacao-item">
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Preço: {item.price}€</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-items">Nenhuma angariação disponível no momento.</p>
                )}
            </main>
        </>
    );
}

export default Angariacao;
