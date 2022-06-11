import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import ProductSupplierRepository from '@modules/products/infra/typeorm/repositories/ProductSupplierRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import CategoryRepository from '@modules/category/infra/typeorm/repositories/CategoryRepository';

import IModelRepository from '@modules/model/repositories/IModelRepository';
import ModelRepository from '@modules/model/infra/typeorm/repositories/ModelRepository';

import IBrandRepository from '@modules/brand/repositories/IBrandRepository';
import BrandRepository from '@modules/brand/infra/typeorm/repositories/BrandRepository';

import IManufacturerRepository from '@modules/manufacturer/repositories/IManufacturerRepository';
import ManufacturerRepository from '@modules/manufacturer/infra/typeorm/repositories/ManufacturerRepository';

import ICityRepository from '@modules/city/repositories/ICityRepository';
import CityRepository from '@modules/city/infra/typeorm/repositories/CityRepository';

import StateRepository from '@modules/state/infra/typeorm/repositories/StateRepository';
import IStateRepository from '@modules/state/repositories/IStateRepository';

import ClientRepository from '@modules/client/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/client/repositories/IClientRepository';

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);

container.registerSingleton<ICompanyRepository>(
  'ShopsRepository',
  CompanyRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductSupplierRepository>(
  'ProductSupplierRepository',
  ProductSupplierRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IModelRepository>(
  'ModelRepository',
  ModelRepository,
);

container.registerSingleton<IBrandRepository>(
  'BrandRepository',
  BrandRepository,
);

container.registerSingleton<IBrandRepository>(
  'BrandRepository',
  BrandRepository,
);

container.registerSingleton<IManufacturerRepository>(
  'ManufacturerRepository',
  ManufacturerRepository,
);

container.registerSingleton<ICityRepository>('CityRepository', CityRepository);

container.registerSingleton<IStateRepository>(
  'StateRepository',
  StateRepository,
);

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);
