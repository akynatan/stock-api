/**
 * Gera um código único com prefixo e 6 dígitos numéricos.
 * Formato: PRD-000001, CLI-000001, FRN-000001
 */
export default function generateCode(prefix: string): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  const digits = (timestamp.slice(-3) + random).slice(0, 6);
  return `${prefix}${digits}`;
}
