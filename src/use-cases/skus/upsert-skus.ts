import { SkusRepository } from '@/repositories/skus-repository'
import { Slug } from '@/core/entities/value-objects/slug'
import { ColorsRepository } from '@/repositories/colors-repository'
import { SizesRepository } from '@/repositories/sizes-repository'

interface UpsertSkuUseCaseRequest {
  id?: number
  code: string
  title: string
  ncm: string
  mpn?: string
  ean?: string
  slug?: string
  status?: number
  price_retail?: number
  price_wholesale?: number
  cost?: number
  discount_percentage?: number
  reference_id?: string
  reference_name?: string
  integration_code?: string
  colorCode: string
  colorTitle: string
  sizeCode: string
  is_active?: boolean
  is_finished_product?: boolean
  is_raw_material?: boolean
  is_bulk_material?: boolean
  is_own_production?: boolean
  is_blocked?: boolean
}



export class UpsertSkuUseCase {
  constructor(
    private skusRepository: SkusRepository,
    private colorsRepository: ColorsRepository,
    private sizesRepository: SizesRepository,
  ) {}

  private async findOrCreateColor(colorCode: string, colorTitle: string) {
    let color = await this.colorsRepository.findByCode(colorCode);

    if (!color) {
      try {
        color = await this.colorsRepository.create({
          code: colorCode,
          title: colorTitle,
          variation_type: 1,
          background_color: '',
          image_tags: '',
          image_url: '',
          image_text: '',
          image_label: '',
        });
      } catch (error: any) {
        if (error.code === 'P2002') {
          color = await this.colorsRepository.findByCode(colorCode);
        } else {
          throw error;
        }
      }
    }

    return color;
  }

  private async findOrCreateSize(sizeCode: string) {
    let size = await this.sizesRepository.findByCode(sizeCode);

    if (!size) {
      try {
        size = await this.sizesRepository.create({
          code: sizeCode,
          title: sizeCode,
          variation_type: 2,
        });
      } catch (error: any) {
        if (error.code !== 'P2002') {
          throw error;
        }
        size = await this.sizesRepository.findByCode(sizeCode);
      }
    }

    return size;
  }

  async execute({
    code,
    status,
    title,
    ean,
    ncm,
    mpn,
    slug,
    price_retail,
    price_wholesale,
    cost,
    discount_percentage,
    reference_id,
    reference_name,
    integration_code,
    colorCode,
    colorTitle,
    sizeCode,
    is_active,
    is_finished_product,
    is_raw_material,
    is_bulk_material,
    is_own_production,
    is_blocked,
  }: UpsertSkuUseCaseRequest) {
    await this.findOrCreateColor(colorCode, colorTitle);
    await this.findOrCreateSize(sizeCode);

    const sku = await this.skusRepository.findByCode(code)

    if (sku) {
      sku.title = title
      sku.slug = Slug.createFromText(title + code).value
      await this.skusRepository.update({
        ...sku,
        code,
        status: status || sku.status,
        title,
        ean: ean || sku.ean,
        ncm,
        mpn: mpn || sku.mpn,
        slug: slug || sku.slug,
        reference_id: reference_id || sku.reference_id,
        reference_name: reference_name || sku.reference_name,
        integration_code: integration_code || sku.integration_code,
        is_active: is_active || sku.is_active,
        is_finished_product: is_finished_product || sku.is_finished_product,
        is_raw_material: is_raw_material || sku.is_raw_material,
        is_bulk_material: is_bulk_material || sku.is_bulk_material,
        is_own_production: is_own_production || sku.is_own_production,
        is_blocked: is_blocked || sku.is_blocked,
        updated_at: new Date(),
      })
      console.log(`Sku ${title} updated.`)
    } else {
      await this.skusRepository.create({
        code,
        status,
        title,
        ean,
        ncm,
        mpn,
        slug: Slug.createFromText(title + code).value,
        price_retail,
        price_wholesale,
        cost,
        discount_percentage,
        reference_id,
        reference_name,
        integration_code,
        is_active,
        is_finished_product,
        is_raw_material,
        is_bulk_material,
        is_own_production,
        is_blocked,
        color: {
          connect: {
            code: colorCode,
          },
        },
        size: {
          connect: {
            code: sizeCode,
          },
        },
      })
      console.log(`Sku ${title} created.`)
    }
  }
}
