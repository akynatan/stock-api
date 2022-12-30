export default interface ICreateProductsOrderDTO {
  product_supplier_id: string;
  order_id: string;
  unit_price?: number;
  qtd?: number;
  other_cost?: number;
  note?: string;
}
