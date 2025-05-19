import { connectDB } from "@/app/lib/database";
import Lead from "../../models/Lead";
import { getAllLead } from "@/app/lib/services/leads-service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  const body = await req.json();
  console.log("Received body:", body);
  const {
    firstName,
    lastName,
    email,
    country,
    linkedin,
    visaInterest,
    helpText,
  } = body;

  if (!firstName || !lastName || !email || !country) {
    return Response.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const newLead = new Lead({
      firstName,
      lastName,
      email,
      country,
      linkedin,
      visaInterest,
      helpText,
    });

    await newLead.save();

    return Response.json({ message: "Lead saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const forms = await getAllLead();
    return Response.json({ success: true, forms }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
