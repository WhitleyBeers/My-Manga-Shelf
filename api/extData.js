const dbUrl = 'https://api.jikan.moe/v4/manga';

const getMangaInformation = (query) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}?q=${query}&genres_exclude=12&order_by="title"`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data.data)))
    .catch(reject);
});

export default getMangaInformation;
