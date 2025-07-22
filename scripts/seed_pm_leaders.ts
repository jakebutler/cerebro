import { ConvexHttpClient } from "convex/browser";
import pmLeaders from "../documentation/pm-thought-leaders.json";

const convexUrl = process.env.CONVEX_URL!;
const client = new ConvexHttpClient(convexUrl);

async function seed() {
  // Convert nulls to undefined for Convex optional fields
  const cleaned = pmLeaders.map((leader: any) => {
    const cleanedLeader = { ...leader };
    if (cleanedLeader.linkedin === null) delete cleanedLeader.linkedin;
    if (cleanedLeader.podcast === null) delete cleanedLeader.podcast;
    return cleanedLeader;
  });
  await client.mutation("seed_pm_leaders:seedPmLeaders", { leaders: cleaned });
  console.log("Seeded pm_leaders with initial data");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
