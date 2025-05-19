export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  visas: string[];
  resumeUrl: string;
  additionalInfo: string;
  status: 'PENDING' | 'REACHED_OUT';
}

export interface LeadFormData extends Omit<Lead, 'id' | 'status' | 'resumeUrl'> {
  resume: File | null;
}