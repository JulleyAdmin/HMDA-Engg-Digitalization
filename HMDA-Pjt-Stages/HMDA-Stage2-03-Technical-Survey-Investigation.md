# HMDA Stage 2: Technical Survey & Investigation
## Detailed UI/UX Specifications - Document 3 of 10

---

## Executive Summary

This document details the UI/UX specifications for Technical Survey & Investigation screens in Stage 2. These interfaces manage the critical data collection phase including topographic surveys, soil investigations, utility mapping, environmental assessments, and tree surveys. The system supports both in-house teams and external survey agencies with comprehensive data management, validation, and integration capabilities.

**Primary Screens**: 5 main screens with 15 sub-screens  
**Key Users**: Surveyors, AE, EE, Field Teams, Survey Agencies  
**Complexity Level**: Very High (involves precision data, equipment integration, GIS)

---

## Table of Contents

1. [Screen 1: Survey Planning & Setup](#1-screen-1-survey-planning--setup)
2. [Screen 2: Topographic Survey Management](#2-screen-2-topographic-survey-management)
3. [Screen 3: Soil Investigation Module](#3-screen-3-soil-investigation-module)
4. [Screen 4: Utility Mapping & Environmental Survey](#4-screen-4-utility-mapping--environmental-survey)
5. [Screen 5: Survey Data Integration & Reporting](#5-screen-5-survey-data-integration--reporting)
6. [Mobile Survey Applications](#6-mobile-survey-applications)
7. [Equipment Integration](#7-equipment-integration)
8. [Data Standards & Validation](#8-data-standards--validation)

---

## 1. Screen 1: Survey Planning & Setup

### 1.1 Screen Overview
**Purpose**: Plan, schedule, and coordinate all survey activities with resource allocation and timeline management

**URL**: `/stage2/survey-planning/{projectId}`

**Primary Users**: Survey Coordinator, AE, EE, Survey Teams

### 1.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 2 > Survey Planning | User: Survey Coord    |
+------------------------------------------------------------------+
| Survey Types |                Main Content Area                   |
|              |                                                    |
| ✓ Topographic| +----------------------------------------------+  |
| ○ Soil Test  | | Survey Planning & Coordination              |  |
| ○ Utilities  | | Project: Community Park Ward 42             |  |
| ○ Environment| | Site Area: 5000 sqm | Timeline: 4 weeks     |  |
| ○ Trees      | +----------------------------------------------+  |
| ○ Traffic    | |                                              |  |
|              | | Survey Requirements Matrix                  |  |
| Progress:    | | +------------------------------------------+ |  |
| Planning:100%| | | Survey Type    | Required | Complexity  | |  |
| Execution:15%| | | Topographic    |    ✓     | Medium     | |  |
| Analysis: 0% | | | Soil Testing   |    ✓     | High       | |  |
|              | | | Utility Mapping|    ✓     | Medium     | |  |
| Resources:   | | | Tree Survey    |    ✓     | Low        | |  |
| Teams: 3     | | | Environmental  |    ○     | Low        | |  |
| Equipment: 5 | | | Traffic Study  |    ○     | High       | |  |
| Duration:28d | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Resource Planning                           |  |
|              | | +------------------------------------------+ |  |
|              | | | Team Assignment:                        | |  |
|              | | | Lead Surveyor: [S. Kumar (Senior) v]    | |  |
|              | | | Topographic Team: [2 surveyors v]       | |  |
|              | | | Soil Investigation: [External agency v] | |  |
|              | | | Equipment Manager: [R. Patel v]         | |  |
|              | | |                                          | |  |
|              | | | Equipment Allocation:                   | |  |
|              | | | Total Station: [Leica TS02 v]          | |  |
|              | | | GPS System: [Trimble R10 v]            | |  |
|              | | | Measuring Tools: [Standard kit v]       | |  |
|              | | | Soil Rig: [External contractor]        | |  |
|              | | | GPR Unit: [GSSI SIR-4000 v]           | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Survey Schedule                             |  |
|              | | +------------------------------------------+ |  |
|              | | | Week 1: Site Setup + Topographic       | |  |
|              | | | Week 2: Topographic + Utility Mapping  | |  |
|              | | | Week 3: Soil Investigation + Trees     | |  |
|              | | | Week 4: Data Processing + Reports       | |  |
|              | | |                                          | |  |
|              | | | Weather Consideration:                  | |  |
|              | | | Monsoon Season: Jun-Sep (Avoid)        | |  |
|              | | | Optimal Period: Oct-May                 | |  |
|              | | | Current Status: ✓ Suitable             | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Coordination & Permissions                  |  |
|              | | +------------------------------------------+ |  |
|              | | | Site Access: [Obtained from Ward Office]| |  |
|              | | | Safety Clearance: [HMDA Safety Cell]    | |  |
|              | | | Traffic Management: [Police NOC pending]| |  |
|              | | | Public Notice: [Ward notice issued]     | |  |
|              | | |                                          | |  |
|              | | | [Previous] [Save Plan] [Begin Surveys] | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 1.3 Survey Planning Data Models

```javascript
interface SurveyPlan {
  planId: string;
  projectId: string;
  siteArea: number;
  
  requiredSurveys: {
    topographic: SurveyRequirement;
    soilInvestigation: SurveyRequirement;
    utilityMapping: SurveyRequirement;
    treeEnumeration: SurveyRequirement;
    environmental?: SurveyRequirement;
    traffic?: SurveyRequirement;
  };
  
  resourceAllocation: {
    teams: TeamAssignment[];
    equipment: EquipmentAllocation[];
    externalAgencies: ExternalAgency[];
  };
  
  timeline: {
    plannedStart: Date;
    plannedEnd: Date;
    actualStart?: Date;
    actualEnd?: Date;
    milestones: SurveyMilestone[];
  };
  
  permissions: {
    siteAccess: PermissionStatus;
    trafficManagement: PermissionStatus;
    safetyApproval: PermissionStatus;
    publicNotice: PermissionStatus;
  };
}

interface SurveyRequirement {
  type: string;
  mandatory: boolean;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedDuration: number; // days
  requiredAccuracy: string;
  deliverables: string[];
  dependencies: string[];
}

interface TeamAssignment {
  role: string;
  personAssigned: string;
  skillLevel: 'JUNIOR' | 'SENIOR' | 'EXPERT';
  availability: {
    startDate: Date;
    endDate: Date;
    percentage: number;
  };
}
```

### 1.4 Weather Integration & Scheduling

```
| Weather-Aware Scheduling                                           |
| +----------------------------------------------------------------+ |
| | Current Weather Forecast (7 days)                             | |
| | +------------------------------------------------------------+ | |
| | | Day | Date  | Weather    | Temp  | Rain | Survey Impact | | |
| | | Mon | 15/01 | Sunny      | 28°C  | 0%   | ✓ Ideal      | | |
| | | Tue | 16/01 | Partly Cloudy| 26°C | 10%  | ✓ Good       | | |
| | | Wed | 17/01 | Cloudy     | 24°C  | 30%  | ⚠ Caution    | | |
| | | Thu | 18/01 | Rain       | 22°C  | 80%  | ✗ Avoid      | | |
| | | Fri | 19/01 | Sunny      | 29°C  | 5%   | ✓ Ideal      | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Recommendations:                                               | |
| | • Start topographic survey on Monday                           | |
| | • Postpone soil drilling if Thursday rain continues            | |
| | • Indoor data processing scheduled for rainy days             | |
| |                                                                | |
| | [Auto-reschedule] [Manual Override] [Weather Alerts ON]       | |
| +----------------------------------------------------------------+ |
```

### 1.5 API Endpoints

```yaml
# Survey Planning
POST   /api/v1/survey/plan                     # Create survey plan
GET    /api/v1/survey/plan/{projectId}         # Get survey plan
PUT    /api/v1/survey/plan/{id}                # Update survey plan
GET    /api/v1/survey/resources/available      # Check resource availability
GET    /api/v1/survey/weather/{location}       # Get weather forecast
POST   /api/v1/survey/permissions/request      # Request permissions
```

---

## 2. Screen 2: Topographic Survey Management

### 2.1 Screen Overview
**Purpose**: Manage topographic survey execution with real-time data collection, validation, and processing

**URL**: `/stage2/topographic-survey/{projectId}`

**Primary Users**: Surveyors, CAD Operators, Survey Supervisors

### 2.2 Main Survey Interface

```
+------------------------------------------------------------------+
| HMDA Header | Topographic Survey | User: Lead Surveyor S.Kumar   |
+------------------------------------------------------------------+
| Survey Data  |                Main Content Area                   |
|              |                                                    |
| Points: 247  | +----------------------------------------------+  |
| Benchmarks:4 | | Topographic Survey Data Collection          |  |
| Contours:    | | Site: Community Park Ward 42                |  |
| Generated    | | Survey Date: 15-Jan-2024                    |  |
|              | +----------------------------------------------+  |
| Equipment:   | |                                              |  |
| ● TS Online  | | Site Setup & Control                       |  |
| ● GPS Active | | +------------------------------------------+ |  |
| ○ Level      | | | Primary Benchmark: BM-42-MAIN            | |  |
|              | | | Coordinates: E 500000.00, N 1000000.00   | |  |
| Weather:     | | | RL: 512.450m MSL                        | |  |
| Sunny 28°C   | | | Datum: WGS84 UTM Zone 44N               | |  |
| Wind: 5km/h  | | |                                          | |  |
|              | | | Secondary Benchmarks:                    | |  |
|              | | | BM-01: E 500050.00, N 1000050.00        | |  |
|              | | | BM-02: E 500100.00, N 999950.00         | |  |
|              | | | BM-03: E 499900.00, N 1000100.00        | |  |
|              | | |                                          | |  |
|              | | | Closure Check: ±2mm ✓ Acceptable        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Real-time Data Entry                        |  |
|              | | +------------------------------------------+ |  |
|              | | | Point ID: [TP-247____] [Auto-generate]  | |  |
|              | | | Easting:  [500025.125] [From TS]        | |  |
|              | | | Northing: [1000034.876] [From TS]       | |  |
|              | | | RL:       [512.876] [From TS]           | |  |
|              | | | Code:     [Ground v] [Tree|Build|Road]  | |  |
|              | | | Remarks:  [________________]            | |  |
|              | | |                                          | |  |
|              | | | [📷 Photo] [🎙️ Voice] [Accept] [Reject] | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Survey Progress Map                         |  |
|              | | +------------------------------------------+ |  |
|              | | | [Real-time map showing survey points]   | |  |
|              | | | • Red dots: Survey points                | |  |
|              | | | • Blue lines: Boundary                   | |  |
|              | | | • Green areas: Coverage completed        | |  |
|              | | | • Yellow: Current survey area           | |  |
|              | | |                                          | |  |
|              | | | Coverage: 65% | Remaining: 35%          | |  |
|              | | | [Zoom] [Pan] [Layers] [Export]          | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Quality Control                             |  |
|              | | +------------------------------------------+ |  |
|              | | | Grid Density: ✓ 5m intervals adequate   | |  |
|              | | | Boundary Points: ✓ All corners surveyed | |  |
|              | | | Features: ⚠ 2 trees missing coordinates| |  |
|              | | | Elevation Range: 4.2m (Normal)          | |  |
|              | | |                                          | |  |
|              | | | [View Issues] [Generate Contours]       | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 2.3 Equipment Integration Interface

```
| Equipment Connection Status                                        |
| +----------------------------------------------------------------+ |
| | Total Station: Leica TS02                    Status: 🟢 Online | |
| | • Connection: Bluetooth                      Battery: 78%      | |
| | • Accuracy: ±2mm                            Temperature: 28°C  | |
| | • Prism Constant: 0mm                       Last Reading: 2s  | |
| |                                                                | |
| | GPS/GNSS: Trimble R10                       Status: 🟢 Online | |
| | • Satellites: 12 GPS + 8 GLONASS           HDOP: 0.8         | |
| | • Accuracy: ±10mm                           Fix Type: RTK     | |
| | • Base Station: HMDA-CORS                   Signal: Strong    | |
| |                                                                | |
| | Data Logger: Field Computer                 Status: 🟢 Ready  | |
| | • Storage: 45GB available                   Sync: Auto        | |
| | • Battery: 92%                              Backup: Cloud     | |
| |                                                                | |
| | [Calibrate Equipment] [Test Connections] [Equipment Log]      | |
| +----------------------------------------------------------------+ |
```

### 2.4 Survey Data Validation Rules

```javascript
const topographicValidation = {
  pointValidation: {
    coordinates: {
      eastingRange: { min: 450000, max: 550000 }, // UTM Zone 44N
      northingRange: { min: 950000, max: 1050000 },
      elevationRange: { min: 450, max: 650 } // MSL meters
    },
    accuracy: {
      horizontal: 0.02, // ±20mm
      vertical: 0.03,   // ±30mm
      mandatory: true
    },
    density: {
      minimumPoints: 4, // per 100 sqm
      gridInterval: 5,  // meters maximum
      boundaryPoints: 'mandatory'
    }
  },
  
  qualityChecks: {
    closureError: {
      traverse: 0.002, // 1:500
      level: 0.02,     // ±20mm per km
      mandatory: true
    },
    redundancy: {
      benchmarkCheck: 'required',
      independentMeasurement: 10, // percentage
      crossCheck: 'recommended'
    }
  },
  
  autoValidation: {
    outlierDetection: {
      elevationThreshold: 2.0, // meters from trend
      positionThreshold: 1.0,  // meters from expected
      autoFlag: true
    },
    completeness: {
      boundaryCompletion: 100, // percentage required
      featureMapping: 95,      // percentage required
      gridCoverage: 90         // percentage required
    }
  },
  
  validatePoint(point) {
    const validations = [];
    
    // Coordinate validation
    if (!this.isWithinBounds(point.coordinates)) {
      validations.push({
        type: 'ERROR',
        message: 'Coordinates outside project boundary'
      });
    }
    
    // Accuracy validation
    if (point.accuracy > this.pointValidation.accuracy.horizontal) {
      validations.push({
        type: 'WARNING',
        message: 'Point accuracy below required standard'
      });
    }
    
    // Outlier detection
    if (this.isOutlier(point)) {
      validations.push({
        type: 'WARNING',
        message: 'Point appears to be an outlier - please verify'
      });
    }
    
    return validations;
  }
};
```

### 2.5 Contour Generation Interface

```
| Automated Contour Generation                                       |
| +----------------------------------------------------------------+ |
| | Survey Points: 247 collected                                   | |
| | Coverage: 95% complete                                         | |
| |                                                                | |
| | Contour Parameters:                                            | |
| | Major Interval: [1.0 m v]                                     | |
| | Minor Interval: [0.5 m v]                                     | |
| | Smoothing: [Medium v]                                          | |
| | Method: [Triangulated Irregular Network v]                    | |
| |                                                                | |
| | Preview Settings:                                              | |
| | ☑ Show survey points                                          | |
| | ☑ Show boundary                                               | |
| | ☑ Show spot levels                                            | |
| | ☐ Show grid lines                                             | |
| |                                                                | |
| | Quality Metrics:                                               | |
| | Point Density: ✓ Adequate (4.2 points/100sqm)                | |
| | Elevation Range: 4.2m (Min: 510.2, Max: 514.4)               | |
| | Surface Type: Gentle undulating terrain                       | |
| |                                                                | |
| | [Generate Preview] [Export CAD] [Create Report] [Approve]     | |
| +----------------------------------------------------------------+ |
```

---

## 3. Screen 3: Soil Investigation Module

### 3.1 Screen Overview
**Purpose**: Manage soil investigation activities including borehole planning, drilling supervision, and laboratory test tracking

**URL**: `/stage2/soil-investigation/{projectId}`

**Primary Users**: Geotechnical Engineer, Site Supervisor, Laboratory Personnel

### 3.2 Borehole Planning Interface

```
+------------------------------------------------------------------+
| HMDA Header | Soil Investigation | User: Geotechnical Engineer   |
+------------------------------------------------------------------+
| Investigation|                Main Content Area                   |
| Plan         |                                                    |
|              | +----------------------------------------------+  |
| Boreholes: 8 | | Soil Investigation Management               |  |
| Planned: 8   | | Project: Community Park Ward 42             |  |
| Drilled: 5   | | Investigation Type: Standard                |  |
| Pending: 3   | +----------------------------------------------+  |
|              | |                                              |  |
| Progress:    | | Borehole Location Planning                  |  |
| Planning:100%| | +------------------------------------------+ |  |
| Drilling: 65%| | | [Site plan with borehole locations]     | |  |
| Testing: 40% | | |                                          | |  |
| Reporting:0% | | | Legend:                                  | |  |
|              | | | ● Completed boreholes                    | |  |
| Soil Types:  | | | ○ Planned boreholes                      | |  |
| Fill: 0-1m   | | | ▲ Major structures                       | |  |
| Clay: 1-6m   | | | — Site boundary                          | |  |
| Rock: 6m+    | | |                                          | |  |
|              | | | Auto-Generated Locations:                | |  |
|              | | | • Grid spacing: 30m intervals            | |  |
|              | | | • Foundation areas: Higher density       | |  |
|              | | | • Critical zones: Additional points      | |  |
|              | | |                                          | |  |
|              | | | [Regenerate Grid] [Manual Add] [Edit]   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Borehole Specifications                     |  |
|              | | +------------------------------------------+ |  |
|              | | | Standard Depth: [10 m]                  | |  |
|              | | | Termination Criteria:                   | |  |
|              | | | ☑ Rock encountered (N>50)               | |  |
|              | | | ☑ Minimum 3m into hard stratum          | |  |
|              | | | ☑ Maximum 15m depth                     | |  |
|              | | |                                          | |  |
|              | | | Sampling Frequency:                     | |  |
|              | | | SPT Tests: Every 1.5m                   | |  |
|              | | | Disturbed Samples: Every 2m             | |  |
|              | | | Undisturbed Samples: Every 3m           | |  |
|              | | |                                          | |  |
|              | | | Laboratory Tests Required:              | |  |
|              | | | ☑ Liquid Limit, Plastic Limit          | |  |
|              | | | ☑ Specific Gravity                      | |  |
|              | | | ☑ Grain Size Distribution               | |  |
|              | | | ☑ CBR (Soaked & Unsoaked)              | |  |
|              | | | ☐ Triaxial Test (if required)           | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous] [Save Plan] [Begin Drilling]    |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 3.3 Drilling Supervision Interface

```
+------------------------------------------------------------------+
| HMDA Header | Borehole BH-05 Drilling | User: Site Supervisor    |
+------------------------------------------------------------------+
| Drilling Log |                Main Content Area                   |
|              |                                                    |
| Current BH:  | +----------------------------------------------+  |
| BH-05        | | Live Drilling Supervision                   |  |
|              | | Borehole: BH-05 | Location: Center East      |  |
| Depth: 7.2m  | +----------------------------------------------+  |
| Started: 09:30| |                                             |  |
| Duration: 3.5h| | Current Status                              |  |
|              | | +------------------------------------------+ |  |
| Crew:        | | | Depth: 7.2m | Target: 10m               | |  |
| Operator: RAM| | | Rate: 2.1m/hr | Estimated Completion: 3PM| |  |
| Helper: SHAM | | | Formation: Stiff Clay with Gravel        | |  |
| Supervisor:SK| | | Water Level: 4.8m (Static)               | |  |
|              | | | Equipment: Rotary Drilling Rig           | |  |
| Weather:     | | +------------------------------------------+ |  |
| Sunny, 32°C  | |                                              |  |
| Wind: Light  | | Bore Log - Real Time Entry                  |  |
|              | | +------------------------------------------+ |  |
|              | | | Depth | Formation    | SPT | Sample| Notes| |  |
|              | | | 0-1m  | Filled Soil  | 8   | DS-1  | Loose| |  |
|              | | | 1-3m  | Silty Clay   | 12  | UDS-1 | Med  | |  |
|              | | | 3-6m  | Sandy Clay   | 18  | UDS-2 | Stiff| |  |
|              | | | 6-7.2m| Clay+Gravel  | 25  | UDS-3 | Hard | |  |
|              | | | [Current] [Add SPT] [Collect Sample]    | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Sample Collection Tracking                  |  |
|              | | +------------------------------------------+ |  |
|              | | | Depth: [7.2m] Type: [Undisturbed v]     | |  |
|              | | | Container: [UDS-BH05-03] [Generate ID]  | |  |
|              | | | Condition: [Good v] [Damaged/Loose]     | |  |
|              | | | Lab Required: [Standard Package v]      | |  |
|              | | |                                          | |  |
|              | | | [📷 Photo] [📱 QR Code] [Send to Lab]   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Safety & Equipment                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Safety Status: ✓ All Clear              | |  |
|              | | | Equipment Status: ✓ Normal Operation     | |  |
|              | | | Water Supply: ✓ Adequate                | |  |
|              | | | Waste Management: ✓ Proper disposal     | |  |
|              | | |                                          | |  |
|              | | | [Emergency Stop] [End Shift] [Continue] | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 3.4 Laboratory Test Tracking

```
| Laboratory Test Management                                         |
| +----------------------------------------------------------------+ |
| | Sample Tracking Dashboard                                      | |
| | +------------------------------------------------------------+ | |
| | | Sample ID    | Status      | Tests Req | Completed | ETA | | |
| | | DS-BH01-01   | ✓ Complete  | 4/4      | 100%      | -   | | |
| | | UDS-BH01-01  | ⚡ Testing   | 5/5      | 80%       | 2d  | | |
| | | UDS-BH02-01  | 📦 Received | 5/5      | 0%        | 5d  | | |
| | | DS-BH03-01   | 🚚 Transit  | 4/4      | 0%        | 3d  | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Test Results - Sample UDS-BH01-01                             | |
| | +------------------------------------------------------------+ | |
| | | Test Parameter      | Result    | Limits    | Status      | | |
| | | Liquid Limit (%)    | 52        | -         | ✓ Received  | | |
| | | Plastic Limit (%)   | 28        | -         | ✓ Received  | | |
| | | Plasticity Index    | 24        | -         | ✓ Calculated| | |
| | | Specific Gravity    | 2.72      | 2.6-2.8   | ✓ Normal    | | |
| | | CBR Soaked (%)      | 3.2       | >2.5      | ✓ Pass      | | |
| | | CBR Unsoaked (%)    | Pending   | -         | ⏳ Testing  | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Soil Classification: CL (Clay of Low Plasticity)              | |
| | Bearing Capacity: 180 kN/m² (Preliminary)                     | |
| | Recommendations: Suitable for light structures with treatment | |
| |                                                                | |
| | [Download Certificate] [Request Additional Tests] [Approve]   | |
| +----------------------------------------------------------------+ |
```

### 3.5 Soil Investigation Data Models

```javascript
interface SoilInvestigation {
  investigationId: string;
  projectId: string;
  
  planning: {
    investigationType: 'PRELIMINARY' | 'DETAILED' | 'SPECIFIC';
    objectives: string[];
    siteConditions: SiteConditions;
    boreholeLayout: BoreholeLayout;
  };
  
  execution: {
    boreholes: Borehole[];
    drillingLogs: DrillingLog[];
    samples: SoilSample[];
    fieldTests: FieldTest[];
  };
  
  laboratory: {
    testProgram: LaboratoryTestProgram;
    results: TestResult[];
    certificates: LabCertificate[];
  };
  
  analysis: {
    soilProfile: SoilProfile;
    designParameters: DesignParameters;
    recommendations: GeotechnicalRecommendations;
  };
}

interface Borehole {
  bhId: string;
  location: {
    coordinates: { x: number; y: number; z: number; };
    chainage?: number;
    offset?: number;
  };
  drilling: {
    startDate: Date;
    completionDate: Date;
    finalDepth: number;
    terminationReason: string;
    waterLevel: number;
  };
  stratigraphy: SoilLayer[];
}

interface SoilLayer {
  depthFrom: number;
  depthTo: number;
  description: string;
  soilType: string;
  consistency: string;
  sptValue: number;
  samples: string[];
  remarks: string;
}

interface LaboratoryTest {
  testType: string;
  standard: string; // IS 2720 codes
  result: any;
  status: 'PENDING' | 'TESTING' | 'COMPLETED' | 'CERTIFIED';
  dateCompleted?: Date;
  certified: boolean;
}
```

---

## 4. Screen 4: Utility Mapping & Environmental Survey

### 4.1 Screen Overview
**Purpose**: Map existing utilities and conduct environmental baseline surveys for project planning

**URL**: `/stage2/utility-environmental/{projectId}`

**Primary Users**: Utility Surveyor, Environmental Specialist, MEP Engineer

### 4.2 Utility Mapping Interface

```
+------------------------------------------------------------------+
| HMDA Header | Utility Mapping | User: Utility Surveyor          |
+------------------------------------------------------------------+
| Utility Types|                Main Content Area                   |
|              |                                                    |
| ☑ Water      | +----------------------------------------------+  |
| ☑ Sewer      | | Underground Utility Detection & Mapping     |  |
| ☑ Electric   | | Project: Community Park Ward 42             |  |
| ☑ Telecom    | | Area: 5000 sqm | Method: GPR + Visual      |  |
| ☑ Gas        | +----------------------------------------------+  |
| ○ Storm      | |                                              |  |
|              | | Detection Equipment Status                  |  |
| Progress:    | | +------------------------------------------+ |  |
| Water: 90%   | | | GPR Unit: GSSI SIR-4000    Status: Online| |  |
| Sewer: 75%   | | | Cable Locator: Radiodetection  Status: ✓ | |  |
| Electric: 85%| | | Metal Detector: Garrett GTI   Status: ✓  | |  |
| Telecom: 60% | | | Survey Grade GPS: Trimble     Status: ✓  | |  |
| Gas: 0%      | | +------------------------------------------+ |  |
|              | |                                              |  |
| Detected:    | | Live Utility Detection                      |  |
| Lines: 23    | | +------------------------------------------+ |  |
| Manholes: 8  | | | Current Location: E 500025, N 1000035   | |  |
| Chambers: 12 | | | Detected Signal: Strong (Electric)       | |  |
| Valves: 6    | | | Estimated Depth: 0.8m                   | |  |
|              | | | Confidence: High (95%)                   | |  |
|              | | |                                          | |  |
|              | | | Utility Details:                        | |  |
|              | | | Type: [Electric Cable v]                | |  |
|              | | | Voltage: [11kV v] [LT/HT/EHT]          | |  |
|              | | | Size/Capacity: [3x240 sqmm]            | |  |
|              | | | Owner: [TSSPDCL]                       | |  |
|              | | | Condition: [Good v] [Poor/Damaged]      | |  |
|              | | |                                          | |  |
|              | | | Mark Position: [📍 GPS] [📷 Photo]      | |  |
|              | | | [Save Point] [Continue Trace] [Skip]   | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Utility Network Map                         |  |
|              | | +------------------------------------------+ |  |
|              | | | [Real-time map showing detected utilities]| |  |
|              | | | Legend:                                  | |  |
|              | | | 🔵 Water lines    🟡 Gas lines          | |  |
|              | | | 🔴 Electric lines 🟣 Telecom cables     | |  |
|              | | | 🟤 Sewer lines    🟢 Storm drains       | |  |
|              | | |                                          | |  |
|              | | | Conflicts Detected: 2                   | |  |
|              | | | • Electric line crosses planned foundation| |  |
|              | | | • Water line in landscaping area        | |  |
|              | | |                                          | |  |
|              | | | [View Conflicts] [Generate CAD] [Export]| |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 4.3 Environmental Baseline Survey

```
+------------------------------------------------------------------+
| HMDA Header | Environmental Survey | User: Environmental Specialist|
+------------------------------------------------------------------+
| Monitoring   |                Main Content Area                   |
| Parameters   |                                                    |
|              | +----------------------------------------------+  |
| ☑ Air Quality| | Environmental Baseline Assessment          |  |
| ☑ Noise      | | Project: Community Park Ward 42             |  |
| ☑ Water      | | Monitoring Period: 7 days                   |  |
| ☑ Soil       | +----------------------------------------------+  |
| ☑ Flora      | |                                              |  |
| ☑ Fauna      | | Air Quality Monitoring                      |  |
|              | | +------------------------------------------+ |  |
| Equipment:   | | | Parameters Monitored:                    | |  |
| Air Monitor  | | | PM10: 45 μg/m³ (Limit: 60) ✓ Normal    | |  |
| Sound Meter  | | | PM2.5: 28 μg/m³ (Limit: 40) ✓ Normal   | |  |
| Water Kit    | | | SO2: 12 μg/m³ (Limit: 50) ✓ Normal     | |  |
| GPS Logger   | | | NOx: 18 μg/m³ (Limit: 40) ✓ Normal     | |  |
|              | | | CO: 0.8 mg/m³ (Limit: 2) ✓ Normal      | |  |
| Sampling:    | | |                                          | |  |
| Locations: 8 | | | Monitoring Station: Upwind Corner        | |  |
| Frequency:   | | | Duration: Continuous (168 hours)         | |  |
| Every 4 hrs  | | | Data Logger: Automatic recording         | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Noise Level Monitoring                      |  |
|              | | +------------------------------------------+ |  |
|              | | | Current Reading: 58 dB(A)               | |  |
|              | | | Limit (Residential): 55/45 dB(A) D/N    | |  |
|              | | | Status: ⚠ Slightly above day limit      | |  |
|              | | |                                          | |  |
|              | | | Hourly Trends:                          | |  |
|              | | | 06:00-09:00: 62 dB(A) (Traffic peak)    | |  |
|              | | | 09:00-17:00: 55 dB(A) (Working hours)   | |  |
|              | | | 17:00-22:00: 58 dB(A) (Evening peak)    | |  |
|              | | | 22:00-06:00: 42 dB(A) (Night time)      | |  |
|              | | |                                          | |  |
|              | | | Sources Identified:                     | |  |
|              | | | • Road traffic (70%)                    | |  |
|              | | | • Construction nearby (20%)             | |  |
|              | | | • Commercial activity (10%)             | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Tree & Vegetation Survey                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Trees Enumerated: 47                    | |  |
|              | | | Species Identified: 8                   | |  |
|              | | | Protected Species: 0                    | |  |
|              | | | Trees to be Cut: 12                     | |  |
|              | | | Trees for Transplant: 8                 | |  |
|              | | |                                          | |  |
|              | | | Major Species:                          | |  |
|              | | | • Neem (Azadirachta indica): 15 trees   | |  |
|              | | | • Tamarind (Tamarindus indica): 8 trees | |  |
|              | | | • Banyan (Ficus benghalensis): 3 trees  | |  |
|              | | | • Mango (Mangifera indica): 6 trees     | |  |
|              | | |                                          | |  |
|              | | | [Tree Map] [Species Details] [Photos]  | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 4.4 Utility Conflict Detection

```javascript
const utilityConflictDetection = {
  conflictTypes: {
    spatial: {
      intersection: 'Utilities crossing each other',
      proximity: 'Utilities too close for safety',
      depth: 'Utilities at same depth level'
    },
    functional: {
      access: 'Maintenance access blocked',
      capacity: 'Insufficient capacity for project',
      safety: 'Safety clearance violated'
    },
    construction: {
      foundation: 'Utility in foundation area',
      excavation: 'Utility in excavation zone',
      structure: 'Utility affecting structure'
    }
  },
  
  detectConflicts(utilities, projectElements) {
    const conflicts = [];
    
    utilities.forEach(utility => {
      projectElements.forEach(element => {
        // Spatial conflict detection
        if (this.checkIntersection(utility, element)) {
          conflicts.push({
            type: 'INTERSECTION',
            severity: 'HIGH',
            utility: utility.id,
            element: element.id,
            description: `${utility.type} intersects with ${element.type}`,
            recommendation: this.generateRecommendation(utility, element)
          });
        }
        
        // Clearance conflict detection
        const clearance = this.calculateClearance(utility, element);
        if (clearance < utility.minimumClearance) {
          conflicts.push({
            type: 'CLEARANCE',
            severity: 'MEDIUM',
            utility: utility.id,
            element: element.id,
            actualClearance: clearance,
            requiredClearance: utility.minimumClearance,
            recommendation: 'Relocate utility or modify design'
          });
        }
      });
    });
    
    return conflicts;
  },
  
  generateRecommendation(utility, conflictingElement) {
    const recommendations = {
      'WATER-FOUNDATION': 'Relocate water line or provide protective sleeve',
      'ELECTRIC-EXCAVATION': 'De-energize and relocate before excavation',
      'SEWER-STRUCTURE': 'Provide structural protection or reroute',
      'GAS-ANY': 'Mandatory relocation with gas authority approval'
    };
    
    const key = `${utility.type}-${conflictingElement.type}`;
    return recommendations[key] || 'Coordinate with utility owner for resolution';
  }
};
```

---

## 5. Screen 5: Survey Data Integration & Reporting

### 5.1 Screen Overview
**Purpose**: Integrate all survey data, generate comprehensive reports, and export to CAD/GIS systems

**URL**: `/stage2/survey-integration/{projectId}`

**Primary Users**: Survey Manager, CAD Operators, Project Engineers

### 5.2 Data Integration Dashboard

```
+------------------------------------------------------------------+
| HMDA Header | Survey Data Integration | User: Survey Manager      |
+------------------------------------------------------------------+
| Data Sources |                Main Content Area                   |
|              |                                                    |
| ✓ Topographic| +----------------------------------------------+  |
| ✓ Soil       | | Survey Data Integration & Analysis          |  |
| ✓ Utilities  | | Project: Community Park Ward 42             |  |
| ✓ Environment| | Integration Status: 85% Complete            |  |
| ✓ Trees      | +----------------------------------------------+  |
|              | |                                              |  |
| Data Quality:| | Data Completeness Matrix                    |  |
| Excellent    | | +------------------------------------------+ |  |
|              | | | Survey Type    | Points | Quality | Status| |  |
| Integration: | | | Topographic    | 247    | 98%     | ✓ Done| |  |
| 85% Complete | | | Soil (8 BH)    | 8      | 95%     | ✓ Done| |  |
|              | | | Utilities      | 23     | 92%     | ✓ Done| |  |
| Export Ready:| | | Trees          | 47     | 100%    | ✓ Done| |  |
| CAD: Ready   | | | Environmental  | 8      | 90%     | ⚡ Proc| |  |
| GIS: Ready   | | +------------------------------------------+ |  |
| Report: 90%  | |                                              |  |
|              | | Coordinate System Harmonization             |  |
|              | | +------------------------------------------+ |  |
|              | | | Primary CRS: WGS84 UTM Zone 44N         | |  |
|              | | | Transformation Applied:                  | |  |
|              | | |   • Local survey grid → UTM              | |  |
|              | | |   • GPS coordinates → UTM                | |  |
|              | | |   • Utility records → Site coordinates   | |  |
|              | | |                                          | |  |
|              | | | Accuracy Assessment:                    | |  |
|              | | | Horizontal: ±15mm (Excellent)           | |  |
|              | | | Vertical: ±20mm (Excellent)             | |  |
|              | | | Closure Error: 1:2500 (Within spec)     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Integrated Site Model                       |  |
|              | | +------------------------------------------+ |  |
|              | | | [3D visualization of integrated data]   | |  |
|              | | |                                          | |  |
|              | | | Layers Visible:                         | |  |
|              | | | ☑ Topographic surface                   | |  |
|              | | | ☑ Soil boundaries                       | |  |
|              | | | ☑ Utility networks                      | |  |
|              | | | ☑ Existing trees                        | |  |
|              | | | ☐ Environmental monitoring points       | |  |
|              | | |                                          | |  |
|              | | | Analysis Tools:                         | |  |
|              | | | [Volume Calc] [Cross Sections] [Profiles]| |  |
|              | | | [Conflicts] [Export] [Share]            | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Report Generation Status                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Topographic Report: ✓ Complete (PDF)    | |  |
|              | | | Soil Investigation: ✓ Complete (PDF)    | |  |
|              | | | Utility Survey: ✓ Complete (PDF)        | |  |
|              | | | Environmental Report: ⚡ In Progress     | |  |
|              | | | Integrated Summary: ○ Pending            | |  |
|              | | |                                          | |  |
|              | | | [Generate All] [Custom Report] [Preview]| |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 5.3 CAD Export Interface

```
| CAD Export Configuration                                           |
| +----------------------------------------------------------------+ |
| | Export Format: [AutoCAD 2020 DWG v]                           | |
| | Coordinate System: [UTM Zone 44N v]                           | |
| | Units: [Meters v]                                              | |
| |                                                                | |
| | Layer Configuration:                                           | |
| | +------------------------------------------------------------+ | |
| | | Data Type        | Layer Name     | Color | Line Weight | | |
| | | Survey Points    | SURVEY-POINTS  | 7     | 0.25mm     | | |
| | | Contours Major   | TOPO-CTR-MAJ   | 1     | 0.50mm     | | |
| | | Contours Minor   | TOPO-CTR-MIN   | 8     | 0.25mm     | | |
| | | Site Boundary    | BOUNDARY       | 3     | 0.70mm     | | |
| | | Existing Trees   | TREES-EXIST    | 82    | 0.35mm     | | |
| | | Water Lines      | UTIL-WATER     | 5     | 0.50mm     | | |
| | | Electric Lines   | UTIL-POWER     | 1     | 0.50mm     | | |
| | | Sewer Lines      | UTIL-SEWER     | 6     | 0.50mm     | | |
| | | Boreholes        | SOIL-BH        | 4     | 0.35mm     | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Content Options:                                               | |
| | ☑ Include point elevations as text                            | |
| | ☑ Include contour elevations                                  | |
| | ☑ Include borehole logs as text                               | |
| | ☑ Include utility specifications                              | |
| | ☑ Include tree species and girth                              | |
| | ☐ Include environmental monitoring data                        | |
| |                                                                | |
| | File Options:                                                  | |
| | ☑ Single comprehensive file                                   | |
| | ☐ Separate files by discipline                                | |
| | ☑ Include reference drawing template                          | |
| | ☑ Compress output file                                        | |
| |                                                                | |
| | [Preview Export] [Generate Files] [Download]                  | |
| +----------------------------------------------------------------+ |
```

### 5.4 Survey Integration Data Models

```javascript
interface SurveyIntegration {
  integrationId: string;
  projectId: string;
  
  dataSources: {
    topographic: TopographicData;
    soilInvestigation: SoilData;
    utilityMapping: UtilityData;
    environmental: EnvironmentalData;
    vegetation: VegetationData;
  };
  
  coordinateSystem: {
    primary: 'UTM_ZONE_44N';
    transformations: CoordinateTransformation[];
    accuracyAssessment: AccuracyMetrics;
  };
  
  qualityControl: {
    completenessCheck: CompletenessResults;
    accuracyValidation: AccuracyResults;
    consistencyCheck: ConsistencyResults;
    conflictDetection: ConflictResults;
  };
  
  outputs: {
    integratedModel: SiteModel;
    reports: ReportPackage[];
    cadExports: CADExport[];
    gisLayers: GISLayer[];
  };
}

interface SiteModel {
  terrain: {
    surface: TriangulatedSurface;
    contours: ContourLines;
    drainage: DrainageNetwork;
  };
  
  subsurface: {
    soilLayers: SoilStratigraphyModel;
    rockLevel: number;
    groundwater: GroundwaterModel;
  };
  
  infrastructure: {
    utilities: UtilityNetwork;
    access: AccessRoutes;
    structures: ExistingStructures;
  };
  
  environment: {
    vegetation: VegetationMap;
    sensitive: SensitiveAreas;
    constraints: EnvironmentalConstraints;
  };
}

interface ReportPackage {
  reportType: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  sections: ReportSection[];
  appendices: Appendix[];
  qualityLevel: 'PRELIMINARY' | 'INTERMEDIATE' | 'FINAL';
  
  generateReport() {
    // Automated report generation logic
    return {
      executiveSummary: this.generateSummary(),
      methodology: this.generateMethodology(),
      results: this.generateResults(),
      analysis: this.generateAnalysis(),
      recommendations: this.generateRecommendations(),
      appendices: this.compileAppendices()
    };
  }
}
```

---

## 6. Mobile Survey Applications

### 6.1 Mobile Survey App for Field Teams

```
+---------------------------+
| HMDA Survey Mobile        |
+---------------------------+
| Project: Park Ward 42     |
| User: Surveyor S.Kumar    |
| GPS: ✓ Connected (±2m)    |
+---------------------------+
|                           |
| Quick Actions             |
| [📍 Mark Point]           |
| [📸 Take Photo]           |
| [📝 Add Note]             |
| [📊 View Progress]        |
|                           |
| Current Task:             |
| Tree Enumeration          |
| Progress: 23/47 trees     |
| ████████░░ 49%            |
|                           |
| Active Point Collection:  |
| Point ID: TR-023          |
| Location: ✓ GPS Fixed     |
| Lat: 17.4239°N           |
| Lon: 78.4738°E           |
| Accuracy: ±1.8m          |
|                           |
| Tree Details:             |
| Species: [Neem v]         |
| Girth: [45 cm]           |
| Height: [8 m]            |
| Condition: [Good v]       |
|                           |
| [📷 Photo] [🎙️ Voice]     |
| [✓ Save] [↻ Sync]        |
+---------------------------+
```

### 6.2 Offline Capability

```javascript
const mobileOfflineCapability = {
  localStorageStrategy: {
    maxPoints: 1000,
    maxPhotos: 100, // 2GB limit
    maxDuration: '7 days',
    syncOnConnection: true
  },
  
  dataStructure: {
    points: {
      temporary_id: 'string',
      coordinates: 'object',
      attributes: 'object',
      photos: 'array',
      timestamp: 'date',
      synced: 'boolean'
    }
  },
  
  syncProtocol: {
    automatic: {
      onConnection: true,
      onAppStart: true,
      periodic: '30 minutes'
    },
    manual: {
      userInitiated: true,
      batchUpload: true,
      progressIndicator: true
    },
    conflictResolution: {
      strategy: 'server_wins',
      userChoice: true,
      duplicateDetection: true
    }
  },
  
  qualityAssurance: {
    gpsAccuracy: {
      threshold: 5, // meters
      retryOnPoor: true,
      warningDisplay: true
    },
    dataValidation: {
      requiredFields: 'enforce',
      rangeChecks: 'enable',
      logicalChecks: 'enable'
    }
  }
};
```

---

## 7. Equipment Integration

### 7.1 Total Station Integration

```javascript
const totalStationIntegration = {
  supportedModels: [
    'Leica TS02', 'Leica TS06', 'Leica TS16',
    'Topcon GM-52', 'Topcon ES-107',
    'Trimble M3', 'Trimble S7'
  ],
  
  connectionMethods: {
    bluetooth: {
      range: '10 meters',
      pairing: 'automatic',
      reliability: 'high'
    },
    usb: {
      cable: 'required',
      reliability: 'very_high',
      realtime: true
    },
    wifi: {
      range: '50 meters',
      setup: 'network_required',
      reliability: 'high'
    }
  },
  
  dataAcquisition: {
    measurementTypes: [
      'angle_distance',
      'coordinates_xyz',
      'prism_constant',
      'atmospheric_correction'
    ],
    accuracy: {
      angular: '2 seconds',
      distance: '2mm + 2ppm',
      coordinates: 'calculated'
    },
    automaticLogging: true,
    qualityIndicators: true
  },
  
  realTimeValidation: {
    closureChecks: true,
    outlierDetection: true,
    precisionIndicators: true,
    recommendedMeasurements: 'face_left_right'
  }
};
```

### 7.2 GPS/GNSS Integration

```javascript
const gpsGnssIntegration = {
  supportedSystems: {
    constellations: ['GPS', 'GLONASS', 'Galileo', 'BeiDou'],
    augmentation: ['SBAS', 'RTK', 'PPP'],
    receivers: ['Trimble', 'Leica', 'Topcon', 'Hemisphere']
  },
  
  accuracyModes: {
    autonomous: {
      accuracy: '3-5 meters',
      availability: '24/7',
      cost: 'free'
    },
    sbas: {
      accuracy: '1-3 meters',
      availability: 'regional',
      cost: 'free'
    },
    rtk: {
      accuracy: '1-3 cm',
      availability: 'network_dependent',
      cost: 'subscription',
      baseStations: 'HMDA_CORS_Network'
    }
  },
  
  qualityMetrics: {
    hdop: 'horizontal_dilution',
    vdop: 'vertical_dilution',
    satellites: 'minimum_4_required',
    fixType: ['none', 'autonomous', 'differential', 'rtk_float', 'rtk_fixed']
  }
};
```

---

## 8. Data Standards & Validation

### 8.1 Survey Data Standards

```javascript
const surveyDataStandards = {
  coordinateSystems: {
    primary: 'WGS84_UTM_Zone_44N',
    vertical: 'MSL_Mumbai',
    local: 'project_specific_grid',
    transformation: 'seven_parameter'
  },
  
  accuracyStandards: {
    topographic: {
      horizontal: '±20mm',
      vertical: '±30mm',
      density: '4_points_per_100sqm'
    },
    utility: {
      horizontal: '±50mm',
      vertical: '±100mm',
      classification: 'PAS_128_Class_B'
    },
    soil: {
      location: '±100mm',
      depth: '±50mm',
      sampling: 'IS_1892_standards'
    }
  },
  
  dataFormats: {
    points: {
      format: 'CSV',
      fields: ['ID', 'Easting', 'Northing', 'Elevation', 'Code', 'Description'],
      encoding: 'UTF-8'
    },
    drawings: {
      format: 'DWG',
      version: 'AutoCAD_2018',
      units: 'meters',
      precision: 'millimeters'
    }
  },
  
  qualityControl: {
    mandatory: [
      'closure_check',
      'benchmark_verification',
      'duplicate_detection',
      'range_validation'
    ],
    recommended: [
      'independent_check',
      'statistical_analysis',
      'trend_analysis'
    ]
  }
};
```

### 8.2 Validation Workflows

```javascript
const validationWorkflows = {
  realTimeValidation: {
    coordinateRange: 'project_boundary_check',
    elevationRange: 'reasonable_elevation_check',
    accuracy: 'equipment_accuracy_check',
    duplicates: 'proximity_check_1meter'
  },
  
  postProcessingValidation: {
    statistical: {
      outlierDetection: 'z_score_analysis',
      trendAnalysis: 'moving_average',
      consistencyCheck: 'neighbor_comparison'
    },
    geometric: {
      closureError: 'traverse_closure',
      networkAdjustment: 'least_squares',
      precisionAssessment: 'standard_deviation'
    }
  },
  
  finalValidation: {
    completeness: 'required_points_coverage',
    accuracy: 'specification_compliance',
    integration: 'multi_source_consistency',
    documentation: 'metadata_completeness'
  },
  
  generateValidationReport() {
    return {
      summary: this.calculateOverallQuality(),
      issues: this.identifyQualityIssues(),
      recommendations: this.generateRecommendations(),
      certification: this.generateCertificate()
    };
  }
};
```

---

## API Endpoints

```yaml
# Survey Planning
POST   /api/v1/survey/plan                      # Create survey plan
GET    /api/v1/survey/plan/{projectId}          # Get survey plan
PUT    /api/v1/survey/plan/{id}                 # Update survey plan

# Topographic Survey
POST   /api/v1/survey/topographic/points        # Add survey points
GET    /api/v1/survey/topographic/{projectId}   # Get survey data
POST   /api/v1/survey/topographic/contours      # Generate contours
POST   /api/v1/survey/topographic/validate      # Validate survey data

# Soil Investigation
POST   /api/v1/survey/soil/borehole             # Create borehole record
PUT    /api/v1/survey/soil/borehole/{id}/log    # Update drilling log
POST   /api/v1/survey/soil/samples              # Record samples
GET    /api/v1/survey/soil/lab-results          # Get lab results

# Utility Mapping
POST   /api/v1/survey/utilities/detect          # Record utility detection
GET    /api/v1/survey/utilities/{projectId}     # Get utility map
POST   /api/v1/survey/utilities/conflicts       # Check conflicts

# Environmental Survey
POST   /api/v1/survey/environmental/monitoring  # Add monitoring data
GET    /api/v1/survey/environmental/{projectId} # Get environmental data
POST   /api/v1/survey/environmental/analysis    # Generate analysis

# Data Integration
POST   /api/v1/survey/integration/process       # Process integration
GET    /api/v1/survey/integration/{projectId}   # Get integrated data
POST   /api/v1/survey/integration/export        # Export integrated data
GET    /api/v1/survey/integration/reports       # Generate reports

# Mobile API
POST   /api/v1/survey/mobile/sync               # Sync mobile data
GET    /api/v1/survey/mobile/assignments        # Get field assignments
POST   /api/v1/survey/mobile/upload             # Upload field data

# Equipment Integration
GET    /api/v1/survey/equipment/status          # Equipment status
POST   /api/v1/survey/equipment/data            # Equipment data upload
GET    /api/v1/survey/equipment/calibration     # Calibration records
```

---

*Document Version: 1.0*  
*Created: January 2025*  
*Part 3 of: HMDA Stage 2 UI/UX Design Series*