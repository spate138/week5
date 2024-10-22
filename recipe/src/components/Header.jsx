const Header = () => {
  return (
    <header style={styles.header}>
      <img
        src="download.jpeg"
        alt="Logo"
        style={styles.logo}
        height={40}
        width={50}
      />
      <h1 style={styles.title}>Recipe Dashboard</h1>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  logo: {
    marginRight: '15px',
  },
  title: {
    fontSize: '1.5rem',
  },
};

export default Header;
