import { PrismaSizesRepository } from '@/repositories/prisma/prisma-sizes-repository'
import { SearchSizesUseCase } from '@/use-cases/sizes/search-sizes'

export function makeSearchSizesUseCase() {
  const sizesRepository = new PrismaSizesRepository()
  const useCase = new SearchSizesUseCase(sizesRepository)

  return useCase
}
