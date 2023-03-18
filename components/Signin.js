/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <img alt="My Manga Shelf Logo" src="/logo.png" width="300px" height="300px" />
      <button type="button" className="btn btn-lg btn-blue copy-btn mt-5" onClick={signIn}>
        Get started here
      </button>
    </div>
  );
}

export default Signin;
