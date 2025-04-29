export const Artist = ({ artist }) => {
  return (
    <div className="artist">
      <img src={artist.photoPath} alt={artist.name} />
      <h2>{artist.name}</h2>
      <p>Genre: {artist.genreId}</p>
    </div>
  );
}