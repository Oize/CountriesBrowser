import { Region, CountryBasic, CountryResponse, Country } from './constants'

const API_URL = 'https://restcountries.eu/rest/v2'

export async function getCountriesByRegion(region: Region): Promise<CountryBasic[]> {
    try {
        const response = await fetch(API_URL + `/region/${region}?fields=flag;name;area;population`)
        const data: CountryResponse[] = await response.json()
        return data.map(country => ({
            ...country,
            area: country.area,
            populationDensity: country.area && country.population / country.area
        }))
    } catch (err) {
        console.error(err)
        return []
    }
}

async function getCountryNameByCode(code: string): Promise<string> {
    try {
        const response = await fetch(API_URL + `/alpha/${code}?fields=name`)
        const { name }: CountryBasic = await response.json()
        return name
    } catch (err) {
        console.error(err)
        return ''
    }
}

export async function getCountryByName(name: string): Promise<Country | undefined> {
    try {
        const response = await fetch(API_URL + `/name/${name}?fullText=true`)
        const [country]: Country[] = await response.json()
        const borders = await Promise.all(country.borders.map(getCountryNameByCode))
        return {
            ...country,
            area: country.area,
            borders,
            populationDensity: country.area && country.population / country.area
        }
    } catch (err) {
        console.error(err)
        return
    }
}
