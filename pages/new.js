/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import getMangaInformation from '../api/extData';
import MangaSearchCards from '../components/cards/MangaSearchCards';

export default function NewSeriesView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchManga = (e) => {
    e.preventDefault();
    getMangaInformation(query)
      .then(setResults)
      .then(setQuery(''));
  };

  return (
    <div className="text-center m-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search the database..."
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <Button className="search-manga" onClick={searchManga}>&#x1F50E;&#xFE0E;</Button>
      </InputGroup>
      <p>
        Can&apos;t find what you&apos;re looking for?
        <Button className="m-0 p-0 add-link-btn">
          Click here to add it manually
        </Button>
      </p>
      {results.map((result) => (
        <MangaSearchCards key={result.mal_id} mangaObj={result} />
      ))}
    </div>
  );
}
