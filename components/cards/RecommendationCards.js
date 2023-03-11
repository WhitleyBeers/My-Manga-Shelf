/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function RecommendationCards({ mangaObj }) {
  return (
    <Card className="my-3 p-1 text-center" style={{ color: 'black', width: '100%' }}>
      <Card.Img alt={mangaObj.entry.title} src={mangaObj.entry.images.jpg.image_url} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {mangaObj.entry.title}
      </Card.Title>
      <Card.Text>
        <Link href={mangaObj.url} passHref>Click here</Link>
      </Card.Text>
    </Card>
  );
}

RecommendationCards.propTypes = {
  mangaObj: PropTypes.shape({
    url: PropTypes.string,
    entry: PropTypes.shape({
      title: PropTypes.string,
      images: PropTypes.shape({
        jpg: PropTypes.shape({
          image_url: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
