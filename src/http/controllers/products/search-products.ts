import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSearchProductsUseCase } from '@/use-cases/factories/products/make-search-products-use-case';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchProductsQuerySchema = z.object({
    q: z.string(),
    productCode: z.string().default(''),
    integrationCode: z.string().default(''),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(21),
  });

  const { q, productCode, integrationCode, page, perPage } = searchProductsQuerySchema.parse(request.query);

  const searchProductsUseCase = makeSearchProductsUseCase();

  const { products, count, totalPages } = await searchProductsUseCase.execute({
    query: q,
    productCode,
    integrationCode,
    page,
    perPage,
  });

  // Define the custom order for the sizes
  const sizeOrder = ["PP", "P", "M", "G", "GG", "UN", "U", "36", "38", "40", "42", "44"];

  // Sort the SKUs within each product by color.title, then by size.title according to sizeOrder
  products.forEach(product => {
    product.skus.sort((a, b) => {
      // First, compare by color title
      const colorComparison = a.color.title.localeCompare(b.color.title);
      if (colorComparison !== 0) {
        return colorComparison;
      }

      // Then, compare by size title using the custom order
      const aSizeIndex = sizeOrder.indexOf(a.size.title);
      const bSizeIndex = sizeOrder.indexOf(b.size.title);

      // If size is not found in sizeOrder, consider it as larger
      if (aSizeIndex === -1) return 1;
      if (bSizeIndex === -1) return -1;

      return aSizeIndex - bSizeIndex;
    });
  });

  return reply.status(200).send({
    products,
    count,
    perPage,
    totalPages,
  });
}
