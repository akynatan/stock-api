import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StockMovementsController from '../controllers/StockMovementsController';

const stockMovementsRouter = Router();
const stockMovementsController = new StockMovementsController();

stockMovementsRouter.use(ensureAuthenticated);

stockMovementsRouter.get('/', stockMovementsController.listAll);

stockMovementsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      type: Joi.string().valid('entrada', 'saida').required(),
      quantity: Joi.number().greater(0).required(),
      reason: Joi.string().required(),
      supplier_id: Joi.string().uuid(),
      client_id: Joi.string().uuid(),
    },
  }),
  stockMovementsController.create,
);

stockMovementsRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  stockMovementsController.index,
);

export default stockMovementsRouter;
