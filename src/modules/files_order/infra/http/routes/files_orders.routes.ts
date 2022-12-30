import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '@config/upload';

import FilesOrdersController from '../controllers/FilesOrdersController';

const filesOrdersRouter = Router();
const upload = multer(uploadConfig.multer);
const filesOrdersController = new FilesOrdersController();

filesOrdersRouter.use(ensureAuthenticated);

filesOrdersRouter.post(
  '/',
  upload.single('file'),
  filesOrdersController.create,
);

filesOrdersRouter.delete('/', filesOrdersController.delete);

filesOrdersRouter.get('/', ensureAuthenticated, filesOrdersController.index);

export default filesOrdersRouter;
