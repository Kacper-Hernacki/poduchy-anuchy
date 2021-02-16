import React from 'react';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import './Header.scss';

export default function Header() {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand className="navbarLogo" href="#home">
        Poduchy Anuchy
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="navbar__link" href="#link">
            O mnie
          </Nav.Link>
          <Nav.Link className="navbar__link" href="#home">
            Strona Główna
          </Nav.Link>
          <Nav.Link className="navbar__link" href="#link">
            Produkty
          </Nav.Link>
          <Nav.Link className="navbar__link" href="#link">
            Jak Zamówić
          </Nav.Link>
          <Nav.Link className="navbar__link" href="#link">
            Kontakt
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
