/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

// This is used to show the results of searching using Jikan API

export default function MangaSearchCards({ mangaObj }) {
  return (
    <Card className="my-3 p-1 text-center" style={{ color: 'black', width: '100%' }}>
      <Card.Img alt={mangaObj.title} src={mangaObj.images.jpg.image_url} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {mangaObj.title}
      </Card.Title>
      <Card.Text>
        {mangaObj.synopsis}
      </Card.Text>
      <Card.Text className="text-muted">
        {mangaObj.genres.map((genre) => genre.name).join('/')}
      </Card.Text>
      <Link href={`/series/${mangaObj.mal_id}`} passHref>
        <Button className="btn-green">Choose</Button>
      </Link>
    </Card>
  );
}

MangaSearchCards.propTypes = {
  mangaObj: PropTypes.shape({
    mal_id: PropTypes.number,
    title: PropTypes.string,
    synopsis: PropTypes.string,
    images: PropTypes.shape({
      jpg: PropTypes.shape({
        image_url: PropTypes.string,
      }),
    }),
    genres: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};
