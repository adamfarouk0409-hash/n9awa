export interface CityOption {
  id: string;
  name: string;
}

const cityList: string[] = [
  "Agadir",
  "Al Hoceïma",
  "Azrou",
  "Béni Mellal",
  "Berkane",
  "Casablanca",
  "Chefchaouen",
  "Dakhla",
  "El Jadida",
  "Errachidia",
  "Essaouira",
  "Fès",
  "Guelmim",
  "Ifrane",
  "Kénitra",
  "Khémisset",
  "Khénifra",
  "Khouribga",
  "Laâyoune",
  "Larache",
  "Marrakech",
  "Martil",
  "Meknès",
  "Mohammédia",
  "Nador",
  "Ouarzazate",
  "Oujda",
  "Rabat",
  "Safi",
  "Salé",
  "Sefrou",
  "Settat",
  "Sidi Kacem",
  "Sidi Slimane",
  "Tanger",
  "Taourirt",
  "Taroudant",
  "Taza",
  "Témara",
  "Tétouan",
  "Tiznit",
];

const toCityOption = (name: string): CityOption => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
});

const sortedUniqueCities = Array.from(
  new Map(
    cityList
      .map((name) => toCityOption(name))
      .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
      .map((city) => [city.name.toLowerCase(), city])
  ).values()
);

export const cities: CityOption[] = sortedUniqueCities;

export const filterCities: CityOption[] = [
  { id: "all", name: "Toutes les villes" },
  ...sortedUniqueCities,
];
