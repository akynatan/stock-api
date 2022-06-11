import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthenticated);

categoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.create,
);

categoryRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.update,
);

categoryRouter.delete('/:id', categoryController.delete);

categoryRouter.get('/', categoryController.list);

categoryRouter.get('/:id', categoryController.detail);

export default categoryRouter;
