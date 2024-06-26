import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListSkusUseCase } from "@/use-cases/factories/skus/make-list-skus-use-case";

export async function listSkus(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listSkusUseCase = makeListSkusUseCase();

    const sku = await listSkusUseCase.execute();
    return reply.status(201).send({ sku });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
    // return reply.status(500).send() // FIX ME
    throw err;
  }
}
