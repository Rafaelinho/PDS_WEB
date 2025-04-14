import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.name || '';
  const userImage = user?.image || '';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('codigoPostal');
    navigate('/login');
  };

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
          <Link to="/leilaopage" className={styles.navButton}>Leilão</Link>
          <Link to="/tickets" className={styles.navButton}>Tickets</Link>
          <Link to="/reclamacao" className={styles.navButton}>Reclamação</Link>
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
              <div className={styles.defaultAvatar}>{userName?.charAt(0) || '?'}</div>
            )}
          </div>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/perfil" className={styles.dropdownItem}>Perfil</Link>
              <Link to="/meus-leiloes" className={styles.dropdownItem}>Meus Leilões</Link>
              <Link to="/minhas-angariacoes" className={styles.dropdownItem}>Minhas Angariações</Link>
              <Link to="/meus-tickets" className={styles.dropdownItem}>Meus Tickets</Link>
              <div className={styles.dropdownDivider}></div>
              <button 
                onClick={handleLogout} 
                className={styles.dropdownItem}
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
