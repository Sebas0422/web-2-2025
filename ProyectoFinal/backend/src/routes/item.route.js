import { createItem, updateItem, getAllItems, getItemById, deleteItem } from '../controllers/item.controller.js';

import { Router } from 'express';

export const ItemRoutes = () => {
  const router = Router();

  router.post('/', createItem);
  router.get('/', getAllItems);
  router.get('/:id', getItemById);
  router.put('/:id', updateItem);
  router.delete('/:id', deleteItem);

  return router;
};
