// votacoes/[id].jsx
import Pagina from '@/components/Pagina';
import React from 'react';
import DetalhesVotacao from '../components/DetalhesVotacao';




const index = () => {
  return (
    <Pagina titulo="Detalhes da Votação">
      <DetalhesVotacao />
    </Pagina>
  );
};

export default index;
