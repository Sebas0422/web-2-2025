import { sequelize } from '../config/db.config.js';
import defineGenre from './Genre.js';
import defineArtist from './Artist.js';
import defineAlbum from './Album.js';
import defineMusic from './Music.js';

const Genre = defineGenre(sequelize);
const Artist = defineArtist(sequelize);
const Album = defineAlbum(sequelize);
const Music = defineMusic(sequelize);

Genre.hasMany(Artist, { foreignKey: 'genreId', as: 'artists' });
Artist.belongsTo(Genre, { foreignKey: 'genreId', as: 'genre' });

Artist.hasMany(Album, { foreignKey: 'artistId' });
Album.belongsTo(Artist, { foreignKey: 'artistId' });

Album.hasMany(Music, { foreignKey: 'albumId' });
Music.belongsTo(Album, { foreignKey: 'albumId' });

export { Genre, Artist, Album, Music };
