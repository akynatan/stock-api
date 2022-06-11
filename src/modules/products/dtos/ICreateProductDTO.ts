export default interface ICreateProductDTO {
  name: string;
  code: string;
  description?: string;
  brand_id?: string;
  model_id?: string;
  category_id?: string;
  manufacturer_id?: string;
  image?: string;
  measure_unit:
    | 'T'
    | 'KG'
    | 'G'
    | 'MG'
    | 'M³'
    | 'DM³'
    | 'CM³'
    | 'KM'
    | 'M'
    | 'CM'
    | 'DM'
    | 'MM';
}
