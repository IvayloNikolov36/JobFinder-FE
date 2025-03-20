export interface WorkExperienceOutput {
  id: number;
  fromDate: string;
  toDate: string;
  jobTitle: string;
  organization: string;
  businessSectorId: number;
  location: string;
  additionalDetails: string | null;
}
