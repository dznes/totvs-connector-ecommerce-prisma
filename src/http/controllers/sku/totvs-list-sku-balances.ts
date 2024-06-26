import { fetchToken, getProductBalances } from "@/http/lib/totvs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function totvsListSkuBalances(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    search: z.record(z.string(), z.string()).optional(),
  });

  try {
    const token = await fetchToken();
    const { page, pageSize, search } = querySchema.parse(request.query);
    const offset = (page - 1) * pageSize;

    const balances = await getProductBalances({
      token: token.access_token,
      page,
      pageSize,
    });

    console.log(balances);

    return reply.status(200).send({ data: balances, page, pageSize });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
