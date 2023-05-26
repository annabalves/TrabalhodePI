import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row} from 'react-bootstrap';
import Pagina from "../../components/Pagina";
import apiDeputados from '../../services/apiDeputados';

const Index = ({ deputados }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  
  // Filtra a lista de deputados com base no valor da pesquisa
  const filteredDeputados = deputados.filter(item =>
    item.nome.toLowerCase().includes(searchValue.toLowerCase()) &&
    (selectedParty === '' || item.partido === selectedParty)
  );

  // Atualiza o valor da pesquisa quando o usuário digita no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePartySelect = (party) => {
    setSelectedParty(party);;
  };

  return (
    <Pagina titulo='Deputados'>
      <Form className="d-flex" style={{ marginBottom: "20px" }}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="outline-primary" style={{ marginBottom: "20px", marginRight: "10px", marginLeft: "2px" }}>
          Pesquisar
        </Button>

        <DropdownButton id="dropdown-basic-button" title="Filtrar">
        <Dropdown.Item onClick={() => handlePartySelect('')}>
          Todos
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePartySelect('Partido')}>
          Partido
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePartySelect('siglaUf')}>
          Unidade Federativa
        </Dropdown.Item>
        </DropdownButton>

      </Form>
      <Row md={4} xs={1} className="g-4">
        {filteredDeputados.map(item => (
          <Col key={item.id}>
            <Card>
              <Link href={'/deputados/' + item.id}>
                <Card.Img src={item.urlFoto} />
              </Link>
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados");
  const deputados = resultado.data.dados;

  return {
    props: {
      deputados,
    },
  };
}