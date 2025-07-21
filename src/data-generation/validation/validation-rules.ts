/**
 * HMDA Project Data Validation Rules
 * Comprehensive validation rules for data consistency and integrity
 */

import {
  HMDAProject,
  ProjectCategory,
  ProjectType,
  ProjectStatus,
  ApprovalStatus,
  ValidationRule
} from '../schemas/project-schema';

export class ProjectDataValidator {
  private validationRules: ValidationRule[] = [
    // Basic Project Information Validation
    {
      field: 'projectId',
      rules: [
        {
          type: 'required',
          message: 'Project ID is required'
        },
        {
          type: 'pattern',
          value: /^HMDA-\d{4}-[A-Z]{3}-\d{4}$/,
          message: 'Project ID must follow format: HMDA-YYYY-XXX-NNNN'
        }
      ]
    },
    {
      field: 'projectCode',
      rules: [
        {
          type: 'required',
          message: 'Project code is required'
        },
        {
          type: 'pattern',
          value: /^Z[1-6]\/[A-Z]{2}\/\d{3}$/,
          message: 'Project code must follow format: ZN/XX/NNN'
        }
      ]
    },
    {
      field: 'projectName',
      rules: [
        {
          type: 'required',
          message: 'Project name is required'
        },
        {
          type: 'min',
          value: 10,
          message: 'Project name must be at least 10 characters'
        },
        {
          type: 'max',
          value: 200,
          message: 'Project name cannot exceed 200 characters'
        }
      ]
    },
    {
      field: 'estimatedCost',
      rules: [
        {
          type: 'required',
          message: 'Estimated cost is required'
        },
        {
          type: 'min',
          value: 100000,
          message: 'Estimated cost must be at least ₹1 lakh'
        },
        {
          type: 'custom',
          message: 'Estimated cost must align with project category',
          validator: (value: number, project: HMDAProject) => {
            const categoryLimits = {
              [ProjectCategory.SMALL]: { min: 1000000, max: 50000000 },
              [ProjectCategory.MEDIUM]: { min: 50000000, max: 500000000 },
              [ProjectCategory.LARGE]: { min: 500000000, max: 5000000000 },
              [ProjectCategory.MEGA]: { min: 5000000000, max: 200000000000 },
              [ProjectCategory.SPECIAL]: { min: 10000000, max: 1000000000 }
            };
            
            const limits = categoryLimits[project.category];
            return value >= limits.min && value <= limits.max;
          }
        }
      ]
    },

    // Timeline Validation
    {
      field: 'plannedStartDate',
      rules: [
        {
          type: 'required',
          message: 'Planned start date is required'
        },
        {
          type: 'custom',
          message: 'Planned start date cannot be more than 2 years in the past',
          validator: (value: Date) => {
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
            return new Date(value) >= twoYearsAgo;
          }
        }
      ]
    },
    {
      field: 'plannedCompletionDate',
      rules: [
        {
          type: 'required',
          message: 'Planned completion date is required'
        },
        {
          type: 'custom',
          message: 'Planned completion date must be after start date',
          validator: (value: Date, project: HMDAProject) => {
            return new Date(value) > new Date(project.plannedStartDate);
          }
        },
        {
          type: 'custom',
          message: 'Project duration must align with category guidelines',
          validator: (value: Date, project: HMDAProject) => {
            const startDate = new Date(project.plannedStartDate);
            const endDate = new Date(value);
            const durationMonths = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
            
            const categoryDurations = {
              [ProjectCategory.SMALL]: { min: 6, max: 18 },
              [ProjectCategory.MEDIUM]: { min: 12, max: 36 },
              [ProjectCategory.LARGE]: { min: 24, max: 60 },
              [ProjectCategory.MEGA]: { min: 36, max: 84 },
              [ProjectCategory.SPECIAL]: { min: 8, max: 30 }
            };
            
            const limits = categoryDurations[project.category];
            return durationMonths >= limits.min && durationMonths <= limits.max;
          }
        }
      ]
    },

    // Financial Validation
    {
      field: 'approvedBudget',
      rules: [
        {
          type: 'custom',
          message: 'Approved budget should be within 20% of estimated cost',
          validator: (value: number, project: HMDAProject) => {
            if (!value) return true; // Optional field
            const variance = Math.abs(value - project.estimatedCost) / project.estimatedCost;
            return variance <= 0.2;
          }
        }
      ]
    },

    // Location Validation
    {
      field: 'location.zone',
      rules: [
        {
          type: 'required',
          message: 'Zone is required'
        },
        {
          type: 'custom',
          message: 'Zone must be valid HMDA zone',
          validator: (value: string) => {
            const validZones = [
              'Zone 1 (Secunderabad)', 
              'Zone 2 (Hyderabad)', 
              'Zone 3 (Kukatpally)', 
              'Zone 4 (Charminar)', 
              'Zone 5 (L.B. Nagar)', 
              'Zone 6 (Rajendranagar)'
            ];
            return validZones.includes(value);
          }
        }
      ]
    },
    {
      field: 'location.latitude',
      rules: [
        {
          type: 'required',
          message: 'Latitude is required'
        },
        {
          type: 'custom',
          message: 'Latitude must be within Hyderabad bounds (17.2 to 17.6)',
          validator: (value: number) => {
            return value >= 17.2 && value <= 17.6;
          }
        }
      ]
    },
    {
      field: 'location.longitude',
      rules: [
        {
          type: 'required',
          message: 'Longitude is required'
        },
        {
          type: 'custom',
          message: 'Longitude must be within Hyderabad bounds (78.2 to 78.7)',
          validator: (value: number) => {
            return value >= 78.2 && value <= 78.7;
          }
        }
      ]
    },

    // Progress Validation
    {
      field: 'overallProgress',
      rules: [
        {
          type: 'required',
          message: 'Overall progress is required'
        },
        {
          type: 'min',
          value: 0,
          message: 'Progress cannot be negative'
        },
        {
          type: 'max',
          value: 100,
          message: 'Progress cannot exceed 100%'
        },
        {
          type: 'custom',
          message: 'Progress must align with project status',
          validator: (value: number, project: HMDAProject) => {
            switch (project.status) {
              case ProjectStatus.PLANNED:
                return value <= 10;
              case ProjectStatus.IN_PROGRESS:
                return value > 0 && value < 100;
              case ProjectStatus.COMPLETED:
                return value === 100;
              case ProjectStatus.ON_HOLD:
                return value >= 0 && value < 100;
              case ProjectStatus.CANCELLED:
                return value >= 0;
              default:
                return true;
            }
          }
        }
      ]
    },

    // Stakeholder Validation
    {
      field: 'stakeholders',
      rules: [
        {
          type: 'required',
          message: 'At least one stakeholder is required'
        },
        {
          type: 'custom',
          message: 'Must have at least one primary stakeholder',
          validator: (value: any[], project: HMDAProject) => {
            const primaryStakeholders = value.filter(s => s.responsibilityLevel === 'PRIMARY');
            return primaryStakeholders.length >= 1;
          }
        },
        {
          type: 'custom',
          message: 'Stakeholder count should align with project complexity',
          validator: (value: any[], project: HMDAProject) => {
            const complexityMultipliers = {
              [ProjectCategory.SMALL]: 1,
              [ProjectCategory.MEDIUM]: 1.5,
              [ProjectCategory.LARGE]: 2,
              [ProjectCategory.MEGA]: 3,
              [ProjectCategory.SPECIAL]: 1.8
            };
            
            const expectedMin = Math.round(3 * complexityMultipliers[project.category]);
            const expectedMax = Math.round(8 * complexityMultipliers[project.category]);
            
            return value.length >= expectedMin && value.length <= expectedMax;
          }
        }
      ]
    }
  ];

  /**
   * Validate a single project against all rules
   */
  validateProject(project: HMDAProject): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Run basic field validations
    for (const rule of this.validationRules) {
      const fieldValue = this.getNestedValue(project, rule.field);
      
      for (const validation of rule.rules) {
        const result = this.validateField(fieldValue, validation, project);
        if (!result.isValid) {
          errors.push({
            field: rule.field,
            message: validation.message,
            value: fieldValue,
            rule: validation.type
          });
        }
      }
    }

    // Run business logic validations
    const businessValidationResult = this.validateBusinessLogic(project);
    errors.push(...businessValidationResult.errors);
    warnings.push(...businessValidationResult.warnings);

    // Run stage-specific validations
    const stageValidationResult = this.validateStageData(project);
    errors.push(...stageValidationResult.errors);
    warnings.push(...stageValidationResult.warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: this.calculateValidationScore(errors, warnings)
    };
  }

  /**
   * Validate multiple projects and return summary
   */
  validateProjects(projects: HMDAProject[]): ProjectValidationSummary {
    const results = projects.map(project => ({
      projectId: project.projectId,
      result: this.validateProject(project)
    }));

    const validProjects = results.filter(r => r.result.isValid).length;
    const totalErrors = results.reduce((sum, r) => sum + r.result.errors.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.result.warnings.length, 0);
    const averageScore = results.reduce((sum, r) => sum + r.result.score, 0) / results.length;

    return {
      totalProjects: projects.length,
      validProjects,
      invalidProjects: projects.length - validProjects,
      totalErrors,
      totalWarnings,
      averageValidationScore: Math.round(averageScore * 100) / 100,
      projectResults: results,
      commonErrors: this.getCommonErrors(results),
      recommendations: this.generateRecommendations(results)
    };
  }

  private validateField(value: any, validation: any, project: HMDAProject): { isValid: boolean } {
    switch (validation.type) {
      case 'required':
        return { isValid: value != null && value !== '' };
      
      case 'min':
        if (typeof value === 'number') {
          return { isValid: value >= validation.value };
        }
        if (typeof value === 'string') {
          return { isValid: value.length >= validation.value };
        }
        return { isValid: true };
      
      case 'max':
        if (typeof value === 'number') {
          return { isValid: value <= validation.value };
        }
        if (typeof value === 'string') {
          return { isValid: value.length <= validation.value };
        }
        return { isValid: true };
      
      case 'pattern':
        if (typeof value === 'string') {
          return { isValid: validation.value.test(value) };
        }
        return { isValid: true };
      
      case 'custom':
        if (validation.validator) {
          return { isValid: validation.validator(value, project) };
        }
        return { isValid: true };
      
      default:
        return { isValid: true };
    }
  }

  private validateBusinessLogic(project: HMDAProject): {
    errors: ValidationError[];
    warnings: ValidationWarning[];
  } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate approval authority based on project cost
    const approvalAuthority = this.getRequiredApprovalAuthority(project.estimatedCost);
    if (!this.hasRequiredApprovalAuthority(project, approvalAuthority)) {
      warnings.push({
        field: 'approvalAuthority',
        message: `Project cost requires approval from ${approvalAuthority}`,
        suggestion: `Ensure proper approval workflow includes ${approvalAuthority}`
      });
    }

    // Validate funding sources alignment with project category
    if (!this.validateFundingSourcesForCategory(project.fundingSource, project.category)) {
      warnings.push({
        field: 'fundingSource',
        message: 'Funding sources may not be appropriate for project category',
        suggestion: 'Review funding strategy for project category alignment'
      });
    }

    // Validate technical specifications completeness
    if (!this.validateTechnicalSpecsCompleteness(project)) {
      warnings.push({
        field: 'technicalSpecs',
        message: 'Technical specifications appear incomplete',
        suggestion: 'Ensure all required technical parameters are specified'
      });
    }

    // Validate risk assessment adequacy
    if (!this.validateRiskAssessmentAdequacy(project)) {
      warnings.push({
        field: 'risks',
        message: 'Risk assessment may be inadequate for project complexity',
        suggestion: 'Consider comprehensive risk analysis for project category'
      });
    }

    return { errors, warnings };
  }

  private validateStageData(project: HMDAProject): {
    errors: ValidationError[];
    warnings: ValidationWarning[];
  } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate stage progression logic
    const stageOrder = [
      'stage1', 'stage2', 'stage3', 'stage4', 
      'stage5', 'stage6', 'stage7', 'stage8', 'stage9'
    ];

    let lastCompletedStage = -1;
    for (let i = 0; i < stageOrder.length; i++) {
      const stageKey = stageOrder[i] as keyof typeof project.stages;
      const stage = project.stages[stageKey];
      
      if (stage) {
        // Check if previous stages are completed
        if (i > lastCompletedStage + 1) {
          errors.push({
            field: `stages.${stageKey}`,
            message: `Stage ${i + 1} cannot be started before completing previous stages`,
            value: stage.status,
            rule: 'stageProgression'
          });
        }
        
        if (stage.status === ApprovalStatus.APPROVED) {
          lastCompletedStage = i;
        }
        
        // Validate stage-specific data integrity
        const stageValidationResult = this.validateIndividualStage(stage, i + 1, project);
        errors.push(...stageValidationResult.errors);
        warnings.push(...stageValidationResult.warnings);
      }
    }

    // Validate stage completion alignment with overall progress
    const expectedProgress = this.calculateExpectedProgressFromStages(project);
    if (Math.abs(project.overallProgress - expectedProgress) > 10) {
      warnings.push({
        field: 'overallProgress',
        message: 'Overall progress does not align with stage completion',
        suggestion: 'Review progress calculation methodology'
      });
    }

    return { errors, warnings };
  }

  private validateIndividualStage(stage: any, stageNumber: number, project: HMDAProject): {
    errors: ValidationError[];
    warnings: ValidationWarning[];
  } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Common validations for all stages
    if (stage.status === ApprovalStatus.APPROVED && !stage.completionDate) {
      errors.push({
        field: `stages.stage${stageNumber}.completionDate`,
        message: 'Approved stage must have completion date',
        value: stage.completionDate,
        rule: 'stageCompletion'
      });
    }

    if (stage.completionDate && stage.startDate && 
        new Date(stage.completionDate) < new Date(stage.startDate)) {
      errors.push({
        field: `stages.stage${stageNumber}.completionDate`,
        message: 'Completion date cannot be before start date',
        value: stage.completionDate,
        rule: 'dateLogic'
      });
    }

    // Stage-specific validations
    switch (stageNumber) {
      case 1: // Project Initiation
        if (stage.data?.projectProposal?.preliminaryBudget) {
          const variance = Math.abs(stage.data.projectProposal.preliminaryBudget - project.estimatedCost) / project.estimatedCost;
          if (variance > 0.15) {
            warnings.push({
              field: `stages.stage1.preliminaryBudget`,
              message: 'Preliminary budget varies significantly from final estimate',
              suggestion: 'Review budget estimation process'
            });
          }
        }
        break;
        
      case 4: // Tendering & Procurement
        if (stage.data?.awardDetails?.contractAmount) {
          const savings = (project.estimatedCost - stage.data.awardDetails.contractAmount) / project.estimatedCost;
          if (savings < 0) {
            warnings.push({
              field: `stages.stage4.contractAmount`,
              message: 'Contract amount exceeds estimated cost',
              suggestion: 'Review cost estimation and tender evaluation'
            });
          } else if (savings > 0.2) {
            warnings.push({
              field: `stages.stage4.contractAmount`,
              message: 'Unusually high savings in tender award',
              suggestion: 'Verify contractor capability and cost estimation'
            });
          }
        }
        break;
        
      case 6: // Project Execution
        if (stage.data?.progress) {
          const physicalProgress = stage.data.progress.physicalProgress;
          const financialProgress = stage.data.progress.financialProgress;
          
          if (Math.abs(physicalProgress - financialProgress) > 15) {
            warnings.push({
              field: `stages.stage6.progress`,
              message: 'Physical and financial progress are not aligned',
              suggestion: 'Review progress measurement methodology'
            });
          }
        }
        break;
    }

    return { errors, warnings };
  }

  // Utility methods
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private getRequiredApprovalAuthority(cost: number): string {
    if (cost >= 50_00_00_00_000) return 'Board'; // ₹500Cr+
    if (cost >= 20_00_00_00_000) return 'Commissioner'; // ₹200Cr+
    if (cost >= 10_00_00_00_000) return 'Secretary'; // ₹100Cr+
    if (cost >= 5_00_00_00_000) return 'Chief Engineer'; // ₹50Cr+
    if (cost >= 1_00_00_00_000) return 'Deputy Chief Engineer'; // ₹10Cr+
    if (cost >= 20_00_000) return 'Executive Engineer'; // ₹2Cr+
    return 'Assistant Executive Engineer';
  }

  private hasRequiredApprovalAuthority(project: HMDAProject, requiredAuthority: string): boolean {
    // This would check against actual approval records in stage data
    // For now, return true as this is sample validation
    return true;
  }

  private validateFundingSourcesForCategory(sources: string[], category: ProjectCategory): boolean {
    const appropriateSources = {
      [ProjectCategory.SMALL]: ['HMDA Internal Funds', 'State Government'],
      [ProjectCategory.MEDIUM]: ['HMDA Internal Funds', 'State Government', 'Central Government'],
      [ProjectCategory.LARGE]: ['State Government', 'Central Government', 'World Bank', 'ADB'],
      [ProjectCategory.MEGA]: ['Central Government', 'World Bank', 'ADB', 'Private Partnership'],
      [ProjectCategory.SPECIAL]: ['HMDA Internal Funds', 'State Government', 'Central Government']
    };

    const categoryAppropriate = appropriateSources[category];
    return sources.some(source => categoryAppropriate.includes(source));
  }

  private validateTechnicalSpecsCompleteness(project: HMDAProject): boolean {
    const specs = project.technicalSpecs;
    const requiredFields = {
      [ProjectType.BUILDING_PERMISSION]: ['area', 'floors'],
      [ProjectType.ROAD_DEVELOPMENT]: ['length'],
      [ProjectType.WATER_SUPPLY]: ['capacity'],
      [ProjectType.SEWERAGE]: ['capacity']
    };

    const required = requiredFields[project.type] || [];
    return required.every(field => specs[field] != null);
  }

  private validateRiskAssessmentAdequacy(project: HMDAProject): boolean {
    const expectedRiskCount = {
      [ProjectCategory.SMALL]: 3,
      [ProjectCategory.MEDIUM]: 4,
      [ProjectCategory.LARGE]: 6,
      [ProjectCategory.MEGA]: 8,
      [ProjectCategory.SPECIAL]: 5
    };

    return project.risks.length >= expectedRiskCount[project.category];
  }

  private calculateExpectedProgressFromStages(project: HMDAProject): number {
    const stageWeights = [10, 15, 20, 10, 10, 20, 5, 5, 5]; // Total: 100%
    let totalProgress = 0;

    const stages = [
      project.stages.stage1, project.stages.stage2, project.stages.stage3,
      project.stages.stage4, project.stages.stage5, project.stages.stage6,
      project.stages.stage7, project.stages.stage8, project.stages.stage9
    ];

    stages.forEach((stage, index) => {
      if (stage?.status === ApprovalStatus.APPROVED) {
        totalProgress += stageWeights[index];
      } else if (stage?.status === ApprovalStatus.IN_REVIEW) {
        totalProgress += stageWeights[index] * 0.5;
      }
    });

    return totalProgress;
  }

  private calculateValidationScore(errors: ValidationError[], warnings: ValidationWarning[]): number {
    const maxScore = 100;
    const errorPenalty = 10;
    const warningPenalty = 2;
    
    const penalty = (errors.length * errorPenalty) + (warnings.length * warningPenalty);
    return Math.max(0, maxScore - penalty);
  }

  private getCommonErrors(results: { projectId: string; result: ValidationResult }[]): Array<{ error: string; count: number }> {
    const errorCounts: Record<string, number> = {};
    
    results.forEach(({ result }) => {
      result.errors.forEach(error => {
        const key = `${error.field}: ${error.message}`;
        errorCounts[key] = (errorCounts[key] || 0) + 1;
      });
    });

    return Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private generateRecommendations(results: { projectId: string; result: ValidationResult }[]): string[] {
    const recommendations: string[] = [];
    const commonIssues = this.getCommonErrors(results);

    if (commonIssues.length > 0) {
      recommendations.push('Address common validation errors across multiple projects');
    }

    const lowScoreProjects = results.filter(r => r.result.score < 70).length;
    if (lowScoreProjects > results.length * 0.2) {
      recommendations.push('Review data quality processes - over 20% of projects have low validation scores');
    }

    const totalWarnings = results.reduce((sum, r) => sum + r.result.warnings.length, 0);
    if (totalWarnings > results.length * 2) {
      recommendations.push('Consider implementing additional quality checks during data entry');
    }

    return recommendations;
  }
}

// Type definitions for validation results
export interface ValidationError {
  field: string;
  message: string;
  value: any;
  rule: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number; // 0-100 quality score
}

export interface ProjectValidationSummary {
  totalProjects: number;
  validProjects: number;
  invalidProjects: number;
  totalErrors: number;
  totalWarnings: number;
  averageValidationScore: number;
  projectResults: Array<{
    projectId: string;
    result: ValidationResult;
  }>;
  commonErrors: Array<{
    error: string;
    count: number;
  }>;
  recommendations: string[];
}