import 'reflect-metadata';
import * as fc from 'fast-check';
import * as typeorm from 'typeorm';

import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import IClientRepository from '@modules/client/repositories/IClientRepository';
import IStockMovementsRepository from '../../repositories/IStockMovementsRepository';
import StockMovement from '../../infra/typeorm/entities/StockMovement';
import CreateStockMovementService from '../CreateStockMovementService';

// Mock typeorm's getManager
jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    getManager: jest.fn(),
  };
});

describe('CreateStockMovementService - Property Tests', () => {
  let service: CreateStockMovementService;
  let mockStockMovementsRepository: jest.Mocked<IStockMovementsRepository>;
  let mockProductsRepository: jest.Mocked<IProductsRepository>;
  let mockSuppliersRepository: jest.Mocked<ISuppliersRepository>;
  let mockClientRepository: jest.Mocked<IClientRepository>;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    mockStockMovementsRepository = {
      create: jest.fn(),
      findByProductId: jest.fn(),
    };

    mockProductsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findByID: jest.fn(),
      findByCode: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    mockSuppliersRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByID: jest.fn(),
      findByCNPJ: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockClientRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByID: jest.fn(),
      findByDocument: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    fakeCacheProvider = new FakeCacheProvider();

    service = new CreateStockMovementService(
      mockStockMovementsRepository,
      mockProductsRepository,
      mockSuppliersRepository,
      mockClientRepository,
      fakeCacheProvider,
    );
  });

  /**
   * Property 1: Entry movements always increment current_stock by exactly the quantity
   * For any valid product with current_stock = S and entry movement with quantity = Q,
   * after processing current_stock === S + Q
   *
   * **Validates: Requirements 1.1, 1.4, 6.2**
   */
  it('should always increment current_stock by exactly the quantity for entry movements', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.nat({ max: 10000 }),  // S: initial stock (>= 0)
        fc.integer({ min: 1, max: 10000 }),  // Q: quantity (> 0)
        async (initialStock, quantity) => {
          // Track the product state through the transaction
          let savedProductStock: number | undefined;
          let createdMovement: Partial<StockMovement> | undefined;

          const product = new Product();
          product.id = 'product-uuid';
          product.current_stock = initialStock;

          // Mock supplier exists
          mockSuppliersRepository.findByID.mockResolvedValue({
            id: 'supplier-uuid',
          } as any);

          // Mock getManager().transaction() to execute the callback
          const mockTransactionalEntityManager = {
            findOne: jest.fn().mockResolvedValue(product),
            create: jest.fn().mockImplementation((_entity, data) => {
              createdMovement = data;
              return data;
            }),
            save: jest.fn().mockImplementation(async (entity: any) => {
              // Capture the product's current_stock when it's saved
              if (entity.current_stock !== undefined && entity.id === 'product-uuid') {
                savedProductStock = entity.current_stock;
              }
              return entity;
            }),
          };

          (typeorm.getManager as jest.Mock).mockReturnValue({
            transaction: jest.fn().mockImplementation(async (cb: Function) => {
              return cb(mockTransactionalEntityManager);
            }),
          });

          await service.execute({
            product_id: 'product-uuid',
            type: 'entrada',
            quantity,
            reason: 'test entry',
            supplier_id: 'supplier-uuid',
          });

          // Property: current_stock after = S + Q
          expect(savedProductStock).toBe(initialStock + quantity);

          // Property: stock_after on the movement record equals S + Q
          expect(createdMovement?.stock_after).toBe(initialStock + quantity);
        },
      ),
      { numRuns: 100 },
    );
  });

  /**
   * Property 2: Exit movements always decrement current_stock by exactly the quantity
   * For any valid product with current_stock = S >= Q and exit movement with quantity = Q,
   * after processing current_stock === S - Q
   *
   * **Validates: Requirements 2.1, 2.4, 6.2**
   */
  it('should always decrement current_stock by exactly the quantity for exit movements', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 10000 }),  // S: initial stock (>= 1)
        fc.integer({ min: 1, max: 10000 }),  // raw Q value
        async (initialStock, rawQuantity) => {
          // Ensure Q <= S so the exit is valid
          const quantity = Math.min(rawQuantity, initialStock);

          // Track the product state through the transaction
          let savedProductStock: number | undefined;
          let createdMovement: Partial<StockMovement> | undefined;

          const product = new Product();
          product.id = 'product-uuid';
          product.current_stock = initialStock;

          // Mock client exists (exit movements require client_id)
          mockClientRepository.findByID.mockResolvedValue({
            id: 'client-uuid',
          } as any);

          // Mock getManager().transaction() to execute the callback
          const mockTransactionalEntityManager = {
            findOne: jest.fn().mockResolvedValue(product),
            create: jest.fn().mockImplementation((_entity, data) => {
              createdMovement = data;
              return data;
            }),
            save: jest.fn().mockImplementation(async (entity: any) => {
              // Capture the product's current_stock when it's saved
              if (entity.current_stock !== undefined && entity.id === 'product-uuid') {
                savedProductStock = entity.current_stock;
              }
              return entity;
            }),
          };

          (typeorm.getManager as jest.Mock).mockReturnValue({
            transaction: jest.fn().mockImplementation(async (cb: Function) => {
              return cb(mockTransactionalEntityManager);
            }),
          });

          await service.execute({
            product_id: 'product-uuid',
            type: 'saida',
            quantity,
            reason: 'test exit',
            client_id: 'client-uuid',
          });

          // Property: current_stock after = S - Q
          expect(savedProductStock).toBe(initialStock - quantity);

          // Property: stock_after on the movement record equals S - Q
          expect(createdMovement?.stock_after).toBe(initialStock - quantity);
        },
      ),
      { numRuns: 100 },
    );
  });
});
