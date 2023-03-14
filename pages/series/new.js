import Head from 'next/head';
import React from 'react';
import SeriesForm from '../../components/forms/SeriesForm';

export default function NewSeries() {
  return (
    <>
      <Head>
        <title>Add A Series</title>
      </Head>
      <SeriesForm />
    </>
  );
}
