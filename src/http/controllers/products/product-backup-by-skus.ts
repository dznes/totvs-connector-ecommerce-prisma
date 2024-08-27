import { FastifyReply, FastifyRequest } from 'fastify';
import { Slug } from '@/core/entities/value-objects/slug'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'


export async function productBackupBySkus(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await prisma.sku.findMany({
        select: {
          reference_id: true,
          code: true,
          ncm: true,
          reference_name: true,
          cost: true,
          price_wholesale: true,
          price_retail: true,
          integration_code: true,
          is_finished_product: true,
        },
        where: {
          is_finished_product: true,
        },
        orderBy: {
          reference_id: 'asc',
        },
      })
  
      const groupedSkus = products.reduce(
        (acc, sku) => {
          const {
            reference_id,
            code,
            ncm,
            reference_name,
            cost,
            price_wholesale,
            price_retail,
            integration_code,
          } = sku
          if (reference_id && reference_name && ncm) {
            if (!acc[reference_id]) {
              acc[reference_id] = {
                reference_id,
                title: reference_name,
                slug: Slug.createFromText(reference_name + '-' + reference_id)
                  .value,
                ncm,
                cost: cost instanceof Decimal ? cost.toNumber() : cost,
                price_wholesale:
                  price_wholesale instanceof Decimal
                    ? price_wholesale.toNumber()
                    : price_wholesale,
                price_retail:
                  price_retail instanceof Decimal
                    ? price_retail.toNumber()
                    : price_retail,
                integration_code,
                skus: [],
              }
            }
            acc[reference_id].skus.push(code)
          }
          return acc
        },
        {} as Record<
          string,
          {
            reference_id: string
            title: string
            slug: string
            skus: string[]
            ncm: string
            cost: number | null
            price_wholesale: number | null
            price_retail: number | null
            integration_code: string | null
          }
        >,
      )
  
      const productsList = Object.values(groupedSkus)
      await Promise.all(productsList.map(async (product) => {
        const productExists = await prisma.product.findUnique({
          where: {
            code: product.reference_id,
          },
        })
  
        if (productExists) {
          await prisma.product.update({
            data: {
              code: product.reference_id,
              ncm: product.ncm,
              title: product.title,
              cost: product.cost ?? 0,
              price_retail: product.price_retail ?? 0,
              price_wholesale: product.price_wholesale ?? 0,
              integration_code: product.integration_code,
              skus: {
                connect: product.skus.map((sku) => ({ code: sku })),
              },
            },
            where: {
              code: product.reference_id,
            },
          })
        } else {
          await prisma.product.create({
            data: {
              code: product.reference_id,
              ncm: product.ncm,
              title: product.title,
              slug: product.slug,
              cost: product.cost ?? 0,
              price_retail: product.price_retail ?? 0,
              price_wholesale: product.price_wholesale ?? 0,
              integration_code: product.integration_code,
              skus: {
                connect: product.skus.map((sku) => ({ code: sku })),
              },
            },
          })
        }
      }))
  
      return reply.status(200).send({});
    } catch (error) {
      console.error("Error during product backup:", error);
      return reply.status(500).send({ error: "An error occurred while backing up products." });
    }
  }
  