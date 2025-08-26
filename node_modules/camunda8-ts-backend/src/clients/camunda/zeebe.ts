import { ZBClient } from "zeebe-node";

let zbc: ZBClient | null = null;

export function getZeebeClient() {
  if (zbc) return zbc;

  const {
    C8_CLIENT_ID,
    C8_CLIENT_SECRET,
    C8_REGION,
    C8_CLUSTER_ID,
  } = process.env;

  if (!C8_CLIENT_ID || !C8_CLIENT_SECRET || !C8_REGION || !C8_CLUSTER_ID) {
    throw new Error("Missing Zeebe env vars: C8_CLIENT_ID, C8_CLIENT_SECRET, C8_REGION, C8_CLUSTER_ID");
  }

  zbc = new ZBClient({
    camundaCloud: {
      clientId: C8_CLIENT_ID,
      clientSecret: C8_CLIENT_SECRET,
      clusterId: C8_CLUSTER_ID,
      clusterRegion: C8_REGION,
    },
    // Optional: increase timeouts/retries here if needed
  });

  return zbc;
}