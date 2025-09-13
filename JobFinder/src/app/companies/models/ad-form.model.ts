import { FormControl } from "@angular/forms";

export interface JobAdForm {
  position: FormControl<string>,
  description: FormControl<string>,
  minSalary: FormControl<number | null>,
  maxSalary: FormControl<number | null>,
  currencyId: FormControl<number | null>,
  jobCategoryId: FormControl<number>,
  jobEngagementId: FormControl<number>,
  intership: FormControl<boolean>,
  locationId: FormControl<number>,
  softSkills: FormControl<number[]>,
  techStacks: FormControl<number[]>,
  itAreas: FormControl<number[]>,
  workplaceTypeId: FormControl<number>
}