// Finance & Accounts Module Types

export interface PaymentTransaction {
  id: string;
  projectId: string;
  projectTitle: string;
  contractorName: string;
  workOrderNumber: string;
  
  // Payment Details
  totalWorkValue: number;
  previousPayments: number;
  currentBillAmount: number;
  
  // GST Details
  gstRate: number; // 12% or 18%
  gstAmount: number;
  grossAmount: number;
  
  // Deductions
  incomeTax: number; // 2%
  labourCess: number; // 1%
  gstTDS: number; // 2%
  retentionMoney: number; // 5-10%
  otherRecoveries: number;
  totalDeductions: number;
  
  // Final Amount
  netPayableAmount: number;
  amountInWords: string;
  
  // Metadata
  paymentDate: Date;
  paymentStatus: 'pending' | 'approved' | 'rejected' | 'processed' | 'paid';
  approvalLevel: 'AEE' | 'EE' | 'DCE' | 'CE' | 'Commissioner';
  approverName?: string;
  approvalDate?: Date;
  remarks?: string;
  
  // Tally Integration
  tallyVoucherNumber?: string;
  tallySyncStatus?: 'pending' | 'synced' | 'failed';
  tallySyncDate?: Date;
}

export interface DeductionRates {
  incomeTax: number;
  labourCess: number;
  gstTDS: number;
  retentionRate: number;
}

export interface TallyIntegration {
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastSyncTime: Date;
  pendingVouchers: number;
  syncedToday: number;
  failedSync: number;
  
  // Ledger Balances
  cashBalance: number;
  bankBalance: number;
  advanceBalance: number;
  retentionBalance: number;
}

export interface PaymentSummaryMetrics {
  totalProcessed: number;
  totalAmount: number;
  averageDaily: number;
  peakDay: string;
  peakAmount: number;
  totalTransactions: number;
  weeklyTrend: 'up' | 'down' | 'stable';
  projectedNextWeek: number;
}

export interface DepartmentExpenditure {
  departmentName: string;
  budgetAllocated: number;
  actualSpent: number;
  utilizationPercentage: number;
  pendingBills: number;
  projectedSpend: number;
}

export interface ContractorPerformance {
  contractorId: string;
  contractorName: string;
  totalProjects: number;
  totalPayments: number;
  averageDelay: number;
  qualityRating: number;
  paymentHistory: PaymentTransaction[];
  currentDues: number;
  retentionHeld: number;
}

export interface FinanceReport {
  reportId: string;
  reportType: 'payment' | 'budget' | 'contractor' | 'department' | 'audit';
  reportTitle: string;
  generatedDate: Date;
  generatedBy: string;
  reportPeriod: {
    startDate: Date;
    endDate: Date;
  };
  reportData: any; // Flexible structure for different report types
  exportFormats: ('pdf' | 'excel' | 'csv')[];
}

export interface PaymentApprovalWorkflow {
  workflowId: string;
  paymentId: string;
  currentStage: number;
  totalStages: number;
  stages: ApprovalStage[];
  estimatedCompletionTime: Date;
  actualCompletionTime?: Date;
}

export interface ApprovalStage {
  stageNumber: number;
  stageName: string;
  approverRole: string;
  approverName?: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  timestamp?: Date;
  comments?: string;
  nextAction?: string;
}

export interface BudgetAllocation {
  financialYear: string;
  totalBudget: number;
  allocations: {
    infrastructure: number;
    parks: number;
    water: number;
    roads: number;
    buildings: number;
    others: number;
  };
  utilized: number;
  available: number;
  committed: number;
}

export interface PaymentMemo {
  memoNumber: string;
  paymentId: string;
  projectDetails: {
    projectId: string;
    projectName: string;
    workOrderNumber: string;
    contractorName: string;
  };
  billDetails: {
    billNumber: string;
    billDate: Date;
    billAmount: number;
    workDescription: string;
  };
  calculations: {
    grossAmount: number;
    deductions: DeductionBreakdown;
    netPayable: number;
  };
  bankDetails: {
    beneficiaryName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  approvals: ApprovalStage[];
  generatedDate: Date;
  signature?: string;
}

export interface DeductionBreakdown {
  incomeTax: { rate: number; amount: number };
  labourCess: { rate: number; amount: number };
  gstTDS: { rate: number; amount: number };
  retention: { rate: number; amount: number };
  others: { description: string; amount: number }[];
  total: number;
}

export interface TallyVoucher {
  voucherNumber: string;
  voucherDate: Date;
  voucherType: 'Payment' | 'Receipt' | 'Journal' | 'Contra';
  narration: string;
  ledgerEntries: TallyLedgerEntry[];
  amount: number;
  xmlData?: string;
  syncStatus: 'pending' | 'synced' | 'failed';
  errorMessage?: string;
}

export interface TallyLedgerEntry {
  ledgerName: string;
  amount: number;
  isDebit: boolean;
  costCenter?: string;
  billAllocations?: {
    billName: string;
    amount: number;
  }[];
}

// Process Comparison Types
export interface ProcessComparison {
  metric: string;
  currentProcess: {
    value: string | number;
    time?: string;
    accuracy?: string;
  };
  digitalProcess: {
    value: string | number;
    time?: string;
    accuracy?: string;
  };
  improvement: string;
  impactLevel: 'high' | 'medium' | 'low';
}

export interface FinanceDashboardConfig {
  showPaymentProcessing: boolean;
  showTallyIntegration: boolean;
  showMISReports: boolean;
  showComparison: boolean;
  defaultProject?: string;
  refreshInterval: number; // in seconds
  autoSync: boolean;
}