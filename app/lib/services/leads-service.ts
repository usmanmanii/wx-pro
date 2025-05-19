import Lead from "@/app/models/Lead";

export async function getAllLead() {
  try {
    const leads = await Lead.find();

    return {
      leads,
    };
  } catch (error) {
    console.error("Error getting Lead:", error);
    throw error;
  }
}
