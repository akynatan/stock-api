/* eslint-disable no-useless-escape */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import SuppliersController from '../controllers/SuppliersController';
import SupplierLogoController from '../controllers/SupplierLogoController';
import SupplierStatusController from '../controllers/SupplierStatusController';

const upload = multer(uploadConfig.multer);
const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const supplierLogoController = new SupplierLogoController();
const supplierStatusController = new SupplierStatusController();

suppliersRouter.use(ensureAuthenticated);

suppliersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name_social_reason: Joi.string().required(),
      name_fantasy: Joi.string().required(),
      cnpj: Joi.string()
        .regex(
          /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        )
        .required(),
      tel: Joi.string().allow(null, ''),
      tel2: Joi.string().allow(null, ''),
      domain: Joi.string().allow(null, ''),
      city_id: Joi.string().uuid().required(),
      neighborhood: Joi.string().allow(null, ''),
      street: Joi.string().allow(null, ''),
      cep: Joi.string().allow(null, ''),
      number: Joi.string().allow(null, ''),
      complement: Joi.string().allow(null, ''),
      representative_name: Joi.string().allow(null, ''),
      mail: Joi.string().allow(null, ''),
      mail2: Joi.string().allow(null, ''),
      logo: Joi.string().allow(null, ''),
      note: Joi.string().allow(null, ''),
    },
  }),
  suppliersController.create,
);

suppliersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name_social_reason: Joi.string().required(),
      name_fantasy: Joi.string().required(),
      cnpj: Joi.string()
        .regex(
          /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        )
        .required(),
      tel: Joi.string().allow(null, ''),
      tel2: Joi.string().allow(null, ''),
      domain: Joi.string().allow(null, ''),
      city_id: Joi.string().uuid().required(),
      neighborhood: Joi.string().allow(null, ''),
      street: Joi.string().allow(null, ''),
      cep: Joi.string().allow(null, ''),
      number: Joi.string().allow(null, ''),
      complement: Joi.string().allow(null, ''),
      representative_name: Joi.string().allow(null, ''),
      mail: Joi.string().allow(null, ''),
      mail2: Joi.string().allow(null, ''),
      logo: Joi.string().allow(null, ''),
      note: Joi.string().allow(null, ''),
    },
  }),
  suppliersController.update,
);

suppliersRouter.get('/', suppliersController.index);

suppliersRouter.get('/:id', suppliersController.detail);

suppliersRouter.delete('/:id', suppliersController.delete);

suppliersRouter.patch(
  '/:id/logo',
  ensureAuthenticated,
  upload.single('logo'),
  supplierLogoController.update,
);

suppliersRouter.patch(
  '/:id/status',
  ensureAuthenticated,
  supplierStatusController.update,
);

suppliersRouter.get('/products', suppliersController.listProducts);

export default suppliersRouter;
