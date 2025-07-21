# HMDA Project Stage 2: Comprehensive UI/UX Design Document
## Detailed Project Report (DPR) & Approvals - Interface Specifications

---

## Executive Summary

This document provides comprehensive UI/UX specifications for Stage 2 (Detailed Project Report & Approvals) of the HMDA Project Execution System. Building upon the approved concept from Stage 1, Stage 2 focuses on technical design, detailed engineering, cost finalization, clearances, and technical sanctions. Each screen is meticulously detailed with capabilities, fields, validations, interactions, permissions, and visual design guidelines.

---

## Table of Contents

1. [Global Design System Extension](#1-global-design-system-extension)
2. [User Roles & Permissions Matrix](#2-user-roles--permissions-matrix)
3. [Screen 1: DPR Mode Selection & Project Setup](#3-screen-1-dpr-mode-selection--project-setup)
4. [Screen 2: Consultant Management Portal](#4-screen-2-consultant-management-portal)
5. [Screen 3: Technical Survey & Investigation](#5-screen-3-technical-survey--investigation)
6. [Screen 4: Design & Drawing Management](#6-screen-4-design--drawing-management)
7. [Screen 5: BOQ & Detailed Cost Estimation](#7-screen-5-boq--detailed-cost-estimation)
8. [Screen 6: Clearance & NOC Management](#8-screen-6-clearance--noc-management)
9. [Screen 7: Technical Sanction Workflow](#9-screen-7-technical-sanction-workflow)
10. [Screen 8: DPR Document Assembly & Review](#10-screen-8-dpr-document-assembly--review)
11. [Screen 9: Stage 2 Dashboard & Progress Tracking](#11-screen-9-stage-2-dashboard--progress-tracking)
12. [Integration with External Systems](#12-integration-with-external-systems)
13. [Mobile Responsive Design](#13-mobile-responsive-design)
14. [Implementation Guidelines](#14-implementation-guidelines)

---

## 1. Global Design System Extension

### Enhanced Components for Stage 2

Building on Stage 1 design system with additional components:

#### Technical Drawing Components
- **Drawing Viewer**: AutoCAD DWG, PDF viewer with zoom/pan
- **Markup Tools**: Annotation, measurement, comments on drawings
- **Version Compare**: Side-by-side drawing comparison
- **Layer Control**: Toggle drawing layers visibility

#### Document Management Components
- **Document Tree**: Hierarchical folder structure
- **Version Control**: Check-in/check-out system
- **Approval Stamps**: Digital signature placement
- **Document Preview**: Inline preview for all formats

#### Specialized Input Components
- **Measurement Input**: Length/Area/Volume with unit conversion
- **Cost Calculator**: Real-time calculation with formula display
- **Date Range Picker**: For project schedules
- **Coordinate Input**: For survey data entry

### Status Indicators
- **DPR Progress**: Circular progress with stage indicators
- **Clearance Status**: Traffic light system (Red/Yellow/Green)
- **Document Status**: Draft/Review/Approved/Expired icons
- **Deadline Alerts**: Color-coded urgency indicators

---

## 2. User Roles & Permissions Matrix

### Additional Roles for Stage 2

| Role Code | Role Name | Department | Stage 2 Specific Functions |
|-----------|-----------|------------|---------------------------|
| CONS | External Consultant | External | DPR preparation, drawings |
| SURV | Surveyor | HMDA/External | Site surveys, measurements |
| DSGN | Design Engineer | HMDA | Technical design review |
| QS | Quantity Surveyor | HMDA | BOQ verification |
| LEGAL | Legal Officer | HMDA | Clearance coordination |
| CAD | CAD Operator | HMDA/External | Drawing preparation |
| PM | Project Manager | HMDA | Overall DPR coordination |

### Stage 2 Permission Matrix

| Action Category | JE | AE | EE | CONS | DSGN | DCE | CE |
|----------------|----|----|----|----|------|-----|-----|
| DPR Creation | R | C/U | A | C/U | R | A | A |
| Survey Data | C/U | C/U/A | A | C/U | R | R | R |
| Drawings | R | R/U | A | C/U | C/U/A | A | A |
| BOQ/Estimates | R | C/U | A | C/U | U/A | A | A |
| Clearances | R | C/U | C/U/A | R | R | A | A |
| Technical Sanction | R | R | C | R | R | A | A |

---

## 3. Screen 1: DPR Mode Selection & Project Setup

### 3.1 Screen Overview
**Purpose**: Initialize DPR preparation, select mode (in-house/consultant), set up project parameters

**URL**: `/stage2/dpr-setup/{projectId}`

**Primary Users**: AE, EE, PM

### 3.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2: DPR Preparation | User Info               |
+------------------------------------------------------------------+
| Project Info |                Main Content Area                   |
|              |                                                    |
| Park Ward 42 | +----------------------------------------------+  |
| Approved     | | DPR Preparation Setup                       |  |
| ₹5.76 Cr     | +----------------------------------------------+  |
|              | | Project Transition from Stage 1             |  |
| Quick Links: | | +------------------------------------------+ |  |
| ⬇ Import S1  | | | ✓ Concept Note Approved                 | |  |
| 📋 Templates | | | ✓ Budget Allocated: ₹5.76 Cr           | |  |
| 📊 Timeline  | | | ✓ Technical Feasibility: Confirmed      | |  |
|              | | | ✓ Site Data Available                   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | DPR Preparation Mode                        |  |
|              | | +------------------------------------------+ |  |
|              | | | Select how to prepare the DPR:          | |  |
|              | | |                                          | |  |
|              | | | ○ In-house Preparation                  | |  |
|              | | |   Using HMDA engineering team          | |  |
|              | | |   Timeline: 3-4 months                  | |  |
|              | | |   Cost: Internal resources             | |  |
|              | | |                                          | |  |
|              | | | ● Consultant Mode                       | |  |
|              | | |   Hire external consultant             | |  |
|              | | |   Timeline: 4-6 months                  | |  |
|              | | |   Est. Cost: ₹15-20 Lakhs             | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Project Classification & Parameters        |  |
|              | | +------------------------------------------+ |  |
|              | | | Project Category: [Parks & Recreation v] | |  |
|              | | | Project Type: [New Construction v]      | |  |
|              | | | Complexity: [Medium v]                  | |  |
|              | | | Priority: [High v]                      | |  |
|              | | |                                          | |  |
|              | | | Key Deliverables Required:              | |  |
|              | | | ☑ Topographic Survey                   | |  |
|              | | | ☑ Soil Investigation Report            | |  |
|              | | | ☑ Architectural Drawings               | |  |
|              | | | ☑ Structural Designs                   | |  |
|              | | | ☑ MEP Designs                          | |  |
|              | | | ☑ Landscape Plan                       | |  |
|              | | | ☑ Environmental Management Plan        | |  |
|              | | | ☐ Traffic Impact Study                 | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | DPR Timeline Planning                       |  |
|              | | +------------------------------------------+ |  |
|              | | | Target Start Date: [15-Jan-2024]        | |  |
|              | | | Target Completion: [15-May-2024]        | |  |
|              | | | Technical Sanction By: [30-May-2024]    | |  |
|              | | |                                          | |  |
|              | | | [View Detailed Timeline →]              | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Cancel] [Save & Continue] [Setup Team]   |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 3.3 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| DPR ID | Text | Auto | System generated | DPR-YYYY-###### | Unique DPR identifier |
| Project ID | Text | Auto | From Stage 1 | Inherited | Link to concept |
| DPR Mode | Radio | Yes | In-house/Consultant | - | Preparation method |
| Project Category | Dropdown | Yes | From master | From Stage 1 | Major category |
| Project Type | Dropdown | Yes | Based on category | - | New/Renovation/Maintenance |
| Complexity Level | Radio | Yes | Low/Medium/High | Medium | Technical complexity |
| Priority Level | Radio | Yes | Normal/High/Urgent | From Stage 1 | Execution priority |
| Deliverables | Checklist | Yes | Min 3 selected | Category based | Required documents |
| Start Date | Date | Yes | >= Today | Today + 7 | DPR start date |
| Target Completion | Date | Yes | > Start date | Start + 120 days | DPR completion |
| TS Target Date | Date | Yes | > Completion | Completion + 15 | Technical sanction |
| Consultant Budget | Currency | Conditional | If consultant mode | - | Estimated consultant fee |
| Special Requirements | Textarea | No | Max 500 chars | - | Additional requirements |

### 3.4 Mode-Specific Workflows

#### 3.4.1 In-house Mode Flow
```javascript
setupInHouseMode() {
  return {
    teamRequirements: [
      { role: 'Project Manager', quantity: 1, dedication: '50%' },
      { role: 'Design Engineer', quantity: 2, dedication: '100%' },
      { role: 'CAD Operator', quantity: 2, dedication: '100%' },
      { role: 'Quantity Surveyor', quantity: 1, dedication: '75%' }
    ],
    resourceCheck: checkInternalAvailability(),
    timelineAdjustment: calculateWithInternalCapacity(),
    approvalRequired: 'EE',
    costImplication: 'Internal'
  };
}
```

#### 3.4.2 Consultant Mode Flow
```javascript
setupConsultantMode() {
  return {
    nextSteps: [
      'Prepare Terms of Reference (ToR)',
      'Get budget approval for consultant',
      'Float tender for consultant selection',
      'Evaluate and award contract'
    ],
    documentTemplates: [
      'ToR_Template_DPR.docx',
      'Consultant_Tender_Template.docx',
      'Evaluation_Matrix.xlsx'
    ],
    approvalRequired: 'DCE/CE based on value',
    timeline: 'Additional 30-45 days for selection'
  };
}
```

### 3.5 Smart Deliverable Selection

```javascript
autoSelectDeliverables(projectCategory, projectType) {
  const deliverableMatrix = {
    'Parks & Recreation': {
      'New Construction': [
        'Topographic Survey',
        'Soil Investigation',
        'Architectural Drawings',
        'Landscape Plan',
        'Environmental Plan'
      ],
      'Renovation': [
        'Condition Assessment',
        'Architectural Drawings',
        'Structural Assessment'
      ]
    },
    'Roads & Transport': {
      'New Construction': [
        'Traffic Study',
        'Topographic Survey',
        'Pavement Design',
        'Drainage Design',
        'Street Lighting'
      ]
    }
    // ... more categories
  };
  
  return deliverableMatrix[projectCategory]?.[projectType] || [];
}
```

### 3.6 Timeline Visualization

```
| DPR Timeline Gantt Chart                                           |
| +----------------------------------------------------------------+ |
| | Activity                    | Jan | Feb | Mar | Apr | May |   | |
| | Setup & Mobilization        | ███ |     |     |     |     |   | |
| | Surveys & Investigation     | ███ | ███ |     |     |     |   | |
| | Design Development          |     | ███ | ███ |     |     |   | |
| | Drawing Preparation         |     |     | ███ | ███ |     |   | |
| | BOQ & Estimation           |     |     |     | ███ |     |   | |
| | Clearances & NOCs          |     | ███ | ███ | ███ |     |   | |
| | DPR Compilation            |     |     |     | ███ | ██  |   | |
| | Technical Sanction         |     |     |     |     | ███ |   | |
| +----------------------------------------------------------------+ |
```

---

## 4. Screen 2: Consultant Management Portal

### 4.1 Screen Overview
**Purpose**: Manage consultant selection, onboarding, and performance (if consultant mode selected)

**URL**: `/stage2/consultant-management/{projectId}`

**Primary Users**: EE, PM, DCE

### 4.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Consultant Management | User Info        |
+------------------------------------------------------------------+
| Navigation   |                Main Content Area                   |
|              |                                                    |
| > Selection  | +----------------------------------------------+  |
| > Contract   | | Consultant Selection & Management           |  |
| > Progress   | | Project: Park Ward 42 DPR                  |  |
| > Payments   | +----------------------------------------------+  |
| > Documents  | |                                              |  |
|              | | Terms of Reference (ToR)                    |  |
| Quick Actions| | +------------------------------------------+ |  |
| ⬇ ToR Template| | | Scope of Work:                          | |  |
| 📧 Invite    | | | 1. Topographic survey of 5000 sqm       | |  |
| 📊 Compare   | | | 2. Soil investigation at 5 points       | |  |
|              | | | 3. Architectural design & drawings      | |  |
|              | | | 4. Structural design for all elements   | |  |
|              | | | 5. MEP design and coordination          | |  |
|              | | | 6. Detailed cost estimates with rates   | |  |
|              | | |                                          | |  |
|              | | | Eligibility Criteria:                   | |  |
|              | | | • Min 10 years experience               | |  |
|              | | | • 5 similar projects in last 3 years    | |  |
|              | | | • Annual turnover > ₹5 Crores          | |  |
|              | | | • Valid registrations & licenses       | |  |
|              | | |                                          | |  |
|              | | | [Edit ToR] [Finalize] [Get Approval]   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Consultant Selection Process                |  |
|              | | +------------------------------------------+ |  |
|              | | | Method: [Limited Tender v]              | |  |
|              | | | Est. Value: ₹18,00,000                  | |  |
|              | | | Timeline: 21 days                       | |  |
|              | | |                                          | |  |
|              | | | Invited Consultants (Min 5)             | |  |
|              | | | +------------------------------------+ | |  |
|              | | | | Name: M/s ABC Consultants          | | |  |
|              | | | | Email: [abc@consultants.com]       | | |  |
|              | | | | Phone: [+91 98765 43210]           | | |  |
|              | | | | Status: ✓ Invitation Sent          | | |  |
|              | | | | [Remove] [Resend]                  | | |  |
|              | | | +------------------------------------+ | |  |
|              | | | [+ Add More Consultants]               | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Evaluation Matrix                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Criteria         | Weightage | Max Score| |  |
|              | | | Experience       | 30%       | 30       | |  |
|              | | | Past Performance | 25%       | 25       | |  |
|              | | | Team Strength   | 20%       | 20       | |  |
|              | | | Methodology     | 15%       | 15       | |  |
|              | | | Financial Quote  | 10%       | 10       | |  |
|              | | | Total           | 100%      | 100      | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous] [Save Progress] [Send Invites] |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 4.3 Consultant Workflow States

```javascript
const consultantWorkflowStates = {
  PLANNING: {
    actions: ['Prepare ToR', 'Get Approval', 'Set Budget'],
    nextState: 'SELECTION'
  },
  SELECTION: {
    actions: ['Invite Consultants', 'Receive Proposals', 'Evaluate'],
    nextState: 'AWARD'
  },
  AWARD: {
    actions: ['Negotiate', 'Award Contract', 'Sign Agreement'],
    nextState: 'EXECUTION'
  },
  EXECUTION: {
    actions: ['Monitor Progress', 'Review Deliverables', 'Process Payments'],
    nextState: 'COMPLETION'
  },
  COMPLETION: {
    actions: ['Final Review', 'Close Contract', 'Performance Rating'],
    nextState: null
  }
};
```

### 4.4 Consultant Evaluation Screen

```
| Consultant Evaluation Portal                                       |
| +----------------------------------------------------------------+ |
| | Proposals Received: 4 of 5 | Deadline: 2 days remaining       | |
| +----------------------------------------------------------------+ |
| | Consultant Name     | Technical | Financial | Total | Rank |  | |
| | M/s ABC Consultants | 82/90     | Pending   | -     | -    |  | |
| | XYZ Engineers       | 78/90     | Pending   | -     | -    |  | |
| | PQR Associates      | 85/90     | Pending   | -     | -    |  | |
| | LMN Designers       | Evaluating| Pending   | -     | -    |  | |
| +----------------------------------------------------------------+ |
| | [Open Technical Bids] [Schedule Committee] [Generate Report]  | |
| +----------------------------------------------------------------+ |
```

### 4.5 Contract Management

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| Contract Number | Text | Auto | System generated |
| Contract Value | Currency | Yes | Final negotiated amount |
| Start Date | Date | Yes | Contract start |
| End Date | Date | Yes | Contract end |
| Milestones | Array | Yes | Payment milestones |
| Deliverables | Checklist | Yes | Mapped to milestones |
| Performance Bank Guarantee | Currency | Yes | Usually 10% |
| Insurance Requirements | Checklist | Yes | Professional indemnity |
| Key Personnel | Array | Yes | Named resources |
| Penalty Clauses | Array | Yes | Delay penalties |

---

## 5. Screen 3: Technical Survey & Investigation

### 5.1 Screen Overview
**Purpose**: Manage all technical surveys, investigations, and data collection for DPR

**URL**: `/stage2/technical-survey/{projectId}`

**Primary Users**: Surveyor, AE, EE, Consultants

### 5.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Technical Surveys | User Info            |
+------------------------------------------------------------------+
| Survey Menu  |                Main Content Area                   |
|              |                                                    |
| > Topographic| +----------------------------------------------+  |
| > Soil Test  | | Technical Survey Management                  |  |
| > Utilities  | | Project: Park Ward 42                       |  |
| > Environment| +----------------------------------------------+  |
| > Reports    | |                                              |  |
|              | | Survey Dashboard                            |  |
| Progress:    | | +------------------------------------------+ |  |
| ████░░ 60%   | | | Survey Type    | Status    | Progress   | |  |
|              | | | Topographic    | Active    | ████░ 75%  | |  |
| Tools:       | | | Soil Testing   | Scheduled | ░░░░░ 0%   | |  |
| 📏 Measure   | | | Utility Mapping| Completed | █████ 100% | |  |
| 📍 GPS       | | | Tree Survey    | Active    | ██░░░ 40%  | |  |
| 📸 Photos    | | +------------------------------------------+ |  |
| 🗺️ Maps      | |                                              |  |
|              | | Topographic Survey Details                  |  |
|              | | +------------------------------------------+ |  |
|              | | | Survey Team: ABC Surveyors               | |  |
|              | | | Start Date: 20-Jan-2024                  | |  |
|              | | | Equipment: Total Station, GPS RTK        | |  |
|              | | |                                          | |  |
|              | | | Survey Grid Setup                        | |  |
|              | | | Primary Datum: [MSL Mumbai]              | |  |
|              | | | Local Benchmark: [BM-42 at Gate]        | |  |
|              | | | Grid Interval: [10m x 10m]              | |  |
|              | | | Control Points: [4 established]         | |  |
|              | | |                                          | |  |
|              | | | Survey Data Entry                        | |  |
|              | | | +------------------------------------+ | |  |
|              | | | | Point | Easting | Northing | RL   | | |  |
|              | | | | CP1   | 500.000 | 1000.000 | 100.5| | |  |
|              | | | | CP2   | 600.000 | 1000.000 | 100.8| | |  |
|              | | | | A1    | 510.000 | 1010.000 | 101.2| | |  |
|              | | | | A2    | 520.000 | 1010.000 | 101.5| | |  |
|              | | | | [Import CSV] [Add Point] [Validate]| | |  |
|              | | | +------------------------------------+ | |  |
|              | | |                                          | |  |
|              | | | Contour Generation                      | |  |
|              | | | Interval: [0.5m v] [Generate Contours] | |  |
|              | | | [View 2D Map] [View 3D Surface]        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Field Photos & Notes                       |  |
|              | | +------------------------------------------+ |  |
|              | | | [📸 NE Corner] [📸 Existing Tree]       | |  |
|              | | | [📸 Low Point] [+ Add Photo]            | |  |
|              | | |                                          | |  |
|              | | | Field Notes: [Text area for notes]     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Save Progress] [Validate Data] [Submit]  |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 5.3 Survey Types & Requirements

| Survey Type | Purpose | Deliverables | Equipment | Duration |
|-------------|---------|--------------|-----------|----------|
| Topographic | Ground levels, contours | Contour map, spot levels | Total Station, GPS | 3-5 days |
| Soil Investigation | Bearing capacity, soil type | Bore logs, lab reports | Drilling rig, lab | 5-7 days |
| Utility Mapping | Existing utilities location | Utility layout plan | GPR, Cable locator | 2-3 days |
| Tree Survey | Existing vegetation | Tree location, species, girth | GPS, Measuring tape | 1-2 days |
| Traffic Study | Vehicle movement analysis | Traffic volume data | Counters, Cameras | 7 days |
| Environmental | Baseline environmental data | Air, water, noise levels | Monitoring equipment | 3-5 days |

### 5.4 Soil Investigation Module

```
| Soil Investigation Data                                            |
| +----------------------------------------------------------------+ |
| | Borehole Details                                              | |
| | +------------------------------------------------------------+ | |
| | | BH No. | Location      | Depth | Date     | Status        | | |
| | | BH-01  | NE Corner     | 10m   | 22/01/24 | Completed     | | |
| | | BH-02  | Center        | 10m   | 22/01/24 | Completed     | | |
| | | BH-03  | SW Corner     | 10m   | 23/01/24 | In Progress   | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Bore Log - BH-01                                              | |
| | +------------------------------------------------------------+ | |
| | | Depth | Soil Type      | SPT  | Sample | Remarks          | | |
| | | 0-1m  | Filled Soil    | 8    | DS-1   | Loose fill       | | |
| | | 1-3m  | Silty Clay     | 12   | UDS-1  | Medium stiff     | | |
| | | 3-6m  | Black Cotton   | 18   | UDS-2  | Stiff,expansive  | | |
| | | 6-10m | Weathered Rock | >50  | -      | Refusal at 9.5m  | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Laboratory Test Results                                        | |
| | +------------------------------------------------------------+ | |
| | | Sample | LL% | PL% | SG  | CBR% | Recommendation         | | |
| | | DS-1   | 45  | 22  | 2.65| 5    | Remove & replace       | | |
| | | UDS-1  | 52  | 28  | 2.72| 3    | Needs stabilization    | | |
| | | UDS-2  | 65  | 35  | 2.75| 2    | CNS layer required     | | |
| | +------------------------------------------------------------+ | |
| +----------------------------------------------------------------+ |
```

### 5.5 Data Validation Rules

```javascript
const surveyValidationRules = {
  topographic: {
    minimumPoints: 50,
    gridCoverage: 95, // percentage
    accuracyTolerance: 0.05, // meters
    benchmarkRequired: true,
    closureError: 0.02 // meters
  },
  soilInvestigation: {
    minimumBoreholes: calculateByArea(projectArea),
    minimumDepth: 10, // meters or refusal
    sptInterval: 1.5, // meters
    labTestsRequired: ['LL', 'PL', 'SG', 'CBR'],
    photographRequired: true
  },
  utilityMapping: {
    locateMethods: ['GPR', 'Cable Locator', 'Visual'],
    accuracyClass: 'B', // As per PAS 128
    depthRequired: true,
    photographRequired: true
  }
};
```

### 5.6 Integration with CAD

```javascript
// AutoCAD Integration for Survey Data
exportToCAD() {
  const cadExport = {
    format: 'DWG', // or DXF
    version: 'AutoCAD 2018',
    layers: {
      'SURVEY_POINTS': { color: 7, lineweight: 0.25 },
      'CONTOURS_MAJOR': { color: 1, lineweight: 0.5 },
      'CONTOURS_MINOR': { color: 8, lineweight: 0.25 },
      'BOUNDARIES': { color: 3, lineweight: 0.7 },
      'UTILITIES': { color: 5, lineweight: 0.35 },
      'TREES': { color: 82, lineweight: 0.25 }
    },
    coordinateSystem: 'UTM Zone 44N',
    units: 'Meters'
  };
  
  return generateCADFile(surveyData, cadExport);
}
```

---

## 6. Screen 4: Design & Drawing Management

### 6.1 Screen Overview
**Purpose**: Manage all design development, drawings, and technical documentation

**URL**: `/stage2/design-drawings/{projectId}`

**Primary Users**: Design Engineers, CAD Operators, Consultants, EE

### 6.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Design & Drawings | User Info            |
+------------------------------------------------------------------+
| Drawing Tree |                Main Content Area                   |
|              |                                                    |
| 📁 Architecture | +-------------------------------------------+   |
| ├─ Plans     | | Drawing Management System                   |   |
| ├─ Elevations| | Project: Park Ward 42                       |   |
| └─ Sections  | +-------------------------------------------+   |
| 📁 Structural | |                                             |   |
| ├─ Foundation| | Active Drawing: Site Layout Plan            |   |
| └─ Details   | | +------------------------------------------+ |  |
| 📁 MEP       | | | Drawing No: AR-PL-001 | Rev: 02         | |  |
| ├─ Electrical| | | Scale: 1:500 | Size: A1 | Status: WIP  | |  |
| └─ Plumbing  | | +------------------------------------------+ |  |
| 📁 Landscape | | |                                          | |  |
|              | | | [CAD Viewer displaying site plan]       | |  |
| Drawing List:| | | [Zoom +/-] [Pan] [Measure] [Layers]   | |  |
| Total: 45    | | |                                          | |  |
| Approved: 12 | | +------------------------------------------+ |  |
| In Review: 8 | |                                              |  |
| Draft: 25    | | Drawing Tools & Actions                    |  |
|              | | +------------------------------------------+ |  |
| Quick Filter:| | | [📝 Markup] [💬 Comment] [📐 Measure]   | |  |
| □ My Drawings| | | [🔍 Compare] [📤 Share] [🖨️ Print]     | |  |
| □ For Review | | | [✏️ Edit in CAD] [📋 Properties]        | |  |
| □ Approved   | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Revision History                           |  |
|              | | +------------------------------------------+ |  |
|              | | | Rev | Date     | By      | Changes      | |  |
|              | | | 00  | 01/02/24 | J.Kumar | Initial      | |  |
|              | | | 01  | 05/02/24 | J.Kumar | Grid added   | |  |
|              | | | 02  | 08/02/24 | P.Rao   | Layout mod.  | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Review Comments                            |  |
|              | | +------------------------------------------+ |  |
|              | | | EE: Parking layout needs revision        | |  |
|              | | | AE: Add emergency vehicle access        | |  |
|              | | | [Reply] [Resolve] [Add Comment]        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Related Documents                          |  |
|              | | +------------------------------------------+ |  |
|              | | | 📎 Survey Data | 📎 Design Brief        | |  |
|              | | | 📎 Standards | 📎 Calculations           | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 6.3 Drawing Management Structure

```javascript
interface DrawingMetadata {
  drawingId: string;
  drawingNumber: string; // e.g., "AR-PL-001"
  title: string;
  category: 'ARCHITECTURAL' | 'STRUCTURAL' | 'MEP' | 'LANDSCAPE' | 'MISC';
  subcategory: string;
  scale: string; // e.g., "1:100"
  paperSize: 'A4' | 'A3' | 'A2' | 'A1' | 'A0';
  revision: number;
  status: 'DRAFT' | 'FOR_REVIEW' | 'APPROVED' | 'SUPERSEDED';
  
  // File management
  currentFile: {
    filename: string;
    format: 'DWG' | 'DXF' | 'PDF';
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  };
  
  // Workflow
  workflow: {
    createdBy: string;
    createdDate: Date;
    checkedBy?: string;
    checkedDate?: Date;
    approvedBy?: string;
    approvedDate?: Date;
  };
  
  // References
  references: {
    surveyData?: string[];
    standards?: string[];
    calculations?: string[];
    specifications?: string[];
  };
}
```

### 6.4 Drawing Review Workflow

```
| Drawing Review Process                                             |
| +----------------------------------------------------------------+ |
| | Drawing Submitted for Review                                   | |
| | +------------------------------------------------------------+ | |
| | | Drawing: ST-FD-001 - Foundation Layout Plan                | | |
| | | Submitted by: R. Sharma (Structural Engineer)              | | |
| | | Date: 10-Feb-2024 | Priority: High                        | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Review Checklist                                              | |
| | +------------------------------------------------------------+ | |
| | | ☑ Drawing scale and dimensions correct                     | | |
| | | ☑ North arrow and grid references included                 | | |
| | | ☑ All sections and details referenced                      | | |
| | | ☐ Structural calculations attached                         | | |
| | | ☐ Conflicts with other disciplines resolved                | | |
| | | ☐ Compliance with IS codes verified                        | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Markup Tools                                                  | |
| | [Cloud] [Arrow] [Text] [Dimension] [Highlight] [Stamp]       | |
| |                                                                | |
| | Review Decision                                               | |
| | ○ Approve as submitted                                        | |
| | ● Approve with minor comments (incorporate in next revision) | |
| | ○ Revise and resubmit (major changes required)               | |
| | ○ Reject (does not meet requirements)                        | |
| |                                                                | |
| | Review Notes: [Text area for detailed comments]               | |
| | [Attach Marked PDF] [Submit Review]                          | |
| +----------------------------------------------------------------+ |
```

### 6.5 Drawing Numbering System

```javascript
const drawingNumberingSystem = {
  format: "{DISCIPLINE}-{TYPE}-{SEQUENCE}",
  disciplines: {
    'AR': 'Architectural',
    'ST': 'Structural', 
    'EL': 'Electrical',
    'PL': 'Plumbing',
    'LS': 'Landscape',
    'CV': 'Civil'
  },
  types: {
    'PL': 'Plan',
    'EL': 'Elevation',
    'SC': 'Section',
    'DT': 'Detail',
    'SH': 'Schedule',
    'DG': 'Diagram'
  },
  example: "AR-PL-001", // Architectural Plan 001
  
  generateNumber(discipline, type) {
    const lastNumber = getLastDrawingNumber(discipline, type);
    const sequence = String(lastNumber + 1).padStart(3, '0');
    return `${discipline}-${type}-${sequence}`;
  }
};
```

### 6.6 CAD Standards Enforcement

```
| CAD Standards Check                                                |
| +----------------------------------------------------------------+ |
| | File: ST-FD-001.dwg | Checking against HMDA CAD Standards     | |
| +----------------------------------------------------------------+ |
| | Layer Standards                                    Status      | |
| | Required layers present                            ✓ Pass      | |
| | Layer naming convention                            ✓ Pass      | |
| | Layer colors as per standard                       ⚠ 2 issues  | |
| |                                                                | |
| | Text & Dimension Standards                                     | |
| | Text heights (2.5mm min)                           ✓ Pass      | |
| | Dimension style consistency                        ✓ Pass      | |
| | Font usage (Arial only)                            ✓ Pass      | |
| |                                                                | |
| | Drawing Setup                                                  | |
| | Units set to meters                                ✓ Pass      | |
| | Drawing limits appropriate                         ✓ Pass      | |
| | Title block complete                               ⚠ Missing   | |
| |                                                                | |
| | [View Detailed Report] [Fix Issues] [Override & Proceed]      | |
| +----------------------------------------------------------------+ |
```

---

## 7. Screen 5: BOQ & Detailed Cost Estimation

### 7.1 Screen Overview
**Purpose**: Prepare detailed Bill of Quantities and refined cost estimates based on designs

**URL**: `/stage2/boq-estimation/{projectId}`

**Primary Users**: Quantity Surveyor, EE, Consultants

### 7.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > BOQ & Estimation | User Info             |
+------------------------------------------------------------------+
| BOQ Structure|                Main Content Area                   |
|              |                                                    |
| 📁 Civil     | +----------------------------------------------+  |
| ├─ Earthwork | | Bill of Quantities - Detailed Estimation   |  |
| ├─ Concrete  | | Project: Park Ward 42                       |  |
| └─ Masonry   | | Base Estimate: ₹5.76 Cr | Current: ₹6.24 Cr|  |
| 📁 Finishes  | +----------------------------------------------+  |
| ├─ Plaster   | |                                              |  |
| ├─ Painting  | | Item Details                                |  |
| └─ Flooring  | | +------------------------------------------+ |  |
| 📁 MEP       | | | Code: 2.1.3                             | |  |
|              | | | Description: PCC 1:4:8 for foundation   | |  |
| Summary:     | | | Unit: CUM | Rate: ₹4,850/CUM           | |  |
| Items: 156   | | +------------------------------------------+ |  |
| Amount: ₹6.24Cr| |                                            |  |
|              | | Quantity Calculation                        |  |
| Tools:       | | +------------------------------------------+ |  |
| 📊 Analysis  | | | Source: Drawing ST-FD-001               | |  |
| 📑 SoR 2024  | | |                                          | |  |
| 🧮 Calculator| | | Length(m) | Width(m) | Depth(m) | Qty  | |  |
| 📤 Export    | | | 50.0      | 0.6      | 0.1      | 3.0  | |  |
|              | | | 40.0      | 0.6      | 0.1      | 2.4  | |  |
|              | | | 35.0      | 0.45     | 0.1      | 1.58 | |  |
|              | | | Deductions: Nil                        | |  |
|              | | | Total Quantity: 6.98 CUM               | |  |
|              | | | [Add Row] [Import from Drawing]        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Rate Analysis                               |  |
|              | | +------------------------------------------+ |  |
|              | | | Base Rate (SoR 2024-25): ₹4,500/CUM    | |  |
|              | | | Location Factor: +5% (Urban)           | |  |
|              | | | Market Variation: +3%                  | |  |
|              | | | Lead & Lift: Included                  | |  |
|              | | | Final Rate: ₹4,850/CUM                 | |  |
|              | | |                                          | |  |
|              | | | Amount: 6.98 × 4,850 = ₹33,853         | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Linked Drawings & Specifications           |  |
|              | | +------------------------------------------+ |  |
|              | | | 📐 ST-FD-001 - Foundation Layout        | |  |
|              | | | 📐 ST-DT-005 - Foundation Details      | |  |
|              | | | 📄 Technical Specs Section 3.2         | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous Item] [Save] [Next Item]        |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 7.3 BOQ Structure & Organization

```javascript
interface BOQStructure {
  projectId: string;
  version: number;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  
  categories: {
    code: string; // e.g., "2.0"
    name: string; // e.g., "Civil Works"
    
    subcategories: {
      code: string; // e.g., "2.1"
      name: string; // e.g., "Earthwork"
      
      items: BOQItem[];
    }[];
  }[];
  
  summary: {
    totalItems: number;
    subtotal: number;
    contingency: { percentage: number; amount: number; };
    overheads: { percentage: number; amount: number; };
    profit: { percentage: number; amount: number; };
    gst: { percentage: number; amount: number; };
    grandTotal: number;
  };
}

interface BOQItem {
  itemCode: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  
  quantityDetails: {
    source: 'DRAWING' | 'CALCULATION' | 'LUMPSUM';
    reference: string[];
    calculations: QuantityCalculation[];
  };
  
  rateDetails: {
    source: 'SOR' | 'MARKET' | 'ANALYSIS';
    baseRate: number;
    adjustments: RateAdjustment[];
    finalRate: number;
  };
}
```

### 7.4 Quantity Takeoff Integration

```
| Automated Quantity Takeoff                                         |
| +----------------------------------------------------------------+ |
| | Import from Drawing: ST-FD-001                                | |
| | +------------------------------------------------------------+ | |
| | | Drawing Preview        | Detected Elements                 | | |
| | | [CAD View with        | ☑ Footings: 12 nos               | | |
| | |  highlighted items]   | ☑ Pedestals: 12 nos              | | |
| | |                       | ☑ Plinth Beam: 145 RM            | | |
| | |                       | ☑ Columns: 12 nos                | | |
| | |                       |                                   | | |
| | | [Zoom] [Pan] [Select] | [Configure] [Import Selected]     | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Import Configuration                                           | |
| | Layer Mapping: FOUNDATION → Earthwork in Excavation          | |
| | Unit Conversion: Drawing in MM → BOQ in M                     | |
| | Deduction Rules: Openings > 0.1 sqm                          | |
| +----------------------------------------------------------------+ |
```

### 7.5 Rate Analysis Module

```
| Detailed Rate Analysis                                             |
| +----------------------------------------------------------------+ |
| | Item: RCC M25 for Columns | Unit: CUM                         | |
| +----------------------------------------------------------------+ |
| | Material Components                              Rate/Unit    | |
| | Cement: 320 kg @ ₹450/bag (50kg)                = ₹2,880     | |
| | Sand: 0.45 cum @ ₹1,800/cum                     = ₹810       | |
| | Aggregate 20mm: 0.9 cum @ ₹1,200/cum            = ₹1,080     | |
| | Admixture: 3.2 kg @ ₹45/kg                      = ₹144       | |
| | Sub-total Materials:                             = ₹4,914     | |
| |                                                                | |
| | Labour Components                                              | |
| | Mason: 0.15 days @ ₹800/day                     = ₹120       | |
| | Helper: 0.45 days @ ₹500/day                    = ₹225       | |
| | Sub-total Labour:                                = ₹345       | |
| |                                                                | |
| | Equipment & Tools                                              | |
| | Concrete Mixer: 0.1 day @ ₹1,500/day            = ₹150       | |
| | Vibrator: 0.1 day @ ₹500/day                    = ₹50        | |
| | Tools & Plants @ 5% of labour                    = ₹17        | |
| | Sub-total Equipment:                             = ₹217       | |
| |                                                                | |
| | Total Cost per CUM:                              = ₹5,476     | |
| | Add Contractor's Profit @ 10%:                   = ₹548       | |
| | Rate per CUM:                                    = ₹6,024     | |
| | Say:                                             = ₹6,025     | |
| |                                                                | |
| | [Save Analysis] [Compare with SoR] [Apply to BOQ]            | |
| +----------------------------------------------------------------+ |
```

### 7.6 Cost Comparison Dashboard

```
| Cost Evolution Tracking                                            |
| +----------------------------------------------------------------+ |
| | Stage         | Date      | Amount      | Variance | Remarks  | |
| | Concept       | Jan 2024  | ₹5.76 Cr    | Baseline | Initial  | |
| | Prelim Design | Feb 2024  | ₹6.05 Cr    | +5.0%    | Scope+   | |
| | Detail Design | Mar 2024  | ₹6.24 Cr    | +8.3%    | Current  | |
| +----------------------------------------------------------------+ |
| |                                                                | |
| | Major Variations from Concept                                  | |
| | +------------------------------------------------------------+ | |
| | | Item                    | Concept    | Current | Variance | | |
| | | Earthwork               | ₹25.0 L    | ₹28.5 L | +14.0%   | | |
| | | RCC Work                | ₹2.10 Cr   | ₹2.28 Cr| +8.6%    | | |
| | | Landscape               | ₹45.0 L    | ₹52.0 L | +15.6%   | | |
| | | Electrical              | ₹35.0 L    | ₹33.5 L | -4.3%    | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | [Generate Variance Report] [Export Analysis] [Update Budget]  | |
| +----------------------------------------------------------------+ |
```

---

## 8. Screen 6: Clearance & NOC Management

### 8.1 Screen Overview
**Purpose**: Track and manage all regulatory clearances and NOCs required for the project

**URL**: `/stage2/clearances/{projectId}`

**Primary Users**: Legal Officer, PM, EE, DCE

### 8.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Clearances & NOCs | User Info            |
+------------------------------------------------------------------+
| Clearance    |                Main Content Area                   |
| Categories   |                                                    |
|              | +----------------------------------------------+  |
| Environmental| | Clearance Management Dashboard               |  |
| > Tree Cut   | | Project: Park Ward 42                       |  |
| > Pollution  | +----------------------------------------------+  |
|              | |                                              |  |
| Utilities    | | Clearance Overview                          |  |
| > Water      | | +------------------------------------------+ |  |
| > Power      | | | Required: 8 | Obtained: 3 | Pending: 5 | |  |
| > Telecom    | | | Critical Path Items: 2 (Tree, Heritage) | |  |
|              | | +------------------------------------------+ |  |
| Regulatory   | |                                              |  |
| > Fire       | | Active Clearances                           |  |
| > Traffic    | | +------------------------------------------+ |  |
| > Heritage   | | | Agency      | Type    | Status | Days  | |  |
|              | | | Forest Dept | Tree    | 📄 Sub | 15/30 | |  |
| Documents    | | | HMWSSB      | Water   | ✓ Recd | Done  | |  |
| □ Templates  | | | TSSPDCL     | Power   | 📋 Prep| 0/21  | |  |
| □ Submitted  | | | Traffic PS  | Traffic | 🔄 Query| 8/14 | |  |
| □ Received   | | | Heritage    | Heritage| ⏳ Wait | 5/45 | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Tree Cutting Permission Detail              |  |
|              | | +------------------------------------------+ |  |
|              | | | Trees Affected: 12 (8 to cut, 4 transplant)|  |
|              | | | Application No: FC/2024/0234              | |  |
|              | | | Submitted: 25-Jan-2024                    | |  |
|              | | | Status: Under Review                      | |  |
|              | | |                                          | |  |
|              | | | Required Documents                        | |  |
|              | | | ✓ Tree enumeration report                | |  |
|              | | | ✓ Justification letter                   | |  |
|              | | | ✓ Transplantation plan                   | |  |
|              | | | ✓ Compensatory plantation (1:10)         | |  |
|              | | | ⏳ Committee inspection pending           | |  |
|              | | |                                          | |  |
|              | | | Timeline Tracking                        | |  |
|              | | | Applied: 25/01 | Inspection: 05/02      | |  |
|              | | | Committee: 12/02 | Decision: Pending    | |  |
|              | | |                                          | |  |
|              | | | Follow-up Actions                        | |  |
|              | | | Next: Site inspection on 05-Feb-2024    | |  |
|              | | | Contact: Forest Officer - 98765xxxxx    | |  |
|              | | | [Send Reminder] [Upload Doc] [Add Note] | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Clearance Calendar View                    |  |
|              | | [Timeline showing all clearances]          |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 8.3 Clearance Master Data

```javascript
const clearanceMasterData = {
  environmental: [
    {
      type: 'TREE_CUTTING',
      authority: 'Forest Department',
      applicableCriteria: 'If trees > 50cm girth affected',
      documentsRequired: [
        'Tree enumeration report',
        'Justification letter',
        'Transplantation plan',
        'Compensatory plantation proposal'
      ],
      timeline: 30, // days
      fees: 5000,
      validity: 180 // days
    },
    {
      type: 'ENVIRONMENTAL_CLEARANCE',
      authority: 'TSPCB',
      applicableCriteria: 'Projects > 20,000 sqm',
      documentsRequired: [
        'EIA report',
        'Environmental management plan',
        'Public hearing report'
      ],
      timeline: 90,
      fees: 50000,
      validity: 1825 // 5 years
    }
  ],
  utilities: [
    {
      type: 'WATER_CONNECTION',
      authority: 'HMWSSB',
      documentsRequired: [
        'Water requirement calculation',
        'Plumbing layout',
        'Property documents'
      ],
      timeline: 21,
      fees: 'As per demand'
    },
    {
      type: 'POWER_CONNECTION',
      authority: 'TSSPDCL',
      documentsRequired: [
        'Load calculation',
        'Single line diagram',
        'Electrical layout'
      ],
      timeline: 30,
      fees: 'As per load'
    }
  ],
  regulatory: [
    {
      type: 'FIRE_NOC',
      authority: 'Fire Department',
      applicableCriteria: 'All public buildings',
      documentsRequired: [
        'Fire fighting system layout',
        'Emergency evacuation plan',
        'Building plans'
      ],
      timeline: 15,
      fees: 10000
    }
  ]
};
```

### 8.4 Clearance Tracking Workflow

```
| Clearance Workflow Status                                          |
| +----------------------------------------------------------------+ |
| | Tree Cutting Permission Workflow                               | |
| | +------------------------------------------------------------+ | |
| | | Stage              | Status    | Date      | By      | Doc | | |
| | | 1. Application     | ✓ Done    | 25/01/24  | AE Ram  | 📄  | | |
| | | 2. Fee Payment     | ✓ Done    | 26/01/24  | Finance | 📄  | | |
| | | 3. Site Inspection | ⏳ Scheduled | 05/02/24 | Forest  | -  | | |
| | | 4. Committee Review| ⏸️ Waiting | -         | -       | -  | | |
| | | 5. Decision        | ⏸️ Waiting | -         | -       | -  | | |
| | | 6. Permission Letter| ⏸️ Waiting | -        | -       | -  | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Dependency Alert: Heritage NOC required before Tree Permission | |
| +----------------------------------------------------------------+ |
```

### 8.5 Document Generation & Tracking

```javascript
generateClearanceApplication(clearanceType) {
  const templates = {
    TREE_CUTTING: {
      template: 'tree_cutting_application.docx',
      dataPoints: [
        'projectName',
        'location',
        'treeCount',
        'treeDetails',
        'justification',
        'compensatoryPlantation'
      ],
      attachments: [
        'treeEnumerationReport',
        'sitePhotographs',
        'layoutPlanWithTrees'
      ]
    },
    TRAFFIC_NOC: {
      template: 'traffic_noc_application.docx',
      dataPoints: [
        'projectName',
        'location',
        'anticipatedTraffic',
        'parkingProvision',
        'trafficManagementPlan'
      ]
    }
  };
  
  return fillTemplate(templates[clearanceType]);
}
```

### 8.6 Compliance Dashboard

```
| Clearance Compliance Matrix                                        |
| +----------------------------------------------------------------+ |
| | Clearance Type    | Required | Status | Risk | Action Required| |
| | Environmental     | ✓        | 60%    | 🟡   | Expedite EIA   | |
| | Tree Cutting      | ✓        | 40%    | 🔴   | Critical path  | |
| | Water Connection  | ✓        | 100%   | 🟢   | Completed      | |
| | Power Sanction    | ✓        | 20%    | 🟡   | Submit load calc|
| | Traffic NOC       | ✓        | 80%    | 🟢   | Final review   | |
| | Fire NOC          | ✓        | 0%     | 🟡   | Not started    | |
| | Heritage          | ✓        | 30%    | 🔴   | Committee meet | |
| | Building Plan     | ✓        | 100%   | 🟢   | Approved       | |
| +----------------------------------------------------------------+ |
| | Overall Compliance: 54% | Critical Items: 2 | At Risk: 4      | |
| | [Generate Status Report] [Export Timeline] [Send Reminders]    | |
| +----------------------------------------------------------------+ |
```

---

## 9. Screen 7: Technical Sanction Workflow

### 9.1 Screen Overview
**Purpose**: Manage technical sanction process with approval hierarchy based on project value

**URL**: `/stage2/technical-sanction/{projectId}`

**Primary Users**: AE, EE, DCE, CE, Higher Authorities

### 9.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Technical Sanction | User Info           |
+------------------------------------------------------------------+
| TS Navigation|                Main Content Area                   |
|              |                                                    |
| > TS Request | +----------------------------------------------+  |
| > Documents  | | Technical Sanction Process                  |  |
| > Review     | | Project: Park Ward 42 | Value: ₹6.24 Cr    |  |
| > Approval   | +----------------------------------------------+  |
| > History    | |                                              |  |
|              | | Pre-Submission Checklist                   |  |
| TS Status:   | | +------------------------------------------+ |  |
| Preparing    | | | Document                    | Status     | |  |
|              | | | ✓ Detailed Estimates        | Complete   | |  |
| Checklist:   | | | ✓ All Drawings (45 nos)    | Complete   | |  |
| ████░░ 85%   | | | ✓ Structural Designs        | Complete   | |  |
|              | | | ✓ BOQ with Analysis        | Complete   | |  |
|              | | | ⏳ Clearance Status         | 6 of 8     | |  |
|              | | | ⏳ Soil Report              | In Review  | |  |
|              | | | ✓ DPR Document             | Compiled   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Technical Parameters Summary                |  |
|              | | +------------------------------------------+ |  |
|              | | | Estimated Cost: ₹6,24,50,000              | |  |
|              | | | Project Duration: 18 months               | |  |
|              | | | Built-up Area: 2,500 sqm                  | |  |
|              | | | Cost per sqm: ₹24,980                    | |  |
|              | | |                                          | |  |
|              | | | Sanctioning Authority: DCE (₹10 Cr limit)| |  |
|              | | | Current Level: EE Review                 | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Technical Review Points (For EE)           |  |
|              | | +------------------------------------------+ |  |
|              | | | Aspect          | Finding    | Action   | |  |
|              | | | Design Standards| Compliant  | ✓ Pass   | |  |
|              | | | Cost Reasonable| Within 5%  | ✓ Pass   | |  |
|              | | | Specifications | IS Codes OK| ✓ Pass   | |  |
|              | | | Drawings       | Complete   | ✓ Pass   | |  |
|              | | | BOQ Accuracy   | Verified   | ✓ Pass   | |  |
|              | | | Schedule       | Realistic  | ✓ Pass   | |  |
|              | | |                                          | |  |
|              | | | Technical Observations:                   | |  |
|              | | | [Text area for technical comments]       | |  |
|              | | |                                          | |  |
|              | | | Recommendation:                          | |  |
|              | | | ● Recommend for Technical Sanction       | |  |
|              | | | ○ Needs revision in following areas      | |  |
|              | | | ○ Not recommended due to                 | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Save Review] [Submit to DCE] [Return]     |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 9.3 Technical Sanction Authority Matrix

```javascript
const technicalSanctionMatrix = {
  authorities: [
    {
      role: 'AE',
      limit: 1000000, // ₹10 Lakhs
      conditions: 'Minor works, repairs',
      reviewRequired: false
    },
    {
      role: 'EE',
      limit: 20000000, // ₹2 Crores
      conditions: 'All works within limit',
      reviewRequired: true,
      reviewer: 'AE'
    },
    {
      role: 'DCE',
      limit: 100000000, // ₹10 Crores
      conditions: 'All works within limit',
      reviewRequired: true,
      reviewer: 'EE'
    },
    {
      role: 'CE',
      limit: 500000000, // ₹50 Crores
      conditions: 'All works within limit',
      reviewRequired: true,
      reviewer: 'DCE'
    },
    {
      role: 'SECRETARY',
      limit: 1000000000, // ₹100 Crores
      conditions: 'With CE recommendation',
      reviewRequired: true,
      reviewer: 'CE'
    },
    {
      role: 'COMMISSIONER',
      limit: 5000000000, // ₹500 Crores
      conditions: 'With Secretary recommendation',
      reviewRequired: true,
      reviewer: 'SECRETARY'
    },
    {
      role: 'BOARD',
      limit: Infinity,
      conditions: 'All works above ₹500 Cr',
      reviewRequired: true,
      reviewer: 'COMMISSIONER'
    }
  ],
  
  getAuthority(amount) {
    return this.authorities.find(auth => amount <= auth.limit);
  }
};
```

### 9.4 TS Document Assembly

```
| Technical Sanction Document Package                                |
| +----------------------------------------------------------------+ |
| | Cover Page                                          [Preview]  | |
| | Executive Summary (2 pages)                         [Preview]  | |
| | Technical Details                                              | |
| | ├─ Design Basis & Standards (5 pages)              [Preview]  | |
| | ├─ Structural Design Summary (8 pages)             [Preview]  | |
| | └─ MEP Design Summary (6 pages)                    [Preview]  | |
| | Cost Estimates                                                 | |
| | ├─ Abstract of Cost (1 page)                       [Preview]  | |
| | ├─ Detailed BOQ (25 pages)                         [Preview]  | |
| | └─ Rate Analysis (15 pages)                        [Preview]  | |
| | Drawings                                                       | |
| | ├─ Architectural (12 drawings)                      [Preview]  | |
| | ├─ Structural (15 drawings)                         [Preview]  | |
| | ├─ MEP (10 drawings)                               [Preview]  | |
| | └─ Landscape (8 drawings)                          [Preview]  | |
| | Clearances & Approvals                                         | |
| | ├─ Clearance Status Summary                        [Preview]  | |
| | └─ Copies of Obtained NOCs                         [Preview]  | |
| |                                                                | |
| | [Generate Complete PDF] [Digital Sign] [Submit for TS]        | |
| +----------------------------------------------------------------+ |
```

### 9.5 Technical Review Workflow

```javascript
interface TechnicalReview {
  projectId: string;
  reviewer: {
    role: string;
    name: string;
    designation: string;
  };
  
  reviewChecklist: {
    designCompliance: {
      status: 'PASS' | 'FAIL' | 'CONDITIONAL';
      remarks: string;
      standards: string[]; // IS codes, NBC, etc.
    };
    
    costReasonableness: {
      status: 'PASS' | 'FAIL' | 'CONDITIONAL';
      variation: number; // percentage from benchmark
      justification?: string;
    };
    
    technicalAdequacy: {
      structuralDesign: boolean;
      architecturalPlanning: boolean;
      mepCoordination: boolean;
      constructability: boolean;
    };
    
    documentCompleteness: {
      drawings: { required: number; submitted: number; };
      calculations: boolean;
      specifications: boolean;
      clearances: { required: number; obtained: number; };
    };
  };
  
  recommendation: 'APPROVE' | 'CONDITIONAL' | 'REVISE' | 'REJECT';
  conditions?: string[];
  technicalNotes: string;
  
  generateTSOrder() {
    if (this.recommendation === 'APPROVE') {
      return {
        orderNumber: generateTSNumber(),
        date: new Date(),
        validity: 24, // months
        conditions: this.conditions,
        approvedBy: this.reviewer
      };
    }
  }
}
```

### 9.6 Post-TS Actions

```
| Technical Sanction Granted                                         |
| +----------------------------------------------------------------+ |
| | TS Order No: TS/2024/0456 | Date: 15-Mar-2024                | |
| | Sanctioned Amount: ₹6,24,50,000 | Validity: 24 months         | |
| +----------------------------------------------------------------+ |
| |                                                                | |
| | Next Steps Checklist                                          | |
| | ☐ Update project status to "TS Obtained"                     | |
| | ☐ Share TS order with all stakeholders                       | |
| | ☐ Initiate tendering process preparation                     | |
| | ☐ Complete pending clearances (2 remaining)                  | |
| | ☐ Prepare tender documents based on approved DPR             | |
| | ☐ Get administrative approval if required                    | |
| |                                                                | |
| | Stage 3 Readiness: 87% | [View Pending Items]                | |
| | [Proceed to Tendering] [Download TS Order] [Share]           | |
| +----------------------------------------------------------------+ |
```

---

## 10. Screen 8: DPR Document Assembly & Review

### 10.1 Screen Overview
**Purpose**: Compile, review, and finalize the complete DPR document

**URL**: `/stage2/dpr-compilation/{projectId}`

**Primary Users**: PM, Design Team, EE, DCE

### 10.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > DPR Compilation | User Info              |
+------------------------------------------------------------------+
| DPR Sections |                Main Content Area                   |
|              |                                                    |
| ✓ Cover Page | +----------------------------------------------+  |
| ✓ Contents   | | DPR Document Assembly & Review              |  |
| ✓ Executive  | | Project: Park Ward 42                       |  |
| ✓ Project    | | Version: 2.1 | Status: Under Review        |  |
| ⚡ Technical  | +----------------------------------------------+  |
| ○ Drawings   | |                                              |  |
| ○ Estimates  | | Document Preview                            |  |
| ○ Annexures  | | +------------------------------------------+ |  |
|              | | | [PDF Viewer showing current section]     | |  |
| Completion:  | | |                                          | |  |
| ████░░ 78%   | | | 4. TECHNICAL DETAILS                     | |  |
|              | | |                                          | |  |
| Tools:       | | | 4.1 Design Basis                        | |  |
| ✏️ Edit      | | | The design of the Community Park has    | |  |
| 💬 Comment   | | | been carried out in accordance with:    | |  |
| 📑 Merge     | | | • IS 456:2000 for RCC design           | |  |
| 🔍 Check     | | | • IS 800:2007 for steel structures     | |  |
| 📤 Export    | | | • NBC 2016 for building services       | |  |
|              | | | • HMDA guidelines for public spaces    | |  |
|              | | |                                          | |  |
|              | | | 4.2 Structural Design Summary           | |  |
|              | | | The structural system comprises...      | |  |
|              | | |                                          | |  |
|              | | | [Page 45 of 156]                       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Section Status & Actions                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Author: S. Kumar | Last Edit: 2 hrs ago | |  |
|              | | | Reviewers: ✓ AE Ram | ⏳ EE Sharma     | |  |
|              | | |                                          | |  |
|              | | | Comments (3)                            | |  |
|              | | | EE: Add seismic design considerations   | |  |
|              | | | AE: Include soil improvement details    | |  |
|              | | | [View All] [Add Comment] [Resolve]     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous Section] [Save] [Next Section]   |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 10.3 DPR Structure Template

```javascript
const dprStructureTemplate = {
  sections: [
    {
      number: '1',
      title: 'EXECUTIVE SUMMARY',
      subsections: [
        '1.1 Project Overview',
        '1.2 Key Features',
        '1.3 Cost Summary',
        '1.4 Implementation Schedule'
      ],
      requiredLength: '3-5 pages',
      status: 'COMPLETED'
    },
    {
      number: '2',
      title: 'PROJECT BACKGROUND',
      subsections: [
        '2.1 Need & Justification',
        '2.2 Site Details',
        '2.3 Stakeholder Consultations',
        '2.4 Project Objectives'
      ],
      requiredLength: '5-8 pages',
      status: 'COMPLETED'
    },
    {
      number: '3',
      title: 'TECHNICAL INVESTIGATIONS',
      subsections: [
        '3.1 Topographical Survey',
        '3.2 Soil Investigation',
        '3.3 Environmental Assessment',
        '3.4 Traffic Study'
      ],
      requiredLength: '10-15 pages',
      status: 'COMPLETED'
    },
    {
      number: '4',
      title: 'DESIGN & ENGINEERING',
      subsections: [
        '4.1 Design Philosophy',
        '4.2 Architectural Design',
        '4.3 Structural Design',
        '4.4 MEP Systems',
        '4.5 Landscape Design'
      ],
      requiredLength: '20-30 pages',
      status: 'IN_PROGRESS'
    },
    {
      number: '5',
      title: 'COST ESTIMATES',
      subsections: [
        '5.1 Cost Abstract',
        '5.2 Detailed BOQ',
        '5.3 Rate Analysis',
        '5.4 Cost Comparison'
      ],
      requiredLength: '15-25 pages',
      status: 'PENDING'
    },
    {
      number: '6',
      title: 'IMPLEMENTATION PLAN',
      subsections: [
        '6.1 Construction Methodology',
        '6.2 Project Schedule',
        '6.3 Resource Planning',
        '6.4 Quality Control'
      ],
      requiredLength: '8-12 pages',
      status: 'PENDING'
    },
    {
      number: '7',
      title: 'DRAWINGS',
      subsections: [
        '7.1 Architectural Drawings',
        '7.2 Structural Drawings',
        '7.3 MEP Drawings',
        '7.4 Landscape Drawings'
      ],
      requiredLength: 'As applicable',
      status: 'PENDING'
    }
  ]
};
```

### 10.4 Collaborative Review Features

```
| Multi-user Review Interface                                        |
| +----------------------------------------------------------------+ |
| | Active Reviewers (Real-time)                                   | |
| | 👤 EE Sharma - Viewing Section 4.2                            | |
| | 👤 AE Ram - Editing Section 5.1                               | |
| | 👤 QS Patel - Reviewing BOQ                                   | |
| +----------------------------------------------------------------+ |
| |                                                                | |
| | Review Comments Thread                                         | |
| | +------------------------------------------------------------+ | |
| | | Section 4.2 - Line 45                                      | | |
| | | EE Sharma: The design load seems conservative. Can we      | | |
| | | optimize the member sizes?                    2 hrs ago    | | |
| | |   ↳ Designer: Will check and revert          1 hr ago     | | |
| | |   ↳ EE Sharma: Also verify with IS code      30 min ago   | | |
| | | [Reply] [Resolve] [Assign]                                 | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Version Comparison                                            | |
| | Version 2.0 (Yesterday)    | Version 2.1 (Current)           | |
| | Design load: 5 kN/m²       | Design load: 4.5 kN/m²         | |
| | Members: ISMB 300          | Members: ISMB 250              | |
| | [Show More Changes] [Accept All] [Revert]                    | |
| +----------------------------------------------------------------+ |
```

### 10.5 Quality Assurance Checks

```javascript
performDPRQualityChecks() {
  const qualityChecks = {
    completeness: {
      allSectionsPresent: checkSections(),
      requiredDrawings: verifyDrawingList(),
      mandatoryAnnexures: checkAnnexures(),
      score: calculateCompleteness()
    },
    
    consistency: {
      costMatchesBoQ: compareCostReferences(),
      drawingReferences: validateDrawingRefs(),
      codeCompliance: checkDesignCodes(),
      terminology: checkTermConsistency()
    },
    
    technical: {
      calculationsVerified: checkCalculations(),
      designAdequacy: assessDesignQuality(),
      constructability: evaluateConstruction(),
      specifications: validateSpecs()
    },
    
    formatting: {
      pageNumbering: checkPageNumbers(),
      tableOfContents: validateTOC(),
      figureReferences: checkFigureRefs(),
      fontConsistency: checkFormatting()
    }
  };
  
  return {
    overallScore: calculateQualityScore(qualityChecks),
    issues: extractIssues(qualityChecks),
    readyForSubmission: overallScore > 95
  };
}
```

### 10.6 Final DPR Generation

```
| DPR Finalization                                                   |
| +----------------------------------------------------------------+ |
| | Pre-submission Checklist                         Status        | |
| | ✓ All sections complete                          PASS          | |
| | ✓ Technical review by all disciplines            PASS          | |
| | ✓ Cost estimates verified                        PASS          | |
| | ✓ All drawings referenced correctly              PASS          | |
| | ✓ Quality checks passed (Score: 97%)             PASS          | |
| | ⚠ Final proofreading                            IN PROGRESS    | |
| +----------------------------------------------------------------+ |
| |                                                                | |
| | Output Options                                                 | |
| | Document Title: [DPR - New Community Park Ward 42]            | |
| | Version: [2.1 Final]                                           | |
| | Date: [15-March-2024]                                          | |
| |                                                                | |
| | ☑ Include all drawings                                        | |
| | ☑ Include cost annexures                                      | |
| | ☑ Include investigation reports                               | |
| | ☑ Add digital signatures                                      | |
| | ☑ Create bookmarks and hyperlinks                            | |
| |                                                                | |
| | Output Format:                                                 | |
| | ● PDF (Secured) - For official submission                     | |
| | ○ PDF (Editable) - For internal use                          | |
| | ○ Word Document - For future modifications                    | |
| | ○ HTML Package - For online viewing                          | |
| |                                                                | |
| | [Preview Final] [Generate DPR] [Submit for Technical Sanction]| |
| +----------------------------------------------------------------+ |
```

---

## 11. Screen 9: Stage 2 Dashboard & Progress Tracking

### 11.1 Screen Overview
**Purpose**: Comprehensive dashboard for monitoring Stage 2 progress across all projects

**URL**: `/stage2/dashboard`

**Primary Users**: All roles with filtered views based on permissions

### 11.2 Dashboard Layout

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 Dashboard | User: DCE | Settings           |
+------------------------------------------------------------------+
| Filters:     |                Main Dashboard Area                 |
| [Last 30 Days v] |                                               |
| Zone: [All v]| +----------------------------------------------+  |
| Status:[Active v] | Stage 2: DPR & Approvals Overview          |  |
|              | +----------------------------------------------+  |
| Quick Stats: | |                                              |  |
| Projects: 28 | | Key Performance Indicators                  |  |
| On-time: 71% | | +----------+ +----------+ +----------+ +----------+ |
| At-risk: 5   | | |    28    | |    12    | |    8     | |  ₹125  | |
| Delayed: 3   | | | Active   | | In-house | | Consultant| | Crores | |
|              | | | DPRs     | | DPRs     | | DPRs     | | Total  | |
| My Actions:  | | +----------+ +----------+ +----------+ +----------+ |
| Reviews: 4   | |                                              |  |
| Approvals: 2 | | Stage Progress Distribution                 |  |
| Urgent: 1    | | +------------------------------------------+ |  |
|              | | | Survey & Investigation: ████ 8 (29%)      | |  |
|              | | | Design Development:     ████ 7 (25%)      | |  |
|              | | | Drawing Preparation:    ███ 5 (18%)       | |  |
|              | | | BOQ & Estimation:       ██ 4 (14%)        | |  |
|              | | | Clearances:             ██ 3 (11%)        | |  |
|              | | | TS Process:             █ 1 (3%)          | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Timeline Performance                        |  |
|              | | +------------------------------------------+ |  |
|              | | | On Schedule:  ████████████ 20 (71%)      | |  |
|              | | | Minor Delay:  ███ 5 (18%)                | |  |
|              | | | Major Delay:  ██ 3 (11%)                 | |  |
|              | | |                                          | |  |
|              | | | Average DPR Duration: 4.2 months         | |  |
|              | | | Target: 4 months | Best: 3.1 months     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Critical Path Items (Requiring Attention)  |  |
|              | | +------------------------------------------+ |  |
|              | | | Project         | Issue    | Days Delayed| |  |
|              | | | Road Widening   | Heritage | 15 days    | |  |
|              | | | Water Treatment | Env Clear| 12 days    | |  |
|              | | | Office Complex | Design   | 8 days     | |  |
|              | | | [View Details] [Send Alerts] [Escalate] | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 11.3 Analytics Visualizations

#### 11.3.1 Consultant Performance Metrics
```
| Consultant Performance Analysis                                    |
| +----------------------------------------------------------------+ |
| | Consultant      | Projects | Avg Duration | Quality | On-time | |
| | ABC Consultants | 5        | 4.1 months   | 95%     | 80%     | |
| | XYZ Engineers   | 3        | 3.8 months   | 92%     | 100%    | |
| | PQR Associates  | 4        | 4.5 months   | 88%     | 50%     | |
| +----------------------------------------------------------------+ |
| | [Detailed Report] [Compare] [Rate Performance]                | |
| +----------------------------------------------------------------+ |
```

#### 11.3.2 Clearance Tracking Heat Map
```
| Clearance Status Across Projects                                   |
| +----------------------------------------------------------------+ |
| |         | Env | Tree | Water | Power | Traffic | Fire | Heritage|
| | Proj-01 | 🟢  | 🟢   | 🟢    | 🟢    | 🟡      | 🟢   | N/A     |
| | Proj-02 | 🟡  | 🔴   | 🟢    | 🟢    | 🟢      | 🟡   | 🔴      |
| | Proj-03 | 🟢  | 🟢   | 🟢    | 🟡    | 🟢      | 🟡   | N/A     |
| | Proj-04 | 🔴  | 🔴   | 🟢    | 🟢    | 🟡      | 🔴   | 🟡      |
| +----------------------------------------------------------------+ |
| | 🟢 Obtained | 🟡 In Progress | 🔴 Not Started | N/A Not Reqd  | |
| +----------------------------------------------------------------+ |
```

#### 11.3.3 Cost Evolution Tracking
```
| DPR Cost Evolution vs Initial Estimates                            |
| +----------------------------------------------------------------+ |
| |                    Initial vs DPR Cost Comparison              | |
| | 140% |                                          ●              | |
| | 120% |                               ●    ●         ●         | |
| | 100% |————————————●——————●——————————————————————————         | |
| |  80% |      ●                  ●                              | |
| |  60% |                                                        | |
| |      +------+------+------+------+------+------+------+      | |
| |      <1Cr  1-2Cr  2-5Cr  5-10Cr 10-25Cr 25-50Cr >50Cr      | |
| |                                                                | |
| | Average Variation: +8.5% | Within acceptable range            | |
| +----------------------------------------------------------------+ |
```

### 11.4 Resource Utilization

```
| Design Team Utilization                                            |
| +----------------------------------------------------------------+ |
| | Team Member     | Current Load | Capacity | Upcoming | Skill  | |
| | S. Kumar (Sr)   | ████████░░   | 80%      | 2 more   | Struct | |
| | P. Rao          | ██████░░░░   | 60%      | 1 more   | Arch   | |
| | A. Sharma       | █████████░   | 95%      | None     | MEP    | |
| | R. Patel        | ████░░░░░░   | 40%      | 3 more   | CAD    | |
| +----------------------------------------------------------------+ |
| | [Optimize Allocation] [View Schedule] [Add Resources]         | |
| +----------------------------------------------------------------+ |
```

### 11.5 Automated Alerts & Actions

```javascript
const stage2Alerts = {
  critical: [
    {
      type: 'CLEARANCE_DELAY',
      trigger: 'Clearance pending > 80% of timeline',
      action: 'Escalate to DCE',
      projects: ['PROJ-2024-045', 'PROJ-2024-052']
    },
    {
      type: 'TS_DEADLINE',
      trigger: 'TS submission due in 3 days',
      action: 'Send reminder to team',
      projects: ['PROJ-2024-038']
    }
  ],
  
  warnings: [
    {
      type: 'CONSULTANT_DELAY',
      trigger: 'Milestone missed by consultant',
      action: 'Issue notice, alert PM',
      projects: ['PROJ-2024-041']
    },
    {
      type: 'COST_OVERRUN',
      trigger: 'DPR cost > 15% of concept',
      action: 'Flag for review',
      projects: ['PROJ-2024-049', 'PROJ-2024-051']
    }
  ],
  
  generateDailyDigest() {
    return {
      critical: this.critical.length,
      warnings: this.warnings.length,
      actionsRequired: [...this.critical, ...this.warnings],
      emailTo: ['dce@hmda.gov.in', 'ce@hmda.gov.in']
    };
  }
};
```

### 11.6 Executive Summary Report

```
| Stage 2 Executive Summary - March 2024                             |
| +----------------------------------------------------------------+ |
| | Total DPRs in Progress: 28                                     | |
| | Completed This Month: 6                                        | |
| | Total Value: ₹125.5 Crores                                     | |
| |                                                                | |
| | Key Achievements:                                              | |
| | • 71% projects on schedule (Target: 75%)                      | |
| | • Average DPR duration reduced to 4.2 months                  | |
| | • Cost variations within ±10% for 85% projects                | |
| |                                                                | |
| | Areas of Concern:                                              | |
| | • Heritage clearances causing delays (3 projects)             | |
| | • Consultant performance below par for 2 vendors              | |
| | • Design team capacity at 87% utilization                     | |
| |                                                                | |
| | Recommendations:                                                | |
| | 1. Fast-track heritage committee meetings                     | |
| | 2. Review consultant empanelment criteria                     | |
| | 3. Recruit additional design engineers                        | |
| |                                                                | |
| | [Download Full Report] [Schedule Review Meeting] [Share]      | |
| +----------------------------------------------------------------+ |
```

---

## 12. Integration with External Systems

### 12.1 CAD Software Integration

```javascript
const cadIntegration = {
  supported: ['AutoCAD', 'MicroStation', 'Revit', 'SketchUp'],
  
  protocols: {
    import: {
      formats: ['DWG', 'DXF', 'RVT', 'SKP'],
      validation: true,
      layerMapping: true,
      unitConversion: true
    },
    
    export: {
      formats: ['DWG', 'DXF', 'PDF'],
      preserveLayers: true,
      includeXrefs: true
    },
    
    collaboration: {
      checkInOut: true,
      versionControl: true,
      cloudSync: true,
      markupSync: true
    }
  },
  
  webViewer: {
    engine: 'Autodesk Forge Viewer',
    capabilities: ['View', 'Measure', 'Markup', 'Compare'],
    supportedFormats: ['DWG', 'DXF', 'PDF', 'RVT']
  }
};
```

### 12.2 External Agency Systems

| System | Agency | Integration Type | Purpose |
|--------|--------|------------------|---------|
| Parivesh | MoEFCC | Web Service | Environmental clearances |
| HMWSSB Portal | HMWSSB | API | Water/Sewerage NOCs |
| TSSPDCL | Power Dept | API | Power sanctions |
| RTC WebLand | Revenue | Web Service | Land records |
| E-Procurement | HMDA | Database | Consultant tenders |

### 12.3 Document Management Integration

```javascript
const documentManagement = {
  storage: {
    provider: 'HMDA DMS',
    protocol: 'REST API',
    authentication: 'OAuth 2.0'
  },
  
  features: {
    versionControl: true,
    checkInOut: true,
    workflow: true,
    digitalSignature: true,
    audit: true
  },
  
  metadata: {
    projectId: 'required',
    documentType: 'required',
    stage: 'required',
    classification: 'required',
    retention: 'auto-calculated'
  }
};
```

---

## 13. Mobile Responsive Design

### 13.1 Mobile-Specific Features for Stage 2

#### 13.1.1 Field Survey App
```
+---------------------------+
| Survey Data Collection    |
+---------------------------+
| Project: Park Ward 42     |
| Type: Topographic Survey  |
+---------------------------+
| Current Location:         |
| Lat: 17.4239° N          |
| Lon: 78.4738° E          |
| Accuracy: ±2m            |
|                          |
| [📍 Mark Point]          |
| [📸 Take Photo]          |
| [📝 Add Note]           |
|                          |
| Points Collected: 45/100  |
| ████░░░░░░ 45%           |
|                          |
| [Upload Data] [Save Offline] |
+---------------------------+
```

#### 13.1.2 Drawing Review Mobile Interface
- Pinch to zoom drawings
- Touch-based markup tools
- Offline viewing capability
- Comment with voice notes
- Quick approval actions

#### 13.1.3 Clearance Status Mobile View
```
+---------------------------+
| Clearance Tracker         |
+---------------------------+
| 🟢 Water NOC - Received   |
| 🟡 Tree Permission - Day 12|
| 🔴 Heritage - Not Started |
| 🟢 Power Sanction - Done  |
|                          |
| [View Details] [Actions]  |
+---------------------------+
```

### 13.2 Progressive Web App Features

- Offline survey data collection
- Background sync when connected
- Push notifications for approvals
- Camera integration for site photos
- GPS tracking for survey work

---

## 14. Implementation Guidelines

### 14.1 Technical Requirements

#### Performance Benchmarks
- Page Load: <2 seconds on 4G
- Drawing Load: <5 seconds for 10MB file
- Search Results: <1 second
- Auto-save: Every 60 seconds

#### Security Requirements
- Encryption: AES-256 for data at rest
- Transmission: TLS 1.3
- Authentication: Multi-factor for sensitive roles
- Audit: Complete trail for all actions

#### Scalability Targets
- Concurrent Users: 500+
- Projects: 1000+ active
- Documents: 1TB+ storage
- API Calls: 10,000/hour

### 14.2 Rollout Strategy

#### Phase 1: Core Functionality (Month 1-2)
- Basic DPR workflow
- Document management
- User management
- In-house DPR mode

#### Phase 2: Advanced Features (Month 3-4)
- Consultant portal
- CAD integration
- Mobile apps
- Advanced analytics

#### Phase 3: Integration & Optimization (Month 5-6)
- External system integration
- Performance optimization
- Advanced reporting
- AI-powered features

### 14.3 Training Requirements

| User Group | Duration | Mode | Topics |
|------------|----------|------|--------|
| Engineers | 2 days | Classroom + Hands-on | Full system |
| Consultants | 1 day | Online | Portal usage |
| Approvers | 4 hours | Online | Approval workflow |
| Field Staff | 1 day | Mobile + Field | Survey app |

### 14.4 Success Metrics

- DPR Preparation Time: Reduce by 30%
- Approval Cycle: Reduce by 40%
- Document Errors: Reduce by 60%
- User Satisfaction: >85%
- System Uptime: 99.9%

---

## Conclusion

This comprehensive UI/UX design document for Stage 2 provides detailed specifications for implementing the DPR and Approvals module of the HMDA Project Execution System. The design emphasizes:

- **Efficiency**: Streamlined workflows reducing DPR preparation time
- **Collaboration**: Multi-user document development and review
- **Integration**: Seamless connectivity with CAD and external systems
- **Quality**: Built-in checks and validation ensuring high-quality outputs
- **Transparency**: Real-time tracking of all Stage 2 activities

The implementation team should use this document to create a production-ready system that transforms HMDA's DPR preparation process, ensuring faster project progression from concept to tender-ready status.

---

*Document Version: 1.0*  
*Last Updated: January 2025*  
*Prepared for: HMDA Chief Engineer B. Ravinder*