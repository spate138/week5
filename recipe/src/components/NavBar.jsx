const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#search" style={styles.link}>Search</a></li>
        <li><a href="#about" style={styles.link}>About</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#282c34',
    padding: '10px 0',
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
  },
  link: {
    margin: '0 15px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};

export default NavBar;
