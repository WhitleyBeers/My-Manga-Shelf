/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
      <ListGroup variant="flush" className="mt-2">
        <ListGroupItem><span className="italic">Name:</span> {user.displayName}</ListGroupItem>
        <ListGroupItem><span className="italic">Email address:</span> {user.email}</ListGroupItem>
        <ListGroupItem><span className="italic">Last login:</span> {user.metadata.lastSignInTime}</ListGroupItem>
        <ListGroupItem>{collectionVolumes.length} volumes in collection</ListGroupItem>
        <ListGroupItem>{wishlistVolumes.length} volumes in wishlist</ListGroupItem>
      </ListGroup>
      <Link passHref href="/">
        <Button type="button" className="btn-red m-2" onClick={signOut}>Sign Out</Button>
      </Link>
    </div>
  );
}
