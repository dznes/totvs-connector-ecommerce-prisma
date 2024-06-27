import { Decimal, DecimalJsLike } from '@prisma/client/runtime/library'

export function convertToDecimal(
  value: string | number | Decimal | DecimalJsLike,
): Decimal {
  if (value instanceof Decimal) {
    return value // It's already a Decimal, return as is
  } else if (typeof value === 'number' || typeof value === 'string') {
    return new Decimal(value) // Convert number or string to Decimal
  } else {
    // Assuming value is DecimalJsLike and needs conversion
    return new Decimal(value.toString()) // Convert DecimalJsLike to string, then to Decimal
  }
}
