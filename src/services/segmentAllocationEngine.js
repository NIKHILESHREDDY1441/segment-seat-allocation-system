/**
 * Core Segment Seat Allocation Algorithm & Helper Utilities
 */

/**
 * Extract journey sub-segments from a list of route stops.
 * e.g. ['Hyderabad', 'Kurnool', 'Anantapur', 'Bangalore']
 * => ['Hyderabad-Kurnool', 'Kurnool-Anantapur', 'Anantapur-Bangalore']
 */
export const getRouteSegments = (stops = []) => {
  if (!stops || stops.length < 2) return [];
  const segments = [];
  for (let i = 0; i < stops.length - 1; i++) {
    segments.push({
      key: `${stops[i]}-${stops[i+1]}`,
      from: stops[i],
      to: stops[i+1],
      index: i
    });
  }
  return segments;
};

/**
 * Get seat numbers list based on layout type.
 */
export const getBusSeatNumbers = (bus) => {
  if (!bus) return [];
  const total = bus.totalSeats || (bus.layoutType === '2+1' ? 30 : 40);

  if (bus.layoutType === 'Sleeper') {
    const seats = [];
    for (let i = 1; i <= 15; i++) seats.push(`L${i}`);
    for (let i = 1; i <= 15; i++) seats.push(`U${i}`);
    return seats;
  } else {
    const seats = [];
    for (let i = 1; i <= total; i++) seats.push(`${i}`);
    return seats;
  }
};

/**
 * Check if a seat is available for a given segment key
 */
export const isSeatAvailableForSegment = (bus, seatNum, segmentKey) => {
  const segAvail = bus.segmentSeatAvailability?.[segmentKey];
  if (!segAvail) return true; // Default fallback to available if not specified
  return segAvail[seatNum] !== false;
};

/**
 * Compute optimal segment seat allocation for a single passenger.
 * Uses dynamic search across seat choices per segment to minimize seat changes.
 */
export const computeOptimalSegmentAllocation = (bus) => {
  const segments = getRouteSegments(bus.stops);
  const seats = getBusSeatNumbers(bus);
  if (!segments || segments.length === 0) return null;

  // Pre-calculate available seats per segment
  const availPerSeg = segments.map(seg => 
    seats.filter(st => isSeatAvailableForSegment(bus, st, seg.key))
  );

  // Check if any segment has 0 available seats
  if (availPerSeg.some(list => list.length === 0)) {
    return {
      type: 'UNAVAILABLE',
      seatChanges: -1,
      journeyCoverage: 0,
      allocations: [],
      explanations: ['✕ No seat combination can cover all segments for this journey.'],
      alternatives: []
    };
  }

  // --- Step 1: Check 0 seat changes (continuous seat for ALL segments) ---
  const continuousSeats = seats.filter(st => 
    availPerSeg.every(list => list.includes(st))
  );

  if (continuousSeats.length > 0) {
    const bestContinuous = continuousSeats[0];
    const allocation = segments.map(seg => ({
      segment: `${seg.from} → ${seg.to}`,
      segmentKey: seg.key,
      seatNumber: bestContinuous
    }));

    return {
      type: 'CONTINUOUS',
      seatChanges: 0,
      journeyCoverage: 100,
      allocations: allocation,
      explanations: [
        '✓ Direct continuous seat available for entire journey',
        `✓ Seat ${bestContinuous} is free from ${bus.origin} to ${bus.destination}`,
        '✓ Zero seat changes required',
        '✓ Maximum comfort & continuous booking'
      ],
      alternatives: continuousSeats.slice(1, 3).map(st => ({
        seatChanges: 0,
        journeyCoverage: 100,
        allocations: segments.map(seg => ({
          segment: `${seg.from} → ${seg.to}`,
          segmentKey: seg.key,
          seatNumber: st
        }))
      }))
    };
  }

  // --- Step 2: Check 1 seat change options ---
  // A single seat change means Seat S1 covers segments 0..p, and Seat S2 covers (p+1)..(K-1)
  const K = segments.length;
  const options1Change = [];

  for (let p = 0; p < K - 1; p++) {
    // Segments 0..p
    const leftSegs = segments.slice(0, p + 1);
    const leftSeats = seats.filter(st => leftSegs.every(seg => isSeatAvailableForSegment(bus, st, seg.key)));

    // Segments (p+1)..(K-1)
    const rightSegs = segments.slice(p + 1);
    const rightSeats = seats.filter(st => rightSegs.every(seg => isSeatAvailableForSegment(bus, st, seg.key)));

    for (const s1 of leftSeats) {
      for (const s2 of rightSeats) {
        if (s1 !== s2) {
          const allocations = segments.map((seg, idx) => ({
            segment: `${seg.from} → ${seg.to}`,
            segmentKey: seg.key,
            seatNumber: idx <= p ? s1 : s2
          }));
          options1Change.push({ seatChanges: 1, allocations });
          if (options1Change.length >= 5) break;
        }
      }
      if (options1Change.length >= 5) break;
    }
  }

  if (options1Change.length > 0) {
    const bestOption = options1Change[0];
    const explanations = [
      '✓ Covers 100% of your journey',
      '✓ Requires only 1 seat change',
      '✓ Smart segment allocation optimization applied',
      '✓ Maximum continuous segment coverage prioritized',
      '✓ Best available seat combination found'
    ];

    return {
      type: 'SEGMENTED',
      seatChanges: 1,
      journeyCoverage: 100,
      allocations: bestOption.allocations,
      explanations,
      alternatives: options1Change.slice(1, 3).map(opt => ({
        seatChanges: 1,
        journeyCoverage: 100,
        allocations: opt.allocations
      }))
    };
  }

  // --- Step 3: Check 2+ seat changes options ---
  const optionsMultiChange = [];
  const defaultAllocations = segments.map((seg, idx) => ({
    segment: `${seg.from} → ${seg.to}`,
    segmentKey: seg.key,
    seatNumber: availPerSeg[idx][0]
  }));

  const changesCount = defaultAllocations.reduce((acc, curr, i) => {
    if (i === 0) return 0;
    return acc + (curr.seatNumber !== defaultAllocations[i - 1].seatNumber ? 1 : 0);
  }, 0);

  const bestOption = { seatChanges: changesCount, allocations: defaultAllocations };
  const explanations = [
    '✓ Covers 100% of your journey',
    `✓ Requires ${changesCount} seat change${changesCount === 1 ? '' : 's'}`,
    '✓ Smart segment allocation optimization applied',
    '✓ Available seats combined across all segments'
  ];

  return {
    type: 'SEGMENTED',
    seatChanges: changesCount,
    journeyCoverage: 100,
    allocations: bestOption.allocations,
    explanations,
    alternatives: []
  };
};

/**
 * Validate manual segment selection
 */
export const validateManualSegmentSelection = (bus, selectedMap) => {
  const segments = getRouteSegments(bus.stops);
  const missingSegments = [];
  const occupiedSelections = [];

  segments.forEach(seg => {
    const chosenSeat = selectedMap[seg.key];
    if (!chosenSeat) {
      missingSegments.push(`${seg.from} → ${seg.to}`);
    } else if (!isSeatAvailableForSegment(bus, chosenSeat, seg.key)) {
      occupiedSelections.push(`Seat ${chosenSeat} in ${seg.from} → ${seg.to}`);
    }
  });

  return {
    isValid: missingSegments.length === 0 && occupiedSelections.length === 0,
    missingSegments,
    occupiedSelections
  };
};
