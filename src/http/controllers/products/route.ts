import { Slug } from '@/core/entities/value-objects/slug';
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { FastifyInstance } from 'fastify'

export async function ProductRoutes(app: FastifyInstance) {
    app.get('/products', async (request, reply) => {
        const products = await prisma.sku.findMany({
          select: {
            reference_id: true,
            code: true,
            ncm: true,
            reference_name: true,
            cost: true,
            price_wholesale: true,
            price_retail: true,
            is_finished_product: true,
          },
          where: {
            is_finished_product: true,
            product_id: null, // This ensures that only SKUs with no related products are fetched

          },
          orderBy: {
            reference_id: 'asc',
          },
        });
    
    const groupedSkus = products.reduce((acc, sku) => {
        const { reference_id, code, ncm, reference_name, cost, price_wholesale, price_retail } = sku;
        if (reference_id) {  // Filter out null reference_id
            if (!acc[reference_id]) {
            acc[reference_id] = {
                reference_id,
                title: reference_name,
                slug: Slug.createFromText(reference_name +"-"+ reference_id).value,
                ncm,
                cost: cost instanceof Decimal ? cost.toNumber() : cost,
                price_wholesale: price_wholesale instanceof Decimal ? price_wholesale.toNumber() : price_wholesale,
                price_retail: price_retail instanceof Decimal ? price_retail.toNumber() : price_retail,
                skus: [],
            };
            }
            acc[reference_id].skus.push(code);
        }
        return acc;
    }, {} as Record<string, { reference_id: string, title: string | null, slug: string | null, skus: string[], ncm: string | null, cost: number | null, price_wholesale: number | null, price_retail: number | null }>);

    reply.send(Object.values(groupedSkus));
    });
}
