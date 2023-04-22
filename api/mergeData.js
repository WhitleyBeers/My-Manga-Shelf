import {
  deleteSeries, getAllSeries, getSeriesVolumes, getSingleSeries,
} from './seriesData';
import { deleteVolume, getOwnedVolumes, getWishlistVolumes } from './series_volumeData';

// GET Collection Series Volumes
const viewSeriesCollection = (seriesFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSeries(seriesFirebaseKey), getOwnedVolumes(seriesFirebaseKey)])
    .then(([seriesObject, volumeArray]) => {
      resolve({ ...seriesObject, volumes: volumeArray });
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

// Gets series whose FBkey matches the series_id of volumes, filters out series that do not have volumes in the collection
const getCollectionQuickview = (uid) => new Promise((resolve, reject) => {
  getAllSeries(uid).then((seriesArray) => {
    const filteredSeries = seriesArray.map((item) => viewSeriesCollection(item.firebaseKey));
    Promise.all(filteredSeries).then((filteredArray) => {
      const blob = filteredArray.filter((item) => item.volumes.length > 0);
      resolve(blob);
    });
  }).catch((error) => reject(error));
});

// Gets series whose FBkey matches the series_id of volumes, filters out series that do not have volumes in the wishlist
const getWishlistQuickview = (uid) => new Promise((resolve, reject) => {
  getAllSeries(uid).then((seriesArray) => {
    const filteredSeries = seriesArray.map((item) => viewSeriesWishlist(item.firebaseKey));
    Promise.all(filteredSeries).then((filteredArray) => {
      const blob = filteredArray.filter((item) => item.volumes.length > 0);
      resolve(blob);
    });
  }).catch((error) => reject(error));
});

export {
  viewSeriesCollection, viewSeriesWishlist, deleteSeriesVolumes, getCollectionQuickview, getWishlistQuickview,
};
