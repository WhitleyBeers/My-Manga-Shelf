import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { addSeries, updateSeries } from '../../api/seriesData';

const initialState = {
  title: '',
  description: '',
  image_url: '',
  genre: '',
  favorite: false,
  status: '',
  firebaseKey: '',
};

export default function SeriesForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.mal_id || obj.firebaseKey) setFormInput(obj);
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
      updateSeries(formInput)
        .then(() => {
          router.back();
        });
    } else {
      const payload = { ...formInput, uid: user.uid };
      addSeries(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSeries(patchPayload).then(() => {
          router.push('/series');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black mt-2">
      <h1 className="text-white">{obj.firebaseKey ? 'Edit' : 'Add' } Series</h1>

      <FloatingLabel controlId="floatingInput1" label="Series Title" className="mb-3">
        <Form.Control
          type="text"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Image Url" className="mb-3">
        <Form.Control
          type="url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Genre" className="mb-3">
        <Form.Control
          type="text"
          name="genre"
          value={formInput.genre}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      <Button type="submit" className="mt-2 mx-1 btn-blue">{obj.firebaseKey ? 'Update' : 'Add'} Series</Button>
      <Button className="mt-2 mx-1 btn-red" onClick={() => router.back()}>Cancel</Button>

    </Form>
  );
}

SeriesForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    genre: PropTypes.string,
    favorite: PropTypes.bool,
    status: PropTypes.string,
    mal_id: PropTypes.string,
  }),
};

SeriesForm.defaultProps = {
  obj: initialState,
};
