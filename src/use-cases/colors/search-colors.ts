import { ColorsRepository } from '@/repositories/colors-repository'
import { Color } from '@prisma/client'

interface SearchColorsUseCaseRequest {
  query: string
  page: number
  perPage: number
}

export interface SearchColorsUseCaseResponse {
  colors: Color[]
  count: number
  totalPages: number
}

export class SearchColorsUseCase {
  constructor(private colorsRepository: ColorsRepository) {}

  async execute({
    query,
    page,
    perPage,
  }: SearchColorsUseCaseRequest): Promise<SearchColorsUseCaseResponse> {
    const colors = await this.colorsRepository.searchMany(query, page, perPage)
    const count = await this.colorsRepository.count(query)
    const totalPages = Math.ceil(count / perPage)

    return {
      colors,
      count,
      totalPages,
    }
  }
}
