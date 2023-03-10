/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllVolumes } from '../api/series_volumeData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  const [collectionVolumes, setCollectionVolumes] = useState([]);
  const [wishlistVolumes, setWishlistVolumes] = useState([]);

  const collectionCount = () => {
    getAllVolumes(user.uid)
      .then((volumeArray) => volumeArray.filter((volume) => volume.isOwned))
      .then(setCollectionVolumes);
  };

  const wishlistCount = () => {
    getAllVolumes(user.uid)
      .then((volumeArray) => volumeArray.filter((volume) => !volume.isOwned))
      .then(setWishlistVolumes);
  };

  useEffect(() => {
    collectionCount();
    wishlistCount();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <img src={user.photoURL} alt="user" height="100px" width="100px" style={{ borderRadius: '50px ' }} />
      <h2><span className="italic">Name:</span> {user.displayName}</h2>
      <h4><span className="italic">Email address:</span> {user.email}</h4>
      <h6><span className="italic">Last login:</span> {user.metadata.lastSignInTime}</h6>
      <h6>{collectionVolumes.length} volumes in collection</h6>
      <h6>{wishlistVolumes.length} volumes in wishlist</h6>
      <Link passHref href="/">
        <Button type="button" className="btn-red" onClick={signOut}>Sign Out</Button>
      </Link>
    </div>
  );
}
