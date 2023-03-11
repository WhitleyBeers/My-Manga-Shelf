/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSeriesVolumes } from '../../api/mergeData';
import { getOwnedVolumes, getWishlistVolumes } from '../../api/series_volumeData';

export default function SeriesCard({ seriesObj, onUpdate }) {
  const [collectionVolumes, setCollectionVolumes] = useState([]);
  const [wishlistVolumes, setWishlistVolumes] = useState([]);
  const deleteThisSeries = () => {
    if (window.confirm(`Delete ${seriesObj.title}?`)) {
      deleteSeriesVolumes(seriesObj.firebaseKey).then(() => onUpdate());
    }
  };

  const volumeCount = () => {
    getOwnedVolumes(seriesObj.firebaseKey).then(setCollectionVolumes);
    getWishlistVolumes(seriesObj.firebaseKey).then(setWishlistVolumes);
  };

  useEffect(() => {
    volumeCount();
  }, []);

  return (
    <Card className="py-3 px-1 series-card">
      <Card.Img src={seriesObj.image_url} alt={seriesObj.title} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {seriesObj.title}
        {seriesObj.favorite ? '❤' : ''}
      </Card.Title>
      <Card.Text>
        {collectionVolumes.length} {collectionVolumes.length === 1 ? 'volume' : 'volumes'} in your collection
        <br />
        {wishlistVolumes.length} {wishlistVolumes.length === 1 ? 'volume' : 'volumes'} in your wishlist
      </Card.Text>
      <Dropdown>
        <Dropdown.Toggle className="card-dropdown">
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`/series/collection/${seriesObj.firebaseKey}`}>
            Volumes in your Collection
          </Dropdown.Item>
          <Dropdown.Item href={`/series/wishlist/${seriesObj.firebaseKey}`}>
            Volumes in your Wishlist
          </Dropdown.Item>
          <Dropdown.Item href={`/series/edit/${seriesObj.firebaseKey}`}>
            Edit Series Info
          </Dropdown.Item>
          <Dropdown.Item onClick={deleteThisSeries}>
            Delete Series & Volumes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
}

SeriesCard.propTypes = {
  seriesObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
