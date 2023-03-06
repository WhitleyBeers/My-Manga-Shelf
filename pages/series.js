import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Form, InputGroup,
} from 'react-bootstrap';
import { getAllSeries } from '../api/seriesData';
import SeriesCard from '../components/cards/SeriesCard';
import { useAuth } from '../utils/context/authContext';

const getSearchItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((item) => (item.title.toLowerCase().includes(query)));
};

export default function ViewSeries() {
  const { user } = useAuth();
  const [series, setSeries] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const getAllTheSeries = () => {
    getAllSeries(user.uid).then(setSeries);
  };

  const searchItems = getSearchItems(query, series);

  useEffect(() => {
    getAllTheSeries();
  });

  return (
    <div className="text-center">
      <h1 className="my-4">My Series</h1>
      <ButtonGroup>
        <Button className="btn-blue" onClick={() => router.push('/newSeries')}>
          Add New Series
        </Button>
      </ButtonGroup>
      <div className="my-2">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="&#x1F50E;&#xFE0E; Start typing to search..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            required
          />
        </InputGroup>
      </div>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {searchItems.map((searchItem) => (
          <SeriesCard key={searchItem.firebaseKey} seriesObj={searchItem} onUpdate={getAllTheSeries} />
        ))}
      </div>
    </div>
  );
}
