export default interface ICreateOrderDTO {
  date: Date;
  supplier_id: string;
  form_payment?: string;
  its_paid?: boolean;
  total_charged: number;
  invoice?: string;
  other_cost?: number;
  shipment_cost?: number;
  status?: string;
  note?: string;
}
