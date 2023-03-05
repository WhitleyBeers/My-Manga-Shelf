import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { getAllSeries } from '../api/seriesData';
import SeriesWishlistCards from '../components/cards/SeriesWishlistCards';
import { useAuth } from '../utils/context/authContext';

export default function WishlistView() {
  const { user } = useAuth();
  const [series, setSeries] = useState([]);
  const router = useRouter();

  const getAllTheSeries = () => {
    getAllSeries(user.uid).then(setSeries);
  };

  useEffect(() => {
    getAllTheSeries();
  });

  return (
    <div className="text-center">
      <h1 className="my-4">Your Wishlist</h1>
      <ButtonGroup>
        <Button className="btn-blue" onClick={() => router.push('/newSeries')}>
          Add New Series
        </Button>
      </ButtonGroup>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {series.map((singleSeries) => (
          <SeriesWishlistCards key={singleSeries.firebaseKey} seriesObj={singleSeries} onUpdate={getAllTheSeries} />
        ))}
      </div>
    </div>
  );
}
