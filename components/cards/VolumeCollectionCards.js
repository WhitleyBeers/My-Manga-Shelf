import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { deleteVolume } from '../../api/series_volumeData';

export default function VolumeCollectionCards({ volumeObj, onUpdate }) {
  const deleteThisVolume = () => {
    if (window.confirm(`Delete ${volumeObj.volume_name}?`)) {
      deleteVolume(volumeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="container-fluid">
      <Row>
        <Col sm={6}>
          {volumeObj.volume_name}
        </Col>
        <Col sm={3}>
          <Button className="edit-link-btn" />Edit
        </Col>
        <Col sm={3}>
          <Button className="delete-link-btn" onClick={deleteThisVolume} />Delete
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
