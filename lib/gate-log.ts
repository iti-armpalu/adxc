export type GateEventLog = {
    createdAt: string;          // ISO
    country: string | null;     // "DE", "US"
    success: boolean;
  };
  
  export function logGateEvent(event: GateEventLog) {
    // One-line JSON so it’s easy to filter/export in logs
    console.log("[gate-event]", JSON.stringify(event));
  }
  