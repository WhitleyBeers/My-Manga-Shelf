/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import { deleteSeriesVolumes } from '../../api/mergeData';
import { getWishlistVolumes } from '../../api/series_volumeData';

export default function SeriesWishlistCards({ seriesObj, onUpdate }) {
  const [volumes, setVolumes] = useState([]);

  const deleteThisSeries = () => {
    if (window.confirm(`Delete ${seriesObj.title}?`)) {
      deleteSeriesVolumes(seriesObj.firebaseKey).then(() => onUpdate());
    }
  };

  const volumeCount = () => {
    getWishlistVolumes(seriesObj.firebaseKey).then(setVolumes);
  };

  useEffect(() => {
    volumeCount();
  }, []);

  return (
    <Card style={{ width: '14rem', margin: '10px', color: 'black' }} className="py-3 px-1">
      <Card.Img src={seriesObj.image_url} alt={seriesObj.title} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {seriesObj.title}
      </Card.Title>
      <Card.Text>
        {volumes.length} volumes in your wishlist
      </Card.Text>
      <Dropdown>
        <Dropdown.Toggle>
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`/wishlist/${seriesObj.firebaseKey}`}>
            View
          </Dropdown.Item>
          <Dropdown.Item href={`/wishlist/edit/${seriesObj.firebaseKey}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={deleteThisSeries}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
}

SeriesWishlistCards.propTypes = {
  seriesObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
