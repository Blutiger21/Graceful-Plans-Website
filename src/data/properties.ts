export const WHATSAPP_NUMBER = "27712345678"; // Central WhatsApp contact number (international format without '+')

export const CONTACT_DETAILS = {
  brandName: "Graceful Plans",
  tagline: "Quality Student Accommodation in Universitas, Bloemfontein",
  suburb: "Universitas, Bloemfontein, Free State, South Africa",
  email: "admissions@gracefulplans.co.za",
  phoneDisplay: "+27 71 234 5678",
  whatsappNumber: WHATSAPP_NUMBER,
  nsfasNote: "NSFAS Accredited for CUT Students (10 NSFAS rooms per house)",
};

export type RoomType = "Bachelor" | "Single" | "Sharing";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  description: string;
  thumbnail: string;
  images: [string, string, string];
  features: string[];
}

export interface SharedSpacePhoto {
  label: "Outside Yard" | "Kitchen" | "Toilet & Bathroom";
  imageUrl: string;
  alt: string;
  caption: string;
}

export interface Property {
  id: string;
  slug: string;
  address: string;
  shortName: string;
  suburb: string;
  description: string;
  longDescription: string;
  exteriorImage: string;
  exteriorImageAlt: string;
  nsfasAccredited: boolean;
  nsfasRoomAllocation: number;
  startingPrice: number;
  roomSummary: {
    type: RoomType;
    count: number;
    price: number;
  }[];
  sharedSpaces: SharedSpacePhoto[];
  services: string[];
  rooms: Room[];
}

export const INCLUDED_SERVICES = [
  {
    id: "wifi",
    title: "Uncapped Wi-Fi",
    description: "Fast, reliable fibre internet across all rooms and study spaces for lectures and assignments.",
    iconName: "Wifi" as const,
  },
  {
    id: "laundry",
    title: "Laundry Machine",
    description: "On-site washing machines available for student convenience at no complicated extra hassle.",
    iconName: "WashingMachine" as const,
  },
  {
    id: "electricity",
    title: "Electricity Included",
    description: "Monthly rental includes electricity so you can study and cook without unexpected utility bills.",
    iconName: "Zap" as const,
  },
  {
    id: "water",
    title: "Water Included",
    description: "Clean municipal water included in your monthly accommodation fee with backup supply readiness.",
    iconName: "Droplets" as const,
  },
  {
    id: "shuttle",
    title: "CUT Shuttle Services",
    description: "Convenient, scheduled daily student transport to and from Central University of Technology (CUT).",
    iconName: "Bus" as const,
  },
  {
    id: "nsfas",
    title: "NSFAS Accredited (CUT)",
    description: "Officially accredited for CUT students with 10 dedicated NSFAS-funded rooms per residence.",
    iconName: "ShieldCheck" as const,
  },
];

const BACHELOR_PHOTOS: [string, string, string][] = [
  [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
  ],
];

const SINGLE_PHOTOS: [string, string, string][] = [
  [
    "https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  ],
];

const SHARING_PHOTOS: [string, string, string] = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
];

function createRooms(
  propertySlug: string,
  address: string,
  config: { bachelors?: number; singles?: number; sharings?: number }
): Room[] {
  const rooms: Room[] = [];

  if (config.bachelors) {
    for (let i = 1; i <= config.bachelors; i++) {
      const photos = BACHELOR_PHOTOS[(i - 1) % BACHELOR_PHOTOS.length];
      rooms.push({
        id: `${propertySlug}-bachelor-${i}`,
        name: `Bachelor ${i}`,
        type: "Bachelor",
        price: 5000,
        description: `Spacious private Bachelor unit at ${address}. Furnished with a comfortable bed, dedicated study desk & chair, built-in wardrobe, kitchenette space, and high-speed uncapped Wi-Fi.`,
        thumbnail: photos[0],
        images: photos,
        features: [
          "Private open-plan bachelor layout",
          "Study desk, chair & wardrobe",
          "Uncapped Wi-Fi, water & electricity included",
        ],
      });
    }
  }

  if (config.sharings) {
    for (let i = 1; i <= config.sharings; i++) {
      rooms.push({
        id: `${propertySlug}-sharing-${i}`,
        name: `Sharing Room ${i}`,
        type: "Sharing",
        price: 3500,
        description: `Well-ventilated dual-student sharing room at ${address}. Includes two individual single beds, two study desks with chairs, lockable storage cupboards, and full access to house amenities.`,
        thumbnail: SHARING_PHOTOS[0],
        images: SHARING_PHOTOS,
        features: [
          "2 single beds & 2 individual study desks",
          "Separate lockable wardrobe compartments",
          "Uncapped Wi-Fi, water & electricity included",
        ],
      });
    }
  }

  if (config.singles) {
    for (let i = 1; i <= config.singles; i++) {
      const photos = SINGLE_PHOTOS[(i - 1) % SINGLE_PHOTOS.length];
      rooms.push({
        id: `${propertySlug}-single-${i}`,
        name: `Single Room ${i}`,
        type: "Single",
        price: 4600,
        description: `Quiet private single room at ${address} designed for focused academic life. Equipped with a single bed, ergonomic study desk, chair, ample cupboard space, and strong Wi-Fi coverage.`,
        thumbnail: photos[0],
        images: photos,
        features: [
          "100% private lockable bedroom",
          "Study desk, lamp & built-in wardrobe",
          "Uncapped Wi-Fi, water & electricity included",
        ],
      });
    }
  }

  return rooms;
}

const DEFAULT_SERVICES = [
  "Uncapped Wi-Fi",
  "Laundry Machine",
  "Electricity Included",
  "Water Included",
  "CUT Shuttle Services",
  "10 CUT NSFAS Accredited Rooms",
];

export const PROPERTIES: Property[] = [
  {
    id: "paul-kruger-107",
    slug: "107-paul-kruger-avenue",
    address: "107 Paul Kruger Avenue, Universitas",
    shortName: "107 Paul Kruger Ave",
    suburb: "Universitas, Bloemfontein",
    description:
      "Spacious student residence in a peaceful tree-lined avenue in Universitas, offering 3 private Bachelor units and 12 Single rooms with daily CUT shuttle transport.",
    longDescription:
      "Located on one of Universitas's most convenient avenues, 107 Paul Kruger Avenue offers a quiet, structured environment tailored for student success. With 15 well-appointed rooms (3 Bachelor rooms and 12 Single rooms), a large sunny yard, a fully equipped communal kitchen, and neat bathrooms, students enjoy stress-free living with water, electricity, laundry facilities, and uncapped Wi-Fi included.",
    exteriorImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    exteriorImageAlt: "Exterior view of 107 Paul Kruger Avenue student residence in Universitas",
    nsfasAccredited: true,
    nsfasRoomAllocation: 10,
    startingPrice: 4600,
    roomSummary: [
      { type: "Bachelor", count: 3, price: 5000 },
      { type: "Single", count: 12, price: 4600 },
    ],
    sharedSpaces: [
      {
        label: "Outside Yard",
        imageUrl:
          "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1000&q=80",
        alt: "Outside Yard at 107 Paul Kruger Avenue, Universitas",
        caption: "Secure, spacious yard with shaded seating areas and safe student access.",
      },
      {
        label: "Kitchen",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=80",
        alt: "Communal Kitchen at 107 Paul Kruger Avenue, Universitas",
        caption: "Clean communal kitchen fitted with stoves, fridges, microwaves, and individual storage.",
      },
      {
        label: "Toilet & Bathroom",
        imageUrl:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
        alt: "Clean Toilet and Bathroom facilities at 107 Paul Kruger Avenue",
        caption: "Hygienic, modern bathroom and shower facilities with hot water included.",
      },
    ],
    services: DEFAULT_SERVICES,
    rooms: createRooms("107-paul-kruger-avenue", "107 Paul Kruger Avenue, Universitas", {
      bachelors: 3,
      singles: 12,
    }),
  },
  {
    id: "boersma-43",
    slug: "43-boersma-street",
    address: "43 Boersma Street, Universitas",
    shortName: "43 Boersma Street",
    suburb: "Universitas, Bloemfontein",
    description:
      "Versatile student home featuring 3 Bachelor rooms, 8 Single rooms, and 1 affordable Sharing room—perfect for students looking for flexible options.",
    longDescription:
      "43 Boersma Street combines comfort and affordability in the heart of Universitas. This welcoming student house features all three room configurations—Bachelor units for extra independence, private Single rooms for focused study, and a budget-friendly Sharing room. Ten rooms at this residence are officially allocated for CUT NSFAS-funded students.",
    exteriorImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    exteriorImageAlt: "Exterior view of 43 Boersma Street student house in Universitas",
    nsfasAccredited: true,
    nsfasRoomAllocation: 10,
    startingPrice: 3500,
    roomSummary: [
      { type: "Bachelor", count: 3, price: 5000 },
      { type: "Sharing", count: 1, price: 3500 },
      { type: "Single", count: 8, price: 4600 },
    ],
    sharedSpaces: [
      {
        label: "Outside Yard",
        imageUrl:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
        alt: "Outside Yard at 43 Boersma Street, Universitas",
        caption: "Fenced outdoor garden and courtyard space ideal for fresh air between study sessions.",
      },
      {
        label: "Kitchen",
        imageUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
        alt: "Shared Kitchen at 43 Boersma Street, Universitas",
        caption: "Bright, well-equipped kitchen with ample countertop space, appliances, and laundry access.",
      },
      {
        label: "Toilet & Bathroom",
        imageUrl:
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
        alt: "Toilet and Bathroom at 43 Boersma Street, Universitas",
        caption: "Tiled, easy-to-maintain bathrooms kept clean for resident comfort.",
      },
    ],
    services: DEFAULT_SERVICES,
    rooms: createRooms("43-boersma-street", "43 Boersma Street, Universitas", {
      bachelors: 3,
      sharings: 1,
      singles: 8,
    }),
  },
  {
    id: "benedictus-kok-6",
    slug: "6-benedictus-kok-street",
    address: "6 Benedictus Kok Street, Universitas",
    shortName: "6 Benedictus Kok St",
    suburb: "Universitas, Bloemfontein",
    description:
      "Intimate, study-focused residence with 10 private Single rooms—100% dedicated to quiet single-occupancy living with full CUT NSFAS accreditation.",
    longDescription:
      "With just 10 private Single rooms, 6 Benedictus Kok Street is our calmest, most close-knit student house in Universitas. Every resident enjoys their own private single bedroom while sharing a neat kitchen, tidy bathrooms, and a secure yard. All 10 rooms qualify under our CUT NSFAS allocation or private cash rental.",
    exteriorImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    exteriorImageAlt: "Exterior view of 6 Benedictus Kok Street student residence in Universitas",
    nsfasAccredited: true,
    nsfasRoomAllocation: 10,
    startingPrice: 4600,
    roomSummary: [{ type: "Single", count: 10, price: 4600 }],
    sharedSpaces: [
      {
        label: "Outside Yard",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        alt: "Outside Yard at 6 Benedictus Kok Street, Universitas",
        caption: "Quiet, gated front and back yard with laundry drying area and shuttle pickup point.",
      },
      {
        label: "Kitchen",
        imageUrl:
          "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=80",
        alt: "Shared Kitchen at 6 Benedictus Kok Street, Universitas",
        caption: "Modern shared kitchen serving only 10 single-room residents—never overcrowded.",
      },
      {
        label: "Toilet & Bathroom",
        imageUrl:
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
        alt: "Toilet and Bathroom at 6 Benedictus Kok Street, Universitas",
        caption: "Well-maintained showers and toilets with reliable municipal water and hot water geysers.",
      },
    ],
    services: DEFAULT_SERVICES,
    rooms: createRooms("6-benedictus-kok-street", "6 Benedictus Kok Street, Universitas", {
      singles: 10,
    }),
  },
];

export function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function buildRoomWhatsAppUrl(
  roomName: string,
  roomType: RoomType,
  price: number,
  propertyAddress: string
): string {
  const formattedPrice = price.toLocaleString("en-ZA");
  const message = `Hi Graceful Plans, I'm interested in ${roomName} (${roomType} - R${formattedPrice}) at ${propertyAddress}. Is it available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(customMessage?: string): string {
  const message =
    customMessage ||
    "Hi Graceful Plans, I would like to inquire about student accommodation in Universitas, Bloemfontein.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
