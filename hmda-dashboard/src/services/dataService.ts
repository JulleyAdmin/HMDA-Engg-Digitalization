// Data service for loading and managing HMDA project data
import { HMDAProject, ProjectDataset, ProjectFilters } from '../types/Project';

class DataService {
  private dataset: ProjectDataset | null = null;
  private projects: HMDAProject[] = [];

  async loadDataset(): Promise<ProjectDataset> {
    if (this.dataset) {
      return this.dataset;
    }

    try {
      console.log('🔄 Attempting to load HMDA Master-Aligned dataset...');
      const response = await fetch('/hmda-projects-150-master-aligned.json');
      console.log('📡 Fetch response:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Failed to load dataset: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Raw data received:', !!data, typeof data);
      console.log('📊 Projects array:', data?.projects?.length || 'undefined');
      
      this.dataset = data;
      this.projects = this.dataset?.projects || [];
      
      console.log(`✅ Loaded ${this.projects.length} HMDA projects`);
      console.log(`💰 Total Portfolio: ₹${((this.dataset?.statistics?.overview?.totalBudget || 0) / 10000000000).toFixed(1)} Thousand Cr`);
      
      return data;
    } catch (error) {
      console.error('❌ Error loading HMDA dataset:', error);
      console.error('❌ Error details:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  getProjects(): HMDAProject[] {
    return this.projects;
  }

  getStatistics() {
    return this.dataset?.statistics;
  }

  getMetadata() {
    return this.dataset?.metadata;
  }

  // Enhanced filtering based on CE requirements
  filterProjects(filters: ProjectFilters): HMDAProject[] {
    let filtered = [...this.projects];

    // Category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(p => filters.category!.includes(p.category));
    }

    // Stage filter
    if (filters.stage && filters.stage.length > 0) {
      filtered = filtered.filter(p => filters.stage!.includes(p.currentStage));
    }

    // Risk level filter
    if (filters.riskLevel && filters.riskLevel.length > 0) {
      filtered = filtered.filter(p => filters.riskLevel!.includes(p.riskLevel));
    }

    // Circle filter
    if (filters.circle && filters.circle.length > 0) {
      filtered = filtered.filter(p => filters.circle!.includes(p.location.circle));
    }

    // Budget range filter
    if (filters.budgetRange) {
      const { min, max } = filters.budgetRange;
      filtered = filtered.filter(p => 
        p.totalBudget >= min && p.totalBudget <= max
      );
    }

    // Progress range filter
    if (filters.progressRange) {
      const { min, max } = filters.progressRange;
      filtered = filtered.filter(p => 
        p.physicalProgress >= min && p.physicalProgress <= max
      );
    }

    // Contractor filter
    if (filters.contractor && filters.contractor.length > 0) {
      filtered = filtered.filter(p => 
        p.contractor && filters.contractor!.includes(p.contractor.name)
      );
    }

    // Search text filter - Updated for HMDA fields
    if (filters.searchText && filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(p => 
        p.nameOfProject?.toLowerCase().includes(searchLower) ||
        p.nameOfWork?.toLowerCase().includes(searchLower) ||
        p.projectName?.toLowerCase().includes(searchLower) ||
        p.projectId.toLowerCase().includes(searchLower) ||
        p.location.locality.toLowerCase().includes(searchLower) ||
        p.location.ward.toLowerCase().includes(searchLower) ||
        (p.contractor?.nameOfAgency?.toLowerCase().includes(searchLower)) ||
        (p.contractor?.name?.toLowerCase().includes(searchLower)) ||
        p.typeOfWork?.toLowerCase().includes(searchLower) ||
        p.asFileNumber?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  // Get unique values for filter dropdowns
  getUniqueContractors(): string[] {
    const contractors = this.projects
      .filter(p => p.contractor)
      .map(p => p.contractor!.name);
    return Array.from(new Set(contractors)).sort();
  }

  getUniqueLocalities(): string[] {
    const localities = this.projects.map(p => p.location.locality);
    return Array.from(new Set(localities)).sort();
  }

  // Dashboard analytics
  getBudgetDistribution() {
    const ranges = [
      { label: '< ₹10 Cr', min: 0, max: 1000000000 },
      { label: '₹10-50 Cr', min: 1000000000, max: 5000000000 },
      { label: '₹50-200 Cr', min: 5000000000, max: 20000000000 },
      { label: '₹200-1000 Cr', min: 20000000000, max: 100000000000 },
      { label: '> ₹1000 Cr', min: 100000000000, max: Infinity }
    ];

    return ranges.map(range => ({
      label: range.label,
      value: this.projects.filter(p => 
        p.totalBudget >= range.min && p.totalBudget < range.max
      ).length
    }));
  }

  getProgressDistribution() {
    const ranges = [
      { label: '0-20%', min: 0, max: 20 },
      { label: '21-40%', min: 21, max: 40 },
      { label: '41-60%', min: 41, max: 60 },
      { label: '61-80%', min: 61, max: 80 },
      { label: '81-100%', min: 81, max: 100 }
    ];

    return ranges.map(range => ({
      label: range.label,
      value: this.projects.filter(p => 
        p.physicalProgress >= range.min && p.physicalProgress <= range.max
      ).length
    }));
  }

  // CE-specific analytics
  getCriticalProjects(): HMDAProject[] {
    return this.projects.filter(p => 
      p.riskLevel === 'CRITICAL' || 
      p.timeline.delayDays > 90 ||
      p.priority === 'CRITICAL'
    );
  }

  getHighValueProjects(threshold: number = 50000000000): HMDAProject[] {
    return this.projects
      .filter(p => p.totalBudget >= threshold)
      .sort((a, b) => b.totalBudget - a.totalBudget);
  }

  getDelayedProjects(): HMDAProject[] {
    return this.projects
      .filter(p => p.timeline.delayDays > 0)
      .sort((a, b) => b.timeline.delayDays - a.timeline.delayDays);
  }

  // Format utilities
  formatCurrency(amount: number): string {
    if (amount >= 10000000000) { // >= 1000 Cr
      return `₹${(amount / 10000000000).toFixed(1)}K Cr`;
    } else if (amount >= 100000000) { // >= 10 Cr
      return `₹${(amount / 100000000).toFixed(0)} Cr`;
    } else {
      return `₹${(amount / 100000000).toFixed(1)} Cr`;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getStageLabel(stage: number): string {
    const stageLabels = {
      1: 'Conceptualization',
      2: 'DPR & Approvals',
      3: 'Tendering',
      4: 'Contract Award',
      5: 'Construction',
      6: 'Quality Control',
      7: 'Testing & Commissioning',
      8: 'Handover',
      9: 'DLP & O&M'
    };
    return stageLabels[stage as keyof typeof stageLabels] || `Stage ${stage}`;
  }

  getCategoryLabel(category: string): string {
    const categoryLabels = {
      'INFRA': 'Infrastructure',
      'URBAN': 'Urban Development',
      'ENV': 'Environmental',
      'SMART': 'Smart City'
    };
    return categoryLabels[category as keyof typeof categoryLabels] || category;
  }

  getRiskColor(risk: string): string {
    const colors = {
      'LOW': '#4caf50',
      'MEDIUM': '#ff9800',
      'HIGH': '#f44336',
      'CRITICAL': '#d32f2f'
    };
    return colors[risk as keyof typeof colors] || '#9e9e9e';
  }

  getCategoryColor(category: string): string {
    const colors = {
      'INFRA': '#1976d2',
      'URBAN': '#388e3c',
      'ENV': '#00796b',
      'SMART': '#7b1fa2'
    };
    return colors[category as keyof typeof colors] || '#9e9e9e';
  }
}

const dataServiceInstance = new DataService();
export default dataServiceInstance;