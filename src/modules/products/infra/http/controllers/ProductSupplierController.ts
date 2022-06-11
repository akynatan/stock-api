import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import UpdateProductSupplierService from '@modules/products/services/UpdateProductSupplierService';
// import CreateProductSupplierService from '@modules/products/services/CreateProductSupplierService';
// import DeleteProductSupplierService from '@modules/products/services/DeleteProductSupplierService';
// import ToggleRestrictionToBuyService from '@modules/products/services/ToggleRestrictionToBuyService';

export default class ProductSupplierController {
  // public async create(request: Request, response: Response): Promise<Response> {
  //   const { supplier_id, product_id, note, sku_supplier } = request.body;
  //   const createProductSupplier = container.resolve(
  //     CreateProductSupplierService,
  //   );
  //   const product = await createProductSupplier.execute({
  //     supplier_id,
  //     product_id,
  //     note,
  //     sku_supplier,
  //   });
  //   return response.json(classToClass(product));
  // }
  // public async update(request: Request, response: Response): Promise<Response> {
  //   const {
  //     product_supplier_id,
  //     supplier_id,
  //     product_id,
  //     note,
  //     sku_supplier,
  //   } = request.body;
  //   const updateProductSupplier = container.resolve(
  //     UpdateProductSupplierService,
  //   );
  //   const product_supplier = await updateProductSupplier.execute({
  //     product_supplier_id,
  //     supplier_id,
  //     product_id,
  //     note,
  //     sku_supplier,
  //   });
  //   return response.json(product_supplier);
  // }
  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { product_supplier_id } = request.body;
  //   const deleteProductSupplier = container.resolve(
  //     DeleteProductSupplierService,
  //   );
  //   const product_supplier = await deleteProductSupplier.execute({
  //     id: product_supplier_id,
  //   });
  //   return response.json(product_supplier);
  // }
  // public async toggleRestrictionToBuy(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const { product_supplier_id } = request.body;
  //   const toggleRestrictionToBuy = container.resolve(
  //     ToggleRestrictionToBuyService,
  //   );
  //   const product_supplier = await toggleRestrictionToBuy.execute({
  //     id: product_supplier_id,
  //   });
  //   return response.json(product_supplier);
  // }
}
