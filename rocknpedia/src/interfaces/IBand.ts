export interface IBand {
    band_id?: number,
    name?: string,
    foundation_year?: number,
    band_image?: string,
    history?: string
}

export interface IBands {
    bands: IBand[]
}