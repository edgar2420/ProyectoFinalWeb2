import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Proyecto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Peliculas" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/peliculas"}>Lista de Peliculas</Link>
                        </NavDropdown>
                        <NavDropdown title="Directores" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/directores"}>Lista de Directores</Link>
                        </NavDropdown>
                        <NavDropdown title="Actores" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/actores"}>Lista de Actores</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;