// src/config/timeConfig.js

// ==========================================
// 📅 TIME CONFIGURATION
// ==========================================

// Note: formats are YYYY-MM-DDTHH:mm:ss
// These are treated as Local Time by the browser. 
// If you need strict UTC, append 'Z' to the string (e.g., "...00Z").

// Updated to March 1st, 2026 at 12:00 AM
export const PREFEST_START = new Date("2026-03-01T00:00:00");

// Updated to March 18th, 2026 at 11:00 AM
export const FEST_START = new Date("2026-03-18T11:00:00");

// ==========================================
// ⚙️ ANIMATION SETTINGS
// ==========================================

export const TICK_SETTINGS = {
  DURATION: 0.4,       // Duration of the minute hand tick animation
  ELASTICITY: 1.2,     // Bounciness of the minute hand
  DEGREES_PER_TICK: 6, // 6 degrees per second (standard clock movement)
};

// ==========================================
// 📐 ANGLE MAPPING
// ==========================================

// Maps the text on your ring image to specific degrees (0-360)
// 0 is usually 12 o'clock, 90 is 3 o'clock, etc.
const RING_SEGMENTS = {
  "The Moment You've Waited For...": 0,    // End point
  "A Distant Moment": 45,                  // New Start point
  "Beyond The Horizon": 90,
  "Taking Shape": 135,                     
  "Prefest: The Journey Begins...": 180,
  "On The Way": 225,
  "Almost There": 270,
  "At The Threshold": 315,
};

// ==========================================
// 🧮 HELPER FUNCTIONS
// ==========================================

export function getClockRotation(startSegmentText, endSegmentText) {
  const now = new Date();
  
  // 1. Get the angles for the start and end markers
  const startAngle = RING_SEGMENTS[startSegmentText] ?? 45; // Defaulting fallback to 45
  let endAngle = RING_SEGMENTS[endSegmentText] ?? 0;

  // 2. Handle wrap-around (e.g., starting at 45 and ending at 0/360)
  if (endAngle < startAngle) {
    endAngle += 360;
  }

  // 3. Calculate Time Progress
  const tStart = PREFEST_START.getTime();
  const tEnd = FEST_START.getTime();
  const tNow = now.getTime();
  
  const totalDuration = tEnd - tStart;
  const elapsed = tNow - tStart;

  // 4. Normalize progress between 0.0 and 1.0
  let progress = elapsed / totalDuration;
  progress = Math.min(Math.max(progress, 0), 1); // Clamp values so it doesn't spin past the end

  // 5. Map progress to the rotation range
  const totalRotationSpan = endAngle - startAngle;
  
  return startAngle + (progress * totalRotationSpan);
}

/**
 * Returns the current Second (0-59).
 * Used to trigger the 'tick' animation.
 */
export function getCurrentSecond() {
  return new Date().getSeconds();
}

/**
 * Calculates the initial visual rotation for the 'Minute/Second Hand'
 * so it starts at the correct position immediately.
 */
export function getInitialRotation() {
  return new Date().getSeconds() * TICK_SETTINGS.DEGREES_PER_TICK;
}