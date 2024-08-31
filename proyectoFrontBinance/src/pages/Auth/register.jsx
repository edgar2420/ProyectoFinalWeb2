import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Menu from '../../components/Menu';
import './auth.css'; // Añadimos un archivo CSS personalizado

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    handleRegister();
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/register', { nombre, email, password });
      if (response.data) {
        navigate('/login');
      } else {
        setErrors({ formError: 'Invalid registration response' });
      }
    } catch (error) {
      console.error('Error registering:', error);
      const errorMessage = error.response && error.response.status === 400
        ? 'Error en el registro'
        : 'Error al intentar registrar';
      setErrors({ formError: errorMessage });
    }
  };

  return (
    <>
      <Menu />
      <Container className="auth-container">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 shadow">
              <h2 className="text-center mb-4">Register</h2>
              <Form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNombre" className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, introduce tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, introduce un email válido.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, introduce tu contraseña.
                  </Form.Control.Feedback>
                </Form.Group>
                {errors.formError && <Alert variant="danger" className="mt-3">{errors.formError}</Alert>}
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterForm;
