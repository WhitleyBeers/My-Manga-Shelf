import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET All Series Volumes by UID
const getAllVolumes = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="uid"&equalTo="${uid}"`, {
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

// GET Single Volume
const getSingleVolume = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume/${firebaseKey}.json"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ownedVolumes = Object.values(data).filter((item) => item.isOwned);
      resolve(ownedVolumes);
    })
    .catch(reject);
});

// VOLUMES IN WISHLIST
const getWishlistVolumes = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/series_volume.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const wishlistVolumes = Object.values(data).filter((item) => item.isOwned === false);
      resolve(wishlistVolumes);
    })
    .catch(reject);
});

export {
  getAllVolumes, getSingleVolume, addVolume, updateVolume, deleteVolume, getOwnedVolumes, getWishlistVolumes,
};
