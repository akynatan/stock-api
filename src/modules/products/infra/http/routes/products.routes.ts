import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';
import ProductImageController from '../controllers/ProductImageController';

const upload = multer(uploadConfig.multer);
const productsRouter = Router();
const productsController = new ProductsController();
const productImageController = new ProductImageController();

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      code: Joi.string().required(),
      description: Joi.string().allow(null, ''),
      brand_id: Joi.string().required(),
      model_id: Joi.string().required(),
      category_id: Joi.string().required(),
      manufacturer_id: Joi.string().required(),
      measure_unit: Joi.string()
        .allow(
          'T',
          'KG',
          'G',
          'MG',
          'M³',
          'DM³',
          'CM³',
          'KM',
          'M',
          'CM',
          'DM',
          'MM',
        )
        .required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      code: Joi.string().required(),
      description: Joi.string().allow(null, ''),
      brand_id: Joi.string().allow(null).uuid(),
      model_id: Joi.string().allow(null).uuid(),
      category_id: Joi.string().allow(null).uuid(),
      manufacturer_id: Joi.string().allow(null).uuid(),
      new_brand: Joi.string().allow(null, ''),
      new_model: Joi.string().allow(null, ''),
      new_category: Joi.string().allow(null, ''),
      new_manufacturer: Joi.string().allow(null, ''),
      measure_unit: Joi.string()
        .allow(
          'T',
          'KG',
          'G',
          'MG',
          'M³',
          'DM³',
          'CM³',
          'KM',
          'M',
          'CM',
          'DM',
          'MM',
        )
        .required(),
    },
  }),
  productsController.update,
);

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', productsController.detailProduct);

productsRouter.delete('/:id', productsController.delete);

productsRouter.patch(
  '/:id/image',
  ensureAuthenticated,
  upload.single('image'),
  productImageController.update,
);

export default productsRouter;
