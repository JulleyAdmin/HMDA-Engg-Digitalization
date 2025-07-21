# HMDA Stage 2: DPR Mode Selection & Consultant Management
## Detailed UI/UX Specifications - Document 2 of 10

---

## Executive Summary

This document details the UI/UX specifications for DPR Mode Selection and Consultant Management screens in Stage 2. These are critical decision-making and management interfaces that determine whether the DPR will be prepared in-house or by external consultants, and subsequently manage the entire consultant lifecycle.

**Primary Screens**: 4 main screens with 12 sub-screens  
**Key Users**: EE, DCE, CE, Procurement Team, Consultants  
**Complexity Level**: High (involves tendering, contract management, performance tracking)

---

## Table of Contents

1. [Screen 1: DPR Mode Selection](#1-screen-1-dpr-mode-selection)
2. [Screen 2: Consultant Selection Process](#2-screen-2-consultant-selection-process)
3. [Screen 3: Consultant Management Portal](#3-screen-3-consultant-management-portal)
4. [Screen 4: Performance & Contract Tracking](#4-screen-4-performance--contract-tracking)
5. [Integration Points](#5-integration-points)
6. [Business Rules](#6-business-rules)

---

## 1. Screen 1: DPR Mode Selection

### 1.1 Screen Overview
**Purpose**: Strategic decision on DPR preparation approach based on project complexity, resources, and organizational capacity

**URL**: `/stage2/mode-selection/{projectId}`

**Primary Users**: EE, DCE, CE

### 1.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > DPR Mode Selection | User: DCE S.Kumar   |
+------------------------------------------------------------------+
| Project Info |                Main Content Area                   |
|              |                                                    |
| Project:     | +----------------------------------------------+  |
| Community    | | DPR Preparation Mode Selection              |  |
| Park Ward 42 | | Project Value: ₹5.76 Cr                     |  |
|              | +----------------------------------------------+  |
| Stage 1:     | |                                              |  |
| ✓ Completed  | | Decision Factors Analysis                   |  |
| TS: Approved | | +------------------------------------------+ |  |
|              | | | Project Complexity Assessment            | |  |
| Quick Stats: | | |                                          | |  |
| Value: 5.76Cr| | | Technical Complexity: [●●●○○] High      | |  |
| Timeline:18mo| | | Design Novelty:      [●●○○○] Medium    | |  |
| Ward: 42     | | | Regulatory Complexity:[●●●●○] Very High | |  |
|              | | | Multi-disciplinary:  [●●●●●] Very High | |  |
|              | | |                                          | |  |
|              | | | Capacity Assessment                      | |  |
|              | | | Internal Team:       [●●○○○] Limited   | |  |
|              | | | Available Bandwidth: [●○○○○] Very Low  | |  |
|              | | | Specialized Skills:  [●●○○○] Partial   | |  |
|              | | | Current Workload:    [●●●●●] Very High | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Mode Recommendation                         |  |
|              | | +------------------------------------------+ |  |
|              | | | 🎯 System Recommendation: CONSULTANT    | |  |
|              | | |                                          | |  |
|              | | | Reasons:                                | |  |
|              | | | ✓ High technical complexity requires   | |  |
|              | | |   specialized expertise                 | |  |
|              | | | ✓ Internal team at full capacity       | |  |
|              | | | ✓ Multi-disciplinary nature needs      | |  |
|              | | |   coordinated specialist team          | |  |
|              | | | ✓ Value justifies external investment  | |  |
|              | | |                                          | |  |
|              | | | Confidence Level: 85%                  | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Mode Selection                              |  |
|              | | +------------------------------------------+ |  |
|              | | | ○ In-house Preparation                  | |  |
|              | | |   └ Assign internal team               | |  |
|              | | |   └ Estimated duration: 6-8 months    | |  |
|              | | |   └ Additional cost: ₹5-8 lakhs       | |  |
|              | | |                                          | |  |
|              | | | ● Consultant Preparation (Recommended) | |  |
|              | | |   └ Professional expertise             | |  |
|              | | |   └ Estimated duration: 4-6 months    | |  |
|              | | |   └ Consultant fee: ₹15-25 lakhs      | |  |
|              | | |                                          | |  |
|              | | | ○ Hybrid Approach                      | |  |
|              | | |   └ Consultant for design, internal QC | |  |
|              | | |   └ Estimated duration: 5-7 months    | |  |
|              | | |   └ Combined cost: ₹10-18 lakhs       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Justification & Approval                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Decision Justification: (Required)      | |  |
|              | | | [Text area for rationale______________] | |  |
|              | | | [____________________________________] | |  |
|              | | |                                          | |  |
|              | | | Budget Impact:                          | |  |
|              | | | Consultant Fee: ₹20,00,000 (estimated) | |  |
|              | | | From Budget Head: [Professional Fees v]| |  |
|              | | | Available Budget: ₹45,00,000            | |  |
|              | | |                                          | |  |
|              | | | Approval Required: DCE (Project >₹5Cr) | |  |
|              | | | [Save Draft] [Submit for Approval]     | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 1.3 Decision Matrix Algorithm

```javascript
const dprModeDecision = {
  factors: {
    projectValue: {
      weight: 0.15,
      thresholds: {
        inHouse: { max: 20000000 }, // ₹2 Cr
        consultant: { min: 50000000 }, // ₹5 Cr
        hybrid: { min: 20000000, max: 50000000 }
      }
    },
    technicalComplexity: {
      weight: 0.25,
      scale: 5, // 1-5 rating
      thresholds: {
        inHouse: { max: 2 },
        consultant: { min: 4 },
        hybrid: { min: 2, max: 4 }
      }
    },
    internalCapacity: {
      weight: 0.20,
      factors: ['team_size', 'current_workload', 'specialized_skills'],
      thresholds: {
        inHouse: { min: 3 },
        consultant: { max: 2 },
        hybrid: { min: 2, max: 3 }
      }
    },
    timeline: {
      weight: 0.15,
      urgency: ['low', 'medium', 'high'],
      impact: {
        inHouse: 'longer_duration',
        consultant: 'faster_delivery',
        hybrid: 'balanced_timeline'
      }
    },
    regulatoryComplexity: {
      weight: 0.15,
      clearances: ['environmental', 'fire', 'traffic', 'heritage'],
      impact: {
        high: 'consultant_recommended',
        medium: 'hybrid_viable',
        low: 'inhouse_feasible'
      }
    },
    budgetAvailability: {
      weight: 0.10,
      considerations: ['professional_fees_budget', 'opportunity_cost']
    }
  },
  
  calculateRecommendation(projectData) {
    const scores = {
      inHouse: 0,
      consultant: 0,
      hybrid: 0
    };
    
    // Calculate weighted scores for each factor
    Object.entries(this.factors).forEach(([factor, config]) => {
      const factorScore = this.evaluateFactor(factor, projectData[factor], config);
      Object.keys(scores).forEach(mode => {
        scores[mode] += factorScore[mode] * config.weight;
      });
    });
    
    // Return recommendation with confidence
    const maxScore = Math.max(...Object.values(scores));
    const recommendation = Object.keys(scores).find(mode => scores[mode] === maxScore);
    const confidence = Math.round(maxScore * 100);
    
    return {
      recommendation,
      confidence,
      scores,
      reasons: this.generateReasons(projectData, recommendation)
    };
  }
};
```

### 1.4 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| Decision ID | Text | Auto | System generated | DEC-YYYY-###### | Unique identifier |
| Project Complexity | Object | Auto | From assessment | Calculated | Multi-factor complexity |
| Technical Rating | Number | Auto | 1-5 scale | From feasibility | Technical difficulty |
| Design Novelty | Number | Auto | 1-5 scale | Assessment based | Design uniqueness |
| Regulatory Complexity | Number | Auto | 1-5 scale | Clearance count | Approval complexity |
| Internal Capacity | Object | Auto | Team assessment | Current status | Resource availability |
| Team Availability | Percentage | Auto | 0-100% | HR system | Available bandwidth |
| Specialized Skills | Array | Auto | Skill mapping | Team profiles | Required vs available |
| Current Workload | Percentage | Auto | 0-100% | Project load | Team utilization |
| Selected Mode | Radio | Yes | One of three | Recommended | Chosen approach |
| Decision Justification | Textarea | Yes | Min 100 chars | - | Rationale for choice |
| Budget Source | Dropdown | Yes | Active budget heads | - | Funding source |
| Estimated Cost | Currency | Auto | Based on mode | Calculated | Expected expense |
| Approval Status | System | Auto | Workflow state | Pending | Current status |
| Decision Date | Date | Auto | System date | Today | When decided |
| Decided By | User | Auto | Current user | Logged user | Decision maker |

### 1.5 Permissions Matrix

| Action | EE | DCE | CE | Procurement |
|--------|----|----|-----|-------------|
| View Analysis | R | R | R | R |
| Select Mode | - | C | C | - |
| Override Recommendation | - | U | U | - |
| Approve Decision | - | A | A | - |
| Modify Budget | - | - | U | U |

### 1.6 API Endpoints

```yaml
GET    /api/v1/dpr-mode/analysis/{projectId}    # Get decision analysis
POST   /api/v1/dpr-mode/calculate               # Calculate recommendation
POST   /api/v1/dpr-mode/decision                # Submit mode decision
PUT    /api/v1/dpr-mode/decision/{id}           # Update decision
GET    /api/v1/dpr-mode/budget-check/{mode}     # Check budget availability
POST   /api/v1/dpr-mode/approval/{id}           # Approve/reject decision
```

---

## 2. Screen 2: Consultant Selection Process

### 2.1 Screen Overview
**Purpose**: Complete consultant selection workflow from ToR preparation to contract award

**URL**: `/stage2/consultant-selection/{projectId}`

**Primary Users**: EE, DCE, Procurement Team

### 2.2 Sub-screen 2.1: ToR (Terms of Reference) Preparation

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Consultant Selection > ToR | User: EE     |
+------------------------------------------------------------------+
| Selection    |                Main Content Area                   |
| Progress     |                                                    |
|              | +----------------------------------------------+  |
| ●──○──○──○   | | Terms of Reference Preparation              |  |
| ToR Prep     | | Project: Community Park Ward 42             |  |
| Team Sel     | +----------------------------------------------+  |
| Tender       | |                                              |  |
| Award        | | ToR Template Selection                      |  |
|              | | +------------------------------------------+ |  |
| Quick Info:  | | | Select Base Template:                    | |  |
| Project Type:| | | ○ Standard Infrastructure Project        | |  |
| Infrastructure| | | ● Park & Recreation Development         | |  |
| Value: 5.76Cr| | | ○ Building Construction                 | |  |
| Duration:18mo| | | ○ Roads & Transportation               | |  |
|              | | | ○ Water & Sewerage                     | |  |
|              | | | ○ Custom Template                       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Scope of Work Definition                    |  |
|              | | +------------------------------------------+ |  |
|              | | | 1. Survey & Investigation (Mandatory)   | |  |
|              | | |    ☑ Topographic Survey                 | |  |
|              | | |    ☑ Soil Investigation                 | |  |
|              | | |    ☑ Utility Mapping                   | |  |
|              | | |    ☐ Environmental Assessment           | |  |
|              | | |    ☐ Traffic Impact Study              | |  |
|              | | |                                          | |  |
|              | | | 2. Design & Engineering (Mandatory)     | |  |
|              | | |    ☑ Architectural Design               | |  |
|              | | |    ☑ Structural Design                  | |  |
|              | | |    ☑ Landscape Design                   | |  |
|              | | |    ☑ MEP Design                         | |  |
|              | | |    ☐ Fire Safety Design                | |  |
|              | | |                                          | |  |
|              | | | 3. Documentation (Mandatory)            | |  |
|              | | |    ☑ Working Drawings                   | |  |
|              | | |    ☑ Technical Specifications           | |  |
|              | | |    ☑ Bill of Quantities                | |  |
|              | | |    ☑ DPR Compilation                    | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Deliverables Timeline                       |  |
|              | | +------------------------------------------+ |  |
|              | | | Milestone | Deliverable | Timeline       | |  |
|              | | | 1         | Survey      | Week 4        | |  |
|              | | | 2         | Concept     | Week 8        | |  |
|              | | | 3         | Design      | Week 16       | |  |
|              | | | 4         | BOQ         | Week 18       | |  |
|              | | | 5         | Final DPR   | Week 20       | |  |
|              | | | [+ Add Milestone]                       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous] [Save Draft] [Next: Qualification]|
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 2.2 Sub-screen 2.2: Consultant Qualification Criteria

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Consultant Selection > Criteria | User  |
+------------------------------------------------------------------+
| Selection    |                Main Content Area                   |
| Progress     |                                                    |
|              | +----------------------------------------------+  |
| ●──●──○──○   | | Consultant Qualification Criteria           |  |
| ToR Prep     | | Auto-generated based on project parameters |  |
| Team Sel     | +----------------------------------------------+  |
| Tender       | |                                              |  |
| Award        | | Technical Qualification                     |  |
|              | | +------------------------------------------+ |  |
|              | | | Minimum Experience:                      | |  |
|              | | | ● 5 years in similar projects            | |  |
|              | | | ○ 7 years in similar projects            | |  |
|              | | | ○ 10 years in similar projects           | |  |
|              | | |                                          | |  |
|              | | | Project Portfolio:                       | |  |
|              | | | ● Min 3 completed projects >₹2Cr        | |  |
|              | | | ○ Min 5 completed projects >₹2Cr        | |  |
|              | | | ○ Min 10 completed projects >₹2Cr       | |  |
|              | | |                                          | |  |
|              | | | Technical Team Requirements:             | |  |
|              | | | ☑ Project Manager (Min 5 yrs exp)       | |  |
|              | | | ☑ Architect (Licensed, 3+ yrs)          | |  |
|              | | | ☑ Structural Engineer (Licensed, 5+ yrs)| |  |
|              | | | ☑ Landscape Architect (3+ yrs)          | |  |
|              | | | ☐ Environmental Specialist (5+ yrs)     | |  |
|              | | | ☐ MEP Engineer (5+ yrs)                 | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Financial Qualification                     |  |
|              | | +------------------------------------------+ |  |
|              | | | Annual Turnover (Last 3 years):         | |  |
|              | | | Average: ₹[2 Cr] or more               | |  |
|              | | |                                          | |  |
|              | | | Working Capital:                        | |  |
|              | | | Minimum: ₹[50 Lakhs]                   | |  |
|              | | |                                          | |  |
|              | | | Bank Guarantee Capability:              | |  |
|              | | | EMD: ₹[2 Lakhs] (1% of project value)  | |  |
|              | | | Performance: ₹[20 Lakhs] (10% of fee)  | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Legal & Compliance                          |  |
|              | | +------------------------------------------+ |  |
|              | | | ☑ Professional Indemnity Insurance       | |  |
|              | | | ☑ GST Registration                       | |  |
|              | | | ☑ No blacklisting in govt projects      | |  |
|              | | | ☑ IT Returns filed (last 3 years)       | |  |
|              | | | ☐ ISO 9001 Certification (preferred)    | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous] [Save] [Next: Tender Process]   |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 2.3 Sub-screen 2.3: Tender Process Management

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Tender Process | User: Procurement      |
+------------------------------------------------------------------+
| Tender       |                Main Content Area                   |
| Timeline     |                                                    |
|              | +----------------------------------------------+  |
| ●──●──●──○   | | Consultant Tender Management                |  |
| ToR: Done    | | RFP No: HMDA/CONS/2024/042                  |  |
| Criteria:Done| +----------------------------------------------+  |
| Tender:Active| |                                              |  |
| Award:Pending| | Tender Document Preparation                 |  |
|              | | +------------------------------------------+ |  |
| Quick Stats: | | | Document Status:                         | |  |
| Eligibility: | | | ✓ Terms of Reference (Approved)         | |  |
| 15 firms     | | | ✓ Qualification Criteria (Approved)      | |  |
| Downloaded:8 | | | ✓ Tender Conditions (Generated)          | |  |
| Submitted:5  | | | ✓ Evaluation Criteria (Defined)          | |  |
| Qualified:3  | | | ✓ Contract Template (Standard)           | |  |
|              | | |                                          | |  |
|              | | | Tender Timeline:                        | |  |
|              | | | Publication Date: [15-Jan-2024]         | |  |
|              | | | Pre-bid Meeting: [22-Jan-2024]          | |  |
|              | | | Submission Deadline: [05-Feb-2024]      | |  |
|              | | | Technical Opening: [06-Feb-2024]        | |  |
|              | | | Financial Opening: [TBD]                | |  |
|              | | | Award Date: [TBD]                       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Evaluation Methodology                      |  |
|              | | +------------------------------------------+ |  |
|              | | | Technical Evaluation (70 marks):        | |  |
|              | | |   • Experience & Portfolio: 25 marks    | |  |
|              | | |   • Team Qualification: 20 marks        | |  |
|              | | |   • Methodology: 15 marks               | |  |
|              | | |   • Understanding: 10 marks             | |  |
|              | | |                                          | |  |
|              | | | Financial Evaluation (30 marks):        | |  |
|              | | |   • L1 Bidder: 30 marks                 | |  |
|              | | |   • Others: 30 × (L1/Ln) marks         | |  |
|              | | |                                          | |  |
|              | | | Qualifying Score: 70/100                | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Live Tender Status                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Bidder           | Downloaded | Submitted| |  |
|              | | | ABC Consultants  |     ✓      |    ✓     | |  |
|              | | | XYZ Engineers    |     ✓      |    ✓     | |  |
|              | | | PQR Architects   |     ✓      |    ✗     | |  |
|              | | | MNO Planners     |     ✓      |    ✓     | |  |
|              | | | DEF Designers    |     ✓      |    ✓     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [View All Bidders] [Technical Evaluation]  |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 2.4 Consultant Selection Data Models

```javascript
interface ConsultantSelection {
  selectionId: string;
  projectId: string;
  
  // ToR Details
  termsOfReference: {
    templateType: 'INFRASTRUCTURE' | 'BUILDING' | 'PARKS' | 'ROADS' | 'CUSTOM';
    scope: ScopeItem[];
    deliverables: Deliverable[];
    timeline: ProjectTimeline;
    qualityCriteria: QualityCriteria;
  };
  
  // Qualification Criteria
  qualification: {
    technical: TechnicalCriteria;
    financial: FinancialCriteria;
    legal: LegalCriteria;
    scoring: ScoringMatrix;
  };
  
  // Tender Process
  tender: {
    rfpNumber: string;
    publishDate: Date;
    submissionDeadline: Date;
    evaluationProcess: EvaluationProcess;
    bidders: Bidder[];
  };
  
  // Selection Outcome
  selection: {
    selectedConsultant: string;
    contractValue: number;
    selectionReason: string;
    alternativeRanking: ConsultantRanking[];
  };
}

interface Bidder {
  consultantId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  
  // Submission Status
  downloaded: boolean;
  submitted: boolean;
  submissionTime: Date;
  
  // Evaluation
  technicalScore: number;
  financialScore: number;
  totalScore: number;
  rank: number;
  qualified: boolean;
  
  // Documents
  documents: BidDocument[];
  
  // Team Proposed
  proposedTeam: TeamMember[];
}
```

### 2.5 API Endpoints

```yaml
# ToR Management
POST   /api/v1/consultant-selection/tor           # Create ToR
PUT    /api/v1/consultant-selection/tor/{id}      # Update ToR
GET    /api/v1/consultant-selection/templates     # Get ToR templates

# Tender Process
POST   /api/v1/consultant-selection/tender        # Launch tender
GET    /api/v1/consultant-selection/tender/{id}   # Get tender details
PUT    /api/v1/consultant-selection/tender/{id}/timeline # Update timeline

# Bidder Management
GET    /api/v1/consultant-selection/bidders       # List bidders
POST   /api/v1/consultant-selection/bidders/{id}/qualify # Qualify bidder
GET    /api/v1/consultant-selection/evaluation    # Get evaluation results

# Award Process
POST   /api/v1/consultant-selection/award         # Award to selected consultant
GET    /api/v1/consultant-selection/award/{id}    # Get award details
```

---

## 3. Screen 3: Consultant Management Portal

### 3.1 Screen Overview
**Purpose**: Comprehensive consultant collaboration and management interface

**URL**: `/stage2/consultant-portal/{projectId}`

**Primary Users**: EE, Consultants, Project Team

### 3.2 Consultant Dashboard Layout

```
+------------------------------------------------------------------+
| HMDA Header | Consultant Portal: ABC Consultants | Logout        |
+------------------------------------------------------------------+
| Project Nav  |                Main Content Area                   |
|              |                                                    |
| Project:     | +----------------------------------------------+  |
| Ward 42 Park | | Consultant Project Dashboard                |  |
| Contract:    | | ABC Consultants Pvt Ltd                     |  |
| HMDA/042/24  | +----------------------------------------------+  |
|              | |                                              |  |
| ● Overview   | | Contract Summary                            |  |
| ● Tasks      | | +------------------------------------------+ |  |
| ● Submissions| | | Contract Value: ₹20,00,000               | |  |
| ● Calendar   | | | Start Date: 15-Feb-2024                  | |  |
| ● Team       | | | End Date: 15-Aug-2024 (180 days)         | |  |
| ● Documents  | | | Elapsed: 45 days (25%)                   | |  |
| ● Payments   | | | Status: Survey Phase                     | |  |
| ● Support    | | +------------------------------------------+ |  |
|              | |                                              |  |
| Quick Stats: | | Current Tasks & Deadlines                   |  |
| Progress:25% | | +------------------------------------------+ |  |
| Tasks:12/48  | | | Task                  | Due Date | Status| |  |
| Overdue: 2   | | | Topographic Survey    | 01-Mar   | ⚠ Due| |  |
| This Week: 5 | | | Soil Investigation    | 05-Mar   | ○ Pend| |  |
|              | | | Concept Design        | 15-Mar   | ○ Pend| |  |
|              | | | Utility Mapping       | 20-Mar   | ○ Pend| |  |
|              | | | [View All Tasks]                        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Recent Submissions                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Site Photos Collection - Submitted       | |  |
|              | | | Survey Equipment List - Approved         | |  |
|              | | | Team Deployment Plan - Under Review      | |  |
|              | | | [View All Submissions]                  | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Upcoming Milestones                         |  |
|              | | +------------------------------------------+ |  |
|              | | | 🎯 Survey Completion: 8 days             | |  |
|              | | | 🎯 Concept Presentation: 22 days         | |  |
|              | | | 🎯 Design Review Meeting: 45 days        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Communication Center                        |  |
|              | | +------------------------------------------+ |  |
|              | | | Messages: 3 unread                      | |  |
|              | | | Queries: 2 pending response              | |  |
|              | | | Clarifications: 1 awaiting HMDA          | |  |
|              | | | [Message Center] [Raise Query]          | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 3.3 Task Management Interface

```
+------------------------------------------------------------------+
| HMDA Portal | Consultant Tasks | ABC Consultants                 |
+------------------------------------------------------------------+
| Task Filters |                Main Content Area                   |
|              |                                                    |
| Status:      | +----------------------------------------------+  |
| ☑ All        | | Task Management & Submission                |  |
| □ Pending    | | Project: Community Park Ward 42             |  |
| □ In Progress| +----------------------------------------------+  |
| □ Submitted  | |                                              |  |
| □ Approved   | | Active Tasks                                |  |
| □ Overdue    | | +------------------------------------------+ |  |
|              | | | Task: Topographic Survey                 | |  |
| Phase:       | | | Phase: Survey & Investigation            | |  |
| ● Survey     | | | Assigned: 15-Feb-2024                    | |  |
| ○ Design     | | | Due: 01-Mar-2024 ⚠ (Overdue by 3 days)  | |  |
| ○ BOQ        | | | Priority: High                           | |  |
| ○ Review     | | |                                          | |  |
|              | | | Description:                            | |  |
|              | | | Complete topographic survey of 5000 sqm | |  |
|              | | | site including:                          | |  |
|              | | | • Contour mapping at 0.5m intervals     | |  |
|              | | | • Boundary verification                  | |  |
|              | | | • Existing features documentation       | |  |
|              | | | • Coordinate system: UTM Zone 44N       | |  |
|              | | |                                          | |  |
|              | | | Deliverables:                           | |  |
|              | | | ☑ Survey methodology (Submitted)         | |  |
|              | | | ☐ Raw survey data                       | |  |
|              | | | ☐ Processed contour map                 | |  |
|              | | | ☐ Survey report with analysis           | |  |
|              | | |                                          | |  |
|              | | | Team Assigned:                          | |  |
|              | | | • Lead Surveyor: Mr. Ravi Kumar         | |  |
|              | | | • Assistant: Ms. Priya Sharma           | |  |
|              | | | • Equipment: Total Station, GPS         | |  |
|              | | |                                          | |  |
|              | | | Upload Deliverables:                    | |  |
|              | | | [📁 Choose Files] [📷 Camera] [📱 Mobile]| |  |
|              | | |                                          | |  |
|              | | | Progress Update:                        | |  |
|              | | | Current Status: [90% Complete v]        | |  |
|              | | | Issues/Challenges:                      | |  |
|              | | | [Text area for issues______________]    | |  |
|              | | |                                          | |  |
|              | | | [Save Progress] [Submit Task] [Get Help]| |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 3.4 File Management System

```javascript
const consultantFileSystem = {
  structure: {
    project: {
      survey: {
        raw_data: ['total_station_files', 'gps_coordinates', 'field_notes'],
        processed: ['contour_maps', 'boundary_plans', 'survey_reports'],
        photos: ['site_conditions', 'existing_features', 'access_points']
      },
      design: {
        concept: ['layout_plans', 'preliminary_designs', 'study_sketches'],
        development: ['architectural_plans', 'structural_drawings', 'mep_drawings'],
        final: ['working_drawings', 'detail_drawings', 'specifications']
      },
      documents: {
        reports: ['monthly_progress', 'technical_reports', 'analysis_reports'],
        submissions: ['milestone_deliverables', 'review_comments', 'revisions'],
        correspondence: ['meeting_minutes', 'clarifications', 'approvals']
      }
    }
  },
  
  fileTypes: {
    drawings: {
      formats: ['dwg', 'dxf', 'pdf'],
      maxSize: '50MB',
      versioning: true,
      approval: 'required'
    },
    documents: {
      formats: ['pdf', 'doc', 'docx'],
      maxSize: '25MB',
      versioning: true,
      approval: 'workflow_based'
    },
    data: {
      formats: ['xls', 'xlsx', 'csv'],
      maxSize: '10MB',
      versioning: false,
      approval: 'not_required'
    }
  },
  
  permissions: {
    consultant: ['read', 'write', 'upload', 'version'],
    hmda_team: ['read', 'comment', 'approve', 'download'],
    project_manager: ['read', 'write', 'approve', 'admin']
  }
};
```

---

## 4. Screen 4: Performance & Contract Tracking

### 4.1 Performance Dashboard

```
+------------------------------------------------------------------+
| HMDA Header | Consultant Performance | User: EE A.Kumar         |
+------------------------------------------------------------------+
| Performance  |                Main Content Area                   |
| Metrics      |                                                    |
|              | +----------------------------------------------+  |
| Overall:     | | Consultant Performance Dashboard            |  |
| 78/100       | | ABC Consultants - Community Park Project   |  |
|              | +----------------------------------------------+  |
| Quality:     | |                                              |  |
| 85/100       | | Performance Scorecard                       |  |
|              | | +------------------------------------------+ |  |
| Timeliness:  | | | Quality of Work:      ████████ 85/100   | |  |
| 72/100       | | | Timeliness:          ███████  72/100    | |  |
|              | | | Communication:       █████████ 90/100   | |  |
| Communication| | | Technical Competence: ████████ 82/100   | |  |
| 90/100       | | | Team Performance:    ██████   75/100    | |  |
|              | | | Overall Rating:      ████████ 78/100    | |  |
| Technical:   | | +------------------------------------------+ |  |
| 82/100       | |                                              |  |
|              | | Milestone Performance                       |  |
| Team:        | | +------------------------------------------+ |  |
| 75/100       | | | Milestone      | Planned | Actual | Status| |  |
|              | | | Survey Start   | 15-Feb  | 15-Feb | ✓ On  | |  |
|              | | | Survey Complete| 01-Mar  | 04-Mar | ⚠ 3d  | |  |
|              | | | Concept Design | 15-Mar  | 18-Mar | ⚠ 3d  | |  |
|              | | | Design Review  | 30-Mar  | --     | ○ Pend| |  |
|              | | | Final Design   | 15-May  | --     | ○ Pend| |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Contract Compliance                         |  |
|              | | +------------------------------------------+ |  |
|              | | | Team Deployment:      ✓ As per contract | |  |
|              | | | Quality Standards:    ✓ Meeting IS codes| |  |
|              | | | Reporting:           ⚠ 2 reports delayed| |  |
|              | | | Communication:        ✓ Regular updates | |  |
|              | | | Insurance:            ✓ Valid & current | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Financial Tracking                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Contract Value:     ₹20,00,000           | |  |
|              | | | Paid to Date:       ₹5,00,000 (25%)     | |  |
|              | | | Current Invoice:    ₹3,00,000 (pending) | |  |
|              | | | Retention:          ₹2,00,000 (10%)     | |  |
|              | | | Balance:            ₹12,00,000 (60%)    | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Actions                                     |  |
|              | | +------------------------------------------+ |  |
|              | | | [Detailed Report] [Performance Review]  | |  |
|              | | | [Payment Processing] [Contract Amendment]| |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 4.2 Performance Evaluation Algorithm

```javascript
const performanceEvaluation = {
  metrics: {
    quality: {
      weight: 0.30,
      factors: {
        accuracy: 0.40,          // Technical accuracy of deliverables
        completeness: 0.30,      // Completeness of submissions
        standardCompliance: 0.30 // Adherence to standards
      },
      scoring: {
        excellent: { min: 90, description: 'Exceeds expectations' },
        good: { min: 75, description: 'Meets expectations' },
        satisfactory: { min: 60, description: 'Acceptable with minor issues' },
        poor: { min: 0, description: 'Requires significant improvement' }
      }
    },
    
    timeliness: {
      weight: 0.25,
      calculation: {
        onTime: 100,
        delay1to3: 85,
        delay3to7: 70,
        delay7to14: 50,
        delayOver14: 25
      }
    },
    
    communication: {
      weight: 0.20,
      factors: {
        responsiveness: 0.40,    // Response time to queries
        proactive: 0.30,        // Proactive communication
        clarity: 0.30           // Clarity of communication
      }
    },
    
    technicalCompetence: {
      weight: 0.15,
      factors: {
        innovation: 0.30,       // Innovative solutions
        problemSolving: 0.40,   // Problem-solving ability
        expertise: 0.30         // Technical expertise demonstration
      }
    },
    
    teamPerformance: {
      weight: 0.10,
      factors: {
        stability: 0.40,        // Team stability (no frequent changes)
        qualification: 0.30,    // Team qualification adequacy
        collaboration: 0.30     // Collaboration with HMDA team
      }
    }
  },
  
  calculateOverallScore(scores) {
    let totalScore = 0;
    Object.entries(this.metrics).forEach(([metric, config]) => {
      totalScore += scores[metric] * config.weight;
    });
    return Math.round(totalScore);
  },
  
  generateRecommendations(scores, overallScore) {
    const recommendations = [];
    
    if (scores.timeliness < 75) {
      recommendations.push({
        type: 'improvement',
        area: 'Timeliness',
        action: 'Implement better project scheduling and milestone tracking'
      });
    }
    
    if (scores.quality < 80) {
      recommendations.push({
        type: 'improvement',
        area: 'Quality',
        action: 'Enhance quality control processes and peer reviews'
      });
    }
    
    if (overallScore >= 85) {
      recommendations.push({
        type: 'appreciation',
        action: 'Performance exceeds expectations. Consider for future projects.'
      });
    }
    
    return recommendations;
  }
};
```

### 4.3 API Endpoints

```yaml
# Performance Tracking
GET    /api/v1/consultant/performance/{consultantId}    # Get performance metrics
POST   /api/v1/consultant/performance/evaluate          # Submit evaluation
PUT    /api/v1/consultant/performance/{id}              # Update evaluation

# Contract Management
GET    /api/v1/consultant/contract/{contractId}         # Get contract details
PUT    /api/v1/consultant/contract/{id}/milestone       # Update milestone
POST   /api/v1/consultant/contract/payment              # Process payment
GET    /api/v1/consultant/contract/compliance           # Check compliance

# File Management
POST   /api/v1/consultant/files/upload                  # Upload files
GET    /api/v1/consultant/files/{projectId}             # List project files
PUT    /api/v1/consultant/files/{id}/approve             # Approve file
DELETE /api/v1/consultant/files/{id}                    # Delete file
```

---

## 5. Integration Points

### 5.1 E-Procurement System Integration
- **Purpose**: Seamless tender process management
- **Data Exchange**: Bid submissions, evaluation results, award notifications
- **Authentication**: Single sign-on with HMDA credentials
- **Compliance**: Full audit trail maintenance

### 5.2 Document Management System
- **Version Control**: Automatic versioning for all consultant submissions
- **Approval Workflow**: Integrated approval routing for deliverables
- **Digital Signatures**: Support for digital signing of contracts and approvals
- **Backup & Recovery**: Automated backup of critical project documents

### 5.3 Financial System Integration
- **Payment Processing**: Direct integration with accounts system for payment processing
- **Budget Tracking**: Real-time budget utilization tracking
- **Invoice Management**: Electronic invoice submission and approval
- **Tax Compliance**: Automatic TDS calculation and compliance

---

## 6. Business Rules

### 6.1 Mode Selection Rules
1. **Value Threshold**: Projects >₹5Cr default to consultant recommendation
2. **Complexity Assessment**: High technical complexity (4+/5) requires consultant
3. **Capacity Check**: If internal team >80% utilized, recommend consultant
4. **Timeline Constraints**: Urgent projects may override normal recommendations
5. **Budget Availability**: Consultant mode requires professional fees budget availability

### 6.2 Consultant Selection Rules
1. **Minimum Bidders**: At least 3 qualified bidders required for valid tender
2. **Technical Threshold**: Minimum 70/100 technical score for qualification
3. **Financial Reasonableness**: Quoted fee within ±25% of estimated cost
4. **Past Performance**: No consultant with <70% past performance rating
5. **Team Stability**: Key team members cannot be changed without approval

### 6.3 Performance Management Rules
1. **Evaluation Frequency**: Monthly performance evaluation for active contracts
2. **Payment Linkage**: Payments linked to milestone completion and performance
3. **Penalty Clauses**: Automatic penalty calculation for delays beyond 7 days
4. **Contract Termination**: Performance <50% for 2 consecutive months triggers review
5. **Future Eligibility**: Overall performance <60% affects future tender eligibility

---

*Document Version: 1.0*  
*Created: January 2025*  
*Part 2 of: HMDA Stage 2 UI/UX Design Series*