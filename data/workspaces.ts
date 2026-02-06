export interface Workspace {
  id: string
  title: string
  location: string
  distance: string
  price: number
  priceUnit: string
  rating: number
  reviews: number
  image: string
  tags: string[]
  type: "Hot Desk" | "Private Office" | "Meeting Room" | "Virtual Office"
  coordinates: { lat: number; lng: number }
  isAiRecommended?: boolean
}

export const workspaces: Workspace[] = [
  {
    id: "1",
    title: "Downtown Hot Desk",
    location: "Financial District",
    distance: "0.2 mi away",
    price: 45,
    priceUnit: "/ day",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
    tags: ["Gigabit Wifi", "Coffee Bar", "Phone Booths"],
    type: "Hot Desk",
    coordinates: { lat: 40.7075, lng: -74.0093 },
    isAiRecommended: true,
  },
  {
    id: "2",
    title: "Luxe Private Suite",
    location: "Midtown East",
    distance: "1.5 mi away",
    price: 120,
    priceUnit: "/ day",
    rating: 5.0,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2340&auto=format&fit=crop",
    tags: ["Private Door", "Smart TV", "Concierge"],
    type: "Private Office",
    coordinates: { lat: 40.7549, lng: -73.9840 },
  },
  {
    id: "3",
    title: "Creative Loft Studio",
    location: "Brooklyn Heights",
    distance: "2.1 mi away",
    price: 35,
    priceUnit: "/ day",
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2340&auto=format&fit=crop",
    tags: ["Rooftop Access", "Pet Friendly", "Natural Light"],
    type: "Hot Desk",
    coordinates: { lat: 40.6960, lng: -73.9933 },
    isAiRecommended: true,
  },
  {
    id: "4",
    title: "Executive Boardroom",
    location: "Upper East Side",
    distance: "4.0 mi away",
    price: 75,
    priceUnit: "/ hour",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1517502886379-060dcea392b8?q=80&w=2340&auto=format&fit=crop",
    tags: ["Video Conferencing", "Catering", "Whiteboard"],
    type: "Meeting Room",
    coordinates: { lat: 40.7736, lng: -73.9566 },
  },
  {
    id: "5",
    title: "Urban Nomad Lounge",
    location: "SoHo",
    distance: "0.8 mi away",
    price: 29,
    priceUnit: "/ day",
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1527192491265-78983fb48142?q=80&w=2334&auto=format&fit=crop",
    tags: ["Networking Events", "24/7 Access", "Snacks"],
    type: "Hot Desk",
    coordinates: { lat: 40.7233, lng: -74.0030 },
  },
  {
    id: "6",
    title: "Tech Hub Office",
    location: "Chelsea",
    distance: "1.2 mi away",
    price: 150,
    priceUnit: "/ day",
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    tags: ["Server Room", "Dual Monitors", "Ergo Chairs"],
    type: "Private Office",
    coordinates: { lat: 40.7465, lng: -74.0014 },
    isAiRecommended: true,
  },
]
