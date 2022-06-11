import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ManufacturerController from '../controllers/ManufacturerController';

const manufacturerRouter = Router();
const manufacturerController = new ManufacturerController();

manufacturerRouter.use(ensureAuthenticated);

manufacturerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  manufacturerController.create,
);

manufacturerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  manufacturerController.update,
);

manufacturerRouter.delete('/:id', manufacturerController.delete);

manufacturerRouter.get('/', manufacturerController.list);

manufacturerRouter.get('/:id', manufacturerController.detail);

export default manufacturerRouter;
