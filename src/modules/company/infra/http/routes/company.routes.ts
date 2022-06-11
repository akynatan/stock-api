import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompanysController from '../controllers/CompanyController';

const companysRouter = Router();
const companysController = new CompanysController();

companysRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      token_hubspot: Joi.string().required(),
      token_amazon: Joi.string().required(),
    },
  }),
  companysController.create,
);

companysRouter.get('/', companysController.index);

export default companysRouter;
