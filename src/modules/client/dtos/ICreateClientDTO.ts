export default interface ICreateClientDTO {
  name: string;
  document: string;
  tel?: string;
  tel2?: string;
  city_id: string;
  neighborhood?: string;
  street?: string;
  cep?: string;
  number?: string;
  complement?: string;
  mail?: string;
  note?: string;
}
