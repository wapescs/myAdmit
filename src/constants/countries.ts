import type { Country } from "@/types/country.types";

export const INDIA = {
  lat: 18.5204,
  lng: 73.8567, // Pune
};

export const COUNTRIES: Country[] = [
  {
    name: "USA",
    flag: "🇺🇸",
    students: "1.2M+",
    avgFees: "$30–60K/yr",
    topUnis: 200,
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    students: "800K+",
    avgFees: "CAD $20–40K",
    topUnis: 96,
    coordinates: {
      lat: 43.6532,
      lng: -79.3832,
    },
  },
  {
    name: "UK",
    flag: "🇬🇧",
    students: "600K+",
    avgFees: "£15–35K/yr",
    topUnis: 154,
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    students: "400K+",
    avgFees: "€0–3K/yr",
    topUnis: 87,
    coordinates: {
      lat: 52.52,
      lng: 13.405,
    },
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    students: "500K+",
    avgFees: "AUD $25–50K",
    topUnis: 43,
    coordinates: {
      lat: -33.8688,
      lng: 151.2093,
    },
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    students: "200K+",
    avgFees: "€15–25K/yr",
    topUnis: 22,
    coordinates: {
      lat: 53.3498,
      lng: -6.2603,
    },
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    students: "1M+",
    avgFees: "€0–20K/yr",
    topUnis: 500,
    coordinates: {
      lat: 50.1109,
      lng: 8.6821, // Frankfurt, central Europe
    },
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    students: "150K+",
    avgFees: "SGD $20–45K/yr",
    topUnis: 6,
    coordinates: {
      lat: 1.3521,
      lng: 103.8198,
    },
  },
];