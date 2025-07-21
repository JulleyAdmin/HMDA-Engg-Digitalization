#!/usr/bin/env node

// HMDA Dataset Generation Script
// Generates the complete 150-project dataset for demo

import { writeFileSync } from 'fs';
import { HMDADataGenerator } from './data-generator';
import { HMDAProject, ProjectCategory } from './project-schema';

async function generateCompleteDataset() {
  console.log('🏗️  HMDA Demo Dataset Generation');
  console.log('=' .repeat(50));
  
  const startTime = Date.now();
  
  // Initialize generator
  const generator = new HMDADataGenerator();
  
  console.log('📊 Generating 150 realistic HMDA projects...');
  
  // Generate main dataset
  const projects = generator.generateProjectDataset(150);
  
  console.log('✅ Generated projects successfully');
  console.log('🔍 Running validation...');
  
  // Validate all projects
  const validationResults = projects.map(p => generator.validateProject(p));
  const validProjects = validationResults.filter(r => r.isValid).length;
  const avgScore = validationResults.reduce((sum, r) => sum + r.score, 0) / validationResults.length;
  
  console.log(`📈 Validation Complete: ${validProjects}/${projects.length} valid (${avgScore.toFixed(1)} avg score)`);
  
  // Generate demo scenarios
  console.log('🎯 Generating demo scenarios...');
  const scenarios = generator.generateDemoScenarios();
  
  // Calculate statistics
  const totalBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
  const avgBudget = totalBudget / projects.length;
  
  const statistics = {
    overview: {
      totalProjects: projects.length,
      totalBudget,
      avgBudget,
      avgProgress: projects.reduce((sum, p) => sum + p.physicalProgress, 0) / projects.length
    },
    validation: {
      validProjects,
      invalidProjects: projects.length - validProjects,
      averageScore: avgScore
    },
    distribution: {
      byStage: getDistribution(projects, 'currentStage'),
      byCategory: getDistribution(projects, 'category'),
      byRisk: getDistribution(projects, 'riskLevel'),
      byCircle: getDistribution(projects, p => p.location.circle)
    }
  };
  
  // Export main dataset
  const mainDataset = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalProjects: projects.length,
      version: '1.0.0',
      description: 'HMDA Demo Dataset - Realistic project data for Chief Engineer dashboard demonstration',
      generationTime: Date.now() - startTime + 'ms'
    },
    statistics,
    projects
  };
  
  // Write files
  console.log('💾 Writing dataset files...');
  
  writeFileSync(
    '/Users/Girish/Projects/HMDA-EnggDept_Digitalization/hmda-demo-dataset/hmda-projects-150.json',
    JSON.stringify(mainDataset, null, 2)
  );
  
  writeFileSync(
    '/Users/Girish/Projects/HMDA-EnggDept_Digitalization/hmda-demo-dataset/demo-scenarios.json',
    JSON.stringify({
      metadata: {
        generatedAt: new Date().toISOString(),
        description: 'Demo scenarios for showcasing dashboard capabilities'
      },
      scenarios
    }, null, 2)
  );
  
  // Generate sample projects for quick demo
  const sampleProjects = [
    generator.generateProject('MEGA', undefined, ProjectCategory.INFRASTRUCTURE), // Large infrastructure
    generator.generateProject('SMALL', undefined, ProjectCategory.URBAN_DEVELOPMENT), // Small urban
    generator.generateProject('MEDIUM', undefined, ProjectCategory.ENVIRONMENTAL), // Medium environmental
    generator.generateProject('LARGE', undefined, ProjectCategory.SMART_CITY), // Large smart city
    generator.generateProject('MEDIUM', undefined, ProjectCategory.INFRASTRUCTURE) // Medium infrastructure
  ];
  
  writeFileSync(
    '/Users/Girish/Projects/HMDA-EnggDept_Digitalization/hmda-demo-dataset/sample-projects-5.json',
    JSON.stringify({
      metadata: {
        generatedAt: new Date().toISOString(),
        description: 'Sample projects representing different categories and complexities'
      },
      projects: sampleProjects
    }, null, 2)
  );
  
  // Generate CSV for Excel import
  const csvData = generateCSV(projects);
  writeFileSync(
    '/Users/Girish/Projects/HMDA-EnggDept_Digitalization/hmda-demo-dataset/hmda-projects.csv',
    csvData
  );
  
  const endTime = Date.now();
  
  console.log('\n🎉 Dataset Generation Complete!');
  console.log('=' .repeat(50));
  console.log(`⏱️  Total Time: ${endTime - startTime}ms`);
  console.log(`📊 Projects Generated: ${projects.length}`);
  console.log(`💰 Total Budget: ₹${(totalBudget / 1_00_00_00_000).toFixed(1)} Thousand Crores`);
  console.log(`📈 Average Progress: ${(projects.reduce((sum, p) => sum + p.physicalProgress, 0) / projects.length).toFixed(1)}%`);
  console.log(`✅ Validation Score: ${avgScore.toFixed(1)}/100`);
  
  console.log('\n📁 Files Generated:');
  console.log('   • hmda-projects-150.json (Complete dataset)');
  console.log('   • demo-scenarios.json (Demo scenarios)');
  console.log('   • sample-projects-5.json (Sample projects)');
  console.log('   • hmda-projects.csv (Excel import)');
  
  console.log('\n🚀 Ready for dashboard demonstration!');
}

function getDistribution(projects: HMDAProject[], key: string | ((p: HMDAProject) => any)): Record<string, number> {
  const distribution: Record<string, number> = {};
  
  projects.forEach(project => {
    const value = typeof key === 'function' ? key(project) : (project as any)[key];
    const stringValue = String(value);
    distribution[stringValue] = (distribution[stringValue] || 0) + 1;
  });
  
  return distribution;
}

function generateCSV(projects: HMDAProject[]): string {
  const headers = [
    'Project ID', 'Project Name', 'Category', 'Sub Category', 'Current Stage',
    'Total Budget (₹)', 'Physical Progress (%)', 'Financial Progress (%)',
    'CE Score', 'Risk Level', 'Circle', 'Ward', 'Locality',
    'Contractor', 'Contractor Grade', 'Planned Start', 'Planned Completion',
    'Delay Days', 'Quality Score', 'Priority'
  ];
  
  const rows = projects.map(p => [
    p.projectId,
    `"${p.projectName}"`,
    p.category,
    p.subCategory,
    p.currentStage,
    p.totalBudget,
    p.physicalProgress,
    p.financialProgress,
    p.ceScore,
    p.riskLevel,
    p.location.circle,
    `"${p.location.ward}"`,
    `"${p.location.locality}"`,
    p.contractor ? `"${p.contractor.name}"` : '',
    p.contractor ? p.contractor.grade : '',
    p.timeline.plannedStart,
    p.timeline.plannedCompletion,
    p.timeline.delayDays,
    p.quality.overallScore,
    p.priority
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

// Run if called directly
if (require.main === module) {
  generateCompleteDataset().catch(console.error);
}

export { generateCompleteDataset };