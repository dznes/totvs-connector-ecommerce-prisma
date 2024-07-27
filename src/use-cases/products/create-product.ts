import { Product } from '@prisma/client'
import { ProductsRepository } from '@/repositories/products-repository'
import { Slug } from '@/core/entities/value-objects/slug'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'


export interface CreateProductUseCaseRequest {
  title: string
  code: string
  weight: number
  ncm: string
  mpn?: string
  ean?: string
  description: string
  slug?: string
  status?: number
  price_retail?: number
  price_wholesale?: number
  cost?: number
  package_weight?: number
  package_height?: number
  package_length?: number
  package_width?: number
  discount_percentage?: number
  reference_id?: string
  reference_name?: string
  integration_code?: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    status,
    code,
    title,
    weight,
    ncm,
    ean,
    mpn,
    description,
    slug,
    price_retail,
    price_wholesale,
    cost,
    discount_percentage,
    reference_id,
    reference_name,
    integration_code,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productWithSameTitle =
      await this.productsRepository.findByTitle(title)

    if (productWithSameTitle) {
      throw new ResourceAlreadyExistsError()
    }

    const systemSlug = Slug.createFromText(title).value
    const product = await this.productsRepository.create({
      status: status ?? 1,
      code,
      title,
      weight,
      ncm,
      ean,
      mpn,
      description,
      slug: slug ?? systemSlug,
      price_retail,
      price_wholesale,
      cost,
      discount_percentage,
      reference_id,
      reference_name,
      integration_code,
    })

    return { product }
  }
}