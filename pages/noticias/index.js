import Pagina from '@/components/Pagina';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import axios from 'axios';

const Index = () => {
  const [noticias, setNoticias] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 10;
  const numeroDePaginas = Math.ceil(noticias.length / noticiasPorPagina);
  const indiceUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indicePrimeiraNoticia = indiceUltimaNoticia - noticiasPorPagina;
  const noticiasPaginadas = noticias.slice(indicePrimeiraNoticia, indiceUltimaNoticia);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=deputados&language=pt&apiKey=9f6af0220e884608992a91c7847f9f84'
        );
        setNoticias(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNoticias();
  }, []);

  const handlePaginaClicada = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <Pagina titulo='Notícias'>
      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {noticiasPaginadas.map((noticia, index) => (
          <Col key={index} className="mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img variant="top" src={noticia.urlToImage} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{noticia.title}</Card.Title>
                <Card.Text>{noticia.description}</Card.Text>
                <div className="mt-auto">
                  <Button variant="primary" href={noticia.url}>Ver mais</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {Array.from({ length: numeroDePaginas }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginaAtual}
              onClick={() => handlePaginaClicada(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Pagina>
  );
};

export default Index;
