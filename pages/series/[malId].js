/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMangaById } from '../../api/extData';
import SeriesForm from '../../components/forms/SeriesForm';
// import MangaSearchCards from '../../components/cards/MangaSearchCards';

export default function AddSearchSeries() {
  const [series, setSeries] = useState({});
  const router = useRouter();
  const { malId } = router.query;

  useEffect(() => {
    getMangaById(malId).then(setSeries);
  }, []);

  return (
    <>
      <Head>
        <title>Add {series.title}</title>
      </Head>
      <SeriesForm obj={series} />
    </>
  );
}
