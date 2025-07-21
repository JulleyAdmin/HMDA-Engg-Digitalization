/**
 * HMDA Project Data Generation - Main Entry Point
 * Complete data generation system with validation and export capabilities
 */

import { HMDAProjectGenerator } from './algorithms/data-generator';
import { ProjectDataValidator, ProjectValidationSummary } from './validation/validation-rules';
import { sampleProjects } from './samples/sample-projects';
import { HMDAProject, ProjectCategory, ProjectType } from './schemas/project-schema';

export class HMDADataGenerationSystem {
  private generator: HMDAProjectGenerator;
  private validator: ProjectDataValidator;

  constructor() {
    this.generator = HMDAProjectGenerator.getInstance();
    this.validator = new ProjectDataValidator();
  }

  /**
   * Generate complete dataset of 150 HMDA projects
   */
  async generateCompleteDataset(): Promise<{
    projects: HMDAProject[];
    validationSummary: ProjectValidationSummary;
    statistics: ProjectStatistics;
  }> {
    console.log('🚀 Starting HMDA project data generation...');
    
    // Generate 150 projects with realistic distribution
    const projects = this.generator.generateProjects(150);
    
    console.log('✅ Generated 150 projects successfully');
    console.log('🔍 Running validation checks...');
    
    // Validate all projects
    const validationSummary = this.validator.validateProjects(projects);
    
    console.log('📊 Calculating statistics...');
    
    // Calculate statistics
    const statistics = this.calculateStatistics(projects);
    
    console.log('✨ Data generation complete!');
    
    return {
      projects,
      validationSummary,
      statistics
    };
  }

  /**
   * Generate projects for specific category and type
   */
  generateProjectsByFilter(filters: {
    category?: ProjectCategory;
    type?: ProjectType;
    count?: number;
  }): HMDAProject[] {
    const { category, type, count = 10 } = filters;
    const projects: HMDAProject[] = [];

    for (let i = 0; i < count; i++) {
      const project = this.generator.generateProject({
        category: category || this.getRandomCategory(),
        type: type || this.getRandomType(),
        completionPercentage: this.getRandomProgress()
      });
      projects.push(project);
    }

    return projects;
  }

  /**
   * Get sample projects for demonstration
   */
  getSampleProjects(): HMDAProject[] {
    return sampleProjects;
  }

  /**
   * Validate projects and return detailed report
   */
  validateProjects(projects: HMDAProject[]): ProjectValidationSummary {
    return this.validator.validateProjects(projects);
  }

  /**
   * Export projects to various formats
   */
  exportProjects(projects: HMDAProject[], format: 'json' | 'csv' | 'excel'): string | Buffer {
    switch (format) {
      case 'json':
        return this.exportToJSON(projects);
      case 'csv':
        return this.exportToCSV(projects);
      case 'excel':
        return this.exportToExcel(projects);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Generate realistic project distribution
   */
  generateProjectDistribution(): ProjectDistribution {
    return {
      byCategory: {
        [ProjectCategory.SMALL]: 60,
        [ProjectCategory.MEDIUM]: 45,
        [ProjectCategory.LARGE]: 30,
        [ProjectCategory.MEGA]: 10,
        [ProjectCategory.SPECIAL]: 5
      },
      byType: {
        [ProjectType.BUILDING_PERMISSION]: 30,
        [ProjectType.INFRASTRUCTURE]: 25,
        [ProjectType.ROAD_DEVELOPMENT]: 20,
        [ProjectType.WATER_SUPPLY]: 15,
        [ProjectType.RESIDENTIAL_LAYOUT]: 15,
        [ProjectType.SEWERAGE]: 12,
        [ProjectType.COMMERCIAL_COMPLEX]: 10,
        [ProjectType.PARKS_RECREATION]: 8,
        [ProjectType.INDUSTRIAL_DEVELOPMENT]: 8,
        [ProjectType.SMART_CITY]: 7
      },
      byStatus: {
        'PLANNED': 15,
        'IN_PROGRESS': 65,
        'COMPLETED': 15,
        'ON_HOLD': 3,
        'CANCELLED': 2
      },
      byZone: {
        'Zone 1 (Secunderabad)': 25,
        'Zone 2 (Hyderabad)': 30,
        'Zone 3 (Kukatpally)': 25,
        'Zone 4 (Charminar)': 20,
        'Zone 5 (L.B. Nagar)': 25,
        'Zone 6 (Rajendranagar)': 25
      }
    };
  }

  /**
   * Calculate comprehensive project statistics
   */
  private calculateStatistics(projects: HMDAProject[]): ProjectStatistics {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((sum, p) => sum + p.estimatedCost, 0);
    const averageBudget = totalBudget / totalProjects;

    // Category breakdown
    const categoryStats = this.calculateCategoryStats(projects);
    
    // Type breakdown
    const typeStats = this.calculateTypeStats(projects);
    
    // Status breakdown
    const statusStats = this.calculateStatusStats(projects);
    
    // Progress statistics
    const progressStats = this.calculateProgressStats(projects);
    
    // Financial statistics
    const financialStats = this.calculateFinancialStats(projects);
    
    // Timeline statistics
    const timelineStats = this.calculateTimelineStats(projects);

    return {
      overview: {
        totalProjects,
        totalBudget,
        averageBudget,
        averageProgress: projects.reduce((sum, p) => sum + p.overallProgress, 0) / totalProjects,
        averageDuration: projects.reduce((sum, p) => sum + p.duration, 0) / totalProjects
      },
      categoryBreakdown: categoryStats,
      typeBreakdown: typeStats,
      statusBreakdown: statusStats,
      progressDistribution: progressStats,
      financialAnalysis: financialStats,
      timelineAnalysis: timelineStats,
      riskAnalysis: this.calculateRiskStats(projects),
      geographicalDistribution: this.calculateGeographicalStats(projects)
    };
  }

  private calculateCategoryStats(projects: HMDAProject[]): Record<string, CategoryStats> {
    const stats: Record<string, CategoryStats> = {};
    
    Object.values(ProjectCategory).forEach(category => {
      const categoryProjects = projects.filter(p => p.category === category);
      const totalBudget = categoryProjects.reduce((sum, p) => sum + p.estimatedCost, 0);
      const averageProgress = categoryProjects.length > 0 
        ? categoryProjects.reduce((sum, p) => sum + p.overallProgress, 0) / categoryProjects.length 
        : 0;

      stats[category] = {
        count: categoryProjects.length,
        percentage: (categoryProjects.length / projects.length) * 100,
        totalBudget,
        averageBudget: categoryProjects.length > 0 ? totalBudget / categoryProjects.length : 0,
        averageProgress,
        averageDuration: categoryProjects.length > 0 
          ? categoryProjects.reduce((sum, p) => sum + p.duration, 0) / categoryProjects.length 
          : 0
      };
    });

    return stats;
  }

  private calculateTypeStats(projects: HMDAProject[]): Record<string, TypeStats> {
    const stats: Record<string, TypeStats> = {};
    
    Object.values(ProjectType).forEach(type => {
      const typeProjects = projects.filter(p => p.type === type);
      const totalBudget = typeProjects.reduce((sum, p) => sum + p.estimatedCost, 0);

      stats[type] = {
        count: typeProjects.length,
        percentage: (typeProjects.length / projects.length) * 100,
        totalBudget,
        averageBudget: typeProjects.length > 0 ? totalBudget / typeProjects.length : 0,
        completedProjects: typeProjects.filter(p => p.status === 'COMPLETED').length,
        activeProjects: typeProjects.filter(p => p.status === 'IN_PROGRESS').length
      };
    });

    return stats;
  }

  private calculateStatusStats(projects: HMDAProject[]): Record<string, StatusStats> {
    const statuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED'];
    const stats: Record<string, StatusStats> = {};
    
    statuses.forEach(status => {
      const statusProjects = projects.filter(p => p.status === status);
      const totalBudget = statusProjects.reduce((sum, p) => sum + p.estimatedCost, 0);

      stats[status] = {
        count: statusProjects.length,
        percentage: (statusProjects.length / projects.length) * 100,
        totalBudget,
        averageProgress: statusProjects.length > 0 
          ? statusProjects.reduce((sum, p) => sum + p.overallProgress, 0) / statusProjects.length 
          : 0
      };
    });

    return stats;
  }

  private calculateProgressStats(projects: HMDAProject[]): ProgressDistribution {
    const ranges = [
      { min: 0, max: 20, label: '0-20%' },
      { min: 21, max: 40, label: '21-40%' },
      { min: 41, max: 60, label: '41-60%' },
      { min: 61, max: 80, label: '61-80%' },
      { min: 81, max: 100, label: '81-100%' }
    ];

    const distribution: Record<string, number> = {};
    
    ranges.forEach(range => {
      const count = projects.filter(p => 
        p.overallProgress >= range.min && p.overallProgress <= range.max
      ).length;
      distribution[range.label] = count;
    });

    return {
      ranges: distribution,
      averageProgress: projects.reduce((sum, p) => sum + p.overallProgress, 0) / projects.length,
      completedProjects: projects.filter(p => p.overallProgress === 100).length,
      stagnantProjects: projects.filter(p => p.overallProgress < 20 && p.status === 'IN_PROGRESS').length
    };
  }

  private calculateFinancialStats(projects: HMDAProject[]): FinancialAnalysis {
    const totalEstimated = projects.reduce((sum, p) => sum + p.estimatedCost, 0);
    const totalApproved = projects.reduce((sum, p) => sum + (p.approvedBudget || 0), 0);
    const totalUtilized = projects.reduce((sum, p) => sum + (p.financialDetails?.utilizedAmount || 0), 0);

    return {
      totalEstimatedCost: totalEstimated,
      totalApprovedBudget: totalApproved,
      totalUtilizedAmount: totalUtilized,
      budgetVariance: ((totalApproved - totalEstimated) / totalEstimated) * 100,
      utilizationRate: (totalUtilized / totalApproved) * 100,
      costOverruns: projects.filter(p => (p.actualCost || 0) > p.estimatedCost).length,
      fundingSourceDistribution: this.calculateFundingDistribution(projects)
    };
  }

  private calculateTimelineStats(projects: HMDAProject[]): TimelineAnalysis {
    const now = new Date();
    const delayedProjects = projects.filter(p => {
      if (p.status === 'COMPLETED') {
        return p.actualCompletionDate && p.actualCompletionDate > p.plannedCompletionDate;
      } else {
        return now > p.plannedCompletionDate;
      }
    });

    const averageDelay = delayedProjects.reduce((sum, p) => {
      const planned = p.plannedCompletionDate.getTime();
      const actual = p.actualCompletionDate?.getTime() || now.getTime();
      return sum + (actual - planned) / (1000 * 60 * 60 * 24); // days
    }, 0) / delayedProjects.length;

    return {
      onTimeProjects: projects.length - delayedProjects.length,
      delayedProjects: delayedProjects.length,
      averageDelay: Math.round(averageDelay) || 0,
      projectsNearingDeadline: projects.filter(p => {
        const daysToDeadline = (p.plannedCompletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return daysToDeadline > 0 && daysToDeadline <= 30 && p.status === 'IN_PROGRESS';
      }).length
    };
  }

  private calculateRiskStats(projects: HMDAProject[]): RiskAnalysis {
    const allRisks = projects.flatMap(p => p.risks);
    const activeRisks = allRisks.filter(r => r.status === 'ACTIVE');
    
    const risksByCategory: Record<string, number> = {};
    const risksByLevel: Record<string, number> = {};
    
    activeRisks.forEach(risk => {
      risksByCategory[risk.category] = (risksByCategory[risk.category] || 0) + 1;
      risksByLevel[risk.probability] = (risksByLevel[risk.probability] || 0) + 1;
    });

    return {
      totalRisks: allRisks.length,
      activeRisks: activeRisks.length,
      mitigatedRisks: allRisks.filter(r => r.status === 'MITIGATED').length,
      risksByCategory,
      risksByProbability: risksByLevel,
      highRiskProjects: projects.filter(p => 
        p.risks.some(r => r.probability === 'HIGH' && r.impact === 'HIGH' && r.status === 'ACTIVE')
      ).length
    };
  }

  private calculateGeographicalStats(projects: HMDAProject[]): GeographicalDistribution {
    const zoneDistribution: Record<string, number> = {};
    const circleDistribution: Record<string, number> = {};
    
    projects.forEach(project => {
      const zone = project.location.zone;
      const circle = project.location.circle;
      
      zoneDistribution[zone] = (zoneDistribution[zone] || 0) + 1;
      circleDistribution[circle] = (circleDistribution[circle] || 0) + 1;
    });

    return {
      byZone: zoneDistribution,
      byCircle: circleDistribution,
      topLocalities: this.getTopLocalities(projects)
    };
  }

  private getTopLocalities(projects: HMDAProject[]): Array<{ locality: string; count: number }> {
    const localityCount: Record<string, number> = {};
    
    projects.forEach(project => {
      const locality = project.location.locality;
      localityCount[locality] = (localityCount[locality] || 0) + 1;
    });

    return Object.entries(localityCount)
      .map(([locality, count]) => ({ locality, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private calculateFundingDistribution(projects: HMDAProject[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    projects.forEach(project => {
      project.fundingSource.forEach(source => {
        distribution[source] = (distribution[source] || 0) + 1;
      });
    });

    return distribution;
  }

  // Utility methods
  private getRandomCategory(): ProjectCategory {
    const categories = Object.values(ProjectCategory);
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private getRandomType(): ProjectType {
    const types = Object.values(ProjectType);
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomProgress(): number {
    return Math.floor(Math.random() * 101);
  }

  // Export methods
  private exportToJSON(projects: HMDAProject[]): string {
    return JSON.stringify(projects, null, 2);
  }

  private exportToCSV(projects: HMDAProject[]): string {
    const headers = [
      'Project ID', 'Project Name', 'Category', 'Type', 'Status', 'Estimated Cost',
      'Approved Budget', 'Overall Progress', 'Zone', 'Locality', 'Planned Start',
      'Planned Completion', 'Current Stage'
    ];

    const rows = projects.map(p => [
      p.projectId,
      p.projectName,
      p.category,
      p.type,
      p.status,
      p.estimatedCost,
      p.approvedBudget || '',
      p.overallProgress,
      p.location.zone,
      p.location.locality,
      p.plannedStartDate.toISOString().split('T')[0],
      p.plannedCompletionDate.toISOString().split('T')[0],
      p.currentStage
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  private exportToExcel(projects: HMDAProject[]): Buffer {
    // This would require a library like 'xlsx' to generate actual Excel files
    // For now, return CSV data as Buffer
    const csvData = this.exportToCSV(projects);
    return Buffer.from(csvData, 'utf-8');
  }
}

// Type definitions for statistics
export interface ProjectStatistics {
  overview: {
    totalProjects: number;
    totalBudget: number;
    averageBudget: number;
    averageProgress: number;
    averageDuration: number;
  };
  categoryBreakdown: Record<string, CategoryStats>;
  typeBreakdown: Record<string, TypeStats>;
  statusBreakdown: Record<string, StatusStats>;
  progressDistribution: ProgressDistribution;
  financialAnalysis: FinancialAnalysis;
  timelineAnalysis: TimelineAnalysis;
  riskAnalysis: RiskAnalysis;
  geographicalDistribution: GeographicalDistribution;
}

export interface CategoryStats {
  count: number;
  percentage: number;
  totalBudget: number;
  averageBudget: number;
  averageProgress: number;
  averageDuration: number;
}

export interface TypeStats {
  count: number;
  percentage: number;
  totalBudget: number;
  averageBudget: number;
  completedProjects: number;
  activeProjects: number;
}

export interface StatusStats {
  count: number;
  percentage: number;
  totalBudget: number;
  averageProgress: number;
}

export interface ProgressDistribution {
  ranges: Record<string, number>;
  averageProgress: number;
  completedProjects: number;
  stagnantProjects: number;
}

export interface FinancialAnalysis {
  totalEstimatedCost: number;
  totalApprovedBudget: number;
  totalUtilizedAmount: number;
  budgetVariance: number;
  utilizationRate: number;
  costOverruns: number;
  fundingSourceDistribution: Record<string, number>;
}

export interface TimelineAnalysis {
  onTimeProjects: number;
  delayedProjects: number;
  averageDelay: number;
  projectsNearingDeadline: number;
}

export interface RiskAnalysis {
  totalRisks: number;
  activeRisks: number;
  mitigatedRisks: number;
  risksByCategory: Record<string, number>;
  risksByProbability: Record<string, number>;
  highRiskProjects: number;
}

export interface GeographicalDistribution {
  byZone: Record<string, number>;
  byCircle: Record<string, number>;
  topLocalities: Array<{ locality: string; count: number }>;
}

export interface ProjectDistribution {
  byCategory: Record<ProjectCategory, number>;
  byType: Record<ProjectType, number>;
  byStatus: Record<string, number>;
  byZone: Record<string, number>;
}

// Export the main class and utilities
export default HMDADataGenerationSystem;
export { HMDAProjectGenerator } from './algorithms/data-generator';
export { ProjectDataValidator } from './validation/validation-rules';
export { sampleProjects } from './samples/sample-projects';
export * from './schemas/project-schema';