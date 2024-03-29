import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;
const controller = new AbortController();
const { signal } = controller;

// GET All Series Volumes by UID
const getAllVolumes = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    signal,
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

// GET Single Volume
const getSingleVolume = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume/${firebaseKey}.json`, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// ADD A Volume
const addVolume = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json`, {
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

// UPDATE Volume
const updateVolume = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume/${payload.firebaseKey}.json`, {
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

// DELETE Volume
const deleteVolume = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// VOLUMES IN COLLECTION
const getOwnedVolumes = (seriesId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="series_id"&equalTo="${seriesId}"`, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ownedVolumes = Object.values(data).filter((item) => item.isOwned);
      const sortedVolumes = ownedVolumes.sort((a, b) => a.volume_name.localeCompare(b.volume_name, 'en', { numeric: true }));
      resolve(sortedVolumes);
    })
    .catch(reject);
});

// VOLUMES IN WISHLIST
const getWishlistVolumes = (seriesId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="series_id"&equalTo="${seriesId}"`, {
    method: 'GET',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const wishlistVolumes = Object.values(data).filter((item) => item.isOwned === false);
      const sortedVolumes = wishlistVolumes.sort((a, b) => a.volume_name.localeCompare(b.volume_name, 'en', { numeric: true }));
      resolve(sortedVolumes);
    })
    .catch(reject);
});

export {
  getAllVolumes, getSingleVolume, addVolume, updateVolume, deleteVolume, getOwnedVolumes, getWishlistVolumes,
};
