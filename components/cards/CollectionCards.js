import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getOwnedVolumes } from '../../api/series_volumeData';

export default function CollectionCards({ obj }) {
  const [volumes, setVolumes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getOwnedVolumes(obj.firebaseKey).then(setVolumes);
  }, [obj]);

  return (
    <Card className="my-2 pt-3 pb-0 px-1 volume-card">
      <Card.Title className="px-3">{obj.title}</Card.Title>
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

CollectionCards.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};
