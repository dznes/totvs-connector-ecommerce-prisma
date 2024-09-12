interface Phone {
    mobile_phone?: {
        country_code: string
        area_code: string
        number: string
    }
}

export interface Customer {
    name: string
    email: string
    document: string
    type: "individual" | "corporate"
    phones: Phone
}