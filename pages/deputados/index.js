import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import Pagina from "../../components/Pagina";
import apiDeputados from '../../services/apiDeputados';

const Deputados = ({ deputados }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [unidadesFederativas, setUnidadesFederativas] = useState([]);

  useEffect(() => {
    // Extrai as unidades federativas dos dados dos deputados
    const ufSet = new Set(deputados.map(item => item.siglaUf));
    const ufList = Array.from(ufSet).sort();
    setUnidadesFederativas(ufList);
  }, [deputados]);

  // Filtra a lista de deputados com base no valor da pesquisa e no filtro selecionado
  const filteredDeputados = deputados.filter(item =>
    item.nome.toLowerCase().includes(searchValue.toLowerCase()) &&
    (selectedFilter === '' || item[selectedFilter] === selectedValue || selectedValue === '')
  );

  // Atualiza o valor da pesquisa quando o usuário digita no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Atualiza o filtro selecionado
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setSelectedValue('');
  };

  // Atualiza o valor selecionado para o filtro selecionado
  const handleValueSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <Pagina titulo='DEPUTADOS' fonteTitulo='Roboto'>
      <Form className="d-flex">
        <div className="col">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginBottom: "53px", borderColor: "#17583B" }}
          />
        </div>

        <div className="col-auto">
          <Dropdown onSelect={(eventKey) => handleFilterSelect(eventKey)}>
            <Dropdown.Toggle
              id="dropdown-filter-button"
              style={{ marginRight: "10px", marginLeft: "2px", backgroundColor: "#17583B" }}
            >
              Filtrar
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Todos</Dropdown.Item>
              <Dropdown.Item eventKey="siglaUf">Estado</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {selectedFilter !== '' && (
          <Dropdown onSelect={(eventKey) => handleValueSelect(eventKey)}>
            <Dropdown.Toggle style={{ backgroundColor: '#17583B' }} id="dropdown-value-button">
              Selecionar Valor
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {unidadesFederativas.map(item => (
                <Dropdown.Item
                  key={item}
                  eventKey={item}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}

        {selectedFilter !== '' && (
          <div style={{ marginBottom: "30px", marginLeft: "10px" }}>
            <Button variant="outline-light" style={{ backgroundColor: '#17583B' }} onClick={() => setSelectedFilter('')}>
              Limpar Filtro
            </Button>
          </div>
        )}
      </Form>

      <Row md={4} xs={1} className="g-4">
        {filteredDeputados.map(item => (
          <Col key={item.id}>
            <Card style={{ backgroundColor: '#17583B' }}>
              <Link href={'/deputados/' + item.id}>
                <Card.Img src={item.urlFoto} />
              </Link>
              <Card.Body style={{ backgroundColor: '#17583B', fontFamily: 'initial' }} className="d-flex align-items-center justify-content-center">
                <Card.Title className="text-white text-center">{item.nome}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Pagina>
  );
};

export default Deputados;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados");
  const deputados = resultado.data.dados;

  return {
    props: {
      deputados,
    },
  };
}
