import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteVolume } from '../../api/series_volumeData';

// This is used on the SERIES DETAILS page to show which volumes are in the user's collection

export default function VolumeCollectionCards({ volumeObj, onUpdate }) {
  const router = useRouter();

  const deleteThisVolume = () => {
    if (window.confirm(`Delete ${volumeObj.volume_name}?`)) {
      deleteVolume(volumeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="volume-card container-fluid my-2">
      <Row>
        <Col xs={5}>
          {volumeObj.volume_name}
        </Col>
        <Col xs={3}>
          <Button className="edit-link-btn" onClick={() => router.push(`/volumes/edit/${volumeObj.firebaseKey}`)}>
            Edit
          </Button>
        </Col>
        <Col xs={3}>
          <Button className="delete-link-btn" onClick={deleteThisVolume}>
            Delete
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

VolumeCollectionCards.propTypes = {
  volumeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    volume_name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
