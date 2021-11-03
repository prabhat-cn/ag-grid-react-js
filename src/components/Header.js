import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/rendercustomcomponent">Render Custom</Nav.Link>
            <Nav.Link href="/populateapi">Populate Api Data</Nav.Link>
            <Nav.Link href="/selectionbasedcondition">
              Row Selection Condition
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
