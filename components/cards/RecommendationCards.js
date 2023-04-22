/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// This is used to show the results of getting a recommendation from the Jikan API

export default function RecommendationCards({ mangaObj }) {
  return (
    <Card className="rec-card my-3 p-1 text-center">
      <Card.Img alt={mangaObj.entry.title} src={mangaObj.entry.images.jpg.image_url} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {mangaObj.entry.title}
      </Card.Title>
    </Card>
  );
}

RecommendationCards.propTypes = {
  mangaObj: PropTypes.shape({
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
