import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleSeries } from '../../../api/seriesData';
import SeriesForm from '../../../components/forms/SeriesForm';

export default function EditCollectionSeries() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSeries(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Editing {editItem.title}</title>
      </Head>
      <SeriesForm obj={editItem} />
    </>
  );
}
