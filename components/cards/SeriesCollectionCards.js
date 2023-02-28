import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSeriesVolumes } from '../../api/mergeData';
import { getOwnedVolumes } from '../../api/series_volumeData';

export default function SeriesCollectionCards({ seriesObj, onUpdate }) {
  const [volumes, setVolumes] = useState([]);
  const deleteThisSeries = () => {
    if (window.confirm(`Delete ${seriesObj.title}?`)) {
      deleteSeriesVolumes(seriesObj.firebaseKey).then(() => onUpdate());
    }
  };

  const volumeCount = () => {
    getOwnedVolumes(seriesObj.firebaseKey).then(setVolumes);
  };

  useState(() => {
    volumeCount();
  });

  return (
    <Card style={{ width: '14rem', margin: '10px', color: 'black' }} className="py-3 px-1">
      <Card.Img src={seriesObj.image_url} alt={seriesObj.title} style={{ height: '250px', width: '175px' }} className="mx-auto" />
      <Card.Title>
        {seriesObj.title}
        {seriesObj.favorite ? '❤' : ''}
      </Card.Title>
      <Card.Text>
        {volumes.length} volumes in your collection
      </Card.Text>
      <Dropdown>
        <Dropdown.Toggle>
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`/collection/${seriesObj.firebaseKey}`}>View</Dropdown.Item>
          <Dropdown.Item href={`/collection/edit/${seriesObj.firebaseKey}`}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteThisSeries}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
}

SeriesCollectionCards.propTypes = {
  seriesObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
