import { FastifyInstance } from "fastify";
import { ListOrders } from "./totvs-list-orders";

export async function OrderRoutes(app: FastifyInstance) {
  app.get("/totvs/orders", ListOrders);
}
