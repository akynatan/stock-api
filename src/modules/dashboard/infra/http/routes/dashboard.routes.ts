import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.use(ensureAuthenticated);

dashboardRouter.get(
  '/stock-levels',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
    },
  }),
  dashboardController.stockLevels,
);

dashboardRouter.get('/zero-stock', dashboardController.zeroStock);

dashboardRouter.get(
  '/movements-summary',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
    },
  }),
  dashboardController.movementsSummary,
);

dashboardRouter.get('/entries-by-supplier', dashboardController.entriesBySupplier);

dashboardRouter.get('/exits-by-client', dashboardController.exitsByClient);

export default dashboardRouter;
