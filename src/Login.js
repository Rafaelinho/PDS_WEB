import './Login.css';
import './index.css';
import React ,{useState}from 'react';


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
                
                <button type="submit">Iniciar Sessão</button>
                <a href="/CreateAcc.js" id="iniciarSessao">Criar Conta</a>
            </form>
        </div>
    );
}

export default Login;
