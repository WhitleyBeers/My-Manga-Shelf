import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Card, Col, Row,
} from 'react-bootstrap';
import { deleteVolume, updateVolume } from '../../api/series_volumeData';

export default function VolumeWishlistCards({ volumeObj, onUpdate }) {
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
              <Button className="edit-link-btn">
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
