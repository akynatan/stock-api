import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductSupplierController from '../controllers/ProductSupplierController';

const productSupplierRouter = Router();
const productSupplierController = new ProductSupplierController();

productSupplierRouter.use(ensureAuthenticated);

// productSupplierRouter.put(
//   '/alter_supplier',
//   celebrate({
//     [Segments.BODY]: {
//       product_supplier_id: Joi.string().required(),
//       new_supplier_id: Joi.string().required(),
//     },
//   }),
//   productSupplierController.update,
// );

// productSupplierRouter.post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       supplier_id: Joi.string().required(),
//       product_id: Joi.string().required(),
//       restriction_to_buy: Joi.boolean(),
//       sku_supplier: Joi.string(),
//       note: Joi.string(),
//     },
//   }),
//   productSupplierController.create,
// );

// productSupplierRouter.put(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       product_supplier_id: Joi.string().required(),
//       supplier_id: Joi.string().required(),
//       product_id: Joi.string().required(),
//       sku_supplier: Joi.string().allow(null, ''),
//       note: Joi.string().allow(null, ''),
//     },
//   }),
//   productSupplierController.update,
// );

// productSupplierRouter.patch(
//   '/toggle_restriction_buy',
//   celebrate({
//     [Segments.BODY]: {
//       product_supplier_id: Joi.string().required(),
//     },
//   }),
//   productSupplierController.toggleRestrictionToBuy,
// );

// productSupplierRouter.delete(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       product_supplier_id: Joi.string().required(),
//     },
//   }),
//   productSupplierController.delete,
// );

export default productSupplierRouter;
