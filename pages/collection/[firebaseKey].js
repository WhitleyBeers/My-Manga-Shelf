/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { viewSeriesCollection } from '../../api/mergeData';

export default function ViewCollectionSeries() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [seriesDetails, setSeriesDetails] = useState([]);

  useEffect(() => {
    viewSeriesCollection(firebaseKey).then(setSeriesDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          <h2>
            {seriesDetails.title}
          </h2>
          <div className="d-flex">
            <img src={seriesDetails.image_url} alt={seriesDetails.title} style={{ height: '224px', width: '159px' }} />
            <span className="mx-1">
              {seriesDetails.description}
            </span>
          </div>
          <p>
            {seriesDetails.genre}
          </p>
          <p>
            {seriesDetails.favorite ? '❤' : ''}
          </p>
          <div>
            <Button className="btn-green">Edit</Button>
          </div>
        </div>
      </div>
    </>
  );
}
