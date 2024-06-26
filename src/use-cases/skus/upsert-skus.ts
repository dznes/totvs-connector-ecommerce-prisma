import { SkusRepository } from "@/repositories/skus-repository";
import { Slug } from "@/core/entities/value-objects/slug";
import { ColorsRepository } from "@/repositories/colors-repository";
import { SizesRepository } from "@/repositories/sizes-repository";

interface UpsertSkuUseCaseRequest {
  id?: number;
  code: string;
  title: string;
  ncm: string;
  mpn?: string;
  ean?: string;
  slug?: string;
  status?: number;
  price_retail?: number;
  price_wholesale?: number;
  cost?: number;
  discount_percentage?: number;
  reference_id?: string;
  reference_name?: string;
  integration_code?: string;
  quantity_op?: number;
  balance?: number;
  colorCode: string;
  colorTitle: string;
  sizeCode: string;
}

export class UpsertSkuUseCase {
  constructor(
    private skusRepository: SkusRepository,
    private colorsRepository: ColorsRepository,
    private sizesRepository: SizesRepository,
  ) {}

  async execute({
    id,
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
    quantity_op,
    balance,
    colorCode,
    colorTitle,
    sizeCode,
  }: UpsertSkuUseCaseRequest) {
    let color = await this.colorsRepository.findByCode(colorCode);

    if (!color) {
      try {
        color = await this.colorsRepository.create({
          code: colorCode,
          title: colorTitle,
          variation_type: 1,
          background_color: "",
          image_tags: "",
          image_url: "",
          image_text: "",
          image_label: "",
        });
      } catch (error: any) {
        if (error.code === "P2002") {
          color = await this.colorsRepository.findByCode(colorCode);
        } else {
          throw error;
        }
      }
    }

    let size = await this.sizesRepository.findByCode(sizeCode);

    if (!size) {
      // Only try to create the size if it doesn't exist
      try {
        size = await this.sizesRepository.create({
          code: sizeCode,
          title: sizeCode,
          variation_type: 1,
        });
      } catch (error: any) {
        if (error.code !== "P2002") {
          // Handle unique constraint violation error
          throw error;
        }
        // Fetch the existing size if it already exists (just in case)
        size = await this.sizesRepository.findByCode(sizeCode);
      }
    }

    const sku = await this.skusRepository.findByCode(code);

    if (sku) {
      if (title) {
        sku.title = title;
        sku.slug = Slug.createFromText(title + code).value;
      }
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
        quantity_op: quantity_op || sku.quantity_op,
        balance: balance || sku.balance,
      });
      console.log(`Sku ${title} updated.`);
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
        quantity_op,
        balance,
        color_code: colorCode,
        size_code: sizeCode,
      });
      console.log(`Sku ${title} created.`);
    }
  }
}
