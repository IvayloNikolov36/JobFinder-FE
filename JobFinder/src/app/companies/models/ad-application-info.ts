export interface AdApplicationInfo {
    id: number;
    applicant: string;
    jobAdId: number;
    curriculumVitaeId: string;
    curriculumVitaeName: string;
    curriculumVitaePictureUrl: string;
    email: string;
    phone: string;
    appliedOn: Date;
    firstPreviewDate: Date;
    latestPreviewDate: Date;
}
