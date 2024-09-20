import {
  ClassificationsRepository,
} from '@/repositories/classifications-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ProductsRepository, ProductWithSkuAndVariants } from '@/repositories/products-repository'

interface SearchProductsByClassificationSlugUseCaseRequest {
  classificationSlug: string
  query: string
  page: number
  perPage: number
}

interface SearchProductsByClassificationSlugUseCaseResponse {
  products: ProductWithSkuAndVariants[]
  count: number
  totalPages: number
}

export class SearchProductsByClassificationSlugUseCase {
  constructor(
    private classificationsRepository: ClassificationsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    classificationSlug,
    query,
    page,
    perPage,
  }: SearchProductsByClassificationSlugUseCaseRequest): Promise<SearchProductsByClassificationSlugUseCaseResponse> {
    const classification = await this.classificationsRepository.findBySlug(classificationSlug)

    if (!classification) {
      throw new ResourceNotFoundError()
    }
    const products = await this.productsRepository.searchProductsByClassificationId(
      classification.id,
      query,
      page,
      perPage,
    )

    const count = await this.productsRepository.countProductsByClassificationId(
      classification.id,
    )
    const totalPages = Math.ceil(count / perPage)

    // Define the custom order for the sizes
    const sizeOrder = [
      'PP',
      'P',
      'M',
      'G',
      'GG',
      'UN',
      'U',
      '36',
      '38',
      '40',
      '42',
      '44',
    ]

    // Process each product
    const productsWithColorsAndSizes = products.map((product) => {
      // Sort the SKUs within each product by color.title, then by size.title according to sizeOrder
      product.skus.sort((a, b) => {
        // First, compare by color title
        const colorComparison = a.color.title.localeCompare(b.color.title)
        if (colorComparison !== 0) {
          return colorComparison
        }

        // Then, compare by size title using the custom order
        const aSizeIndex = sizeOrder.indexOf(a.size.title)
        const bSizeIndex = sizeOrder.indexOf(b.size.title)

        // If size is not found in sizeOrder, consider it as larger
        if (aSizeIndex === -1) return 1
        if (bSizeIndex === -1) return -1

        return aSizeIndex - bSizeIndex
      })

      // Extract and deduplicate colors
      const colorsRepetition = product.skus.map((sku) => sku.color)
      const colors = [
        ...new Map(colorsRepetition.map((obj) => [obj.id, obj])).values(),
      ]

      // Extract and deduplicate sizes
      const sizesRepetition = product.skus.map((sku) => sku.size)
      const uniqueSizes = [
        ...new Map(sizesRepetition.map((obj) => [obj.id, obj])).values(),
      ]

      // Sort the sizes based on the custom order
      const sortedSizes = uniqueSizes.sort((a, b) => {
        return sizeOrder.indexOf(a.code) - sizeOrder.indexOf(b.code)
      })

      // Return the product with added colors and sizes attributes
      return {
        ...product,
        colors,
        sizes: sortedSizes,
      }
    })

    return { products: productsWithColorsAndSizes, count, totalPages }
  }
}
