/* eslint-disable no-useless-escape */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ClientController from '../controllers/ClientController';

const clientsRouter = Router();
const clientController = new ClientController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document: Joi.string()
        .regex(
          /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        )
        .required(),
      tel: Joi.string().allow(null, ''),
      tel2: Joi.string().allow(null, ''),
      city_id: Joi.string().uuid().required(),
      neighborhood: Joi.string().allow(null, ''),
      street: Joi.string().allow(null, ''),
      cep: Joi.string().allow(null, ''),
      number: Joi.string().allow(null, ''),
      complement: Joi.string().allow(null, ''),
      mail: Joi.string().email().allow(null, ''),
      note: Joi.string().allow(null, ''),
    },
  }),
  clientController.create,
);

clientsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document: Joi.string()
        .regex(
          /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        )
        .required(),
      tel: Joi.string().allow(null, ''),
      tel2: Joi.string().allow(null, ''),
      city_id: Joi.string().uuid().required(),
      neighborhood: Joi.string().allow(null, ''),
      street: Joi.string().allow(null, ''),
      cep: Joi.string().allow(null, ''),
      number: Joi.string().allow(null, ''),
      complement: Joi.string().allow(null, ''),
      mail: Joi.string().email().allow(null, ''),
      note: Joi.string().allow(null, ''),
    },
  }),
  clientController.update,
);

clientsRouter.get('/', clientController.index);

clientsRouter.get('/:id', clientController.detail);

clientsRouter.delete('/:id', clientController.delete);

export default clientsRouter;
