/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { viewSeriesWishlist } from '../../api/mergeData';
import { getWishlistVolumes } from '../../api/series_volumeData';
import VolumeWishlistCards from '../../components/cards/VolumeWishlistCards';

export default function ViewWishlistSeries() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  const [seriesDetails, setSeriesDetails] = useState({});
  const [volumes, setVolumes] = useState([]);

  const getVolumeCards = () => {
    getWishlistVolumes(firebaseKey).then(setVolumes);
  };

  useEffect(() => {
    viewSeriesWishlist(firebaseKey).then(setSeriesDetails);
    getVolumeCards();
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
          {seriesDetails.genre}
          <p>
            <em>{seriesDetails.status}</em>
          </p>
          <Button className="btn-green py-1">Edit</Button>
        </div>
      </div>
      <hr />
      <h5>What&apos;s on my shelf?</h5>
      <div className="my-2">
        {volumes.map((volume) => (
          <VolumeWishlistCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
        ))}
      </div>
    </>
  );
}
