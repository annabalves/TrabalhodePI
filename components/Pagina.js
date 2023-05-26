import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Container } from 'react-bootstrap';
import Cabecalho from './Cabecalho';



const Pagina = (props) => {

    return (
        <>
            <Cabecalho/>
            <div className='bg-white py-3 text-black text-left mb-2 mt-5'>
                <Container>
                    <h1>{props.titulo}</h1>
                </Container>
            </div>
            <Container>
                {props.children}
            </Container>
        </>
    )
}

export default Pagina