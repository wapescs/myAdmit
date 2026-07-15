import { COUNTRIES } from "@/constants/countries";
import type { Country } from "@/types/country.types";

export async function getCountries(): Promise<Country[]> {
  return COUNTRIES;
}

export function getCountriesSync(): Country[] {
  return COUNTRIES;
}
