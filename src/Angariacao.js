import './Angariacao.css';
import './index.css';
import logo from './logo.png';
import profifePic from './profilePic.png';

function Angariacao() {
    return (
        <nav>
            
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>NeighbourhoodNews</h1>
            </div>

            <ul>
                <li>
                    <a href="#">Leilões</a>
                </li>
                <li>
                    <a href="#">Angariações</a>
                </li>
                <li>
                    <a href="#">Reclmações</a>
                </li>
            </ul>

            <div className="user-info">
                <h2>Nome do Utilizador</h2>
                <img src={profifePic} alt="User" />
            </div>
        </nav>
    );

}

export default Angariacao;