/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Form, InputGroup,
} from 'react-bootstrap';
import { getAllSeries, searchSeries } from '../api/seriesData';
import SeriesCard from '../components/cards/SeriesCard';
import { useAuth } from '../utils/context/authContext';

export default function ViewSeries() {
  const { user } = useAuth();
  const [series, setSeries] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const getAllTheSeries = () => {
    getAllSeries(user.uid).then(setSeries);
  };

  const searchItems = (e) => {
    e.preventDefault();
    searchSeries(query, user.uid)
      .then(setSeries)
      .then(setQuery(''));
  };

  useEffect(() => {
    getAllTheSeries();
  }, [user]);

  return (
    <div className="text-center">
      <h1 className="my-3">My Series</h1>
      <ButtonGroup>
        <Button className="btn-blue" onClick={() => router.push('/series/newSeries')}>
          Add New Series
        </Button>
      </ButtonGroup><br />
      <div className="my-2">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search the database..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            required
          />
          <Button className="search-manga" onClick={searchItems}>&#x1F50E;&#xFE0E;</Button>
        </InputGroup>
      </div>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {series.map((singleSeries) => (
          <SeriesCard key={singleSeries.firebaseKey} seriesObj={singleSeries} onUpdate={getAllTheSeries} />
        ))}
      </div>
    </div>
  );
}
