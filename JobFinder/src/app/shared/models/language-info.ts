import { BasicModel } from "../../core/models";

export interface LanguageInfo {
  id: number;
  languageType: BasicModel<number>;
  comprehensionLevel: BasicModel<number>;
  speakingLevel: BasicModel<number>;
  writingLevel: BasicModel<number>;
  includeInAnonymousProfile: boolean | null;
}
