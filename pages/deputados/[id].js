import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Pagination, Row, Table } from 'react-bootstrap';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BarController, BarElement, CategoryScale, Chart, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Pagina from '../../components/Pagina';
import Rodape from '@/components/Rodape';
import apiDeputados from '../../services/apiDeputados';
import { format, getYear, getMonth } from 'date-fns';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip);

const Detalhes = ({ deputado, despesasDeputado }) => {
  const formatarCPF = (cpf) => {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(cpfRegex, '$1.$2.$3-$4');
  };

  const exportarParaExcel = async () => {
    let despesasFiltradasExcel = despesasDeputado;

    // Aplica os filtros de ano e mês, se houver
    if (filtroAno !== '') {
      despesasFiltradasExcel = despesasFiltradasExcel.filter(
        (item) => getYear(new Date(item.dataDocumento)) === parseInt(filtroAno)
      );
    }
    if (filtroMes !== '') {
      despesasFiltradasExcel = despesasFiltradasExcel.filter(
        (item) => getMonth(new Date(item.dataDocumento)) === parseInt(filtroMes) - 1
      );
    }
  
    // Mapeia as despesas para o formato adequado para exportação
    const despesasData = despesasFiltradasExcel.map((item) => [
      item.dataDocumento,
      item.tipoDespesa,
      `R$${item.valorDocumento}`,
    ]);
  
    // Calcula o valor total das despesas
    const valorTotalDespesas = despesasFiltradasExcel.reduce((total, despesa) => total + despesa.valorDocumento, 0);
  
    // Adiciona a linha com o valor total ao array despesasData
    despesasData.push(['', 'TOTAL', `R$${valorTotalDespesas.toFixed(2)}`]);
  
    // Cria a planilha do Excel
    const ws = XLSX.utils.aoa_to_sheet([
      ['Data', 'Descrição', 'Valor'],
      ...despesasData,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Despesas');
  
    // Salva o arquivo Excel
    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'despesas.xlsx');
  };

  const [paginaAtual, setPaginaAtual] = useState(1);
  const despesasPorPagina = 15;
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMes, setFiltroMes] = useState('');

  // Obter todos os anos disponíveis nas despesas
  const anosDespesas = [...new Set(despesasDeputado.map((item) => getYear(new Date(item.dataDocumento))))];

  // Obter todos os meses disponíveis nas despesas
  const mesesDespesas = [...new Set(despesasDeputado.map((item) => format(new Date(item.dataDocumento), 'MMMM')))];

  // Filtrar despesas por ano e mês
  let despesasFiltradas = despesasDeputado;
  if (filtroAno !== '') {
    despesasFiltradas = despesasFiltradas.filter(
      (item) => getYear(new Date(item.dataDocumento)) === parseInt(filtroAno)
    );
  }
  if (filtroMes !== '') {
    despesasFiltradas = despesasFiltradas.filter(
      (item) => getMonth(new Date(item.dataDocumento)) === parseInt(filtroMes) - 1
    );
  }

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const calcularIndicesPagina = () => {
    const totalDespesas = despesasFiltradas.length;
    const totalPaginas = Math.ceil(totalDespesas / despesasPorPagina);

    const indiceInicial = (paginaAtual - 1) * despesasPorPagina;
    const indiceFinal = indiceInicial + despesasPorPagina;

    return { totalPaginas, indiceInicial, indiceFinal };
  };

  const { indiceInicial, indiceFinal } = calcularIndicesPagina();

  const despesasPaginadas = despesasFiltradas.slice(indiceInicial, indiceFinal);

  const despesasDatas = despesasPaginadas
    .map((item) => format(new Date(item.dataDocumento), 'dd/MM/yyyy'))
    .sort((a, b) => new Date(a) - new Date(b));

  const despesasValores = despesasPaginadas.map((item) => item.valorDocumento);

  const data = {
    labels: despesasDatas,
    datasets: [
      {
        label: 'Despesas',
        data: despesasValores,
        backgroundColor: ' #17583B',
        borderColor: '#25855A',
        borderWidth: 1,
      },
    ],
  };

  const totalDespesas = despesasPaginadas.reduce((total, item) => total + item.valorDocumento, 0);

  return (
    <Pagina>
      <Row>
        <Col>
          <Card.Img style={{ width: '300px', border: '5px solid #17583B' }} src={deputado.ultimoStatus.urlFoto} />
        </Col>
        <Col md={8}>
          <Row md={2}>
            <Card.Body>
              <p><b>Nome: </b>{deputado.nomeCivil}</p>
              <p><b>CPF: </b> {formatarCPF(deputado.cpf)}</p>
              <p><b>Data de Nascimento: </b> {format(new Date(deputado.dataNascimento), 'dd/MM/yyyy')}</p>
              <p><b>Naturalidade: </b>{deputado.municipioNascimento} - {deputado.ufNascimento}</p>
              <p><b>Escolaridade: </b>{deputado.escolaridade}</p>
              <p><b>Partido: </b>{deputado.ultimoStatus.siglaPartido}</p>
              <p><b>Condição Eleitoral: </b>{deputado.ultimoStatus.condicaoEleitoral}</p>
              <p><b>Situação: </b>{deputado.ultimoStatus.situacao}</p>
            </Card.Body>
            <Accordion eventKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Gabinete</Accordion.Header>
                <Accordion.Body>
                  <p><b>Número do gabinete: </b>{deputado.ultimoStatus.gabinete.nome}</p>
                  <p><b>Predio: </b>{deputado.ultimoStatus.gabinete.predio}</p>
                  <p><b>Sala: </b>{deputado.ultimoStatus.gabinete.sala}</p>
                  <p><b>Andar: </b>{deputado.ultimoStatus.gabinete.andar}</p>
                  <p><b>Telefone: </b>{deputado.ultimoStatus.gabinete.telefone}</p>
                  <p><b>Email: </b>{deputado.ultimoStatus.gabinete.email}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Col>
        <div className="mt-5 variant=center">
          <Bar data={data} plugins={[{ plugin: Tooltip }]} />
        </div>
      </Row>

      <Row md={2}></Row>

      <Row>
        <Col md={12} className="pt-5 pb-10">
          <Card>
            <Card.Header style={{ border: '2px solid #17583B', backgroundColor: '#17583B', color: 'white'}}>Despesas</Card.Header>
            <Card.Body style={{ border: '1px solid #17583B' }}>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="filtroAno">Ano:</label>
                  <select
                    id="filtroAno"
                    value={filtroAno}
                    onChange={(e) => setFiltroAno(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {anosDespesas.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filtroMes">Mês:</label>
                  <select
                    id="filtroMes"
                    value={filtroMes}
                    onChange={(e) => setFiltroMes(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {meses.map((mes, index) => (
                      <option key={index} value={index + 1}>
                        {mes}
                      </option>
                    ))}
                  </select>
                </div>
                <Button variant="success" onClick={exportarParaExcel}>
                  <RiFileExcel2Line />
                  Exportar para Excel
                </Button>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {despesasPaginadas.map((item, index) => (
                    <tr key={index}>
                      <td>{format(new Date(item.dataDocumento), 'dd/MM/yyyy')}</td>
                      <td>{item.tipoDespesa}</td>
                      <td>R${item.valorDocumento}</td>
                    </tr>
                  ))}
                  <tr>
                  <td></td>
                  <td><b>TOTAL</b></td>
                  <td><b>R${totalDespesas.toFixed(2)}</b></td>
                  <td></td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  {Array.from(Array(calcularIndicesPagina().totalPaginas).keys()).map((pagina) => (
                    <Pagination.Item
                      key={pagina}
                      active={pagina + 1 === paginaAtual}
                      onClick={() => setPaginaAtual(pagina + 1)}
                    >
                      {pagina + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Rodape />
    </Pagina>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get('/deputados/' + id);
  const deputado = resultado.data.dados;

  const despesas = await apiDeputados.get('/deputados/' + id + '/despesas?ordem=ASC&ordenarPor=mes&itens=200');
  const despesasDeputado = despesas.data.dados;

  return {
    props: {
      deputado,
      despesasDeputado,
    },
  };
}