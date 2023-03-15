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
    <div>
      {collectionItems.map((item) => (
        <CollectionCards obj={item} />
      ))}
    </div>
  );
}
