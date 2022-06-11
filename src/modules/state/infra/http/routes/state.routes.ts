import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StateController from '../controllers/StateController';

const stateRouter = Router();
const stateController = new StateController();

stateRouter.use(ensureAuthenticated);

stateRouter.get('/', stateController.list);

stateRouter.get('/:id', stateController.detail);

export default stateRouter;
