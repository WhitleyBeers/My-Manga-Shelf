import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { getWishlistVolumes } from '../../api/series_volumeData';

export default function WishlistCards({ obj }) {
  const [volumes, setVolumes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getWishlistVolumes(obj.firebaseKey).then(setVolumes);
  }, [obj]);

  return (
    <Card className="my-2 pt-3 pb-0 px-1 volume-card">
      <Card.Title className="px-3 quickview-card">{obj.title}</Card.Title>
      <ListGroup variant="flush">
        {volumes.map((volume) => (
          <ListGroup.Item key={volume.firebaseKey} className="list-group-flush">{volume.volume_name}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer>
        <Button className="add-link-btn p-0" onClick={() => router.push(`/series/details/${obj.firebaseKey}`)}>Go to series page</Button>
      </Card.Footer>
    </Card>
  );
}

WishlistCards.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};
