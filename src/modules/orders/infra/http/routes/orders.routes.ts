import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date(),
      supplier_id: Joi.string().uuid().required(),
      form_payment: Joi.string(),
      its_paid: Joi.boolean(),
      total_charged: Joi.number(),
      status: Joi.string(),
      other_cost: Joi.number(),
      shipment_cost: Joi.number(),
      invoice: Joi.string(),
      note: Joi.string(),
    },
  }),
  ordersController.create,
);

ordersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().uuid().required(),
      supplier_id: Joi.string().uuid().required(),
      date: Joi.date(),
      invoice: Joi.string().allow(null, ''),
      note: Joi.string().allow(null, ''),
      other_cost: Joi.number(),
      shipment_cost: Joi.number(),
      form_payment: Joi.string(),
      its_paid: Joi.boolean(),
      total_charged: Joi.number(),
      status: Joi.string(),
      sub_total: Joi.number(),
      products: Joi.array(),
    },
  }),
  ordersController.update,
);

ordersRouter.delete('/', ordersController.delete);

ordersRouter.get('/', ordersController.index);

ordersRouter.get('/detail', ordersController.detail);

ordersRouter.get('/products', ordersController.products);

ordersRouter.get('/by_supplier', ordersController.ordersBySupplier);

export default ordersRouter;
