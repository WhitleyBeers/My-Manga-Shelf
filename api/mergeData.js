import {
  deleteSeries, getSeriesVolumes, getSingleSeries,
} from './seriesData';
import { deleteVolume, getOwnedVolumes, getWishlistVolumes } from './series_volumeData';

// GET Collection Series Volumes
const viewSeriesCollection = (seriesFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSeries(seriesFirebaseKey), getOwnedVolumes(seriesFirebaseKey)])
    .then(([seriesObject, seriesArray]) => {
      resolve({ ...seriesObject, volumes: seriesArray });
    }).catch((error) => reject(error));
});

// GET Wishlist Series Volumes
const viewSeriesWishlist = (seriesFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSeries(seriesFirebaseKey), getWishlistVolumes(seriesFirebaseKey)])
    .then(([seriesObject, seriesArray]) => {
      resolve({ ...seriesObject, volumes: seriesArray });
    }).catch((error) => reject(error));
});

// DELETE Series Volumes (When a series is deleted, delete all volumes belonging to that series)
const deleteSeriesVolumes = (seriesId) => new Promise((resolve, reject) => {
  getSeriesVolumes(seriesId).then((volumesArray) => {
    const deleteVolumePromises = volumesArray.map((volume) => deleteVolume(volume.firebaseKey));

    Promise.all(deleteVolumePromises).then(() => {
      deleteSeries(seriesId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// GET Series with Owned Volumes
// const getOwnedSeries = (uid) => new Promise((resolve, reject) => {
//   getAllSeries(uid).then((seriesArray) => {
//     const volumes = seriesArray.map((singleSeries) => getOwnedVolumes(singleSeries.firebaseKey));
//     volumes.filter((item) => item.)
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

export {
  viewSeriesCollection, viewSeriesWishlist, deleteSeriesVolumes,
};
