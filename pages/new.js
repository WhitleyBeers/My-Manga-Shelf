/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import getMangaInformation from '../api/extData';

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
    <div>
      <Form onSubmit={searchManga}>
        <input type="text" placeholder="Search the database..." onChange={(e) => setQuery(e.target.value)} />
        <Button type="submit">&#x1F50E;&#xFE0E;</Button>
      </Form>
      <div>
        <ul>
          {results.map((result) => (
            <li key={result.mal_id}>
              {result.title}
              <br />{result.synopsis}
              <br /><img src={result.images.jpg.image_url} alt={result.title} />
              <br />{result.genres.map((genre) => genre.name)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
