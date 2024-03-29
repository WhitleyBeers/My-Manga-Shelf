import React, { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addVolume, updateVolume } from '../../api/series_volumeData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  volume_name: '',
  isOwned: false,
};

// QUICK ADD a volume from the series page, automatically assigns the series FBkey to the volume

export default function AddVolumeModal({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, series_id: obj.firebaseKey, uid: user.uid,
    };
    addVolume(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateVolume(patchPayload)
        .then(handleClose)
        .then(setFormInput(initialState))
        .then(onUpdate);
    });
  };

  return (
    <>
      <Button className="btn-blue py-1" onClick={handleOpen}>
        Quick Add Volume
      </Button>
      <Modal show={show} onHide={handleClose} className="text-black">
        <Modal.Title className="text-center mt-1">Add a Volume to {obj.title}</Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Volume Name" className="mb-3">
              <Form.Control type="text" name="volume_name" value={formInput.volume_name} onChange={handleChange} required />
            </FloatingLabel>
            <Form.Check
              type="switch"
              className="mb-3"
              id="isOwned"
              name="isOwned"
              label="Do you have this volume?"
              checked={formInput.isOwned}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  isOwned: e.target.checked,
                }));
              }}
            />
            <Button type="submit" className="btn-blue me-1">
              Add Volume
            </Button>
            <Button onClick={handleClose} className="btn-red ms-1">
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

AddVolumeModal.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
