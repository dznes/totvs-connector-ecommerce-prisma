export interface Price {
    branchCode: number,
    priceCode: number,
    priceName: string,
    price: number,
    promotionalPrice: number,
    promotionalInformation: string | null,
    informationOtherPromotions: string | null,
}