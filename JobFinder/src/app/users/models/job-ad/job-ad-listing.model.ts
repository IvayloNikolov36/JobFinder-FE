export interface JobAdListing {
      id: number;
      position: string;
      postedOn: string;
      jobCategory: string;
      jobEngagement: string;
      minSalary: number | null;
      maxSalary: number | null;
      currency: string | null;
      location: string;
      salary: string | null;
}
