import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Card, Col, Row,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteVolume, updateVolume } from '../../api/series_volumeData';

// This is used on the SERIES DETAILS page to show which volumes are in the user's wishlist.  There is an extra option to "Add to Shelf" which updates the volume to owned

export default function VolumeWishlistCards({ volumeObj, onUpdate }) {
  const router = useRouter();

  const deleteThisVolume = () => {
    if (window.confirm(`Delete ${volumeObj.volume_name}?`)) {
      deleteVolume(volumeObj.firebaseKey).then(() => onUpdate());
    }
  };

  const addToShelf = () => {
    if (window.confirm(`Add ${volumeObj.volume_name} to your shelf?`)) {
      const payload = { ...volumeObj, isOwned: true };
      updateVolume(payload).then(() => onUpdate());
    }
  };

  return (
    <Card className="volume-card container-fluid my-2">
      <Row>
        <Col xs={5}>
          {volumeObj.volume_name}
        </Col>
        <Col xs={7}>
          <Row>
            <Button className="add-link-btn" onClick={addToShelf}>
              Add to Shelf
            </Button>
          </Row>
          <Row>
            <ButtonGroup>
              <Button
                className="edit-link-btn"
                onClick={() => router.push(`/volumes/edit/${volumeObj.firebaseKey}`)}
              >
                Edit
              </Button>
              <Button className="delete-link-btn" onClick={deleteThisVolume}>
                Delete
              </Button>
            </ButtonGroup>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

VolumeWishlistCards.propTypes = {
  volumeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    volume_name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
