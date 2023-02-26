import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET All Series by UID
const getAllSeries = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET Single Series
const getSingleSeries = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series/${firebaseKey}.json"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// ADD A Series
const addSeries = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE Series
const updateSeries = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// DELETE Series
const deleteSeries = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET Series Volumes
const getSeriesVolumes = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="series_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllSeries, getSingleSeries, addSeries, updateSeries, deleteSeries, getSeriesVolumes,
};
