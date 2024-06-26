import { fetchToken, getProductPrices } from "@/http/lib/totvs";
import { FastifyReply, FastifyRequest } from "fastify";

export interface Price {
  branchCode: number;
  priceCode: number;
  priceName: string;
  price: number;
  promotionalPrice: number;
  promotionalInformation: string | null;
  informationOtherPromotions: string | null;
}

export interface ProductPrice {
  productCode: number;
  prices: Price[];
}

export async function skuPricesBackup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = await fetchToken();
    const pageSize = 10;
    let page = 1;
    let product_prices: ProductPrice[] = [];

    // Fetch the initial page to get the total number of pages.
    const initialData = await getProductPrices({
      token: token.access_token,
      page,
      pageSize,
    });
    product_prices = product_prices.concat(initialData.items);
    const totalPages = initialData.totalPages;

    // Fetch remaining pages
    for (page = 2; page <= totalPages; page++) {
      const data = await getProductPrices({
        token: token.access_token,
        page,
        pageSize,
      });
      const product_detail = data.items;
      product_prices = product_prices.concat(product_detail); // Accumulate items from each page
      console.log(`${product_prices.length} items processados.`);
    }

    // Save all items to JSON file
    const promises = await product_prices.map((productPrice) => {
      console.log(productPrice);
    });
    await Promise.all(promises);

    // Return the complete list of items in the API response
    return reply
      .status(200)
      .send(JSON.stringify({ promises, totalPages }));
  } catch (err) {
    console.log(err);
    // It's better to return an HTTP error response
    return reply.status(500).send({ error: "Failed to fetch product details" });
  }
}
