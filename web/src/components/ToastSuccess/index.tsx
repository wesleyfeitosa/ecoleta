import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

const ToastSucces: React.FC = () => {
  return (
    <div className="container">
      <FiCheckCircle size={54} color="#34CB79" />
      <h1>Cadastro concluído!</h1>
    </div>
  );
};

export default ToastSucces;
