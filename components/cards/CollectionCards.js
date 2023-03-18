import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, Button, ListGroup,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getOwnedVolumes } from '../../api/series_volumeData';

export default function CollectionCards({ obj }) {
  const [volumes, setVolumes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getOwnedVolumes(obj.firebaseKey).then(setVolumes);
  }, [obj]);

  return (
    <>
      <Accordion className="my-3" flush>
        <Accordion.Header className="px-3 quickview-card">{obj.title}</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {volumes.map((volume) => (
              <ListGroup.Item key={volume.firebaseKey} className="list-group-flush">{volume.volume_name}</ListGroup.Item>
            ))}
            <ListGroup.Item className="list-group-flush">
              <Button className="add-link-btn p-0" onClick={() => router.push(`/series/details/${obj.firebaseKey}`)}>Go to series page</Button>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion>
    </>
  );
}

CollectionCards.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};
