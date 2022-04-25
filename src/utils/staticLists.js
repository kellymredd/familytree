// city, county, state, country
const cities = [
  { id: 1, label: "Alexandria" },
  { id: 2, label: "Atlanta" },
  { id: 3, label: "Warner Robins" },
  { id: 5, label: "Nashville" },
  { id: 6, label: "Macon" },
  { id: 7, label: "Cabaniss" },
  { id: 8, label: "Memphis" },
  { id: 9, label: "Forest Park" },
  { id: 10, label: "Johnson City" },
  { id: 11, label: "Manassas" },
];

const counties = [
  { id: 1, label: "Bibb", cityId: 6 },
  { id: 2, label: "Fulton", cityId: 2 },
  { id: 3, label: "Fairfax", cityId: 1 },
  { id: 4, label: "Shelby", cityId: 8 },
  { id: 5, label: "Houston", cityId: 3 },
  { id: 6, label: "Davidson", cityId: 5 },
  { id: 7, label: "Monroe", cityId: 7 },
  { id: 10, label: "Washington", cityId: 10 },
  { id: 11, label: "Prince William", cityId: 11 },
];

const countries = [
  { id: 1, label: "United States" },
  { id: 3, label: "Germany" },
  { id: 4, label: "Ireland" },
  { id: 5, label: "Spain" },
  { id: 6, label: "United Kingdom" },
  { id: 7, label: "Scotland (UK" },
];

const eventTypes = [
  { id: 1, label: "Birth" },
  { id: 2, label: "Death" },
  { id: 3, label: "Divorce" },
  { id: 4, label: "Marriage" },
];

const gender = [
  { id: 1, label: "Female" },
  { id: 2, label: "Male" },
];

const states = [
  {
    id: 1,
    label: "Alabama",
  },
  {
    id: 2,
    label: "Alaska",
  },
  {
    id: 3,
    label: "Arizona",
  },
  {
    id: 4,
    label: "Arkansas",
  },
  {
    id: 5,
    label: "California",
  },
  {
    id: 6,
    label: "Colorado",
  },
  {
    id: 7,
    label: "Connecticut",
  },
  {
    id: 8,
    label: "Delaware",
  },
  {
    id: 9,
    label: "Florida",
  },
  {
    id: 10,
    label: "Georgia",
  },
  {
    id: 11,
    label: "Hawaii",
  },
  {
    id: 12,
    label: "Idaho",
  },
  {
    id: 13,
    label: "Illinois",
  },
  {
    id: 14,
    label: "Indiana",
  },
  {
    id: 15,
    label: "Iowa",
  },
  {
    id: 16,
    label: "Kansas",
  },
  {
    id: 17,
    label: "Kentucky",
  },
  {
    id: 18,
    label: "Louisiana",
  },
  {
    id: 19,
    label: "Maine",
  },
  {
    id: 20,
    label: "Maryland",
  },
  {
    id: 21,
    label: "Massachusetts",
  },
  {
    id: 22,
    label: "Michigan",
  },
  {
    id: 23,
    label: "Minnesota",
  },
  {
    id: 24,
    label: "Mississippi",
  },
  {
    id: 25,
    label: "Missouri",
  },
  {
    id: 26,
    label: "Montana",
  },
  {
    id: 27,
    label: "Nebraska",
  },
  {
    id: 28,
    label: "Nevada",
  },
  {
    id: 29,
    label: "New Hampshire",
  },
  {
    id: 30,
    label: "New Jersey",
  },
  {
    id: 31,
    label: "New Mexico",
  },
  {
    id: 32,
    label: "New York",
  },
  {
    id: 33,
    label: "North Carolina",
  },
  {
    id: 34,
    label: "North Dakota",
  },
  {
    id: 35,
    label: "Ohio",
  },
  {
    id: 36,
    label: "Oklahoma",
  },
  {
    id: 37,
    label: "Oregon",
  },
  {
    id: 38,
    label: "Pennsylvania",
  },
  {
    id: 39,
    label: "Rhode Island",
  },
  {
    id: 40,
    label: "South Carolina",
  },
  {
    id: 41,
    label: "South Dakota",
  },
  {
    id: 42,
    label: "Tennessee",
  },
  {
    id: 43,
    label: "Texas",
  },
  {
    id: 44,
    label: "Utah",
  },
  {
    id: 45,
    label: "Vermont",
  },
  {
    id: 46,
    label: "Virginia",
  },
  {
    id: 47,
    label: "Washington",
  },
  {
    id: 48,
    label: "West Virginia",
  },
  {
    id: 49,
    label: "Wisconsin",
  },
  {
    id: 50,
    label: "Wyoming",
  },
];

const statusTypes = [
  { id: 1, label: "Deceased" },
  { id: 2, label: "Living" },
];

const suffix = [
  { id: 3, label: "III" },
  { id: 1, label: "Jr." },
  { id: 2, label: "Sr." },
];

export default {
  cities,
  counties,
  countries,
  gender,
  states,
  statusTypes,
  eventTypes,
  suffix,
};
