import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getCollectionQuickview } from '../api/mergeData';
import CollectionCards from '../components/cards/CollectionCards';
import { useAuth } from '../utils/context/authContext';

export default function FullCollectionView() {
  const { user } = useAuth();
  const [collectionItems, setCollectionItems] = useState([]);

  const collectionView = () => {
    getCollectionQuickview(user.uid)
      .then(setCollectionItems);
  };

  useEffect(() => {
    collectionView();
  });

  return (
    <div className="text-center">
      <Head>
        <title>My Collection</title>
      </Head>
      <h1 className="my-3">My Collection</h1>
      {collectionItems.map((item) => (
        <CollectionCards obj={item} key={item.firebaseKey} />
      ))}
    </div>
  );
}
