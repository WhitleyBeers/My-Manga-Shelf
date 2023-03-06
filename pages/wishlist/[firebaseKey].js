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
          <Button className="btn-green me-1 py-1" onClick={() => router.push(`/collection/series/edit/${firebaseKey}`)}>Edit</Button>
          <Button className="btn-blue ms-1 py-1" onClick={() => router.push('/wishlist/volume/new')}>Add a Volume</Button>
        </div>
      </div>
      <hr />
      <h5>Wishlist</h5>
      <div className="my-2">
        {volumes.map((volume) => (
          <VolumeWishlistCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
        ))}
      </div>
    </>
  );
}
