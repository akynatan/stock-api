import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ModelController from '../controllers/ModelController';

const modelRouter = Router();
const modelController = new ModelController();

modelRouter.use(ensureAuthenticated);

modelRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  modelController.create,
);

modelRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  modelController.update,
);

modelRouter.delete('/:id', modelController.delete);

modelRouter.get('/', modelController.list);

modelRouter.get('/:id', modelController.detail);

export default modelRouter;
