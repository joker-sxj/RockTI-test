export const DIMENSIONS = ["EN", "HV", "RB", "EX", "CX", "EM", "RT", "ST"] as const;

export type DimensionKey = (typeof DIMENSIONS)[number];

export type DimensionScores = Record<DimensionKey, number>;

export type Option = {
  id: string;
  text: string;
  scores: Partial<DimensionScores>;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export type RockProfile = {
  id: string;
  genre: string;
  personaName: string;
  tagline: string;
  prototype: DimensionScores;
  analysis: string;
  strengths: string[];
  blindspots: string[];
  bandsGlobal: string[];
  bandsChinese: string[];
  scenes: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  imageFile: string;
};

export type RankedResult = RockProfile & {
  distance: number;
  match: number;
};

export type RocktiResult = {
  userScores: DimensionScores;
  primary: RankedResult;
  secondary: RankedResult;
  third: RankedResult;
  isHybrid: boolean;
  completedAt: string;
};

export type UserAnswerMap = Record<string, string>;
