/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { viewSeriesCollection } from '../../api/mergeData';
import { getOwnedVolumes } from '../../api/series_volumeData';
import VolumeCollectionCards from '../../components/cards/VolumeCollectionCards';

export default function ViewCollectionSeries() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  const [seriesDetails, setSeriesDetails] = useState({});
  const [volumes, setVolumes] = useState([]);

  const getVolumeCards = () => {
    getOwnedVolumes(firebaseKey).then(setVolumes);
  };

  useEffect(() => {
    viewSeriesCollection(firebaseKey).then(setSeriesDetails);
    getVolumeCards();
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          {/* <div className="d-flex"> */}
          <img src={seriesDetails.image_url} alt={seriesDetails.title} style={{ height: '224px', width: '159px' }} />
          <h2>
            {seriesDetails.title} {seriesDetails.favorite ? '❤' : ''}
          </h2>
          <div className="mx-1">
            <em>{seriesDetails.genre}</em>
          </div>
          {/* </div> */}
          {seriesDetails.description}
          <p>
            <em>{seriesDetails.status}</em>
          </p>
          <Link href={`/collection/series/edit/${firebaseKey}`} passHref>
            <Button className="btn-green py-1">Edit</Button>
          </Link>
        </div>
      </div>
      <hr />
      <h5>What&apos;s on my shelf?</h5>
      <div className="my-2">
        {volumes.map((volume) => (
          <VolumeCollectionCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
        ))}
      </div>
    </>
  );
}
