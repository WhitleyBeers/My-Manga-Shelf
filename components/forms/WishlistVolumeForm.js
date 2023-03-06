import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllSeries } from '../../api/seriesData';
import { addVolume, updateVolume } from '../../api/series_volumeData';

const initialState = {
  firebaseKey: '',
  series_id: '',
  volume_name: '',
};

export default function WishlistVolumeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [series, setSeries] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllSeries(user.uid).then(setSeries);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateVolume(formInput)
        .then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid, isOwned: false };
      addVolume(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVolume(patchPayload).then(() => router.back());
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">

      <h1 className="mt-5 text-white">
        {obj.firebaseKey ? 'Update' : 'Add'} Volume
      </h1>

      <FloatingLabel label="Volume Name" className="mb-3">
        <Form.Control
          type="text"
          name="volume_name"
          value={formInput.volume_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Series">
        <Form.Select
          aria-label="Series"
          name="series_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.series_id}
          required
        >
          <option value="">Choose a Series</option>
          {series.map((singleSeries) => (
            <option
              key={singleSeries.firebaseKey}
              value={singleSeries.firebaseKey}
            >{singleSeries.title}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit" className="btn-blue me-1">{obj.firebaseKey ? 'Update' : 'Add'} Volume</Button>
      <Button onClick={() => router.back()} className="btn-red ms-1">Cancel</Button>

    </Form>
  );
}

WishlistVolumeForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    series_id: PropTypes.string,
    volume_name: PropTypes.string,
    uid: PropTypes.string,
    isOwned: PropTypes.bool,
  }),
};

WishlistVolumeForm.defaultProps = {
  obj: initialState,
};
