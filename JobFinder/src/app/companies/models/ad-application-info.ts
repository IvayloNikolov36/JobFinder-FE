export interface AdApplicationInfo {
    id: number;
    applicant: string;
    curriculumVitaeId: string;
    curriculumVitaeName: string;
    curriculumVitaePictureUrl: string;
    email: string;
    phone: string;
    appliedOn: Date;
    isPreviewed: boolean;
    previewDate: Date;
}
