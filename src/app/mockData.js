const propertyListings = [
  {
    property_id: 1,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    price_reduced_amount: 99000,
    description: { beds: 2, baths: 2, sqft: "1396", lot_sqft: "5000" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
    open_houses: "",
  },
  {
    property_id: 2,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    price_reduced_amount: 999999,
    description: { beds: 2, baths: 2, sqft: "1396", lot_sqft: "4000" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 3,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    price_reduced_amount: 99900,
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 4,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    price_reduced_amount: 1000000,
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 5,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    open_houses: [
      {
        start_date: "2024-04-06T14:30:00Z",
        end_date: "2024-04-06T16:00:00Z",
        description: null,
        time_zone: "EST",
      },
      {
        start_date: "2024-04-07T14:30:00Z",
        end_date: "2024-04-07T16:00:00Z",
        description: null,
        time_zone: "EST",
      },
    ],
    flags: { is_contingent: true, is_new_listing: true },
    status: "for_sale",
    list_price: 1099000,
    list_date: "2024-04-05T15:58:58.000000Z",
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 6,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 7,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 8,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    description: { beds: 2, baths: 2, sqft: "1396" },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 9,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 3099000,
    price_reduced_amount: 1099000,
    description: {
      sub_type: null,
      type: "land",
      beds: 2,
      baths: 2,
      sqft: "1396",
    },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
  {
    property_id: 10,
    primary_photo: {
      href: "https://ap.rdcpix.com/b6a7a646ddfd880bcfeb805ae9ed1883l-m3846826497s.jpg",
    },
    branding: [{ name: "The Beverly Hills Estates Inc." }],
    flags: { is_contingent: null },
    status: "for_sale",
    list_price: 1099000,
    description: {
      sub_type: null,
      type: "farm",
      beds: 2,
      baths: 2,
      sqft: "1396",
    },
    location: {
      address: {
        line: "4500 Gilbert Pl",
        city: "Los Angeles",
        state_code: "CA",
        postal_code: "90004",
      },
    },
  },
];

export default propertyListings;
