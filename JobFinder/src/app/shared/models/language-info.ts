import { BasicModel } from "../../models";

export interface LanguageInfo {
  id: number;
  languageType: BasicModel;
  comprehensionLevel: BasicModel;
  speakingLevel: BasicModel;
  writingLevel: BasicModel;
}
