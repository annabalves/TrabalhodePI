import Pagina from '@/components/Pagina';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';


const Index = () => {
  const [noticias, setNoticias] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 12;
  const numeroDePaginas = Math.ceil(noticias.length / noticiasPorPagina);
  const indiceUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indicePrimeiraNoticia = indiceUltimaNoticia - noticiasPorPagina;
  const noticiasPaginadas = noticias.slice(indicePrimeiraNoticia, indiceUltimaNoticia);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=deputados&language=pt&sortBy=publishedAt&pageSize=100&apiKey=9f6af0220e884608992a91c7847f9f84'
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

  const formatarData = (data) => {
    return moment(data).format('DD/MM/YYYY');
  };

  const formatarHora = (hora) => {
    return moment(hora).format('HH:mm');
  }

  return (
    <Pagina titulo='FEED DE NOTÍCIAS' fonteTitulo='Roboto'>
      <Row lg={4} className="g-4 justify-content-center">
  {noticiasPaginadas.map((noticia, index) => (
    <Col key={index} className="mb-4">
      <Card style={{ height: '100%', border: '1px solid #17583B'}}>
        <Card.Img variant="top" src={noticia.urlToImage} />
        <Card.Body className="d-flex flex-column h-100 ">
          <Card.Title>{noticia.title}</Card.Title>
          <p className="text-muted mt-auto">
            Atualizado em: {formatarData(noticia.publishedAt)}
            <br />
            Hora: {formatarHora(noticia.publishedAt)}
          </p>
          <div className="mt-auto">
            <Button variant="outline-light" style={{ backgroundColor: '#17583B' }} href={noticia.url}>Ver mais</Button>
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