import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { setVariable } from '../redux/actions/variableActions'; 
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

function ColorSchemesExample() {
  const { x, y, z, sig, rho, beta, delta } = useSelector((state) => state.variables);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const callApi = async () => {
    try {
      const url = 'http://localhost:8000/calculate';
      const data1 = {
         'x0': x,
         'y0': y,
         'z0': z,
         'sigma': sig,
         'rho': rho,
         'beta': beta,
         't': delta
      };
      
      const response = await axios.post(url, data1, { responseType: 'json' });

      if (typeof response.data == String){
        dispatch(setVariable('data', JSON.parse(response.data)));
      }

      else{
        dispatch(setVariable('data', response.data));
      }
       
     setAlertMessage('API call successful.',response.statu);
     setAlertType('success');
      
    } catch (error) {
      console.error('Error calling API:', error);
      setAlertMessage('API call not successful', error.message);
      setAlertType('danger');
    }finally {
      // Show the alert modal
      setShowAlert(true);
    }
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="justify-content-" >AI labs | Full stack case study</Navbar.Brand>
          <Nav className="justify-content-end">
          <Button style={{width:'100px'}} variant="primary" onClick={callApi} >Run</Button>
          </Nav>
        </Container>
      </Navbar>
      <br />
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