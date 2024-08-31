import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { postLogin } from '../../services/AuthService';
import './auth.css';

const LoginForm = () => {
  const navigate = useNavigate();
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
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const data = await postLogin({ email, password });
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email, name: data.name })); // Guardar el email y nombre del usuario
        navigate('/'); // Redirigir a la página principal
      } else {
        setErrors({ formError: 'Invalid login response' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = error.response && error.response.status === 401
        ? 'Usuario o contraseña incorrectos'
        : 'Error al intentar iniciar sesión';
      setErrors({ formError: errorMessage });
    }
  };

  return (
    <Container className="auth-container">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={!!errors.formError}
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
                  isInvalid={!!errors.formError}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, introduce tu contraseña.
                </Form.Control.Feedback>
              </Form.Group>
              {errors.formError && <Alert variant="danger" className="mt-3">{errors.formError}</Alert>}
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
