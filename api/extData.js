// import { clientCredentials } from '../utils/client';

const dbUrl = 'https://api.mangadex.org/';
// const clientId = clientCredentials.malClientId;

const getMangaInformation = (query) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/manga?title=${query}&includes[]=cover_art`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data.data)))
    .catch(reject);
});

export default getMangaInformation;
