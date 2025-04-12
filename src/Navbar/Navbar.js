// src/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ userName, userImage }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">NeighbourHelp</Link>
        </div>
        
        <div className={styles.navbarButtons}>
          <Link to="/angariacao" className={styles.navButton}>Angariação</Link>
          <Link to="/leilao" className={styles.navButton}>Leilão</Link>
          <Link to="/tickets" className={styles.navButton}>Tickets</Link>
        </div>
        
        <div className={styles.userProfile}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.userImage}>
            {userImage ? (
              <img src={userImage} alt={userName} />
            ) : (
              <div className={styles.defaultAvatar}>{userName.charAt(0)}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;