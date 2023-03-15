import React, { useEffect, useState } from 'react';
import { getCollectionQuickview, getWishlistQuickview } from '../api/mergeData';
import { useAuth } from '../utils/context/authContext';

export default function TestView() {
  const { user } = useAuth();
  const [collectionItem, setCollectionItem] = useState([]);
  const [wishlistItem, setWishlistItem] = useState([]);

  useEffect(() => {
    getCollectionQuickview(user.uid)
      .then(setCollectionItem);
    getWishlistQuickview(user.uid)
      .then(setWishlistItem);
  }, [user.uid]);

  return (
    <div>
      {collectionItem.map((item) => (
        <li key={item.firebaseKey}>{item.title}{item.volumes.length}</li>
      ))}
      {wishlistItem.map((item) => (
        <li key={item.firebaseKey}>{item.title}{item.volumes.length}</li>
      ))}
    </div>
  );
}
