// Real HMDA Payment Data from Finance Reference Files - Pass Order Sheets
export const hmdaRealPayments = [
  {
    // KRK wo1 Sheet - First Work Order
    id: "PAY-HMDA-KRK-001",
    projectId: "HMDA-KRK-WO1",
    projectTitle: "KRK Work Order 1 - Infrastructure Development",
    contractorName: "HMDA Approved Contractor",
    workOrderNumber: "KRK-WO1-2024",
    totalWorkValue: 491838.61,
    previousPayments: 275908.61,
    currentBillAmount: 215930.00,
    gstRate: 18,
    gstAmount: 38867.00,
    grossAmount: 254797.00,
    incomeTax: 4319.00,  // IT @ 2%
    labourCess: 0.00,     // Labour Cess @ 1%
    gstTDS: 4319.00,      // GST TDS @ 2%
    retentionMoney: 10797.00, // FSD @ 5%
    otherRecoveries: 0.00,
    totalDeductions: 19435.00,
    netPayableAmount: 235362.00,
    amountInWords: "Rupees Two Lakh Thirty Five Thousand Three Hundred Sixty Two Only",
    paymentDate: new Date("2024-08-05"),
    paymentStatus: "approved" as const,
    approvalLevel: "EE" as const,
    remarks: "KRK Work Order 1 - Infrastructure development work",
    nacCharges: 0.00,
    seignorageCharges: 0.00,
    dmfCharges: 0.00,
    smetCharges: 0.00,
  },
  {
    // bioremidation Sheet - Bioremediation Project
    id: "PAY-HMDA-BIO-001",
    projectId: "HMDA-BIO-001",
    projectTitle: "Bioremediation Project - Environmental Work",
    contractorName: "Environmental Solutions Ltd",
    workOrderNumber: "BIO-2024-001",
    totalWorkValue: 20115254.00,
    previousPayments: 18438983.00,
    currentBillAmount: 1676271.00,
    gstRate: 18,
    gstAmount: 301729.00,
    grossAmount: 1978000.00,
    incomeTax: 33525.00,  // IT @ 2%
    labourCess: 0.00,
    gstTDS: 33525.00,  // GST TDS @ 2%
    retentionMoney: 0.00,  // FSD @ 5% (shown as 0 in this bill)
    otherRecoveries: 1382920.00,  // FSD release from previous bills
    totalDeductions: 67050.00,
    netPayableAmount: 3293870.00,  // Including FSD release
    amountInWords: "Rupees Thirty Two Lakh Ninety Three Thousand Eight Hundred Seventy Only",
    paymentDate: new Date("2024-08-03"),
    paymentStatus: "paid" as const,
    approvalLevel: "DCE" as const,
    remarks: "Bioremediation project - Part payment with FSD release from 1st to 11th bills",
    nacCharges: 0.00,
    seignorageCharges: 0.00,
    dmfCharges: 0.00,
    smetCharges: 0.00,
  },
  {
    // pipeline Sheet - Pipeline Work
    id: "PAY-HMDA-PIP-001",
    projectId: "HMDA-PIP-001",
    projectTitle: "Pipeline Installation Work",
    contractorName: "Pipeline Contractors Pvt Ltd",
    workOrderNumber: "PIP-2024-001",
    totalWorkValue: 491838.61,  // Total project value
    previousPayments: 423794.61,
    currentBillAmount: 68044.00,
    gstRate: 18,
    gstAmount: 12248.00,
    grossAmount: 80292.00,
    incomeTax: 1361.00,  // IT @ 2%
    labourCess: 0.00,
    gstTDS: 1361.00,  // GST TDS @ 2%
    retentionMoney: 3402.00,  // FSD @ 5%
    otherRecoveries: 0.00,
    totalDeductions: 6124.00,
    netPayableAmount: 74168.00,
    amountInWords: "Rupees Seventy Four Thousand One Hundred Sixty Eight Only",
    paymentDate: new Date("2024-08-01"),
    paymentStatus: "approved" as const,
    approvalLevel: "EE" as const,
    remarks: "Pipeline installation work - Running account bill",
    nacCharges: 0.00,
    seignorageCharges: 0.00,
    dmfCharges: 0.00,
    smetCharges: 0.00,
  },
  {
    // Tickets Sheet - Ticketing System Project
    id: "PAY-HMDA-TKT-001",
    projectId: "HMDA-TKT-001",
    projectTitle: "Ticketing System Implementation",
    contractorName: "IT Solutions Provider",
    workOrderNumber: "TKT-2024-001",
    totalWorkValue: 700000.00,
    previousPayments: 84070.00,  // Shows negative in sheet, likely adjustment
    currentBillAmount: 615930.00,
    gstRate: 18,
    gstAmount: 110867.00,
    grossAmount: 726797.00,
    incomeTax: 12319.00,  // IT @ 2%
    labourCess: 0.00,
    gstTDS: 12319.00,  // GST TDS @ 2%
    retentionMoney: 46195.00,  // FSD @ 7.5% (higher rate for this project)
    otherRecoveries: 0.00,
    totalDeductions: 70833.00,
    netPayableAmount: 655964.00,
    amountInWords: "Rupees Six Lakh Fifty Five Thousand Nine Hundred Sixty Four Only",
    paymentDate: new Date("2024-07-30"),
    paymentStatus: "pending" as const,
    approvalLevel: "DCE" as const,
    remarks: "Ticketing system implementation - Higher FSD @ 7.5%",
    nacCharges: 0.00,
    seignorageCharges: 0.00,
    dmfCharges: 0.00,
    smetCharges: 0.00,
  },
  {
    // KRK wo2 Sheet - Second Work Order
    id: "PAY-HMDA-KRK-002",
    projectId: "HMDA-KRK-WO2",
    projectTitle: "KRK Work Order 2 - Additional Works",
    contractorName: "HMDA Approved Contractor",
    workOrderNumber: "KRK-WO2-2024",
    totalWorkValue: 498402.00,
    previousPayments: 0.00,  // First bill
    currentBillAmount: 498402.00,
    gstRate: 18,
    gstAmount: 89712.00,
    grossAmount: 588114.00,
    incomeTax: 9968.00,  // IT @ 2%
    labourCess: 0.00,
    gstTDS: 9968.00,  // GST TDS @ 2%
    retentionMoney: 24920.00,  // FSD @ 5%
    otherRecoveries: 0.00,
    totalDeductions: 44856.00,
    netPayableAmount: 543258.00,
    amountInWords: "Rupees Five Lakh Forty Three Thousand Two Hundred Fifty Eight Only",
    paymentDate: new Date("2024-07-28"),
    paymentStatus: "approved" as const,
    approvalLevel: "EE" as const,
    remarks: "KRK Work Order 2 - First RA Bill",
    nacCharges: 0.00,
    seignorageCharges: 0.00,
    dmfCharges: 0.00,
    smetCharges: 0.00,
  }
];

// Function to get formatted payment data
export function getHMDAPayments() {
  return hmdaRealPayments.map(payment => ({
    ...payment,
    displayDate: payment.paymentDate.toLocaleDateString('en-IN'),
    statusColor: payment.paymentStatus === 'approved' ? 'info' : 
                 payment.paymentStatus === 'pending' ? 'warning' : 'success',
    formattedNetAmount: `₹${payment.netPayableAmount.toLocaleString('en-IN')}`,
    progressPercentage: ((payment.previousPayments + payment.currentBillAmount) / payment.totalWorkValue) * 100
  }));
}