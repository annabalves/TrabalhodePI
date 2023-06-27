import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { FaCalendar, FaFlag, FaNewspaper, FaSearch, FaUser } from 'react-icons/fa';


function Cabecalho() {
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} style={{ backgroundColor: '#17583B'}} expand={expand} className="mb-3" variant="dark">
                    <Container fluid>
                        <Navbar.Toggle aria-controls={``} />
                        <Navbar.Brand href="#home" style={{paddingLeft:50}}>POLÍTICA TRANSPARENTE</Navbar.Brand>
                        <Nav className="me-auto">
                        <Navbar.Text href="#features"> | PORTAL DOS DEPUTADOS</Navbar.Text>
                        </Nav>
                        <Navbar.Offcanvas id={``} aria-labelledby={``} placement="start">
                        <Offcanvas.Body responsive="lg">
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/noticias/" className='spaced-link'>
                                <FaNewspaper className="me-3" size={28} color='17583B' />
                                Notícias
                            </Nav.Link>
                            <Nav.Link href="/deputados/">
                                <FaUser className="me-3" size={28} color='17583B' />
                                Deputados
                            </Nav.Link>
                            <Nav.Link href="/partidos/" className='spaced-link'>
                                <FaFlag className="me-3" size={25} color='17583B' />
                                Partidos
                            </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
        
    )
}

export default Cabecalho