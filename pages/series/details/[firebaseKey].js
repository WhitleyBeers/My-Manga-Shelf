/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleSeries } from '../../../api/seriesData';
import { getOwnedVolumes, getWishlistVolumes } from '../../../api/series_volumeData';
import VolumeCollectionCards from '../../../components/cards/VolumeCollectionCards';
import VolumeWishlistCards from '../../../components/cards/VolumeWishlistCards';
import AddCollectionVolume from '../../../components/forms/AddCollectionVolume';

export default function SeriesDetailsView() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [seriesDetails, setSeriesDetails] = useState([]);
  const [collectionVolumes, setCollectionVolumes] = useState([]);
  const [wishlistVolumes, setWishlistVolumes] = useState([]);

  const getVolumeCards = () => {
    getOwnedVolumes(firebaseKey).then(setCollectionVolumes);
    getWishlistVolumes(firebaseKey).then(setWishlistVolumes);
  };

  useEffect(() => {
    getSingleSeries(firebaseKey).then(setSeriesDetails);
    getVolumeCards();
  }, [firebaseKey, collectionVolumes, wishlistVolumes]);

  return (
    <>
      <Head>
        <title>Viewing {seriesDetails.title}</title>
      </Head>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          <img src={seriesDetails.image_url} alt={seriesDetails.title} style={{ height: '224px', width: '159px' }} />
          <h2>
            {seriesDetails.title} {seriesDetails.favorite ? '❤' : ''}
          </h2>
          <div className="mx-1">
            <em>{seriesDetails.genre}</em>
          </div>
          <p>
            {seriesDetails.description}
          </p>
          <Button className="btn-green py-1 me-2" onClick={() => router.push(`/series/edit/${firebaseKey}`)}>Edit</Button>
          <AddCollectionVolume obj={seriesDetails} />
        </div>
      </div>
      <hr />
      <h5>What&apos;s on my shelf?</h5>
      <div className="my-2">
        {collectionVolumes.map((volume) => (
          <VolumeCollectionCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
        ))}
        <hr />
        <h5>Wishlist</h5>
        {wishlistVolumes.map((volume) => (
          <VolumeWishlistCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
        ))}
      </div>
    </>
  );
}
