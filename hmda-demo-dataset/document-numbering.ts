// HMDA Document Numbering System Implementation
// Format: HMDA/<Department>/<Division>/<DocumentType>/<Year>/<Serial>

import { format } from 'date-fns';

export enum DocumentType {
  // Tender Documents
  TENDER_NOTICE = 'TN',
  NIT = 'NIT', // Notice Inviting Tender
  BID_DOCUMENT = 'BID',
  PREBID_MINUTES = 'PBM',
  
  // Agreement Documents
  LOA = 'LOA', // Letter of Acceptance
  AGREEMENT = 'AGR',
  WORK_ORDER = 'WO',
  SUPPLEMENTAL_AGREEMENT = 'SA',
  
  // Technical Documents
  TECHNICAL_SANCTION = 'TS',
  REVISED_TS = 'RTS',
  ADMINISTRATIVE_APPROVAL = 'AA',
  REVISED_AA = 'RAA',
  
  // Progress Documents
  PROGRESS_REPORT = 'PR',
  COMPLETION_CERTIFICATE = 'CC',
  MEASUREMENT_BOOK = 'MB',
  
  // Financial Documents
  BILL = 'BILL',
  FINAL_BILL = 'FB',
  EMD_REFUND = 'EMD',
  SD_REFUND = 'SD',
  
  // Quality Documents
  QUALITY_REPORT = 'QR',
  TEST_CERTIFICATE = 'TC',
  INSPECTION_REPORT = 'IR'
}

export interface DocumentNumber {
  department: string;
  division: string;
  documentType: DocumentType;
  year: string;
  serial: number;
  formatted: string;
}

// Document serial tracking (in production, this would be in a database)
const documentSerials = new Map<string, number>();

// Department codes
export const DEPARTMENT_CODES = {
  DEVELOPMENT: 'DEV',
  ENGINEERING: 'ENGG',
  PLANNING: 'PLAN',
  FINANCE: 'FIN',
  QUALITY: 'QC'
};

// Reset serial numbers (for testing)
export function resetDocumentSerials(): void {
  documentSerials.clear();
}

// Get next serial number for a document type
function getNextSerial(key: string): number {
  const current = documentSerials.get(key) || 0;
  const next = current + 1;
  documentSerials.set(key, next);
  return next;
}

// Generate document number
export function generateDocumentNumber(
  department: string,
  division: string,
  documentType: DocumentType,
  date: Date | string
): DocumentNumber {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = format(dateObj, 'yyyy');
  const yearShort = format(dateObj, 'yy');
  
  // Create key for serial tracking
  const serialKey = `${department}/${division}/${documentType}/${year}`;
  const serial = getNextSerial(serialKey);
  
  // Format: HMDA/DEV/II/TN/2024/0001
  const formatted = `HMDA/${department}/${division}/${documentType}/${year}/${serial.toString().padStart(4, '0')}`;
  
  return {
    department,
    division,
    documentType,
    year,
    serial,
    formatted
  };
}

// Generate tender document numbers
export function generateTenderDocuments(
  division: string,
  tenderDate: Date | string
): Record<string, DocumentNumber> {
  const documents: Record<string, DocumentNumber> = {};
  
  // Notice Inviting Tender
  documents.nit = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.NIT,
    tenderDate
  );
  
  // Tender Notice
  documents.tenderNotice = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.TENDER_NOTICE,
    tenderDate
  );
  
  // Bid Document
  documents.bidDocument = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.BID_DOCUMENT,
    tenderDate
  );
  
  return documents;
}

// Generate agreement documents
export function generateAgreementDocuments(
  division: string,
  agreementDate: Date | string
): Record<string, DocumentNumber> {
  const documents: Record<string, DocumentNumber> = {};
  
  // Letter of Acceptance
  documents.loa = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.LOA,
    agreementDate
  );
  
  // Agreement
  documents.agreement = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.AGREEMENT,
    agreementDate
  );
  
  // Work Order
  documents.workOrder = generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.WORK_ORDER,
    agreementDate
  );
  
  return documents;
}

// Generate technical sanction document
export function generateTechnicalSanctionDocument(
  division: string,
  tsDate: Date | string,
  isRevised: boolean = false
): DocumentNumber {
  return generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    isRevised ? DocumentType.REVISED_TS : DocumentType.TECHNICAL_SANCTION,
    tsDate
  );
}

// Generate administrative approval document
export function generateAdministrativeApprovalDocument(
  division: string,
  aaDate: Date | string,
  isRevised: boolean = false
): DocumentNumber {
  return generateDocumentNumber(
    DEPARTMENT_CODES.DEVELOPMENT,
    division,
    isRevised ? DocumentType.REVISED_AA : DocumentType.ADMINISTRATIVE_APPROVAL,
    aaDate
  );
}

// Generate progress report document
export function generateProgressReportDocument(
  division: string,
  reportDate: Date | string
): DocumentNumber {
  return generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.PROGRESS_REPORT,
    reportDate
  );
}

// Generate quality documents
export function generateQualityDocuments(
  division: string,
  inspectionDate: Date | string
): Record<string, DocumentNumber> {
  const documents: Record<string, DocumentNumber> = {};
  
  // Quality Report
  documents.qualityReport = generateDocumentNumber(
    DEPARTMENT_CODES.QUALITY,
    division,
    DocumentType.QUALITY_REPORT,
    inspectionDate
  );
  
  // Test Certificate
  documents.testCertificate = generateDocumentNumber(
    DEPARTMENT_CODES.QUALITY,
    division,
    DocumentType.TEST_CERTIFICATE,
    inspectionDate
  );
  
  // Inspection Report
  documents.inspectionReport = generateDocumentNumber(
    DEPARTMENT_CODES.QUALITY,
    division,
    DocumentType.INSPECTION_REPORT,
    inspectionDate
  );
  
  return documents;
}

// Generate bill documents
export function generateBillDocument(
  division: string,
  billDate: Date | string,
  isFinal: boolean = false
): DocumentNumber {
  return generateDocumentNumber(
    DEPARTMENT_CODES.FINANCE,
    division,
    isFinal ? DocumentType.FINAL_BILL : DocumentType.BILL,
    billDate
  );
}

// Generate completion certificate
export function generateCompletionCertificate(
  division: string,
  completionDate: Date | string
): DocumentNumber {
  return generateDocumentNumber(
    DEPARTMENT_CODES.ENGINEERING,
    division,
    DocumentType.COMPLETION_CERTIFICATE,
    completionDate
  );
}

// Validate document number format
export function validateDocumentNumber(documentNumber: string): boolean {
  // Pattern: HMDA/DEPT/DIV/TYPE/YEAR/SERIAL
  const pattern = /^HMDA\/[A-Z]+\/[IVX]+\/[A-Z]+\/\d{4}\/\d{4}$/;
  return pattern.test(documentNumber);
}

// Parse document number
export function parseDocumentNumber(documentNumber: string): DocumentNumber | null {
  const parts = documentNumber.split('/');
  
  if (parts.length !== 6 || parts[0] !== 'HMDA') {
    return null;
  }
  
  return {
    department: parts[1],
    division: parts[2],
    documentType: parts[3] as DocumentType,
    year: parts[4],
    serial: parseInt(parts[5]),
    formatted: documentNumber
  };
}

// Generate document timeline based on project stage
export function generateDocumentTimeline(
  projectStartDate: Date | string,
  division: string
): any[] {
  const startDate = typeof projectStartDate === 'string' ? new Date(projectStartDate) : projectStartDate;
  const timeline = [];
  
  // Pre-construction documents (0-3 months)
  timeline.push({
    stage: 'Pre-construction',
    documents: [
      {
        type: 'Administrative Approval',
        number: generateAdministrativeApprovalDocument(division, startDate),
        date: format(startDate, 'yyyy-MM-dd')
      },
      {
        type: 'Technical Sanction',
        number: generateTechnicalSanctionDocument(division, new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000)),
        date: format(new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
      }
    ]
  });
  
  // Tender documents (1-2 months)
  const tenderDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  timeline.push({
    stage: 'Tender',
    documents: Object.entries(generateTenderDocuments(division, tenderDate)).map(([key, doc]) => ({
      type: key,
      number: doc,
      date: format(tenderDate, 'yyyy-MM-dd')
    }))
  });
  
  // Agreement documents (2-3 months)
  const agreementDate = new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000);
  timeline.push({
    stage: 'Agreement',
    documents: Object.entries(generateAgreementDocuments(division, agreementDate)).map(([key, doc]) => ({
      type: key,
      number: doc,
      date: format(agreementDate, 'yyyy-MM-dd')
    }))
  });
  
  return timeline;
}

// Export all document types for reference
export const DOCUMENT_TYPES = DocumentType;