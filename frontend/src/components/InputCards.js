import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setVariable } from '../redux/actions/variableActions'; // Import the action creator

function InputCards() {
  const dispatch = useDispatch();

  // Function to handle input field changes and dispatch corresponding actions
  const handleInputChange = (e, name) => {
    const { value } = e.target;
    dispatch(setVariable(name, value)); // Dispatch action to update the Redux state
  };

  return (
    <Card style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
      <Card.Header style={{ backgroundColor: "#dcdcdc", borderRadius: "15px 15px 0 0" }}>
        <h2 style={{ margin: "0" }}>Inputs</h2>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic1">
                <Form.Label >x0</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter x0"
                  onChange={(event) => handleInputChange(event, 'x')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic2">
                <Form.Label >y0</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter y0"
                  onChange={(event) => handleInputChange(event, 'y')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic3">
                <Form.Label >z0</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter z0"
                  onChange={(event) => handleInputChange(event, 'z')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic4">
                <Form.Label >Sigma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Sigma"
                  onChange={(event) => handleInputChange(event, 'sig')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic5">
                <Form.Label >Rho</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Rho"
                  onChange={(event) => handleInputChange(event, 'rho')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic6">
                <Form.Label >Beta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Beta"
                  onChange={(event) => handleInputChange(event, 'beta')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasic7">
                <Form.Label >Delta t</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Delta t"
                  onChange={(event) => handleInputChange(event, 'delta')}
                  style={{ border: "1px solid #ced4da", borderRadius: "10px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InputCards;
