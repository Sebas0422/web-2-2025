class Genre {
  constructor({ id = null, name = '', imagePath = '', artists = [] } = {}) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.artists = artists;
  }
}

export default Genre;
