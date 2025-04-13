// src/Navbar/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ userName, userImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/" className={styles.logoContainer}>
            <img 
              src="/logo.png" 
              alt="NeighbourHelp Logo" 
              className={styles.logoImage} 
            />
            <span>NeighbourHelp</span>
          </Link>
        </div>
        
        <div className={styles.navbarButtons}>
          <Link to="/angariacao" className={styles.navButton}>Angariação</Link>
          <Link to="/leilao" className={styles.navButton}>Leilão</Link>
          <Link to="/tickets" className={styles.navButton}>Tickets</Link>
        </div>
        
        <div className={styles.userProfile} ref={dropdownRef}>
          <div className={styles.userName}>{userName}</div>
          <div 
            className={styles.userImage} 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userImage ? (
              <img src={userImage} alt={userName} />
            ) : (
              <div className={styles.defaultAvatar}>{userName.charAt(0)}</div>
            )}
          </div>
          
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/perfil" className={styles.dropdownItem}>Perfil</Link>
              <Link to="/meus-leiloes" className={styles.dropdownItem}>Meus Leilões</Link>
              <Link to="/minhas-angariacoes" className={styles.dropdownItem}>Minhas Angariações</Link>
              <Link to="/meus-tickets" className={styles.dropdownItem}>Meus Tickets</Link>
              <div className={styles.dropdownDivider}></div>
              <Link to="/logout" className={styles.dropdownItem}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;