import { Router } from 'express';

import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import companyRouter from '@modules/company/infra/http/routes/company.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productSupplierRouter from '@modules/products/infra/http/routes/product_supplier.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import categoryRouter from '@modules/category/infra/http/routes/category.routes';
import modelRouter from '@modules/model/infra/http/routes/model.routes';
import brandRouter from '@modules/brand/infra/http/routes/brand.routes';
import manufacturerRouter from '@modules/manufacturer/infra/http/routes/manufacturer.routes';
import cityRouter from '@modules/city/infra/http/routes/city.routes';
import stateRouter from '@modules/state/infra/http/routes/state.routes';
import clientRouter from '@modules/client/infra/http/routes/client.routes';

const routes = Router();
routes.use('/suppliers', suppliersRouter);
routes.use('/company', companyRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/product_supplier', productSupplierRouter);
routes.use('/category', categoryRouter);
routes.use('/model', modelRouter);
routes.use('/brand', brandRouter);
routes.use('/manufacturer', manufacturerRouter);
routes.use('/city', cityRouter);
routes.use('/state', stateRouter);
routes.use('/client', clientRouter);

export default routes;
