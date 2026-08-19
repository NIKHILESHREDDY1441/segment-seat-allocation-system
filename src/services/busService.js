import { getStoredBuses, saveStoredBuses, getStoredRoutes, saveStoredRoutes } from './storageService';

export const busService = {
  getAllBuses: () => {
    return getStoredBuses();
  },

  getBusById: (id) => {
    const buses = getStoredBuses();
    return buses.find(b => b.id === id) || null;
  },

  searchBuses: ({ origin, destination, date }) => {
    const buses = getStoredBuses();
    return buses.filter(bus => {
      if (origin && bus.origin.toLowerCase() !== origin.toLowerCase()) {
        // Check if origin is an intermediate stop
        const originIdx = bus.stops.findIndex(s => s.toLowerCase() === origin.toLowerCase());
        if (originIdx === -1) return false;
      }
      if (destination && bus.destination.toLowerCase() !== destination.toLowerCase()) {
        const destIdx = bus.stops.findIndex(s => s.toLowerCase() === destination.toLowerCase());
        if (destIdx === -1) return false;
      }
      return true;
    });
  },

  addBus: (busData) => {
    const buses = getStoredBuses();
    const newBus = {
      id: `bus-${Date.now()}`,
      rating: 4.5,
      layoutType: busData.layoutType || '2+2',
      totalSeats: busData.totalSeats || 40,
      amenities: busData.amenities || ['Charging Point', 'Water Bottle', 'Reclining Seats'],
      segmentSeatAvailability: busData.segmentSeatAvailability || {},
      ...busData
    };
    const updated = [newBus, ...buses];
    saveStoredBuses(updated);

    // If new route, save to stored routes
    if (busData.stops && busData.stops.length >= 2) {
      const routes = getStoredRoutes();
      const routeName = `${busData.stops[0]} → ${busData.stops[busData.stops.length - 1]}`;
      const existing = routes.find(r => r.name === routeName);
      if (!existing) {
        routes.push({
          id: `route-${Date.now()}`,
          name: routeName,
          origin: busData.stops[0],
          destination: busData.stops[busData.stops.length - 1],
          stops: busData.stops,
          distanceKm: 500,
          estimatedHours: busData.duration || '08h 00m'
        });
        saveStoredRoutes(routes);
      }
    }
    return newBus;
  },

  updateBus: (id, busData) => {
    const buses = getStoredBuses();
    const index = buses.findIndex(b => b.id === id);
    if (index !== -1) {
      buses[index] = { ...buses[index], ...busData };
      saveStoredBuses(buses);
      return buses[index];
    }
    return null;
  },

  deleteBus: (id) => {
    const buses = getStoredBuses();
    const updated = buses.filter(b => b.id !== id);
    saveStoredBuses(updated);
    return true;
  },

  updateBusSeatLayout: (id, { layoutType, totalSeats, segmentSeatAvailability }) => {
    const buses = getStoredBuses();
    const index = buses.findIndex(b => b.id === id);
    if (index !== -1) {
      buses[index].layoutType = layoutType;
      buses[index].totalSeats = totalSeats;
      if (segmentSeatAvailability) {
        buses[index].segmentSeatAvailability = segmentSeatAvailability;
      }
      saveStoredBuses(buses);
      return buses[index];
    }
    return null;
  }
};
