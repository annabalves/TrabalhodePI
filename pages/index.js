import Pagina from '@/components/Pagina'
import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

const inicio = () => {

  const noticias = () => {
    window.location.href = '/noticias';
  }

  const deputados = () => {
    window.location.href = '/deputados';
  }

  const partidos = () => {
    window.location.href = '/partidos';
  }

  return (
    <Pagina>
      <Container style={{ margin: "90px " }}>
        <Row>
          <Col xs={4} md={4}>
            <Image
              style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer' }}
              src="https://cdn-icons-png.flaticon.com/512/372/372240.png"
              rounded
              onClick={noticias}
            />
            <h1 style={{ padding: "20px 0 0 80px", margin: '10px 0 0 0', cursor: 'pointer'}} onClick={noticias}>Notícias</h1>
          </Col>
          <Col xs={4} md={4}>
            <Image
              style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer'}}
              src="https://i.pinimg.com/originals/63/f0/47/63f0477aec61cef7de40f454452b742e.png"
              rounded
              onClick={deputados}
            />
            <h1 style={{ padding: "20px 0 0 60px", margin: '10px 0 0 0', cursor: 'pointer'}} onClick={deputados}>Deputados</h1>
          </Col>
          <Col xs={4} md={4}>
            <Image
              style={{ width: '100%', maxWidth: '300px', height: 'auto', cursor: 'pointer'}}
              src="https://cdn-icons-png.flaticon.com/512/2673/2673247.png"
              rounded
              onClick={partidos}
            />
            <h1 style={{ padding: "20px 0 0 90px", margin: '10px 0 0 0', cursor: 'pointer'}} onClick={partidos}>Partidos</h1>
          </Col>
        </Row>
      </Container>
    </Pagina>
  )
}

export default inicio
