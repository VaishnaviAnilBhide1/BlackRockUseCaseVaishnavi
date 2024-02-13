import React, { useState } from 'react'; // Importing React and useState hook
import Container from 'react-bootstrap/Container'; // Importing Container component from react-bootstrap
import Nav from 'react-bootstrap/Nav'; // Importing Nav component from react-bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importing Navbar component from react-bootstrap
import Button from 'react-bootstrap/Button'; // Importing Button component from react-bootstrap
import axios from 'axios'; // Importing axios for making HTTP requests
import { setVariable } from '../redux/actions/variableActions'; // Importing setVariable action creator from Redux actions
import { useSelector, useDispatch } from 'react-redux'; // Importing useSelector and useDispatch hooks from react-redux
import Modal from 'react-bootstrap/Modal'; // Importing Modal component from react-bootstrap

function ColorSchemesExample() {
  // Using useSelector to extract state variables
  const { x, y, z, sig, rho, beta, delta } = useSelector((state) => state.variables);
  
  // Using useDispatch to dispatch actions
  const dispatch = useDispatch();
  
  // Using useState hook for managing alert message and type
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  
  // Using useState hook for managing modal visibility
  const [showAlert, setShowAlert] = useState(false);

  // Function to make API call
  const callApi = async () => {
    try {
      const url = 'http://localhost:8000/calculate'; // API endpoint URL
      const data1 = {
        'x0': x,
        'y0': y,
        'z0': z,
        'sigma': sig,
        'rho': rho,
        'beta': beta,
        't': delta
      }; // Request body

      // Making POST request to API
      const response = await axios.post(url, data1, { responseType: 'json' });

      // Parsing response data and dispatching action
      if (typeof response.data === String) {
        dispatch(setVariable('data', JSON.parse(response.data)));
      } else {
        dispatch(setVariable('data', response.data));
      }

      // Setting alert message and type
      setAlertMessage('API call successful.', response.status);
      setAlertType('success');
    } catch (error) {
      // Handling API call error
      console.error('Error calling API:', error);
      setAlertMessage('API call not successful', error.message);
      setAlertType('danger');
    } finally {
      // Show the alert modal
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="justify-content-">AI labs | Full stack case study</Navbar.Brand>
          <Nav className="justify-content-end">
            {/* Button for triggering API call */}
            <Button style={{ width: '100px' }} variant="primary" onClick={callApi}>Run</Button>
          </Nav>
        </Container>
      </Navbar>
      <br />
      {/* Modal component for displaying alert */}
      <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
        <Modal.Header closeButton className={alertType === 'success' ? 'bg-success text-light' : 'bg-danger text-light'} style={{ borderRadius: '0.5rem' }}>
          <Modal.Title style={{ fontSize: '0.9rem', color: 'white' }}>{alertType === 'success' ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '0.8rem' }}>
          {alertMessage}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ColorSchemesExample;
