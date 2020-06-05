import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { FaRecycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './styles.css';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <div>
            <Link to="/create-point">
              <span>
                <FiLogIn />
              </span>
              <strong>Cadastre um ponto de coleta</strong>
            </Link>
            <Link className="points" to="/points">
              <span>
                <FaRecycle />
              </span>
              <strong>Ver pontos de coleta</strong>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
