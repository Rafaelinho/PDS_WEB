import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

function Login() {
    const [seePassword, setSeePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    // Use o contexto de autenticação
    const { setUser } = useContext(AuthContext);

    const checkLogin = async (userName, userPassword) => {
        try {
            console.log(userName, userPassword); // Verifica se os valores estão corretos
            const response = await fetch('http://localhost:5218/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userName, password: userPassword })
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // previne reload da página
        const data = await checkLogin(email, password);

        if (!data) {
            alert('Login falhou');
        } else {
            // Salvar o token e os dados do usuário
            localStorage.setItem('authToken', data.token); // Renomeado para corresponder à nossa implementação
            localStorage.setItem('userID', data.userID);
            localStorage.setItem('userName', data.userName);
            
            // Salve o código postal se disponível na resposta
            if (data.codigoPostal) {
                localStorage.setItem('codigoPostal', data.codigoPostal);
            }
            
            // Atualize o contexto com os dados do utilizador
            const userData = {
                id: data.userID,
                name: data.userName,
                image: data.userImage || null,
                codigoPostal: data.codigoPostal // Use um valor padrão se não estiver disponível
            };
            
            setUser(userData);
            
            alert('Login feito com sucesso');
            navigate('/leilaopage'); // redireciona para a página de leilões
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <h1>Iniciar Sessão</h1>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Palavra-Passe</label>
                <input
                    type={seePassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Palavra-Passe"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <input
                        type="checkbox"
                        className="checkBox"
                        id="seePassword"
                        checked={seePassword}
                        onChange={() => setSeePassword(!seePassword)}
                    />
                    <label htmlFor="seePassword">Mostrar palavra-passe</label>
                </div>

                <button type="submit">Iniciar Sessão</button>
                <Link to="/signup" id="criarConta">Criar Conta</Link>
            </form>
        </div>
    );
}

export default Login;