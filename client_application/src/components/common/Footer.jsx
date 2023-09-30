import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <p style={styles.text}>© {new Date().getFullYear()} Your Website Name</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    bottom: "0",
    width: "100%",
  },
  text: {
    fontSize: "14px",
  },
};

export default Footer;