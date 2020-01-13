export type Region = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania'
export const Region = {
    get Europe(): Region {
        return 'europe'
    },
    get Africa(): Region {
        return 'africa'
    },
    get Americas(): Region {
        return 'americas'
    },
    get Asia(): Region {
        return 'asia'
    },
    get Oceania(): Region {
        return 'oceania'
    }
}

export const Regions: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
export const RegionsShort = ['afr', 'ame', 'asia', 'eu', 'oce']

export interface CountryResponse {
    name: string
    flag: string
    population: number
    area: number | null
}

export interface CountryBasic {
    name: string
    flag: string
    population: number
    area: number | null
    populationDensity: number | null
}

export interface Country extends CountryBasic {
    nativeName: string
    altSpellings: string[]
    translations: Translations
    region: string
    subregion: string
    latlng: [number, number]
    borders: string[]
    capital: string
    languages: Language[]
    demonym: string
    regionalBlocs: RegionalBlock[]
    cioc: string
    gini: number
    currencies: Currency[]
    timezones: string[]
    alpha2Code: string
    alpha3Code: string
    numericCode: number
    callingCodes: number[]
    topLevelDomain: string[]
}

interface Currency {
    code: string
    name: string
    symbol: string
}

interface Language {
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
}

interface Translations {
    [key: string]: string
}

interface RegionalBlock {
    acronym: string
    name: string
    otherAcronyms: string[]
    otherNames: string[]
}
