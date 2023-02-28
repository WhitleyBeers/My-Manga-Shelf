/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
      <Container className="mx-0">
        <Link passHref href="/">
          <Navbar.Brand className="my-0">
            <img alt="Navbar logo" src="/navbarlogo.png" /> My Manga Shelf
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-2">
            <Link passHref href="/collection">
              <Nav.Link>Collection</Nav.Link>
            </Link>
            <Link passHref href="/wishlist">
              <Nav.Link>Wishlist</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Your Profile</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Button type="button" className="btn-red" onClick={signOut}>Sign Out</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
