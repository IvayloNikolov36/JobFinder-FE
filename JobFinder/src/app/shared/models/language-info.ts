import { BasicModel } from "../../core/models";

export interface LanguageInfo {
  id: number;
  languageType: BasicModel;
  comprehensionLevel: BasicModel;
  speakingLevel: BasicModel;
  writingLevel: BasicModel;
}
