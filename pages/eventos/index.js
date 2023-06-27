import React from 'react';
import { Card, Button } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import Pagina from '@/components/Pagina';
import Link from 'next/link';

const Eventos = ({ eventos }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Pagina titulo="LISTA DE EVENTOS" fonteTitulo="Roboto">
      <div>
        {eventos.map((evento) => (
          <Card key={evento.id} className="text-center mb-3">
            <Card.Header>{evento.descricaoTipo}</Card.Header>
            <Card.Body>
              <Card.Title>{truncateText(evento.descricao, 100)}</Card.Title>
              <Card.Text>
                Data Inicio: {evento.dataHoraInicio}
                <br />
                Data Fim: {evento.dataHoraFim}
                <br />
                Local: {evento.localExterno}
              </Card.Text>
              <Card>
                <Link href={'/eventos/' + evento.id}>
                  <Button variant="primary">Saiba mais</Button>
                </Link>
              </Card>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Pagina>
  );
};

export default Eventos;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get('/eventos');
  const eventos = resultado.data.dados; // Verifique se a propriedade correta é "dados"

  return {
    props: {
      eventos,
    },
  };
}
