import { applyWhen, required, schema } from "@angular/forms/signals";

export interface AnonymousProfileAppearance {
    jobCategoryId: number;
    jobEngagements: number[];
    preferredPositions: string | null;
    softSkills: number[],
    itAreas: number[];
    techStacks: number[];
    workplaceTypes: number[];
    cities: number[];
}

export const ITCategoryId: number = 3;

export interface ProfileAppearanceModel {
    jobCategoryId: number | null;
    jobEngagements: number[] | null;
    preferredPositions: string;
    softSkills: number[] | null;
    itAreas: number[] | null;
    techStacks: number[] | null;
    workplaceTypes: number[] | null;
    cities: number[] | null;
}

export const initalData: ProfileAppearanceModel = {
    jobCategoryId: null,
    jobEngagements: null,
    preferredPositions: '',
    softSkills: null,
    itAreas: null,
    techStacks: null,
    workplaceTypes: null,
    cities: null
}

export const profileAppearanceSchema = schema<ProfileAppearanceModel>((roothPath) => {
    required(roothPath.jobCategoryId, { message: 'Job category is required!' }),
        required(roothPath.jobEngagements, { message: 'You have to select at least one job engagement!' }),
        // TODO: preferedPositions - set length
        required(roothPath.softSkills, { message: 'You have to select at least one soft skill!' }),
        required(roothPath.workplaceTypes, { message: 'You have to select at least one work place type!' }),
        required(roothPath.cities, { message: 'You have to select at least one city!' }),
        applyWhen(
            roothPath.itAreas,
            ({ valueOf }) => valueOf(roothPath.jobCategoryId) === ITCategoryId,
            (itAreasPath) => {
                required(itAreasPath, { message: 'You have to select atleast one IT area!' })
            }
        ),
        applyWhen(
            roothPath.techStacks,
            ({ valueOf }) => valueOf(roothPath.jobCategoryId) === ITCategoryId,
            (techStackPath) => {
                required(techStackPath, { message: 'You have to select atleast one Tech Stack' })
            }
        )
});