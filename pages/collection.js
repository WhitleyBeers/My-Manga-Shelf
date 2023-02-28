import React, { useEffect, useState } from 'react';
import { getAllSeries } from '../api/seriesData';
import SeriesCollectionCards from '../components/cards/SeriesCollectionCards';
import { useAuth } from '../utils/context/authContext';

export default function CollectionView() {
  const { user } = useAuth();
  const [series, setSeries] = useState([]);

  const getAllTheSeries = () => {
    getAllSeries(user.uid).then(setSeries);
  };

  useEffect(() => {
    getAllTheSeries();
  });

  return (
    <div className="text-center">
      <h1 className="my-4">Your Shelf</h1>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {series.map((singleSeries) => (
          <SeriesCollectionCards key={singleSeries.firebaseKey} seriesObj={singleSeries} onUpdate={getAllTheSeries} />
        ))}
      </div>
    </div>
  );
}
