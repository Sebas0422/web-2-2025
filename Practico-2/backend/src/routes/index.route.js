import { ArtistRoutes } from './artist.route.js';
import { GenreRoutes } from './genre.route.js';
import { Router } from 'express';
import { MusicRoutes } from './music.route.js';
import { AlbumRoutes } from './album.route.js';

export default (app) => {
  const router = Router();
  router.use('/genres', GenreRoutes(app));
  router.use('/artists', ArtistRoutes(app));
  router.use('/albums', AlbumRoutes(app));
  router.use('/musics', MusicRoutes(app));
  app.use('/api', router);
};
