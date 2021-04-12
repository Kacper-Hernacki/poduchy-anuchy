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
import { LinkContainer } from 'react-router-bootstrap';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../StateProvider';

export default function Header() {
  const [{ basket }] = useStateValue();

  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand className="navbarLogo" href="#home">
          Poduchy Anuchy
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link className="navbar__link" href="#link">
              Strona Główna
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/o_mnie">
            <Nav.Link className="navbar__link" href="#home">
              O mnie
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/categories">
            <Nav.Link className="navbar__link" href="#link">
              Produkty
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/jak_zamowic">
            <Nav.Link className="navbar__link" href="#link">
              Jak Zamówić
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/galeria">
            <Nav.Link className="navbar__link" href="#link">
              Galeria
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/kontakt">
            <Nav.Link className="navbar__link" href="#link">
              Kontakt
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/kosz">
            <Navbar.Brand className="navbarBasket" href="#home">
              <ShoppingBasketIcon />
              <span className="basket__count">{basket?.length}</span>
            </Navbar.Brand>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
