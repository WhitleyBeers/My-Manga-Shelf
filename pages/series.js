/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
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
  const controller = new AbortController();

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
    return () => controller.abort();
  }, [user]);

  return (
    <div className="text-center">
      <Head>
        <title>My Series</title>
      </Head>
      <h1 className="my-3">My Series</h1>
      <ButtonGroup>
        <Button className="btn-blue" onClick={() => router.push('/series/newSeries')}>
          Add A Series
        </Button>
        <Button className="btn-green" onClick={() => router.push('/volumes/new')}>
          Add A Volume
        </Button>
      </ButtonGroup><br />
      <div className="my-2 d-flex">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            required
          />
          <Button className="search-manga" onClick={searchItems}>
            &#x1F50E;&#xFE0E;
          </Button>
        </InputGroup>
        <Button className="btn-clear" onClick={getAllTheSeries}>
          &#10006;
        </Button>
      </div>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {series.map((singleSeries) => (
          <SeriesCard key={singleSeries.firebaseKey} seriesObj={singleSeries} onUpdate={getAllTheSeries} />
        ))}
      </div>
    </div>
  );
}
