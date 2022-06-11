import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/invite',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      company_id: Joi.string().required(),
    },
  }),
  usersController.invite,
);

usersRouter.post(
  '/accept_invite',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  usersController.acceptInvite,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
