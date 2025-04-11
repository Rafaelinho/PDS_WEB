import React, { useState } from "react";
import "./CreateAcc.module.css";
import { Link } from 'react-router-dom';
import styles from './CreateAcc.module.css';

function CreateAcc() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("As palavras-passe não coincidem!");
        } else {
            setError("");
            alert("Conta criada com sucesso!");
        }
    };

    return (
        <div className={styles.CreateAccContainer}>
            <form onSubmit={handleSubmit} className={styles.CreateAccForm}>
                <h1>Criar Conta</h1>
                
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" required />

                <label>Palavra-Passe</label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Palavra-Passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Confirmar Palavra-Passe</label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword" 
                    placeholder="Confirmar Palavra-Passe" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                {/* Checkbox para mostrar/ocultar palavra-passe */}
                <div>
                    <input 
                        type="checkbox" 
                        id="showPassword" 
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Mostrar palavra-passe</label>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Criar Conta</button>
                <Link to="/Login" id="iniciarSessao">Iniciar Sessão</Link>     
            </form>
        </div>
    );
}

export default CreateAcc;
