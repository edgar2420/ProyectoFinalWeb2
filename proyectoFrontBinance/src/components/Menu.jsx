import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Menu = ({ user, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">Crypto Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
          </Nav>
          {user ? (
            <Nav>
              <NavDropdown title={`Signed in as: ${user.email}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Menu.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Menu;
