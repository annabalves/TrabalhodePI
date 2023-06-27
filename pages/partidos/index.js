import React, { useState } from 'react';
import { Card, Form, Table } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import apiDeputados from '@/services/apiDeputados';
import Pagina from '@/components/Pagina';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

const PartidosPage = ({ partidos }) => {
  const [partidosExibidos, setPartidosExibidos] = useState(15);
  const totalPartidos = partidos.length;

  const exibirMaisPartidos = () => {
    setPartidosExibidos(partidosExibidos + 15);
  };

  // Ordenação alfabética dos partidos pelo nome
  const partidosOrdenados = partidos.sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <Pagina titulo="Partidos">
          <Card>
            <Card.Header style={{ border: '2px solid #17583B', backgroundColor: '#17583B', color: 'white'}}>Todas as legislaturas</Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col-md-6">
                    <Form.Label htmlFor='inputPartido'>Partidos</Form.Label>
                    <Form.Select aria-label='Default select example'>
                      <option>Todos</option>
                    </Form.Select>
                  </div>
                  <div class="col-md-6">
                    <Form.Label htmlFor='inputUF'>UF</Form.Label>
                    <Form.Select aria-label='Default select example'>
                      <option>Todas</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6" style={{paddingTop: '10px'}}>
                    <Form.Label htmlFor='inputLegislatura'>Legislatura</Form.Label>
                    <Form.Select aria-label='Default select example'>
                      <option>Todos</option>
                    </Form.Select>
                  </div>
                  <div class="col-md-6" style={{paddingTop: '10px'}}>
                    <Form.Label htmlFor='inputSexo'>Sexo</Form.Label>
                    <Form.Select aria-label='Default select example'>
                      <option>Todos</option>
                      <option>Feminino</option>
                      <option>Masculino</option>
                    </Form.Select>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15px'}}>
                <Button style={{ border: '2px solid #17583B', backgroundColor: '#17583B'}}>
                <FaSearch className="me-3" size={18} color='white'></FaSearch>
                Buscar
                </Button>
                </div>
              </Card.Body>
          </Card>

    </Pagina>
  );
};

export default PartidosPage;

export async function getServerSideProps() {
  const quantidadePartidos = 30;
  try {
    const resultado = await apiDeputados.get(`/partidos?itens=${quantidadePartidos}`);
    const partidos = resultado.data.dados;

    return {
      props: {
        partidos,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        partidos: [],
      },
    };
  }
}
