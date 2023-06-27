import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import Cabecalho from './Cabecalho';
import { Helmet } from 'react-helmet';

const Pagina = ({ titulo, fonteTitulo, children }) => {
  const estiloTitulo = {
    fontFamily: fonteTitulo || 'inherit',
  };

  return (
    <>
      <Helmet>
        <title>POLÍTICA TRANSPARENTE | Portal dos Deputados</title>
      </Helmet>
      <Cabecalho />
      <div className="bg-white py-3 text-black text-left mb-2 mt-5 ">
        <Container>
          <h1 style={estiloTitulo}>{titulo}</h1>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  );
};

export default Pagina;
