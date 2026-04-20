export default interface ICreateStockMovementDTO {
  product_id: string;
  type: 'entrada' | 'saida';
  quantity: number;
  reason: string;
  supplier_id?: string;
  client_id?: string;
  stock_after: number;
}
