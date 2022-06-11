import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CityController from '../controllers/CityController';

const cityRouter = Router();
const cityController = new CityController();

cityRouter.use(ensureAuthenticated);

cityRouter.get('/', cityController.list);

cityRouter.get('/:id', cityController.detail);

export default cityRouter;
