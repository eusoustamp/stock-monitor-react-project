import React from 'react'
import { Col, Row, Container } from 'reactstrap'


export default function Footer() {
    return (
        <div>
            <Container fluid className="footer-container d-flex justify-content-center">
                <Row>
                    <Col>
                        <p>&copy; Stock Monitor 2021 Created by Pattarachai Roongsritong n10548467 </p>
                    </Col>
                </Row>

            </Container>
        </div >
    )
}