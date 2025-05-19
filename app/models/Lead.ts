import { Schema, Document, models, model } from "mongoose";

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedin?: string;
  visaInterest: string[];
  helpText: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  linkedin: { type: String },
  visaInterest: [{ type: String }],
  helpText: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Lead || model<ILead>("Lead", LeadSchema);

/* Author
Your Name – Muhammad Usman
Email: usmenqurashi@gmail.com */