import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pagina from '../../components/Pagina';
import apiDeputados from '@/services/apiDeputados';

const Detalhes = ({ evento, ResultadoEventosDeputado, ResultadoVotacoes }) => {
  const [mostrarVotacoes, setMostrarVotacoes] = useState(false);

  return (
    <Pagina>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>{evento.descricao}</Card.Title>
              <Card.Text>Data Início: {evento.dataHoraInicio}</Card.Text>
              <Card.Text>Data Fim: {evento.dataHoraFim}</Card.Text>
              <Card.Text>Local: {evento.local}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Card.Title>Deputados:</Card.Title>
              {ResultadoEventosDeputado && ResultadoEventosDeputado.map((deputado) => (
                <div key={deputado.id}>
                  <p>Nome: {deputado.nome}</p>
                  <p>Partido: {deputado.partido}</p>
                  {/* Outras informações do deputado */}
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title onClick={() => setMostrarVotacoes(!mostrarVotacoes)} style={{ cursor: 'pointer' }}>
                Votações {mostrarVotacoes ? '▲' : '▼'}
              </Card.Title>
              {mostrarVotacoes && (
                <>
                  {ResultadoVotacoes && ResultadoVotacoes.length > 0 ? (
                    ResultadoVotacoes.map((votacao) => (
                      <div key={votacao.id}>
                        <p>Descrição: {votacao.descricao}</p>
                        <p>Data: {votacao.data}</p>
                        {/* Outras informações da votação */}
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma votação encontrada.</p>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const eventos = await apiDeputados.get('/eventos/' + id);
  const evento = eventos.data.dados;

  const resultado = await apiDeputados.get('/eventos/' + id + '/deputados');
  const ResultadoEventosDeputado = resultado.data.dados;

  const votacoes = await apiDeputados.get('/eventos/' + id + '/votacoes');
  const ResultadoVotacoes = votacoes.data.dados.resultado || null; // Modifique a propriedade para 'resultado'

  console.log('ResultadoVotacoes:', ResultadoVotacoes); // Exibir no console o resultado das votações

  return {
    props: {
      evento,
      ResultadoEventosDeputado,
      ResultadoVotacoes,
    },
  };
}
