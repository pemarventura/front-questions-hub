// src/components/Header/Header.js
import React from 'react';
import './Header.css';
import { FaYoutube, FaFacebook, FaGlobe, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineLocalPhone } from "react-icons/md";

const Header = () => {
  return (
    <header className="header" style={{
      backgroundImage: `url(${require('./bg.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="nav-box">
        <nav>
          <ul className='nav-left'>
            <li>
              <a href="https://www.youtube.com/@suzanaluzredacao" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} color="#FF0000" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/suzanaluzredacao" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} color="#4267B2" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/suzanaluzredacao/?hl=en" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} color="#C13584" />
              </a>
            </li>
            <li>
              <a href="https://www.suzanaluz.com.br/" target="_blank" rel="noopener noreferrer">
                <FaGlobe size={24} color="white" /> {/* Customize the color as needed */}
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            <li>
              <a href="https://www.google.com/maps/dir//google+maps+curso+de+redacao+suzana+luz+maps/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x939db02ab2b73261:0x2f4e8bcfbfdac630?sa=X&ved=1t:3061&ictx=111" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt size={24} color="#4285F4" /> {/* Customize color as needed */}
              </a>
            </li>
            <li>
              <MdOutlineLocalPhone size={24} color="#FFFFFF" style={{ marginRight: '8px' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', height: '100%', paddingBottom: '2.5px' }}>
                (65) 3365-5719 / 99972-6578
              </span>
            </li>

          </ul>
        </nav>
        {/* Add navigation links or other elements you want in the header */}
      </div>
      <a href="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          style={{ width: '250px', height: 'auto', padding: '10px' }}
        />
      </a>
    </header>
  );
};

export default Header;
