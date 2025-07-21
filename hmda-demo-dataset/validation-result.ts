// Validation result interfaces for HMDA project data
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export interface ValidationSummary {
  totalProjects: number;
  validProjects: number;
  invalidProjects: number;
  totalWarnings: number;
  averageValidationScore: number;
  commonErrors: Array<{ error: string; count: number }>;
  recommendations: string[];
}