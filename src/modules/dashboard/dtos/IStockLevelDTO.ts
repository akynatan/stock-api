export default interface IStockLevelDTO {
  product_id: string;
  product_name: string;
  last_movement_date: string;
  type: 'entrada' | 'saida';
  stock_after: number;
}
