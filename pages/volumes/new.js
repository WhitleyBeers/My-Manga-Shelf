import Head from 'next/head';
import React from 'react';
import EditVolumeForm from '../../components/forms/EditVolumeForm';

export default function NewVolume() {
  return (
    <div>
      <Head>
        <title>Add A Volume</title>
      </Head>
      <EditVolumeForm />
    </div>
  );
}
