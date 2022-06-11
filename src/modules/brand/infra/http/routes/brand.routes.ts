import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BrandController from '../controllers/BrandController';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.use(ensureAuthenticated);

brandRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandController.create,
);

brandRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandController.update,
);

brandRouter.delete('/:id', brandController.delete);

brandRouter.get('/', brandController.list);

brandRouter.get('/:id', brandController.detail);

export default brandRouter;
