export const MOCK_ROUTES = [
  {
    id: 'route-1',
    name: 'Hyderabad → Bangalore',
    origin: 'Hyderabad',
    destination: 'Bangalore',
    stops: ['Hyderabad', 'Kurnool', 'Anantapur', 'Bangalore'],
    distanceKm: 575,
    estimatedHours: '10h 30m'
  },
  {
    id: 'route-2',
    name: 'Mumbai → Goa',
    origin: 'Mumbai',
    destination: 'Goa',
    stops: ['Mumbai', 'Pune', 'Kolhapur', 'Goa'],
    distanceKm: 590,
    estimatedHours: '11h 00m'
  },
  {
    id: 'route-3',
    name: 'Chennai → Coimbatore',
    origin: 'Chennai',
    destination: 'Coimbatore',
    stops: ['Chennai', 'Vellore', 'Salem', 'Coimbatore'],
    distanceKm: 500,
    estimatedHours: '08h 45m'
  },
  {
    id: 'route-4',
    name: 'Delhi → Lucknow',
    origin: 'Delhi',
    destination: 'Lucknow',
    stops: ['Delhi', 'Agra', 'Kanpur', 'Lucknow'],
    distanceKm: 550,
    estimatedHours: '09h 15m'
  },
  {
    id: 'route-5',
    name: 'Bangalore → Mangalore',
    origin: 'Bangalore',
    destination: 'Mangalore',
    stops: ['Bangalore', 'Mysore', 'Madikeri', 'Mangalore'],
    distanceKm: 350,
    estimatedHours: '07h 30m'
  }
];

export const MOCK_BUSES = [
  {
    id: 'bus-101',
    busNumber: 'AP 29 Z 1234',
    operator: 'ABC Travels (Express)',
    busType: 'AC Sleeper (2+1)',
    layoutType: '2+1',
    routeId: 'route-1',
    origin: 'Hyderabad',
    destination: 'Bangalore',
    stops: ['Hyderabad', 'Kurnool', 'Anantapur', 'Bangalore'],
    departureTime: '08:00 PM',
    arrivalTime: '06:30 AM',
    duration: '10h 30m',
    basePrice: 850,
    rating: 4.8,
    totalSeats: 30,
    amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Wi-Fi', 'Live Tracking'],
    // Scenario 2: Segment Allocation required!
    // Seat 10 is avail in Hyd-Kur & Kur-Anant, but occupied in Anant-Blr.
    // Seat 15 is occupied in Hyd-Kur, but avail in Kur-Anant & Anant-Blr.
    // Optimal result: Hyd->Kur: Seat 10, Kur->Anant: Seat 10, Anant->Blr: Seat 15 (1 change).
    segmentSeatAvailability: {
      'Hyderabad-Kurnool': {
        1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: true, 8: false,
        10: true, 11: false, 12: false, 15: false, 18: true, 20: false, 22: true
      },
      'Kurnool-Anantapur': {
        1: false, 2: true, 3: false, 4: true, 5: false, 6: true, 7: false, 8: true,
        10: true, 11: true, 12: true, 15: true, 18: false, 20: true, 22: false
      },
      'Anantapur-Bangalore': {
        1: true, 2: false, 3: true, 4: false, 5: true, 6: true, 7: false, 8: false,
        10: false, 11: false, 12: true, 15: true, 18: true, 20: true, 25: true
      }
    }
  },
  {
    id: 'bus-102',
    busNumber: 'TS 09 UB 5678',
    operator: 'Royal Executive Travels',
    busType: 'AC Seater (2+2)',
    layoutType: '2+2',
    routeId: 'route-1',
    origin: 'Hyderabad',
    destination: 'Bangalore',
    stops: ['Hyderabad', 'Kurnool', 'Anantapur', 'Bangalore'],
    departureTime: '09:30 PM',
    arrivalTime: '07:45 AM',
    duration: '10h 15m',
    basePrice: 720,
    rating: 4.6,
    totalSeats: 40,
    amenities: ['Charging Point', 'Reclining Seats', 'Reading Light', 'Water Bottle'],
    // Scenario 1: Continuous seat 12 is available across ALL segments!
    segmentSeatAvailability: {
      'Hyderabad-Kurnool': {
        4: true, 8: true, 12: true, 16: true, 20: true, 24: true
      },
      'Kurnool-Anantapur': {
        4: false, 8: true, 12: true, 16: false, 20: true, 24: true
      },
      'Anantapur-Bangalore': {
        4: true, 8: false, 12: true, 16: true, 20: false, 24: true
      }
    }
  },
  {
    id: 'bus-103',
    busNumber: 'MH 12 Q 9988',
    operator: 'Deccan Cargo & Transports',
    busType: 'Luxury Sleeper (2+1)',
    layoutType: '2+1',
    routeId: 'route-2',
    origin: 'Mumbai',
    destination: 'Goa',
    stops: ['Mumbai', 'Pune', 'Kolhapur', 'Goa'],
    departureTime: '07:15 PM',
    arrivalTime: '06:15 AM',
    duration: '11h 00m',
    basePrice: 1150,
    rating: 4.9,
    totalSeats: 30,
    amenities: ['Pillow & Blanket', 'Personal TV', 'Snacks', 'Wi-Fi', 'Charging Point'],
    // Scenario 3: 3 Seats needed across 3 segments (Seat 3 -> Seat 7 -> Seat 14)
    segmentSeatAvailability: {
      'Mumbai-Pune': { 3: true, 7: false, 14: false, 18: true },
      'Pune-Kolhapur': { 3: false, 7: true, 14: false, 18: false },
      'Kolhapur-Goa': { 3: false, 7: false, 14: true, 18: true }
    }
  },
  {
    id: 'bus-104',
    busNumber: 'TN 01 AB 4321',
    operator: 'Southern Star Lines',
    busType: 'Ultra Deluxe (2+2)',
    layoutType: '2+2',
    routeId: 'route-3',
    origin: 'Chennai',
    destination: 'Coimbatore',
    stops: ['Chennai', 'Vellore', 'Salem', 'Coimbatore'],
    departureTime: '10:00 PM',
    arrivalTime: '06:45 AM',
    duration: '08h 45m',
    basePrice: 650,
    rating: 4.4,
    totalSeats: 40,
    amenities: ['Reclining Seats', 'Charging Port', 'Emergency Exit'],
    segmentSeatAvailability: {
      'Chennai-Vellore': { 5: true, 6: true, 10: true, 15: true },
      'Vellore-Salem': { 5: true, 6: false, 10: true, 15: true },
      'Salem-Coimbatore': { 5: true, 6: true, 10: false, 15: true }
    }
  },
  {
    id: 'bus-105',
    busNumber: 'DL 01 RT 7777',
    operator: 'Capital Express Volvo',
    busType: 'Multi-Axle AC Sleeper',
    layoutType: 'Sleeper',
    routeId: 'route-4',
    origin: 'Delhi',
    destination: 'Lucknow',
    stops: ['Delhi', 'Agra', 'Kanpur', 'Lucknow'],
    departureTime: '08:30 PM',
    arrivalTime: '05:45 AM',
    duration: '09h 15m',
    basePrice: 990,
    rating: 4.7,
    totalSeats: 30,
    amenities: ['Water Bottle', 'Blanket', 'Reading Light', 'GPS Tracking'],
    segmentSeatAvailability: {
      'Delhi-Agra': { L1: true, L2: false, L5: true, U1: true, U4: false },
      'Agra-Kanpur': { L1: true, L2: true, L5: false, U1: false, U4: true },
      'Kanpur-Lucknow': { L1: false, L2: true, L5: true, U1: true, U4: true }
    }
  },
  {
    id: 'bus-106',
    busNumber: 'KA 05 M 3344',
    operator: 'Western Ghats Connect',
    busType: 'Non-AC Seater (2+2)',
    layoutType: '2+2',
    routeId: 'route-5',
    origin: 'Bangalore',
    destination: 'Mangalore',
    stops: ['Bangalore', 'Mysore', 'Madikeri', 'Mangalore'],
    departureTime: '11:00 PM',
    arrivalTime: '06:30 AM',
    duration: '07h 30m',
    basePrice: 520,
    rating: 4.2,
    totalSeats: 40,
    amenities: ['Emergency Hammer', 'First Aid Kit'],
    segmentSeatAvailability: {
      'Bangalore-Mysore': { 2: true, 4: true, 6: true },
      'Mysore-Madikeri': { 2: true, 4: false, 6: true },
      'Madikeri-Mangalore': { 2: false, 4: true, 6: true }
    }
  }
];

export const MOCK_PASSENGER_USER = {
  id: 'usr-1',
  name: 'Rahul Sharma',
  email: 'passenger@example.com',
  phone: '+91 98765 43210',
  role: 'passenger'
};

export const MOCK_ADMIN_USER = {
  id: 'adm-1',
  name: 'Admin Manager',
  email: 'admin@example.com',
  username: 'admin',
  role: 'admin'
};
