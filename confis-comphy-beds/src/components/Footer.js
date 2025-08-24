import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ConfisComphyBeds. All rights reserved.</p>
        <p>Contact us: info@confiscomphybeds.com | (073) 123-4567</p>
      </div>
    </footer>
  );
};

export default Footer;