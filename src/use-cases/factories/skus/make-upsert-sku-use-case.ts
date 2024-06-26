import { PrismaSkusRepository } from "@/repositories/prisma/prisma-skus-repository";
import { UpsertSkuUseCase } from "../../skus/upsert-skus";
import { PrismaColorsRepository } from "@/repositories/prisma/prisma-colors-repository";
import { PrismaSizesRepository } from "@/repositories/prisma/prisma-sizes-repository";

export function makeUpsertSkuUseCase() {
  const skuRepository = new PrismaSkusRepository();
  const colorsRepository = new PrismaColorsRepository();
  const sizesRepository = new PrismaSizesRepository();
  const upsertSkuUseCase = new UpsertSkuUseCase(
    skuRepository,
    colorsRepository,
    sizesRepository,
  );

  return upsertSkuUseCase;
}
