import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  Button, Carousel, CarouselItem, FloatingLabel, Form,
} from 'react-bootstrap';
import { getMangaRecommendation } from '../api/extData';
import { getAllSeries } from '../api/seriesData';
import RecommendationCards from '../components/cards/RecommendationCards';
import { useAuth } from '../utils/context/authContext';

export default function RecommendationView() {
  const [series, setSeries] = useState([]);
  const [results, setResults] = useState([]);
  const [formInput, setFormInput] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMangaRecommendation(formInput.mal_id)
      .then(setResults)
      .then(setFormInput(''));
  };

  useEffect(() => {
    getAllSeries(user.uid).then(setSeries);
  }, [user]);

  return (
    <div className="text-center m-4">
      <Head>
        <title>Get Recommendations</title>
      </Head>
      <h6>Choose a series and swipe left or right for similar manga!</h6>
      <Form onSubmit={handleSubmit} className="text-black">
        <FloatingLabel label="Series">
          <Form.Select
            aria-label="Series"
            name="mal_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.mal_id}
            required
          >
            <option value="">Choose a Series</option>
            {series.map((singleSeries) => (
              <option
                key={singleSeries.mal_id}
                value={singleSeries.mal_id}
              >{singleSeries.title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Button type="submit" className="add-link-btn p-0">Give me recommendations</Button>
      </Form>
      <hr />
      <Carousel controls={false} indicators={false} touch>
        {results.map((result) => (
          <CarouselItem>
            <RecommendationCards key={result.entry.mal_id} mangaObj={result} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
