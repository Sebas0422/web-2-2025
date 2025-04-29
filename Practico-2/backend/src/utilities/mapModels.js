export const mapGenre = (genre, includeArtists = false) => ({
  id: genre.id,
  name: genre.name,
  imagePath: genre.imagePath,
  ...(includeArtists && genre.artists
    ? {
        artists: genre.artists.map((artist) => mapArtist(artist)),
      }
    : {}),
});

export const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  photoPath: artist.photoPath,
  genreId: artist.genreId,
});
