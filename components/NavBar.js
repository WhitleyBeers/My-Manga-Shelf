/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button, CloseButton, Container, Nav, Navbar, Offcanvas,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar collapseOnSelect expand="false" variant="dark" className="navbar">
      <Container className="mx-0">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleShow} />
        <Link passHref href="/">
          <Navbar.Brand className="mb-0">
            <img alt="Navbar logo" src="/navbarlogo.png" />
          </Navbar.Brand>
        </Link>
        <Navbar.Offcanvas show={show} className="offcanvas" onClick={handleClose}>
          <Offcanvas.Header>
            <CloseButton onClick={handleClose} variant="white" />
          </Offcanvas.Header>
          <Link passHref href="/">
            <Navbar.Brand className="my-2 text-center" onClick={handleClose}>
              <img alt="Navbar logo" src="/navbarlogo.png" />
            </Navbar.Brand>
          </Link>
          <Nav className="mx-2 text-center" onClick={handleClose}>
            <Link passHref href="/collection">
              <Nav.Link>Collection</Nav.Link>
            </Link>
            <Link passHref href="/wishlist">
              <Nav.Link>Wishlist</Nav.Link>
            </Link>
            <Link passHref href="/series">
              <Nav.Link>All Series</Nav.Link>
            </Link>
            <Link passHref href="/series/newSeries">
              <Nav.Link>Add New Series</Nav.Link>
            </Link>
            <Link passHref href="/recommendation">
              <Nav.Link>Recommendations</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Button type="button" className="btn-red" onClick={signOut}>Sign Out</Button>
            </Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
