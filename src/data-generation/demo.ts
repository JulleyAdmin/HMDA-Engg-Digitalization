/**
 * HMDA Data Generation System - Demonstration Script
 * Shows complete data generation, validation, and analysis capabilities
 */

import HMDADataGenerationSystem, { 
  ProjectStatistics, 
  ProjectValidationSummary 
} from './index';
import { 
  HMDAProject, 
  ProjectCategory, 
  ProjectType, 
  ProjectStatus 
} from './schemas/project-schema';

class HMDADataDemo {
  private dataSystem: HMDADataGenerationSystem;
  
  constructor() {
    this.dataSystem = new HMDADataGenerationSystem();
  }

  /**
   * Run complete demonstration of the data generation system
   */
  async runCompleteDemo(): Promise<void> {
    console.log('\n🏗️  HMDA PROJECT DATA GENERATION SYSTEM DEMO');
    console.log('=' .repeat(60));
    
    try {
      // 1. Generate complete dataset
      await this.demonstrateCompleteGeneration();
      
      // 2. Show sample projects
      await this.demonstrateSampleProjects();
      
      // 3. Generate filtered projects
      await this.demonstrateFilteredGeneration();
      
      // 4. Show validation capabilities
      await this.demonstrateValidation();
      
      // 5. Display statistics and analytics
      await this.demonstrateAnalytics();
      
      // 6. Show export capabilities
      await this.demonstrateExports();
      
      console.log('\n✅ Demo completed successfully!');
      console.log('\n📊 Summary: Generated production-ready data for 150 HMDA projects');
      console.log('   with comprehensive validation, statistics, and export capabilities.');
      
    } catch (error) {
      console.error('❌ Demo failed:', error);
    }
  }

  /**
   * Demonstrate complete dataset generation
   */
  private async demonstrateCompleteGeneration(): Promise<void> {
    console.log('\n🎯 1. COMPLETE DATASET GENERATION');
    console.log('-'.repeat(40));
    
    const startTime = Date.now();
    console.log('⏳ Generating 150 HMDA projects...');
    
    const result = await this.dataSystem.generateCompleteDataset();
    const endTime = Date.now();
    
    console.log(`✅ Generated ${result.projects.length} projects in ${endTime - startTime}ms`);
    console.log(`📈 Average validation score: ${result.validationSummary.averageValidationScore.toFixed(1)}/100`);
    console.log(`💰 Total estimated budget: ₹${(result.statistics.overview.totalBudget / 1_00_00_00_000).toFixed(1)} Thousand Crores`);
    console.log(`⏱️  Average project duration: ${result.statistics.overview.averageDuration.toFixed(1)} months`);
    
    // Show project distribution
    this.displayProjectDistribution(result.statistics);
  }

  /**
   * Demonstrate sample projects
   */
  private async demonstrateSampleProjects(): Promise<void> {
    console.log('\n📋 2. REPRESENTATIVE SAMPLE PROJECTS');
    console.log('-'.repeat(40));
    
    const samples = this.dataSystem.getSampleProjects();
    
    console.log(`📁 Generated ${samples.length} representative sample projects:`);
    
    samples.forEach((project, index) => {
      console.log(`\n   ${index + 1}. ${project.projectName}`);
      console.log(`      Category: ${project.category} | Type: ${project.type}`);
      console.log(`      Budget: ₹${(project.estimatedCost / 1_00_00_000).toFixed(1)} Cr | Progress: ${project.overallProgress}%`);
      console.log(`      Location: ${project.location.locality}, ${project.location.zone}`);
      console.log(`      Stage: ${project.currentStage}`);
      
      // Show stage completion
      const stageCount = Object.keys(project.stages).length;
      console.log(`      Stages Completed: ${stageCount}/9`);
    });
  }

  /**
   * Demonstrate filtered generation
   */
  private async demonstrateFilteredGeneration(): Promise<void> {
    console.log('\n🔍 3. FILTERED PROJECT GENERATION');
    console.log('-'.repeat(40));
    
    // Generate infrastructure projects
    console.log('📍 Generating 5 Infrastructure projects...');
    const infraProjects = this.dataSystem.generateProjectsByFilter({
      type: ProjectType.INFRASTRUCTURE,
      count: 5
    });
    
    console.log(`✅ Generated ${infraProjects.length} infrastructure projects:`);
    infraProjects.forEach(p => {
      console.log(`   • ${p.projectName} (₹${(p.estimatedCost / 1_00_00_000).toFixed(1)} Cr)`);
    });
    
    // Generate large projects
    console.log('\n🏢 Generating 3 Large category projects...');
    const largeProjects = this.dataSystem.generateProjectsByFilter({
      category: ProjectCategory.LARGE,
      count: 3
    });
    
    console.log(`✅ Generated ${largeProjects.length} large projects:`);
    largeProjects.forEach(p => {
      console.log(`   • ${p.projectName} (${p.type})`);
      console.log(`     Budget: ₹${(p.estimatedCost / 1_00_00_00_000).toFixed(1)} Thousand Cr`);
    });
  }

  /**
   * Demonstrate validation capabilities
   */
  private async demonstrateValidation(): Promise<void> {
    console.log('\n✅ 4. VALIDATION SYSTEM DEMONSTRATION');
    console.log('-'.repeat(40));
    
    // Generate a small dataset for validation demo
    const testProjects = this.dataSystem.generateProjectsByFilter({
      count: 20
    });
    
    console.log(`🔍 Validating ${testProjects.length} projects...`);
    
    const validationResult = this.dataSystem.validateProjects(testProjects);
    
    console.log(`📊 Validation Results:`);
    console.log(`   ✅ Valid projects: ${validationResult.validProjects}/${validationResult.totalProjects}`);
    console.log(`   ❌ Invalid projects: ${validationResult.invalidProjects}`);
    console.log(`   ⚠️  Total warnings: ${validationResult.totalWarnings}`);
    console.log(`   🎯 Average quality score: ${validationResult.averageValidationScore.toFixed(1)}/100`);
    
    // Show common issues if any
    if (validationResult.commonErrors.length > 0) {
      console.log(`\n📋 Most common validation issues:`);
      validationResult.commonErrors.slice(0, 3).forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.error} (${error.count} occurrences)`);
      });
    }
    
    // Show recommendations
    if (validationResult.recommendations.length > 0) {
      console.log(`\n💡 Recommendations:`);
      validationResult.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }
  }

  /**
   * Demonstrate analytics and statistics
   */
  private async demonstrateAnalytics(): Promise<void> {
    console.log('\n📊 5. ANALYTICS & STATISTICS');
    console.log('-'.repeat(40));
    
    const result = await this.dataSystem.generateCompleteDataset();
    const stats = result.statistics;
    
    // Financial Analysis
    console.log('💰 Financial Analysis:');
    console.log(`   Total Estimated Cost: ₹${(stats.financialAnalysis.totalEstimatedCost / 1_00_00_00_000).toFixed(1)} Thousand Cr`);
    console.log(`   Budget Variance: ${stats.financialAnalysis.budgetVariance.toFixed(1)}%`);
    console.log(`   Utilization Rate: ${stats.financialAnalysis.utilizationRate.toFixed(1)}%`);
    console.log(`   Projects with Cost Overruns: ${stats.financialAnalysis.costOverruns}`);
    
    // Timeline Analysis
    console.log('\n⏰ Timeline Analysis:');
    console.log(`   On-time Projects: ${stats.timelineAnalysis.onTimeProjects}`);
    console.log(`   Delayed Projects: ${stats.timelineAnalysis.delayedProjects}`);
    console.log(`   Average Delay: ${stats.timelineAnalysis.averageDelay} days`);
    console.log(`   Projects Nearing Deadline: ${stats.timelineAnalysis.projectsNearingDeadline}`);
    
    // Progress Distribution
    console.log('\n📈 Progress Distribution:');
    Object.entries(stats.progressDistribution.ranges).forEach(([range, count]) => {
      console.log(`   ${range}: ${count} projects`);
    });
    
    // Risk Analysis
    console.log('\n⚠️  Risk Analysis:');
    console.log(`   Total Risks Identified: ${stats.riskAnalysis.totalRisks}`);
    console.log(`   Active Risks: ${stats.riskAnalysis.activeRisks}`);
    console.log(`   High Risk Projects: ${stats.riskAnalysis.highRiskProjects}`);
    
    // Top risk categories
    console.log('\n   Top Risk Categories:');
    const riskEntries = Object.entries(stats.riskAnalysis.risksByCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    riskEntries.forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} risks`);
    });
    
    // Geographical Distribution
    console.log('\n🗺️  Geographical Distribution:');
    console.log('   Top 5 Localities:');
    stats.geographicalDistribution.topLocalities.slice(0, 5).forEach((loc, index) => {
      console.log(`   ${index + 1}. ${loc.locality}: ${loc.count} projects`);
    });
  }

  /**
   * Demonstrate export capabilities
   */
  private async demonstrateExports(): Promise<void> {
    console.log('\n📤 6. EXPORT CAPABILITIES');
    console.log('-'.repeat(40));
    
    // Generate small dataset for export demo
    const exportProjects = this.dataSystem.generateProjectsByFilter({
      count: 10
    });
    
    console.log(`📁 Exporting ${exportProjects.length} projects in different formats...`);
    
    // JSON Export
    const jsonData = this.dataSystem.exportProjects(exportProjects, 'json');
    console.log(`✅ JSON Export: ${Math.round(jsonData.length / 1024)} KB`);
    
    // CSV Export
    const csvData = this.dataSystem.exportProjects(exportProjects, 'csv');
    console.log(`✅ CSV Export: ${Math.round(csvData.length / 1024)} KB`);
    
    // Show CSV preview
    const csvLines = csvData.split('\n');
    console.log('\n📋 CSV Export Preview (first 3 rows):');
    csvLines.slice(0, 3).forEach((line, index) => {
      if (index === 0) {
        console.log(`   Headers: ${line.substring(0, 80)}...`);
      } else {
        console.log(`   Row ${index}: ${line.substring(0, 80)}...`);
      }
    });
    
    // Excel Export (simulated)
    const excelBuffer = this.dataSystem.exportProjects(exportProjects, 'excel');
    console.log(`✅ Excel Export: ${Math.round(excelBuffer.length / 1024)} KB (simulated)`);
  }

  /**
   * Display project distribution in a formatted table
   */
  private displayProjectDistribution(stats: ProjectStatistics): void {
    console.log('\n📊 Project Distribution by Category:');
    console.log('   Category    | Count | Budget (Cr) | Avg Progress');
    console.log('   ' + '-'.repeat(48));
    
    Object.entries(stats.categoryBreakdown).forEach(([category, data]) => {
      const budgetCr = (data.totalBudget / 1_00_00_000).toFixed(0);
      const progress = data.averageProgress.toFixed(1);
      console.log(`   ${category.padEnd(11)} | ${data.count.toString().padStart(5)} | ${budgetCr.padStart(11)} | ${progress.padStart(11)}%`);
    });
    
    console.log('\n📍 Project Distribution by Type:');
    console.log('   Type                      | Count | Active | Completed');
    console.log('   ' + '-'.repeat(50));
    
    Object.entries(stats.typeBreakdown).forEach(([type, data]) => {
      const displayType = type.replace(/_/g, ' ').toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase());
      console.log(`   ${displayType.padEnd(25)} | ${data.count.toString().padStart(5)} | ${data.activeProjects.toString().padStart(6)} | ${data.completedProjects.toString().padStart(9)}`);
    });
  }

  /**
   * Show detailed project information
   */
  private showProjectDetails(project: HMDAProject): void {
    console.log(`\n📋 Project: ${project.projectName}`);
    console.log(`   ID: ${project.projectId}`);
    console.log(`   Category: ${project.category} | Type: ${project.type}`);
    console.log(`   Status: ${project.status} | Progress: ${project.overallProgress}%`);
    console.log(`   Budget: ₹${(project.estimatedCost / 1_00_00_000).toFixed(1)} Cr`);
    console.log(`   Duration: ${project.duration} months`);
    console.log(`   Location: ${project.location.locality}, ${project.location.zone}`);
    console.log(`   Manager: ${project.projectManager.name} (${project.projectManager.designation})`);
    console.log(`   Stakeholders: ${project.stakeholders.length}`);
    console.log(`   Risks: ${project.risks.length} (${project.risks.filter(r => r.status === 'ACTIVE').length} active)`);
    console.log(`   Milestones: ${project.milestones.length} (${project.milestones.filter(m => m.status === 'COMPLETED').length} completed)`);
    
    // Show current stage details
    const currentStageKey = Object.keys(project.stages).pop();
    if (currentStageKey) {
      const stage = project.stages[currentStageKey as keyof typeof project.stages];
      console.log(`   Current Stage: ${stage?.stageName} (${stage?.status})`);
    }
  }

  /**
   * Demonstrate performance metrics
   */
  private async demonstratePerformance(): Promise<void> {
    console.log('\n⚡ PERFORMANCE METRICS');
    console.log('-'.repeat(40));
    
    // Test generation performance
    const sizes = [10, 50, 100, 150];
    
    for (const size of sizes) {
      const startTime = Date.now();
      
      const projects = this.dataSystem.generateProjectsByFilter({ count: size });
      const validationResult = this.dataSystem.validateProjects(projects);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`   ${size} projects: ${duration}ms (${(duration/size).toFixed(1)}ms/project)`);
      console.log(`      Generation: ~${Math.round(duration * 0.7)}ms | Validation: ~${Math.round(duration * 0.3)}ms`);
    }
    
    // Memory usage estimation
    const sampleProject = this.dataSystem.generateProjectsByFilter({ count: 1 })[0];
    const projectSize = JSON.stringify(sampleProject).length;
    
    console.log(`\n💾 Memory Usage Estimation:`);
    console.log(`   Single project: ~${Math.round(projectSize / 1024)} KB`);
    console.log(`   150 projects: ~${Math.round(150 * projectSize / 1024 / 1024)} MB`);
    console.log(`   1000 projects: ~${Math.round(1000 * projectSize / 1024 / 1024)} MB`);
  }
}

/**
 * Run the demo when script is executed directly
 */
async function main() {
  const demo = new HMDADataDemo();
  await demo.runCompleteDemo();
}

// Execute demo if run directly
if (require.main === module) {
  main().catch(console.error);
}

export default HMDADataDemo;