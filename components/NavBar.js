/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
      <div className="container-fluid">
        <Link passHref href="/">
          <Navbar.Brand className="my-0">
            <img alt="Navbar logo" src="/navbarlogo.png" /> My Manga Shelf
          </Navbar.Brand>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
            </li>
            <button type="button" className="btn btn-red" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}
