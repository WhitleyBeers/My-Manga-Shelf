import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getMangaRecommendation } from '../api/extData';
import RecommendationCards from '../components/cards/RecommendationCards';

export default function RecommendationView() {
  // const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchManga = () => {
    getMangaRecommendation('11330')
      .then(setResults);
    // .then(setQuery(''));
  };

  return (
    <div className="text-center m-4">
      <Button onClick={searchManga}>Click me</Button>
      {results.map((result) => (
        <RecommendationCards key={result.entry.mal_id} mangaObj={result} />
      ))}
    </div>
  );
}
