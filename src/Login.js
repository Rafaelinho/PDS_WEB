import './Login.css';
import './index.css';
import { Link } from 'react-router-dom';
import React ,{useState}from 'react';

const checkLogin = async (userName, userPassword) => {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, userPassword })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await response.json(); // Converte a resposta para JSON
        return data;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
};

function Login() {

    const [seePassword, setSeePassword] = useState(false);

    return (
        <div>
            <form action="/login" method="POST" className="login-form">
                <h1>Iniciar Sessão</h1>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required 
                />
                <label htmlFor="password">Palavra-Passe</label>
                <input type={seePassword ? "text" : "password"} id="password" name="password" placeholder="Palavra-Passe" required />
                
                <div>
                    <input 
                    type="checkbox" 
                    className="checkBox" 
                    id="seePassword" checked={seePassword} 
                    onChange={() => setSeePassword(!seePassword)} 
                    />
                    
                    <label htmlFor="seePassword">Mostrar palavra-passe</label>
                </div>
                
                <button type="submit" onClick={checkLogin}>Iniciar Sessão</button>
                <Link to="/signup" id="criarConta">Criar Conta</Link>
            </form>
        </div>
    );
}

export default Login;
