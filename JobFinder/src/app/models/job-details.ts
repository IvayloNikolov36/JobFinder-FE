export interface JobDetails {
  id: number;
  description: string;
  position: string;
  postedOn: string;
  minSalary: number | null;
  maxSalary: number | null;
  currency: string | null;
  companyLogo: string;
  companyName: string;
  jobEngagement: string;
  location: string;
}
