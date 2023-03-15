/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { getSingleSeries } from '../../../api/seriesData';
import { getOwnedVolumes, getWishlistVolumes } from '../../../api/series_volumeData';
import VolumeCollectionCards from '../../../components/cards/VolumeCollectionCards';
import VolumeWishlistCards from '../../../components/cards/VolumeWishlistCards';
import AddVolumeModal from '../../../components/forms/AddCollectionVolume';

export default function SeriesDetailsView() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [seriesDetails, setSeriesDetails] = useState({});
  const [collectionVolumes, setCollectionVolumes] = useState([]);
  const [wishlistVolumes, setWishlistVolumes] = useState([]);
  const [key, setKey] = useState('collection');

  const getVolumeCards = () => {
    getOwnedVolumes(firebaseKey).then(setCollectionVolumes);
    getWishlistVolumes(firebaseKey).then(setWishlistVolumes);
  };

  useEffect(() => {
    getSingleSeries(firebaseKey).then(setSeriesDetails);
    getVolumeCards();
  }, [firebaseKey]);

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
          <div>
            <em>{seriesDetails.genre}</em>
          </div>
          <p className="mb-1">
            {seriesDetails.description}
          </p>
          <Button className="btn-green py-1 me-2" onClick={() => router.push(`/series/edit/${firebaseKey}`)}>Edit Series Info</Button>
          <AddVolumeModal obj={seriesDetails} onUpdate={getVolumeCards} />
        </div>
      </div>
      <div className="my-2 mb-4">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="collection" title="Collection">
            {collectionVolumes.length > 0 ? (
              collectionVolumes.map((volume) => (
                <VolumeCollectionCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
              ))
            ) : <h4>There&apos;s nothing here!</h4>}
          </Tab>
          <Tab eventKey="wishlist" title="Wishlist">
            {wishlistVolumes.length > 0 ? (
              wishlistVolumes.map((volume) => (
                <VolumeWishlistCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
              ))
            ) : <h4>There&apos;s nothing here!</h4>}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
