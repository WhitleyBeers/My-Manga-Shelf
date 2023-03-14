const dbUrl = 'https://api.jikan.moe/v4';

const getMangaInformation = (query) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/manga?q=${query}&genres_exclude=12&order_by="title"`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data.data)))
    .catch(reject);
});

const getMangaById = (malId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/manga/${malId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const manga = {
        mal_id: malId,
        title: data.data.title,
        description: data.data.synopsis,
        image_url: data.data.images.jpg.image_url,
        favorite: false,
        genre: data.data.genres.map((genre) => genre.name).join('/'),
      };
      return manga.then(resolve(manga));
    })
    .catch(reject);
});

const getMangaRecommendation = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/manga/${id}/recommendations`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data.data)))
    .catch(reject);
});

export { getMangaInformation, getMangaById, getMangaRecommendation };
