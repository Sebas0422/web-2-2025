import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const NavMenuBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Proyecto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </Nav.Link>
            <NavDropdown title="Personas" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                to="/personas/create"
                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
              >
                Crear Persona
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={NavLink}
                to="/personas/list"
                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
              >
                Lista de Personas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
