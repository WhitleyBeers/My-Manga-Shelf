import React from 'react';
import { BarLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="text-center mt-5">
      <div
        className="spinner-border"
        style={{
          color: '#00BF67',
          width: '100px',
          height: '100px',
        }}
        role="status"
      >
        <BarLoader color="#073B4C" />
      </div>
    </div>
  );
}
