import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsOrderController from '../controllers/ProductsOrderController';

const upload = multer(uploadConfig.multer);
const productsOrderRouter = Router();
const productsOrderController = new ProductsOrderController();

productsOrderRouter.use(ensureAuthenticated);

productsOrderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      order_id: Joi.string().uuid().required(),
      unit_price: Joi.number(),
      qtd: Joi.number(),
      other_cost: Joi.number(),
      note: Joi.string(),
    },
  }),
  productsOrderController.create,
);

productsOrderRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array(),
    },
  }),
  productsOrderController.update,
);

productsOrderRouter.get('/', productsOrderController.index);

productsOrderRouter.delete('/', productsOrderController.delete);

productsOrderRouter.get('/detail', productsOrderController.detail);

productsOrderRouter.post(
  '/upload',
  ensureAuthenticated,
  upload.single('products'),
  productsOrderController.uploadProducts,
);

export default productsOrderRouter;
