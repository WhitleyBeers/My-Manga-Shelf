import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getWishlistQuickview } from '../api/mergeData';
import WishlistCards from '../components/cards/WishlistCards';
import { useAuth } from '../utils/context/authContext';

export default function FullWishlistView() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  const wishlistView = () => {
    getWishlistQuickview(user.uid)
      .then(setWishlistItems);
  };

  useEffect(() => {
    wishlistView();
  }, [user]);

  return (
    <div className="text-center">
      <Head>
        <title>My Wishlist</title>
      </Head>
      <h1 className="my-3">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <WishlistCards obj={item} key={item.firebaseKey} />
        ))
      ) : <h4><em>There&apos;s nothing here!</em></h4>}
    </div>
  );
}
