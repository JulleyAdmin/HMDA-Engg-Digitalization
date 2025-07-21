# HMDA Project Stage 1: Comprehensive UI/UX Design Document
## Project Conceptualization & Feasibility - Detailed Interface Specifications

---

## Executive Summary

This document provides comprehensive UI/UX specifications for Stage 1 (Project Conceptualization & Feasibility) of the HMDA Project Execution System. Each screen is detailed with capabilities, fields, validations, interactions, permissions, and visual design guidelines to enable the implementation team to create a production-ready demo.

---

## Table of Contents

1. [Global Design System](#1-global-design-system)
2. [User Roles & Permissions Matrix](#2-user-roles--permissions-matrix)
3. [Screen 1: Need Identification & Source Management](#3-screen-1-need-identification--source-management)
4. [Screen 2: Initial Site Visit & Assessment](#4-screen-2-initial-site-visit--assessment)
5. [Screen 3: Preliminary Cost Estimate](#5-screen-3-preliminary-cost-estimate)
6. [Screen 4: Budget Availability & Verification](#6-screen-4-budget-availability--verification)
7. [Screen 5: Feasibility Study Management](#7-screen-5-feasibility-study-management)
8. [Screen 6: Concept Note Preparation](#8-screen-6-concept-note-preparation)
9. [Screen 7: Review & Approval Workflow](#9-screen-7-review--approval-workflow)
10. [Screen 8: Stage 1 Dashboard & Analytics](#10-screen-8-stage-1-dashboard--analytics)
11. [Mobile Responsive Considerations](#11-mobile-responsive-considerations)
12. [Integration Points](#12-integration-points)

---

## 1. Global Design System

### Brand Colors
- **Primary Blue**: #1e3a8a (HMDA primary brand color)
- **Secondary Green**: #059669 (Success/Approved states)
- **Alert Red**: #dc2626 (Errors/Rejected states)
- **Warning Amber**: #f59e0b (Pending/Attention required)
- **Neutral Grays**: #111827, #374151, #6b7280, #9ca3af, #e5e7eb, #f3f4f6
- **Background**: #ffffff (primary), #f9fafb (secondary)

### Typography
- **Font Family**: Inter (primary), system fonts as fallback
- **Headings**: 
  - H1: 32px/40px, Font-weight: 700
  - H2: 24px/32px, Font-weight: 600
  - H3: 20px/28px, Font-weight: 600
  - H4: 16px/24px, Font-weight: 500
- **Body Text**: 14px/20px, Font-weight: 400
- **Small Text**: 12px/16px, Font-weight: 400

### Component Library
- **Buttons**: Primary, Secondary, Tertiary, Danger, Ghost
- **Form Elements**: Text inputs, Dropdowns, Date pickers, File upload, Radio/Checkboxes
- **Cards**: Standard card, Elevated card, Interactive card
- **Tables**: Data tables with sorting, filtering, pagination
- **Modals**: Standard modal, Confirmation dialog, Full-screen modal
- **Notifications**: Toast, Alert bars, Inline messages

### Icons
- Material Icons or Heroicons
- Consistent 24x24px size for standard icons
- 16x16px for small contexts
- 32x32px for feature icons

---

## 2. User Roles & Permissions Matrix

### Roles Defined for Stage 1

| Role Code | Role Name | Department | Hierarchy Level |
|-----------|-----------|------------|-----------------|
| PUB | Public/Citizen | External | - |
| MLR | MLA/Representative | External | - |
| JE | Junior Engineer | HMDA Field | 1 |
| AE | Assistant Engineer | HMDA Field | 2 |
| EE | Executive Engineer | HMDA | 3 |
| DCE | Deputy Chief Engineer | HMDA | 4 |
| CE | Chief Engineer | HMDA | 5 |
| SEC | Secretary | HMDA | 6 |
| COM | Commissioner | HMDA | 7 |
| BRD | Board Members | HMDA | 8 |

### Global Permission Types
- **C**: Create
- **R**: Read
- **U**: Update
- **D**: Delete
- **A**: Approve
- **F**: Forward
- **X**: Execute/Action

---

## 3. Screen 1: Need Identification & Source Management

### 3.1 Screen Overview
**Purpose**: Capture and manage project needs from various sources (citizens, government policies, infrastructure gaps, master plan requirements)

**URL**: `/stage1/need-identification`

**Primary Users**: PUB, MLR, JE, AE, EE

### 3.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1: Project Conceptualization | User Info     |
+------------------------------------------------------------------+
| Sidebar Menu |                Main Content Area                   |
|              |                                                    |
| > Dashboard  | +----------------------------------------------+  |
| > Need Mgmt  | | Need Identification & Registration         |  |
|   - Create   | +----------------------------------------------+  |
|   - List     | | Quick Stats Bar                             |  |
|   - Search   | | [New Today: 12] [Pending: 45] [This Month: 234] |
| > Site Visit | +----------------------------------------------+  |
| > Estimates  | | Create New Need                              |  |
| > Budget     | | +------------------------------------------+ |  |
| > Feasibility| | | Source Type: [Dropdown v]               | |  |
| > Concept    | | | Need Title: [_________________________] | |  |
| > Approvals  | | | Description: [Multiline text area      ] | |  |
| > Reports    | | |             [                          ] | |  |
|              | | | Location:   [Search/Pin on Map         ] | |  |
|              | | | Priority:   [High/Medium/Low v]        | |  |
|              | | | Attachments:[Upload Documents]          | |  |
|              | | | [Cancel] [Save Draft] [Submit]         | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
| Footer: © 2025 HMDA | Privacy | Terms | Help                     |
+------------------------------------------------------------------+
```

### 3.3 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| Need ID | Text | Auto | System generated | NID-YYYY-###### | Unique identifier |
| Source Type | Dropdown | Yes | Required selection | - | Citizen Demand, Govt Policy, Infrastructure Gap, Master Plan |
| Sub-Source | Dropdown | Conditional | Based on Source Type | - | Dynamic based on source |
| Need Title | Text | Yes | Min 10, Max 200 chars | - | Brief descriptive title |
| Description | Textarea | Yes | Min 50, Max 2000 chars | - | Detailed need description |
| Location | Map/Text | Yes | Valid coordinates or address | - | Click to pin or search address |
| Ward/Zone | Auto-fill | Yes | Based on location | - | Auto-populated from GIS |
| Priority | Radio | Yes | High/Medium/Low | Medium | Urgency level |
| Estimated Impact | Number | No | Positive integer | - | Number of beneficiaries |
| Related Policy | Dropdown | Conditional | If source = Govt Policy | - | List of active policies |
| Requestor Name | Text | Yes | Min 3, Max 100 chars | - | Person/entity name |
| Contact Number | Phone | Yes | 10 digits | - | Mobile number |
| Email | Email | No | Valid email format | - | Contact email |
| Attachments | File | No | PDF/JPG/PNG, Max 5MB each | - | Supporting documents |
| Status | System | Auto | System managed | Draft | Draft/Submitted/Under Review |
| Created Date | DateTime | Auto | System timestamp | Current | - |
| Created By | User | Auto | Logged in user | Current User | - |

### 3.4 Interactions & Behaviors

#### 3.4.1 Source Type Selection
```javascript
onSourceTypeChange(value) {
  switch(value) {
    case 'CITIZEN_DEMAND':
      show: ['Requestor Details', 'Ward Representative']
      hide: ['Policy Reference', 'Master Plan Section']
      subSourceOptions: ['Individual', 'RWA', 'NGO', 'Business']
      break;
    case 'GOVT_POLICY':
      show: ['Policy Reference', 'Implementation Timeline']
      hide: ['Requestor Details']
      subSourceOptions: ['State Scheme', 'Central Scheme', 'Court Order']
      break;
    case 'INFRASTRUCTURE_GAP':
      show: ['Gap Analysis Report', 'Technical Assessment']
      hide: ['Requestor Details', 'Policy Reference']
      subSourceOptions: ['Roads', 'Water', 'Sewerage', 'Power', 'Parks']
      break;
    case 'MASTER_PLAN':
      show: ['Master Plan Section', 'Implementation Year']
      hide: ['Requestor Details']
      subSourceOptions: ['HMDA Vision 2050', 'Zonal Plans', 'Sector Plans']
      break;
  }
}
```

#### 3.4.2 Location Selection
- Interactive map powered by Google Maps/OpenStreetMap
- Click to pin location
- Search by address with autocomplete
- Automatic ward/zone detection using GIS overlay
- Display nearby existing projects within 500m radius

#### 3.4.3 Save States
- **Save Draft**: Saves with validation relaxed (only Need Title required)
- **Submit**: Full validation, status changes to "Submitted"
- Auto-save every 2 minutes for drafts
- Confirmation dialog on navigation away with unsaved changes

### 3.5 Permissions Matrix

| Action | PUB | MLR | JE | AE | EE | DCE | CE |
|--------|-----|-----|----|----|----|----|-----|
| Create Need | C | C | C | C | C | C | C |
| View Own | R | R | R | R | R | R | R |
| View All | - | R(Ward) | R(Area) | R(Area) | R(All) | R(All) | R(All) |
| Edit Draft | U | U | U | U | U | U | U |
| Edit Submitted | - | - | U | U | U | U | U |
| Delete Draft | D | D | D | D | D | D | D |
| Forward | - | - | F | F | F | F | F |

### 3.6 API Endpoints

```yaml
POST   /api/v1/needs                    # Create new need
GET    /api/v1/needs                    # List needs (with filters)
GET    /api/v1/needs/{id}               # Get specific need
PUT    /api/v1/needs/{id}               # Update need
DELETE /api/v1/needs/{id}               # Delete draft need
POST   /api/v1/needs/{id}/submit        # Submit need for review
POST   /api/v1/needs/{id}/attachments   # Upload attachments
GET    /api/v1/needs/statistics         # Get statistics
GET    /api/v1/master-data/policies     # Get active policies
GET    /api/v1/gis/ward-from-location   # Get ward from coordinates
```

### 3.7 Business Rules

1. **Duplicate Detection**: System checks for similar needs within 200m radius in last 6 months
2. **Auto-Assignment**: Based on location, auto-assign to respective zone AE
3. **Priority Escalation**: High priority needs trigger email/SMS to AE within 1 hour
4. **Attachment Limits**: Maximum 5 files, 25MB total per need
5. **Edit Restrictions**: Submitted needs can only be edited by AE and above
6. **Citizen Verification**: OTP verification for citizen submissions

---

## 4. Screen 2: Initial Site Visit & Assessment

### 4.1 Screen Overview
**Purpose**: Document field visits, capture site conditions, and provide initial technical assessment

**URL**: `/stage1/site-visit/{needId}`

**Primary Users**: JE, AE, EE

### 4.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Site Visit Assessment | User Info        |
+------------------------------------------------------------------+
| Navigation   |                Main Content Area                   |
|              |                                                    |
| Need Details | +----------------------------------------------+  |
| > Basic Info | | Site Visit Assessment                       |  |
| > Location   | | Need ID: NID-2024-001234 | Status: Pending |  |
| > Documents  | +----------------------------------------------+  |
|              | | Visit Information                           |  |
| Site Visit   | | +------------------------------------------+ |  |
| > Schedule   | | | Visit Date: [Date Picker] Time: [____]  | |  |
| > Assessment | | | Weather: [Sunny/Rainy/Cloudy v]         | |  |
| > Photos     | | | Team Members: [+ Add Member]            | |  |
| > Report     | | |   - AE: Raj Kumar [Lead]                | |  |
|              | | |   - JE: Priya Sharma                    | |  |
| Quick Actions| | |   - JE: Ahmad Khan                      | |  |
| □ Save Draft | | +------------------------------------------+ |  |
| □ Complete   | |                                              |  |
| □ Print      | | Site Observations                           |  |
|              | | +------------------------------------------+ |  |
|              | | | Accessibility: [Good/Fair/Poor v]       | |  |
|              | | | Terrain Type: [Plain/Sloped/Rocky v]    | |  |
|              | | | Current Land Use: [________________]   | |  |
|              | | | Existing Structures: [Yes/No]           | |  |
|              | | |   If Yes: [Describe_______________]    | |  |
|              | | | Utilities Available:                    | |  |
|              | | |   ☑ Water  ☑ Power  ☐ Sewerage        | |  |
|              | | |   ☐ Road Access  ☐ Street Lighting     | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Site Measurements                          |  |
|              | | +------------------------------------------+ |  |
|              | | | Total Area: [_____] sq.m/acres          | |  |
|              | | | Frontage: [_____] m                     | |  |
|              | | | Depth: [_____] m                        | |  |
|              | | | GPS Coordinates: [Auto-captured]        | |  |
|              | | |   Lat: 17.4239° N, Long: 78.4738° E    | |  |
|              | | | [Capture Current Location]              | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Photo Documentation                        |  |
|              | | +------------------------------------------+ |  |
|              | | | [📷 North] [📷 South] [📷 East] [📷 West] | |  |
|              | | | [📷 Panoramic] [📷 Issues] [+ Add More]  | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Initial Technical Assessment               |  |
|              | | +------------------------------------------+ |  |
|              | | | Feasibility: [High/Medium/Low v]       | |  |
|              | | | Major Constraints: [Text area______]   | |  |
|              | | | Recommendations: [Text area________]   | |  |
|              | | | Approx. Timeline: [___] months         | |  |
|              | | | [Previous] [Save Draft] [Submit]       | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 4.3 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| Visit ID | Text | Auto | System generated | VST-YYYY-###### | Unique visit identifier |
| Visit Date | Date | Yes | Not future date | Today | Date of site visit |
| Visit Time | Time | Yes | Valid time | Current | Time of visit |
| Weather | Dropdown | Yes | Required | - | Weather conditions |
| Team Lead | User Select | Yes | Must be AE or above | Current User | Visit team leader |
| Team Members | Multi-select | Yes | Min 1, Max 5 | - | Select team members |
| Accessibility | Radio | Yes | Required | - | Site accessibility level |
| Terrain Type | Dropdown | Yes | Required | - | Plain/Sloped/Rocky/Mixed |
| Current Land Use | Text | Yes | Max 200 chars | - | Existing land usage |
| Existing Structures | Toggle | Yes | Yes/No | No | Any structures present |
| Structure Details | Textarea | Conditional | If structures = Yes | - | Describe structures |
| Water Supply | Checkbox | No | - | Unchecked | Utility availability |
| Power Supply | Checkbox | No | - | Unchecked | Utility availability |
| Sewerage | Checkbox | No | - | Unchecked | Utility availability |
| Road Access | Checkbox | No | - | Unchecked | Access availability |
| Street Lighting | Checkbox | No | - | Unchecked | Utility availability |
| Total Area | Number | Yes | Positive number | - | In sq.m or acres |
| Area Unit | Radio | Yes | sq.m/acres | sq.m | Unit of measurement |
| Frontage | Number | No | Positive number | - | Front width in meters |
| Depth | Number | No | Positive number | - | Depth in meters |
| GPS Latitude | Number | Auto | Valid latitude | Device GPS | Auto-captured |
| GPS Longitude | Number | Auto | Valid longitude | Device GPS | Auto-captured |
| GPS Accuracy | Number | Auto | In meters | Device GPS | Location accuracy |
| Photos | File Array | Yes | Min 4 directions | - | Site photographs |
| Technical Feasibility | Radio | Yes | High/Medium/Low | - | Initial assessment |
| Major Constraints | Textarea | No | Max 500 chars | - | Key challenges |
| Recommendations | Textarea | Yes | Min 50, Max 1000 | - | Initial recommendations |
| Estimated Timeline | Number | No | 1-120 months | - | Rough timeline |
| Visit Status | System | Auto | System managed | Draft | Draft/Completed |

### 4.4 Interactions & Behaviors

#### 4.4.1 GPS Capture
```javascript
captureGPSLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fillFields({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          captureTime: new Date()
        });
        reverseGeocode(position.coords);
        verifyLocationMatch(needLocation, position.coords);
      },
      (error) => {
        showError("GPS not available. Please enter manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
}
```

#### 4.4.2 Photo Management
- Camera integration for mobile devices
- Drag & drop for desktop uploads
- Automatic EXIF data extraction (date, location if available)
- Image compression to max 2MB while maintaining quality
- Mandatory directional photos (North, South, East, West)
- Optional additional photos with tagging capability
- Photo preview with zoom functionality

#### 4.4.3 Team Member Selection
- Auto-complete from employee database
- Show only available team members (not on leave)
- Designate one team lead (AE or above)
- Send notification to selected team members
- Track actual vs planned team attendance

### 4.5 Permissions Matrix

| Action | JE | AE | EE | DCE | CE |
|--------|----|----|----|----|-----|
| Schedule Visit | C | C | C | C | C |
| Conduct Visit | C | C | C | - | - |
| View Visit Reports | R | R | R | R | R |
| Edit Draft Report | U | U | U | - | - |
| Submit Report | - | U | U | - | - |
| Approve Report | - | - | A | A | A |
| Download Report | R | R | R | R | R |

### 4.6 API Endpoints

```yaml
POST   /api/v1/site-visits              # Create site visit
GET    /api/v1/site-visits/{needId}     # Get visits for a need
GET    /api/v1/site-visits/visit/{id}   # Get specific visit
PUT    /api/v1/site-visits/visit/{id}   # Update visit
POST   /api/v1/site-visits/{id}/photos  # Upload photos
POST   /api/v1/site-visits/{id}/complete # Complete visit
GET    /api/v1/site-visits/team-availability # Check team availability
POST   /api/v1/site-visits/{id}/gps     # Update GPS coordinates
GET    /api/v1/site-visits/report/{id}  # Generate visit report
```

### 4.7 Business Rules

1. **Visit Window**: Site visits must be conducted within 7 days of need approval
2. **Team Composition**: Minimum 2 members, at least one must be AE or above
3. **Photo Requirements**: Minimum 4 directional photos required
4. **GPS Accuracy**: Location capture required with <50m accuracy
5. **Weather Restrictions**: System warns if heavy rain reported in area
6. **Report Submission**: Must be submitted within 48 hours of visit
7. **Location Verification**: GPS coordinates must be within 500m of reported need location

---

## 5. Screen 3: Preliminary Cost Estimate

### 5.1 Screen Overview
**Purpose**: Create initial cost estimates based on site visit findings and standard rates

**URL**: `/stage1/cost-estimate/{needId}`

**Primary Users**: JE, AE, EE

### 5.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Preliminary Cost Estimate | User Info    |
+------------------------------------------------------------------+
| Quick Info   |                Main Content Area                   |
|              |                                                    |
| Need ID:     | +----------------------------------------------+  |
| NID-2024-123 | | Preliminary Cost Estimate                   |  |
|              | | Project: New Community Park at Ward 42     |  |
| Site Visit:  | +----------------------------------------------+  |
| ✓ Completed  | | Estimate Summary                            |  |
|              | | +------------------------------------------+ |  |
| Estimate:    | | | Base Cost:        ₹ 4,50,00,000        | |  |
| In Progress  | | | Contingency (10%): ₹   45,00,000        | |  |
|              | | | GST (18%):        ₹   81,00,000        | |  |
| Actions:     | | | Total Estimate:   ₹ 5,76,00,000        | |  |
| □ Calculator | | +------------------------------------------+ |  |
| □ Rate Chart | |                                              |  |
| □ Templates  | | Work Components                             |  |
|              | | +------------------------------------------+ |  |
|              | | | [+ Add Component]                        | |  |
|              | | |                                          | |  |
|              | | | 1. Site Development                      | |  |
|              | | | Category: Civil Works                    | |  |
|              | | | +------------------------------------+   | |  |
|              | | | | Description: Land leveling & prep  |   | |  |
|              | | | | Quantity: 5000 sq.m               |   | |  |
|              | | | | Rate: ₹150/sq.m (SoR 2024-25)    |   | |  |
|              | | | | Amount: ₹7,50,000                 |   | |  |
|              | | | | [Edit] [Delete]                   |   | |  |
|              | | | +------------------------------------+   | |  |
|              | | |                                          | |  |
|              | | | 2. Compound Wall                        | |  |
|              | | | Category: Civil Works                    | |  |
|              | | | +------------------------------------+   | |  |
|              | | | | Description: RCC compound wall     |   | |  |
|              | | | | Quantity: 400 RMT                  |   | |  |
|              | | | | Rate: ₹3,500/RMT (SoR 2024-25)   |   | |  |
|              | | | | Amount: ₹14,00,000                |   | |  |
|              | | | | [Edit] [Delete]                   |   | |  |
|              | | | +------------------------------------+   | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Rate Analysis                              |  |
|              | | +------------------------------------------+ |  |
|              | | | Base Year: [2024-25 v]                  | |  |
|              | | | Location Factor: [Urban v] (+0%)        | |  |
|              | | | Market Variation: [+5% ]                | |  |
|              | | | [View Standard Rates] [Custom Rates]    | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Estimate Basis & Assumptions               |  |
|              | | +------------------------------------------+ |  |
|              | | | [Textarea for assumptions and basis]    | |  |
|              | | | - Based on SoR 2024-25                  | |  |
|              | | | - Excludes land acquisition cost        | |  |
|              | | | - Normal soil conditions assumed        | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | [Previous] [Save Draft] [Submit Estimate] |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 5.3 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| Estimate ID | Text | Auto | System generated | EST-YYYY-###### | Unique identifier |
| Estimate Date | Date | Auto | System date | Today | Creation date |
| Project Name | Text | Auto | From need title | Need title | Project name |
| Work Components | Array | Yes | Min 1 component | - | List of work items |
| Component Category | Dropdown | Yes | From master list | - | Civil/Electrical/Plumbing etc |
| Component Description | Text | Yes | Max 200 chars | - | Work description |
| Quantity | Number | Yes | Positive number | - | Measurable quantity |
| Unit | Dropdown | Yes | From UOM master | - | Unit of measurement |
| Rate Source | Radio | Yes | SoR/Market/Custom | SoR | Rate source |
| Base Rate | Currency | Yes | Positive amount | From SoR | Rate per unit |
| Rate Year | Dropdown | Yes | Valid SoR year | Current | SoR year |
| Component Amount | Currency | Auto | Quantity × Rate | Calculated | Component cost |
| Sub Total | Currency | Auto | Sum of components | Calculated | Total of all components |
| Contingency % | Number | Yes | 5-15% | 10% | Contingency percentage |
| Contingency Amount | Currency | Auto | % of subtotal | Calculated | Contingency value |
| GST % | Number | Yes | Current GST rate | 18% | Tax rate |
| GST Amount | Currency | Auto | % of (Sub+Cont) | Calculated | Tax amount |
| Total Estimate | Currency | Auto | All inclusive | Calculated | Final estimate |
| Location Factor | Dropdown | No | Urban/Rural/Remote | Urban | Location adjustment |
| Market Variation % | Number | No | -10% to +25% | 0% | Market rate variation |
| Assumptions | Textarea | Yes | Min 50 chars | Template | Basis and assumptions |
| Prepared By | User | Auto | Current user | Logged user | Who prepared |
| Checked By | User | No | AE or above | - | Reviewer |
| Status | System | Auto | System managed | Draft | Draft/Submitted/Approved |

### 5.4 Component Structure

```javascript
interface WorkComponent {
  id: string;
  category: 'CIVIL' | 'ELECTRICAL' | 'PLUMBING' | 'LANDSCAPING' | 'OTHER';
  description: string;
  quantity: number;
  unit: 'SQM' | 'RMT' | 'CUM' | 'NOS' | 'LS' | 'KG' | 'LTR';
  rateSource: 'SOR' | 'MARKET' | 'CUSTOM';
  sorCode?: string;  // If SoR rate
  baseRate: number;
  rateYear: string;
  amount: number;  // quantity * baseRate
  remarks?: string;
}
```

### 5.5 Interactions & Behaviors

#### 5.5.1 Add Component Flow
```javascript
addWorkComponent() {
  openModal({
    title: "Add Work Component",
    fields: [
      { name: "category", type: "dropdown", options: getCategories() },
      { name: "description", type: "text", placeholder: "Enter work description" },
      { name: "quantity", type: "number", min: 0 },
      { name: "unit", type: "dropdown", options: getUnits() },
      { name: "rateSource", type: "radio", options: ["SoR", "Market", "Custom"] }
    ],
    onRateSourceChange: (value) => {
      if (value === 'SOR') {
        showSoRSearch();
        autoFillRate();
      } else if (value === 'MARKET') {
        showMarketRateJustification();
      } else {
        showCustomRateInput();
      }
    },
    onSave: (data) => {
      calculateAmount(data);
      addToComponents(data);
      recalculateTotals();
    }
  });
}
```

#### 5.5.2 SoR Integration
- Search SoR items by code or description
- Auto-populate current year rates
- Show rate history for reference
- Apply location and market factors
- Flag if using outdated SoR (>2 years)

#### 5.5.3 Calculation Engine
```javascript
calculateEstimate() {
  const subtotal = components.reduce((sum, comp) => sum + comp.amount, 0);
  const contingency = subtotal * (contingencyPercent / 100);
  const taxableAmount = subtotal + contingency;
  const gst = taxableAmount * (gstPercent / 100);
  const total = taxableAmount + gst;
  
  // Apply location factor if any
  const locationAdjustment = total * (locationFactor / 100);
  const finalTotal = total + locationAdjustment;
  
  updateSummary({ subtotal, contingency, gst, total: finalTotal });
}
```

### 5.6 Permissions Matrix

| Action | JE | AE | EE | DCE | CE |
|--------|----|----|----|----|-----|
| Create Estimate | C | C | C | - | - |
| View Estimates | R | R | R | R | R |
| Edit Draft | U | U | U | - | - |
| Use Custom Rates | - | C | C | C | C |
| Override SoR | - | - | U | U | U |
| Submit Estimate | - | U | U | - | - |
| Approve Estimate | - | - | A | A | A |
| Export to Excel | R | R | R | R | R |

### 5.7 API Endpoints

```yaml
POST   /api/v1/estimates                 # Create new estimate
GET    /api/v1/estimates/{needId}        # Get estimates for need
GET    /api/v1/estimates/detail/{id}     # Get specific estimate
PUT    /api/v1/estimates/{id}            # Update estimate
POST   /api/v1/estimates/{id}/components # Add component
DELETE /api/v1/estimates/{id}/components/{compId} # Remove component
GET    /api/v1/sor/search                # Search SoR items
GET    /api/v1/sor/{year}/rates          # Get SoR rates
POST   /api/v1/estimates/{id}/submit     # Submit for approval
POST   /api/v1/estimates/{id}/export     # Export to Excel/PDF
```

### 5.8 Business Rules

1. **SoR Preference**: System should default to SoR rates, custom rates need justification
2. **Rate Validation**: Market rates beyond ±25% of SoR need special approval
3. **Component Minimum**: At least one work component required
4. **Contingency Limits**: 5-10% for normal projects, up to 15% with justification
5. **Estimate Validity**: Preliminary estimates valid for 3 months
6. **Revision Tracking**: All changes after submission tracked with timestamp
7. **Approval Limits**: Based on delegation matrix (AE: ₹10L, EE: ₹2Cr, etc.)

---

## 6. Screen 4: Budget Availability & Verification

### 6.1 Screen Overview
**Purpose**: Check budget availability across various funding sources and allocate funds

**URL**: `/stage1/budget-verification/{needId}`

**Primary Users**: AE, EE, DCE, Finance Officers

### 6.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Budget Verification | User Info          |
+------------------------------------------------------------------+
| Project Info |                Main Content Area                   |
|              |                                                    |
| Need: Park   | +----------------------------------------------+  |
| Ward 42      | | Budget Availability & Allocation            |  |
|              | | Estimated Cost: ₹5,76,00,000               |  |
| Estimate:    | +----------------------------------------------+  |
| ₹5.76 Cr     | | Funding Source Analysis                     |  |
|              | | +------------------------------------------+ |  |
| Quick Links: | | | Available Budget Sources                | |  |
| □ Guidelines | | |                                          | |  |
| □ History    | | | 1. HMDA General Fund                     | |  |
| □ Reports    | | | Budget Head: 2024-25/PARKS/CAPITAL      | |  |
|              | | | Allocated: ₹50,00,00,000                | |  |
|              | | | Committed: ₹32,50,00,000                | |  |
|              | | | Available: ₹17,50,00,000 ✓              | |  |
|              | | | [Select Amount: ₹5,00,00,000]          | |  |
|              | | |                                          | |  |
|              | | | 2. State Government Schemes              | |  |
|              | | | Scheme: Green Hyderabad Program         | |  |
|              | | | Allocated: ₹25,00,00,000                | |  |
|              | | | Committed: ₹24,00,00,000                | |  |
|              | | | Available: ₹1,00,00,000 ⚠              | |  |
|              | | | [Select Amount: ₹76,00,000]            | |  |
|              | | |                                          | |  |
|              | | | 3. Central Government Schemes            | |  |
|              | | | Scheme: AMRUT 2.0                       | |  |
|              | | | Status: Application Required            | |  |
|              | | | Potential: ₹10,00,00,000               | |  |
|              | | | [Apply for Funding]                    | |  |
|              | | |                                          | |  |
|              | | | 4. CSR Funding                          | |  |
|              | | | No active CSR proposals for this area  | |  |
|              | | | [Explore CSR Options]                  | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Fund Allocation Summary                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Total Required:    ₹5,76,00,000        | |  |
|              | | | Allocated:                              | |  |
|              | | |   - HMDA Fund:     ₹5,00,00,000        | |  |
|              | | |   - State Scheme:  ₹  76,00,000        | |  |
|              | | | Total Allocated:   ₹5,76,00,000 ✓      | |  |
|              | | | Balance:           ₹         0         | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Multi-Year Allocation (if needed)          |  |
|              | | +------------------------------------------+ |  |
|              | | | ☐ Split across financial years          | |  |
|              | | | Year 1 (2024-25): ₹___________         | |  |
|              | | | Year 2 (2025-26): ₹___________         | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | Budget Approval Chain                      |  |
|              | | +------------------------------------------+ |  |
|              | | | Current Status: Pending EE Review       | |  |
|              | | | → EE → DCE → CE → Finance → Approved   | |  |
|              | | +------------------------------------------+ |  |
|              |                                                |  |
|              | | [Previous] [Save Draft] [Submit for Approval] |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 6.3 Field Specifications

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| Budget Check ID | Text | Auto | System generated | BUD-YYYY-###### | Unique identifier |
| Total Requirement | Currency | Auto | From estimate | Estimate amt | Total funds needed |
| Funding Sources | Array | Yes | Min 1 source | - | Selected fund sources |
| Source Type | Dropdown | Yes | From master | - | HMDA/State/Central/CSR/PPP |
| Budget Head | Dropdown | Yes | Active heads only | - | Budget classification |
| Scheme Name | Text | Conditional | If scheme based | - | Government scheme |
| Financial Year | Dropdown | Yes | Current/Next FY | Current FY | Budget year |
| Allocated Amount | Currency | Yes | Within available | - | From this source |
| Available Balance | Currency | Display | From system | Calculated | Current availability |
| Committed Amount | Currency | Display | From system | Calculated | Already committed |
| Multi-Year Split | Toggle | No | Yes/No | No | Split across years |
| Year-wise Split | Array | Conditional | If multi-year | - | Yearly allocation |
| Fund Lock Period | Number | Auto | In days | 30 | Validity period |
| Approval Status | System | Auto | Workflow status | Pending | Current status |
| Justification | Textarea | Yes | Min 100 chars | - | Budget justification |
| Alternative Sources | Text | No | Max 500 chars | - | Other possibilities |
| Risk Assessment | Radio | Yes | Low/Medium/High | Medium | Funding risk |

### 6.4 Funding Source Structure

```javascript
interface FundingSource {
  id: string;
  type: 'HMDA_GENERAL' | 'STATE_SCHEME' | 'CENTRAL_SCHEME' | 'CSR' | 'PPP';
  name: string;
  budgetHead: string;
  financialYear: string;
  totalBudget: number;
  committedAmount: number;
  availableAmount: number;
  allocationRules: {
    minAmount?: number;
    maxAmount?: number;
    maxPercentage?: number;
    requiresApproval?: boolean;
    approvalLevel?: string;
  };
  expiryDate?: Date;
  conditions?: string[];
}
```

### 6.5 Interactions & Behaviors

#### 6.5.1 Real-time Budget Check
```javascript
async checkBudgetAvailability(budgetHead, amount) {
  const response = await api.get(`/budget/check/${budgetHead}`);
  const { available, committed, holds } = response.data;
  
  if (available >= amount) {
    showSuccess(`✓ Sufficient funds available: ₹${formatCurrency(available)}`);
    enableAllocation(amount);
  } else {
    showWarning(`⚠ Limited funds: Only ₹${formatCurrency(available)} available`);
    suggestAlternatives();
  }
  
  // Check for any temporary holds
  if (holds.length > 0) {
    showInfo(`Note: ₹${formatCurrency(holds.total)} under temporary hold`);
  }
}
```

#### 6.5.2 Multi-Source Allocation
- Intelligent suggestion of fund combinations
- Optimize for minimum approval levels
- Preference for single-source funding
- Alert if splitting increases approval complexity
- Auto-calculate optimal distribution

#### 6.5.3 Scheme Eligibility Check
```javascript
checkSchemeEligibility(projectType, location, amount) {
  const eligibleSchemes = schemes.filter(scheme => {
    return scheme.projectTypes.includes(projectType) &&
           scheme.locations.includes(location.district) &&
           amount >= scheme.minProjectSize &&
           amount <= scheme.maxProjectSize &&
           scheme.status === 'ACTIVE';
  });
  
  return eligibleSchemes.map(scheme => ({
    ...scheme,
    matchScore: calculateMatchScore(scheme, project),
    documentation: scheme.requiredDocs,
    timeline: scheme.approvalTimeline
  }));
}
```

### 6.6 Permissions Matrix

| Action | AE | EE | DCE | CE | Finance | Secretary |
|--------|----|----|-----|-------|---------|-----------|
| View Budget Status | R | R | R | R | R | R |
| Check Availability | R | R | R | R | R | R |
| Allocate <₹10L | C | C | C | C | C | C |
| Allocate <₹50L | - | C | C | C | C | C |
| Allocate <₹2Cr | - | - | C | C | C | C |
| Allocate >₹2Cr | - | - | - | C | C | C |
| Lock Funds | - | C | C | C | A | A |
| Release Locked | - | - | A | A | A | A |
| Override Limits | - | - | - | - | A | A |

### 6.7 API Endpoints

```yaml
GET    /api/v1/budget/sources            # List available sources
GET    /api/v1/budget/check/{head}       # Check specific budget head
POST   /api/v1/budget/allocate           # Allocate funds
POST   /api/v1/budget/lock               # Lock funds temporarily
DELETE /api/v1/budget/lock/{id}          # Release locked funds
GET    /api/v1/budget/schemes/eligible   # Get eligible schemes
POST   /api/v1/budget/multi-year         # Create multi-year allocation
GET    /api/v1/budget/history/{projectId} # Allocation history
POST   /api/v1/budget/verify             # Verify allocation validity
```

### 6.8 Business Rules

1. **Fund Locking**: Allocated funds locked for 30 days pending approvals
2. **Auto-Release**: Locked funds auto-release if project not approved
3. **Over-allocation**: System prevents allocation beyond available funds
4. **Scheme Compliance**: Scheme funds must meet scheme guidelines
5. **Multi-year Limits**: Not more than 40% in first year for multi-year
6. **Emergency Override**: CE and above can override with justification
7. **Audit Trail**: All allocations and changes logged for audit

---

## 7. Screen 5: Feasibility Study Management

### 7.1 Screen Overview
**Purpose**: Comprehensive feasibility analysis covering technical, financial, environmental, and social aspects

**URL**: `/stage1/feasibility-study/{needId}`

**Primary Users**: AE, EE, External Consultants, Subject Experts

### 7.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Feasibility Study | User Info            |
+------------------------------------------------------------------+
| Study Nav    |                Main Content Area                   |
|              |                                                    |
| ✓ Technical  | +----------------------------------------------+  |
| ⚡ Financial  | | Comprehensive Feasibility Study             |  |
| ○ Environment| | Project: New Community Park at Ward 42     |  |
| ○ Social     | +----------------------------------------------+  |
| ○ Summary    | |                                              |  |
|              | | Technical Feasibility                       |  |
| Progress:    | | +------------------------------------------+ |  |
| ████░░ 40%   | | | Site Suitability                        | |  |
|              | | | Soil Type: [Black Cotton v]            | |  |
| Actions:     | | | Bearing Capacity: [15 T/sqm]           | |  |
| □ Import     | | | Water Table: [12 m] below GL           | |  |
| □ Expert     | | | Flood Risk: [Low v]                    | |  |
| □ Reference  | | | Seismic Zone: [Zone II v]              | |  |
|              | | |                                          | |  |
|              | | | Design Feasibility                       | |  |
|              | | | Max Ground Coverage: [40%]             | |  |
|              | | | Max Height: [15 m]                     | |  |
|              | | | Setbacks Required: [F:6m R:3m S:3m]   | |  |
|              | | | Special Requirements: [___________]    | |  |
|              | | |                                          | |  |
|              | | | Infrastructure Availability              | |  |
|              | | | ✓ Water Supply: 500m from main         | |  |
|              | | | ✓ Power: 11KV line adjacent            | |  |
|              | | | ✗ Sewerage: 2km to nearest STP        | |  |
|              | | | ✓ Road: 12m road on east side         | |  |
|              | | | [View Infrastructure Map]              | |  |
|              | | |                                          | |  |
|              | | | Technical Challenges                    | |  |
|              | | | [+ Add Challenge]                      | |  |
|              | | | 1. Soil improvement needed for play area| |  |
|              | | |    Severity: [Medium v] Solution: [...] | |  |
|              | | | 2. Storm water drainage required       | |  |
|              | | |    Severity: [High v] Solution: [...]  | |  |
|              | | |                                          | |  |
|              | | | Technical Feasibility Score: 78/100    | |  |
|              | | | Status: [Feasible with conditions v]   | |  |
|              | | | Expert Opinion: [Attach Report]        | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Previous] [Save Progress] [Next: Financial]|  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 7.3 Technical Feasibility Fields

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| **Site Suitability** |
| Soil Type | Dropdown | Yes | From soil types | - | Select soil classification |
| Bearing Capacity | Number | Yes | T/sqm | - | Soil bearing capacity |
| Water Table Depth | Number | Yes | Meters | - | Depth below ground |
| Flood Risk | Radio | Yes | Low/Med/High | - | Flood risk assessment |
| Seismic Zone | Dropdown | Yes | Zone I-V | Zone II | Seismic classification |
| Slope/Gradient | Number | No | Percentage | - | Site gradient |
| **Design Parameters** |
| Ground Coverage | Number | Yes | 0-100% | Per norms | Maximum coverage allowed |
| Height Restriction | Number | Yes | Meters | Per norms | Maximum height |
| Setbacks | Object | Yes | F/R/S in meters | Per norms | Front/Rear/Side |
| FAR/FSI | Number | Yes | Decimal | Per zone | Floor area ratio |
| **Infrastructure** |
| Water Availability | Object | Yes | Distance/Capacity | - | Supply details |
| Power Availability | Object | Yes | Distance/Capacity | - | Power infrastructure |
| Sewerage System | Object | Yes | Distance/Type | - | Sewerage details |
| Road Connectivity | Object | Yes | Width/Type | - | Access roads |
| Telecom/Internet | Toggle | No | Yes/No | - | Connectivity available |
| **Challenges** |
| Challenge List | Array | No | - | - | Technical challenges |
| Challenge Severity | Radio | Yes | Low/Med/High | - | Impact level |
| Proposed Solution | Text | Yes | Max 500 chars | - | Mitigation approach |
| Additional Cost | Currency | No | Amount | - | Cost implication |
| **Assessment** |
| Technical Score | Number | Auto | 0-100 | Calculated | System calculated |
| Feasibility Status | Dropdown | Yes | - | - | Feasible/Conditional/Not Feasible |
| Expert Required | Toggle | No | Yes/No | No | Expert consultation needed |

### 7.4 Financial Feasibility Structure

```
| Financial Feasibility                                              |
| +----------------------------------------------------------------+ |
| | Capital Cost Analysis                                          | |
| | Land Cost (if applicable): ₹____________                      | |
| | Construction Cost:         ₹5,76,00,000 (from estimate)       | |
| | Equipment/Machinery:       ₹____________                      | |
| | Professional Fees:         ₹____________ (% of project)       | |
| | Total Capital Cost:        ₹____________                      | |
| |                                                                | |
| | Funding Analysis                                               | |
| | HMDA Budget:              ₹____________ (%)                   | |
| | Grants/Schemes:           ₹____________ (%)                   | |
| | Loans (if any):           ₹____________ (%)                   | |
| | User Charges/Revenue:     ₹____________ (%)                   | |
| |                                                                | |
| | Revenue Projections (if applicable)                            | |
| | Year 1: ₹_______ Year 2: ₹_______ Year 3: ₹_______           | |
| | Revenue Sources: [_________________________________]          | |
| |                                                                | |
| | Financial Indicators                                           | |
| | ROI: ___% | Payback Period: ___ years | NPV: ₹_______        | |
| | Financial Score: 65/100 | Status: [Viable v]                  | |
| +----------------------------------------------------------------+ |
```

### 7.5 Environmental Feasibility Fields

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| **Environmental Assessment** |
| Tree Survey | Object | Yes | Count/Species | - | Existing trees data |
| Trees Affected | Number | Yes | Count | 0 | Trees to be removed |
| Transplantation | Number | No | Count | 0 | Trees to transplant |
| New Plantation | Number | Yes | Count | - | Proposed new trees |
| **Impact Analysis** |
| Air Quality Impact | Radio | Yes | Positive/Neutral/Negative | - | Air quality effect |
| Noise Level Impact | Radio | Yes | Positive/Neutral/Negative | - | Noise effect |
| Water Body Impact | Radio | Yes | None/Minor/Major | None | Water body effect |
| Green Cover Change | Number | Yes | Percentage | - | Net change in green |
| **Clearances Required** |
| EIA Required | Toggle | Yes | Yes/No | No | Environmental Impact Assessment |
| Tree Cutting Permission | Toggle | Conditional | Yes/No | - | If trees affected |
| Water Body NOC | Toggle | Conditional | Yes/No | - | If near water body |
| Pollution Control | Toggle | No | Yes/No | No | PCB clearance |
| **Mitigation Measures** |
| Measures List | Array | Conditional | - | - | If negative impact |
| Measure Description | Text | Yes | Max 200 chars | - | Mitigation details |
| Implementation Cost | Currency | No | Amount | - | Mitigation cost |
| **Scoring** |
| Environmental Score | Number | Auto | 0-100 | Calculated | System score |
| Clearance Timeline | Number | No | Days | - | Estimated days |

### 7.6 Social Feasibility Fields

| Field Name | Type | Required | Validation | Default | Help Text |
|------------|------|----------|------------|---------|-----------|
| **Stakeholder Analysis** |
| Direct Beneficiaries | Number | Yes | Count | - | People benefited |
| Affected Parties | Number | Yes | Count | 0 | Negatively affected |
| Stakeholder Groups | Multi-select | Yes | - | - | Residents/Business/Institutions |
| **Impact Assessment** |
| Employment Generation | Number | No | Jobs | 0 | During construction |
| Permanent Jobs | Number | No | Jobs | 0 | After completion |
| Displacement Required | Toggle | Yes | Yes/No | No | Any displacement |
| Displacement Count | Number | Conditional | Families | - | If displacement |
| **Community Feedback** |
| Consultation Done | Toggle | Yes | Yes/No | No | Public consultation |
| Consultation Date | Date | Conditional | Past date | - | If consulted |
| Support Level | Radio | Conditional | High/Medium/Low | - | Community support |
| Major Concerns | Array | No | - | - | Concerns raised |
| **Social Benefits** |
| Safety Improvement | Radio | Yes | High/Medium/Low/None | - | Safety impact |
| Accessibility | Radio | Yes | Improved/Same/Reduced | - | Access impact |
| Quality of Life | Radio | Yes | High/Medium/Low | - | Life quality impact |
| Gender Impact | Text | No | Max 200 chars | - | Gender considerations |
| **Assessment** |
| Social Score | Number | Auto | 0-100 | Calculated | System score |
| R&R Required | Toggle | Auto | Yes/No | From data | Rehabilitation needed |

### 7.7 Summary & Recommendations

```
| Feasibility Summary Dashboard                                      |
| +----------------------------------------------------------------+ |
| | Overall Feasibility Score: 82/100                              | |
| |                                                                 | |
| | Component Scores:                                              | |
| | Technical:  ████████░░ 78/100 ✓ Feasible                      | |
| | Financial:  ██████░░░░ 65/100 ✓ Viable                        | |
| | Environmental: █████████░ 86/100 ✓ Positive                   | |
| | Social:     █████████░ 90/100 ✓ Beneficial                    | |
| |                                                                 | |
| | Key Findings:                                                  | |
| | ✓ Strong community support with 5000+ beneficiaries            | |
| | ✓ Environmentally positive with net green increase             | |
| | ⚠ Sewerage connection needs 2km extension                      | |
| | ⚠ Soil improvement required adding 8% to cost                  | |
| |                                                                 | |
| | Recommendation: [Proceed with Conditions v]                    | |
| | Conditions:                                                    | |
| | 1. Complete soil treatment before construction                 | |
| | 2. Include sewerage extension in project scope                 | |
| | 3. Obtain tree transplantation permission                      | |
| |                                                                 | |
| | Next Steps:                                                    | |
| | • Prepare detailed concept note                                | |
| | • Initiate environmental clearances                            | |
| | • Conduct detailed soil investigation                          | |
| +----------------------------------------------------------------+ |
```

### 7.8 Interactions & Scoring Logic

```javascript
calculateFeasibilityScore() {
  const weights = {
    technical: 0.30,
    financial: 0.25,
    environmental: 0.25,
    social: 0.20
  };
  
  // Technical Score Calculation
  const technicalScore = calculateTechnicalScore({
    siteScore: evaluateSiteSuitability(),
    infrastructureScore: evaluateInfrastructure(),
    challengesPenalty: assessChallenges()
  });
  
  // Financial Score Calculation
  const financialScore = calculateFinancialScore({
    fundingAvailability: checkFundingStatus(),
    costReasonableness: compareBenchmarks(),
    revenueViability: projectRevenue()
  });
  
  // Environmental Score
  const environmentalScore = calculateEnvironmentalScore({
    greenImpact: assessGreenCover(),
    clearanceComplexity: evaluateClearances(),
    sustainabilityBonus: checkSustainability()
  });
  
  // Social Score
  const socialScore = calculateSocialScore({
    beneficiaryCount: countBeneficiaries(),
    displacementPenalty: assessDisplacement(),
    communitySupport: measureSupport()
  });
  
  const overallScore = 
    (technicalScore * weights.technical) +
    (financialScore * weights.financial) +
    (environmentalScore * weights.environmental) +
    (socialScore * weights.social);
    
  return {
    overall: Math.round(overallScore),
    components: { technicalScore, financialScore, environmentalScore, socialScore },
    recommendation: getRecommendation(overallScore),
    conditions: generateConditions(components)
  };
}
```

### 7.9 API Endpoints

```yaml
POST   /api/v1/feasibility               # Create feasibility study
GET    /api/v1/feasibility/{needId}      # Get study for need
PUT    /api/v1/feasibility/{id}/technical # Update technical section
PUT    /api/v1/feasibility/{id}/financial # Update financial section
PUT    /api/v1/feasibility/{id}/environmental # Update environmental
PUT    /api/v1/feasibility/{id}/social   # Update social section
POST   /api/v1/feasibility/{id}/calculate # Calculate scores
POST   /api/v1/feasibility/{id}/expert   # Request expert review
POST   /api/v1/feasibility/{id}/complete # Mark study complete
GET    /api/v1/feasibility/{id}/report   # Generate report
```

---

## 8. Screen 6: Concept Note Preparation

### 8.1 Screen Overview
**Purpose**: Create comprehensive concept note consolidating all Stage 1 assessments for approval

**URL**: `/stage1/concept-note/{needId}`

**Primary Users**: AE, EE, DCE

### 8.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Concept Note | User Info                 |
+------------------------------------------------------------------+
| Doc Tools    |                Main Content Area                   |
|              |                                                    |
| Actions:     | +----------------------------------------------+  |
| □ Preview    | | Concept Note Preparation                    |  |
| □ Export PDF | | Project: New Community Park at Ward 42     |  |
| □ Template   | +----------------------------------------------+  |
| □ Version    | | Document Header                             |  |
|              | | +------------------------------------------+ |  |
| Sections:    | | | Reference No: [Auto: CN-2024-001234]    | |  |
| ✓ Executive  | | | Date: [Today's Date]                    | |  |
| ✓ Background | | | Prepared By: [Current User]             | |  |
| ⚡ Project    | | | Department: Engineering                  | |  |
| ○ Technical  | | +------------------------------------------+ |  |
| ○ Financial  | |                                              |  |
| ○ Implement  | | 1. Executive Summary (500 words max)        |  |
| ○ Approval   | | +------------------------------------------+ |  |
|              | | | [Rich text editor with formatting tools] | |  |
| Attachments: | | | This concept note proposes the         | |  |
| ✓ Site Photos| | | establishment of a community park...   | |  |
| ✓ Estimates  | | |                                          | |  |
| ✓ Feasibility| | | Key Highlights:                         | |  |
| + Add More   | | | • 5000+ direct beneficiaries            | |  |
|              | | | • ₹5.76 Cr investment                   | |  |
|              | | | • 18-month implementation               | |  |
|              | | | • Environmental benefits                | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | 2. Background & Justification              |  |
|              | | +------------------------------------------+ |  |
|              | | | Need Identification:                    | |  |
|              | | | Source: [Citizen Demand - RWA Request] | |  |
|              | | | Date Received: [01-Jan-2024]          | |  |
|              | | | Priority: [High]                       | |  |
|              | | |                                          | |  |
|              | | | Current Situation:                      | |  |
|              | | | Ward 42 with 15,000 population lacks..| |  |
|              | | |                                          | |  |
|              | | | Alignment with Policies:                | |  |
|              | | | ✓ HMDA Master Plan 2050 - Green Spaces| |  |
|              | | | ✓ State Green Initiative Policy        | |  |
|              | | | ✓ National Urban Parks Scheme          | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | 3. Project Description                      |  |
|              | | +------------------------------------------+ |  |
|              | | | Location: [Map with marked boundary]    | |  |
|              | | | Area: 5000 sq.m (1.24 acres)           | |  |
|              | | |                                          | |  |
|              | | | Components:                             | |  |
|              | | | • Children's play area - 1000 sq.m     | |  |
|              | | | • Walking track - 400m perimeter       | |  |
|              | | | • Green lawn - 2000 sq.m               | |  |
|              | | | • Seating areas - 20 benches           | |  |
|              | | | • Parking - 20 cars, 50 two-wheelers   | |  |
|              | | |                                          | |  |
|              | | | [Insert Concept Layout Plan]           | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | [Auto-save indicator] [Next Section →]     |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 8.3 Concept Note Sections

| Section | Required | Auto-populated | Manual Input | Word Limit |
|---------|----------|----------------|--------------|------------|
| Executive Summary | Yes | Key metrics | Summary text | 500 |
| Background | Yes | Need details | Justification | 750 |
| Project Description | Yes | Technical data | Components | 1000 |
| Site Analysis | Yes | Visit findings | Analysis | 500 |
| Technical Details | Yes | Feasibility data | Specifications | 750 |
| Cost Estimates | Yes | From estimate | Breakdown | Tables |
| Financial Plan | Yes | Budget allocation | Funding strategy | 500 |
| Implementation | Yes | - | Timeline, phases | 500 |
| Benefits | Yes | From feasibility | Outcomes | 500 |
| Risks | Yes | From assessments | Mitigation | 500 |
| Recommendations | Yes | System suggestion | Final recommendation | 250 |
| Annexures | No | All documents | Additional | - |

### 8.4 Smart Content Generation

```javascript
interface ConceptNoteGenerator {
  generateExecutiveSummary() {
    const summary = {
      projectTitle: need.title,
      location: `${need.ward}, ${need.zone}`,
      estimatedCost: formatCurrency(estimate.total),
      beneficiaries: feasibility.social.beneficiaries,
      implementation: `${estimate.timeline} months`,
      keyBenefits: extractTopBenefits(feasibility),
      recommendation: feasibility.recommendation
    };
    
    return templateEngine.render('executiveSummary', summary);
  }
  
  autoPopulateSection(sectionName) {
    const sectionData = aggregateData(sectionName);
    return {
      content: generateContent(sectionData),
      charts: generateVisuals(sectionData),
      tables: formatTables(sectionData),
      editableAreas: markEditableContent()
    };
  }
}
```

### 8.5 Document Composition Features

#### 8.5.1 Rich Text Editor
- Bold, Italic, Underline formatting
- Bullet points and numbering
- Table insertion and editing
- Image insertion with captions
- Hyperlink support
- Text alignment options
- Font size control (within standards)

#### 8.5.2 Auto-formatting
- HMDA standard document template
- Automatic page numbering
- Table of contents generation
- Header/footer with project details
- Consistent styling throughout
- Professional layout

#### 8.5.3 Data Integration
```javascript
pullDataFromStages() {
  return {
    needDetails: fetchNeedData(needId),
    siteVisit: fetchSiteVisitData(needId),
    estimate: fetchEstimateData(needId),
    budget: fetchBudgetData(needId),
    feasibility: fetchFeasibilityData(needId),
    attachments: fetchAllAttachments(needId)
  };
}

insertDataPoint(field) {
  const value = dataMap[field];
  return `<span class="data-field" data-source="${field}">${value}</span>`;
}
```

### 8.6 Collaborative Features

| Feature | Description | Users |
|---------|-------------|-------|
| Concurrent Editing | Multiple users can edit different sections | Team members |
| Comments | Add comments on specific paragraphs | Reviewers |
| Track Changes | Show edits with attribution | All editors |
| Version History | Access previous versions | All users |
| Section Locking | Lock section while editing | Current editor |
| Real-time Status | Show who's viewing/editing | All users |

### 8.7 Quality Checks

```javascript
performQualityChecks() {
  const checks = {
    completeness: {
      allSectionsComplete: checkAllSections(),
      requiredAttachments: verifyAttachments(),
      dataConsistency: validateDataPoints()
    },
    compliance: {
      wordLimits: checkWordCounts(),
      mandatoryFields: verifyMandatoryData(),
      formatting: checkFormatCompliance()
    },
    content: {
      calculations: verifyCostCalculations(),
      dates: checkDateConsistency(),
      references: validateReferences()
    }
  };
  
  return {
    score: calculateQualityScore(checks),
    issues: listIssues(checks),
    suggestions: generateSuggestions(checks)
  };
}
```

### 8.8 Approval Workflow Integration

```
| Approval Routing                                                   |
| +----------------------------------------------------------------+ |
| | Current Status: Draft                                          | |
| |                                                                | |
| | Approval Chain:                                                | |
| | [Draft] → [AE Review] → [EE Review] → [DCE Review] →         | |
| | [CE Approval] → [Higher Approvals if needed]                  | |
| |                                                                | |
| | Quick Submit Options:                                          | |
| | ○ Submit for Review (to AE/EE)                                | |
| | ○ Request Clarification (back to team)                        | |
| | ○ Escalate (skip level with reason)                           | |
| |                                                                | |
| | Approval Prediction: 85% (High)                                | |
| | Estimated Time: 5-7 working days                              | |
| +----------------------------------------------------------------+ |
```

### 8.9 Export Options

| Format | Features | Use Case |
|--------|----------|----------|
| PDF | Formatted, signed, watermarked | Official submission |
| Word | Editable, track changes | Collaborative review |
| HTML | Interactive, linked data | Online viewing |
| Print | A4 format, high quality | Physical submission |

### 8.10 API Endpoints

```yaml
POST   /api/v1/concept-note              # Create new concept note
GET    /api/v1/concept-note/{needId}     # Get concept note
PUT    /api/v1/concept-note/{id}/section # Update specific section
POST   /api/v1/concept-note/{id}/auto-generate # Auto-generate content
POST   /api/v1/concept-note/{id}/validate # Validate document
GET    /api/v1/concept-note/{id}/preview # Preview document
POST   /api/v1/concept-note/{id}/export  # Export in format
POST   /api/v1/concept-note/{id}/submit  # Submit for approval
GET    /api/v1/concept-note/{id}/status  # Check approval status
GET    /api/v1/concept-note/templates    # Get templates
```

---

## 9. Screen 7: Review & Approval Workflow

### 9.1 Screen Overview
**Purpose**: Manage the review and approval process with clear visibility of status and actions

**URL**: `/stage1/approvals/{needId}`

**Primary Users**: All roles based on approval level

### 9.2 Layout Structure

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 > Approval Workflow | User Info            |
+------------------------------------------------------------------+
| Quick Stats  |                Main Content Area                   |
|              |                                                    |
| My Actions:  | +----------------------------------------------+  |
| Pending: 3   | | Project Approval Workflow                   |  |
| Reviewed: 12 | | New Community Park at Ward 42               |  |
| This Month   | | Concept Note ID: CN-2024-001234             |  |
|              | +----------------------------------------------+  |
| Filters:     | | Workflow Progress                            |  |
| □ My Items   | | +------------------------------------------+ |  |
| □ Urgent     | | | ✓──────⚡──────○──────○──────○           | |  |
| □ Pending    | | | Draft    AE    EE    DCE    CE         | |  |
| □ Approved   | | | Complete Review Active Pending Pending  | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Current Stage: EE Review                    |  |
|              | | +------------------------------------------+ |  |
|              | | | Reviewer: Rajesh Kumar (EE)              | |  |
|              | | | Assigned: 2 days ago                     | |  |
|              | | | Due Date: 3 days remaining               | |  |
|              | | | Priority: High                           | |  |
|              | | | Status: Under Review                     | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Review Actions (for EE viewing)             |  |
|              | | +------------------------------------------+ |  |
|              | | | ☑ Technical feasibility verified         | |  |
|              | | | ☑ Cost estimates reasonable             | |  |
|              | | | ☑ Budget availability confirmed         | |  |
|              | | | ☐ Site visit report reviewed            | |  |
|              | | | ☐ Environmental clearance feasible      | |  |
|              | | |                                          | |  |
|              | | | Review Comments:                        | |  |
|              | | | [Text area for comments_____________]   | |  |
|              | | | [_____________________________________] | |  |
|              | | |                                          | |  |
|              | | | Attachments for Review:                 | |  |
|              | | | [Upload Additional Documents]           | |  |
|              | | |                                          | |  |
|              | | | Decision:                               | |  |
|              | | | ○ Approve and Forward                   | |  |
|              | | | ○ Approve with Conditions              | |  |
|              | | | ○ Return for Clarification             | |  |
|              | | | ○ Reject                                | |  |
|              | | |                                          | |  |
|              | | | [Save Draft] [Submit Decision]          | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Approval History                            |  |
|              | | +------------------------------------------+ |  |
|              | | | Stage      By          Date    Action   | |  |
|              | | | Draft      S.Priya     3/1/24  Created | |  |
|              | | | AE Review  A.Kumar     5/1/24  Approved| |  |
|              | | | EE Review  R.Kumar     -       Pending | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 9.3 Workflow Configuration

```javascript
const approvalWorkflow = {
  stages: [
    {
      level: 1,
      role: 'AE',
      name: 'Assistant Engineer Review',
      sla: 2, // days
      actions: ['approve', 'return', 'reject'],
      checks: ['technical_feasibility', 'site_verification'],
      mandatoryComments: false
    },
    {
      level: 2,
      role: 'EE',
      name: 'Executive Engineer Review',
      sla: 3,
      actions: ['approve', 'conditional_approve', 'return', 'reject'],
      checks: ['cost_validation', 'budget_verification', 'technical_review'],
      mandatoryComments: true
    },
    {
      level: 3,
      role: 'DCE',
      name: 'Deputy Chief Engineer Review',
      sla: 3,
      actions: ['approve', 'return', 'reject', 'escalate'],
      checks: ['strategic_alignment', 'priority_assessment'],
      mandatoryComments: true,
      conditional: (project) => project.estimatedCost > 1000000 // ₹10L
    },
    {
      level: 4,
      role: 'CE',
      name: 'Chief Engineer Approval',
      sla: 2,
      actions: ['approve', 'return', 'reject'],
      checks: ['final_review', 'resource_availability'],
      mandatoryComments: true,
      conditional: (project) => project.estimatedCost > 20000000 // ₹2Cr
    },
    {
      level: 5,
      role: 'SECRETARY',
      name: 'Secretary Approval',
      sla: 3,
      actions: ['approve', 'return', 'reject'],
      checks: ['policy_compliance', 'budget_sanction'],
      mandatoryComments: true,
      conditional: (project) => project.estimatedCost > 500000000 // ₹50Cr
    }
  ]
};
```

### 9.4 Review Checklist System

| Check Type | Description | Mandatory | Auto-verify |
|------------|-------------|-----------|-------------|
| Technical Feasibility | Verify technical assessment | Yes | Partial |
| Site Verification | Confirm site visit done | Yes | Yes |
| Cost Validation | Check estimate accuracy | Yes | No |
| Budget Verification | Confirm fund availability | Yes | Yes |
| Document Completeness | All required docs present | Yes | Yes |
| Policy Compliance | Aligns with policies | No | No |
| Environmental Check | Clearances feasible | Conditional | No |
| Social Impact | Positive impact verified | No | No |

### 9.5 Decision Actions

```javascript
const decisionActions = {
  approve: {
    label: "Approve and Forward",
    icon: "check_circle",
    color: "green",
    requiresComment: false,
    nextAction: "forwardToNext",
    notification: "all"
  },
  conditionalApprove: {
    label: "Approve with Conditions",
    icon: "check_circle_outline",
    color: "orange",
    requiresComment: true,
    requiresConditions: true,
    nextAction: "forwardWithConditions",
    notification: "all"
  },
  return: {
    label: "Return for Clarification",
    icon: "undo",
    color: "yellow",
    requiresComment: true,
    requiresReturnTo: true,
    nextAction: "returnToSelected",
    notification: "submitter"
  },
  reject: {
    label: "Reject",
    icon: "cancel",
    color: "red",
    requiresComment: true,
    requiresReason: true,
    nextAction: "closeWorkflow",
    notification: "all"
  },
  escalate: {
    label: "Escalate",
    icon: "arrow_upward",
    color: "blue",
    requiresComment: true,
    requiresReason: true,
    nextAction: "skipToHigherLevel",
    notification: "escalation"
  }
};
```

### 9.6 Approval Dashboard View

```
| My Approval Dashboard                                              |
| +----------------------------------------------------------------+ |
| | Summary Stats                                                  | |
| | +----------------+  +----------------+  +----------------+     | |
| | | Pending Review |  | Awaiting Others|  | Completed Today|     | |
| | |       12       |  |       08       |  |       05       |     | |
| | |   3 Urgent     |  |   2 Delayed    |  |   100% on time |     | |
| | +----------------+  +----------------+  +----------------+     | |
| |                                                                | |
| | Pending Actions                                               | |
| | +------------------------------------------------------------+ | |
| | | # | Project | Type | Stage | Assigned | Due | Priority |   | | |
| | | 1 | Park Ward 42 | New | EE Review | 2d ago | 3d | High |  | | |
| | | 2 | Road Repair | Maint | EE Review | 1d ago | 4d | Med | | | |
| | | 3 | Building | New | EE Review | Today | 5d | Low |       | | |
| | +------------------------------------------------------------+ | |
| |                                                                | |
| | Quick Filters: [All] [Urgent] [Overdue] [By Type] [By Ward]  | |
| +----------------------------------------------------------------+ |
```

### 9.7 Notification System

```javascript
const notificationRules = {
  onAssignment: {
    channels: ['email', 'sms', 'app'],
    template: 'New approval request for {projectName}',
    priority: 'high'
  },
  onApproach: {
    beforeDays: 1,
    channels: ['email', 'app'],
    template: 'Reminder: {projectName} review due tomorrow',
    priority: 'medium'
  },
  onOverdue: {
    channels: ['email', 'sms', 'app'],
    template: 'Overdue: {projectName} review pending',
    priority: 'urgent',
    escalateTo: 'supervisor'
  },
  onDecision: {
    channels: ['email', 'app'],
    template: '{projectName} {decision} by {approver}',
    priority: 'high',
    notifyList: ['submitter', 'nextApprover', 'stakeholders']
  }
};
```

### 9.8 Parallel Approvals

For certain stages, parallel approvals may be required:

```
| Parallel Approval Required                                         |
| +----------------------------------------------------------------+ |
| | Technical Review (EE)          | Financial Review (Finance)    | |
| | Status: Completed ✓            | Status: In Progress ⚡        | |
| | By: R.Kumar                    | By: S.Sharma                  | |
| | Date: 5/1/2024                 | Due: 7/1/2024                 | |
| |                                |                               | |
| | Comments: Technically sound    | Awaiting budget confirmation  | |
| +----------------------------------------------------------------+ |
| Both approvals required before proceeding to next stage           |
```

### 9.9 Approval Analytics

```
| Approval Performance Metrics                                       |
| +----------------------------------------------------------------+ |
| | Average Approval Time by Stage                                 | |
| | AE:  ████ 1.5 days (Target: 2 days) ✓                         | |
| | EE:  ███████ 2.8 days (Target: 3 days) ✓                      | |
| | DCE: █████████ 3.5 days (Target: 3 days) ⚠                   | |
| | CE:  ████ 1.8 days (Target: 2 days) ✓                         | |
| |                                                                | |
| | Approval Rates                                                 | |
| | Approved: 78% | Returned: 18% | Rejected: 4%                  | |
| |                                                                | |
| | Common Return Reasons:                                         | |
| | 1. Incomplete documentation (45%)                              | |
| | 2. Budget clarifications (30%)                                 | |
| | 3. Technical modifications (25%)                               | |
| +----------------------------------------------------------------+ |
```

### 9.10 API Endpoints

```yaml
GET    /api/v1/approvals/pending         # Get pending approvals
GET    /api/v1/approvals/workflow/{id}   # Get workflow status
POST   /api/v1/approvals/{id}/decision   # Submit decision
POST   /api/v1/approvals/{id}/comment    # Add comment
GET    /api/v1/approvals/{id}/history    # Get approval history
POST   /api/v1/approvals/{id}/reassign   # Reassign approver
GET    /api/v1/approvals/analytics       # Get analytics data
POST   /api/v1/approvals/{id}/remind     # Send reminder
GET    /api/v1/approvals/sla-report      # SLA compliance report
```

---

## 10. Screen 8: Stage 1 Dashboard & Analytics

### 10.1 Screen Overview
**Purpose**: Comprehensive dashboard showing Stage 1 project pipeline, metrics, and insights

**URL**: `/stage1/dashboard`

**Primary Users**: All roles with filtered views

### 10.2 Main Dashboard Layout

```
+------------------------------------------------------------------+
| HMDA Header | Stage 1 Dashboard | User: EE R.Kumar | Logout      |
+------------------------------------------------------------------+
| Date Range:  |                Main Dashboard Area                 |
| [Last 30 Days v] |                                               |
|              | +----------------------------------------------+  |
| Quick Actions:| | Stage 1: Project Conceptualization Overview |  |
| + New Need   | +----------------------------------------------+  |
| ⚡ My Pending | |                                              |  |
| 📊 Reports   | | Key Metrics Summary                         |  |
|              | | +----------+ +----------+ +----------+ +----------+ |
| Filters:     | | |   124    | |    32    | |    18    | |   ₹45   | |
| Zone: [All v]| | |  Needs   | | Active   | | Approved | | Crores  | |
| Type: [All v]| | |Registered| | Studies  | |This Month| |Pipeline | |
| Status:[All v]| | +----------+ +----------+ +----------+ +----------+ |
|              | |                                              |  |
|              | | Stage-wise Pipeline                         |  |
|              | | +------------------------------------------+ |  |
|              | | | Need Identified:        ████ 45 (36%)    | |  |
|              | | | Site Visit Pending:    ███ 23 (19%)     | |  |
|              | | | Estimate in Progress:  ████ 28 (23%)    | |  |
|              | | | Feasibility Study:     ██ 15 (12%)      | |  |
|              | | | Concept Note Prep:     █ 8 (6%)         | |  |
|              | | | Under Approval:        █ 5 (4%)         | |  |
|              | | | Total Active: 124                       | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Approval Status (Real-time)                 |  |
|              | | +------------------------------------------+ |  |
|              | | | Level    | Pending | Avg Time | SLA %  | |  |
|              | | | AE       |    8    | 1.5 days | 95% ✓ | |  |
|              | | | EE       |    3    | 2.2 days | 92% ✓ | |  |
|              | | | DCE      |    2    | 3.8 days | 78% ⚠ | |  |
|              | | | CE       |    1    | 1.2 days | 98% ✓ | |  |
|              | | +------------------------------------------+ |  |
|              | |                                              |  |
|              | | Geographic Distribution (Heat Map)          |  |
|              | | +------------------------------------------+ |  |
|              | | | [Interactive map showing project density]| |  |
|              | | | Zone 1: ████ 25  Zone 4: ██ 12         | |  |
|              | | | Zone 2: ███ 18   Zone 5: ███ 20        | |  |
|              | | | Zone 3: █████ 31 Zone 6: ███ 18        | |  |
|              | | +------------------------------------------+ |  |
|              | +----------------------------------------------+  |
+------------------------------------------------------------------+
```

### 10.3 Analytics Components

#### 10.3.1 Project Category Analysis
```
| Project Type Distribution              | Budget Distribution       |
| +------------------------------------+ | +-----------------------+ |
| | Parks & Recreation:  ████ 32%      | | | <₹50L:      ███ 45% | |
| | Roads & Transport:   ███ 28%       | | | ₹50L-2Cr:   ██ 30%  | |
| | Water & Sewerage:    ██ 18%        | | | ₹2-10Cr:    █ 18%   | |
| | Buildings:           ██ 15%        | | | >₹10Cr:     █ 7%    | |
| | Others:              █ 7%          | | +-----------------------+ |
| +------------------------------------+ |
```

#### 10.3.2 Performance Trends
```
| Monthly Trend Analysis                                             |
| +----------------------------------------------------------------+ |
| | Needs Registered (6 months)                                    | |
| |      120 |                                            ●        | |
| |      100 |                                    ●               | |
| |       80 |                            ●                       | |
| |       60 |                    ●                               | |
| |       40 |            ●                                       | |
| |       20 |    ●                                               | |
| |        0 +----+----+----+----+----+----+                     | |
| |          Aug  Sep  Oct  Nov  Dec  Jan                        | |
| |                                                                | |
| | Conversion Rate: Need to Approval                             | |
| | Aug: 45% | Sep: 52% | Oct: 58% | Nov: 61% | Dec: 65% | Jan: 68% |
| +----------------------------------------------------------------+ |
```

#### 10.3.3 Team Performance
```
| Team Productivity Metrics                                          |
| +----------------------------------------------------------------+ |
| | Top Performers (Site Visits)      | Approval Turnaround Time   | |
| | 1. AE Kumar    ████████ 15       | Fastest: AE Priya (0.8d)   | |
| | 2. AE Sharma   ██████ 12         | Average: 2.1 days           | |
| | 3. AE Reddy    █████ 10          | Slowest: AE Ahmad (3.2d)    | |
| +----------------------------------------------------------------+ |
```

### 10.4 Interactive Features

#### 10.4.1 Drill-down Capability
```javascript
onMetricClick(metric) {
  switch(metric) {
    case 'needsRegistered':
      navigateTo('/stage1/needs/list', {
        filter: 'all',
        dateRange: currentDateRange
      });
      break;
    case 'pendingApprovals':
      navigateTo('/stage1/approvals/pending', {
        filter: 'myPending'
      });
      break;
    case 'zoneHeatmap':
      showDetailedZoneAnalysis(selectedZone);
      break;
  }
}
```

#### 10.4.2 Real-time Updates
- WebSocket connection for live updates
- Auto-refresh every 30 seconds for key metrics
- Push notifications for critical alerts
- Visual indicators for new changes

#### 10.4.3 Customizable Widgets
```javascript
const widgetLibrary = [
  { id: 'keyMetrics', name: 'Key Metrics', size: 'full', default: true },
  { id: 'pipeline', name: 'Stage Pipeline', size: 'half', default: true },
  { id: 'approvals', name: 'Approval Status', size: 'half', default: true },
  { id: 'heatmap', name: 'Geographic View', size: 'full', default: false },
  { id: 'trends', name: 'Trend Analysis', size: 'full', default: false },
  { id: 'alerts', name: 'Action Alerts', size: 'half', default: true },
  { id: 'calendar', name: 'Deadline Calendar', size: 'half', default: false }
];
```

### 10.5 Alert System

```
| Action Alerts & Notifications                                      |
| +----------------------------------------------------------------+ |
| | 🔴 Critical (2)                                               | |
| | • 2 approvals overdue by >2 days [View]                      | |
| | • Budget allocation expiring in 3 days for Project #123      | |
| |                                                                | |
| | 🟡 Warnings (5)                                               | |
| | • 5 site visits pending >5 days [Assign Teams]               | |
| | • 3 estimates awaiting review [Review Now]                   | |
| |                                                                | |
| | 🔵 Information (8)                                            | |
| | • New government scheme announced [Details]                   | |
| | • Monthly report due in 2 days [Prepare]                     | |
| +----------------------------------------------------------------+ |
```

### 10.6 Quick Reports

| Report Type | Description | Format | Schedule |
|-------------|-------------|--------|----------|
| Daily Status | Pending items summary | Email | 9 AM daily |
| Weekly Progress | Stage-wise progress | PDF | Monday 10 AM |
| Monthly Analytics | Comprehensive metrics | Excel | 1st of month |
| SLA Compliance | Approval delays | Dashboard | Real-time |
| Budget Utilization | Fund usage status | PDF | Bi-weekly |

### 10.7 Role-based Dashboard Views

#### 10.7.1 CE Dashboard Focus
- High-value project approvals
- Overall stage performance
- Resource allocation overview
- Policy compliance status

#### 10.7.2 EE Dashboard Focus
- Team task assignments
- Pending reviews queue
- Site visit schedule
- Estimate approvals

#### 10.7.3 Field Staff Dashboard
- Today's site visits
- Pending assessments
- Data collection tasks
- Document uploads

### 10.8 Export & Sharing

```
| Export Options                         | Share Dashboard          |
| +------------------------------------+ | +----------------------+ |
| | □ Export as PDF Report             | | | Share with:          | |
| | □ Export Data to Excel             | | | [Select users____]   | |
| | □ Download Charts as Images        | | | □ View only          | |
| | □ Schedule Email Reports           | | | □ Include filters    | |
| | □ Print Dashboard                  | | | [Generate Link]      | |
| | [Configure] [Export Now]           | | +----------------------+ |
| +------------------------------------+ |
```

### 10.9 API Endpoints

```yaml
GET    /api/v1/dashboard/summary         # Get summary metrics
GET    /api/v1/dashboard/pipeline        # Get pipeline data
GET    /api/v1/dashboard/approvals       # Get approval metrics
GET    /api/v1/dashboard/geographic      # Get zone-wise data
GET    /api/v1/dashboard/trends          # Get trend analysis
GET    /api/v1/dashboard/alerts          # Get active alerts
POST   /api/v1/dashboard/widget-config   # Save widget configuration
GET    /api/v1/dashboard/export          # Export dashboard data
WS     /api/v1/dashboard/live            # WebSocket for live updates
```

---

## 11. Mobile Responsive Considerations

### 11.1 Responsive Breakpoints

```css
/* Desktop: 1200px and above */
/* Tablet: 768px to 1199px */
/* Mobile: 320px to 767px */

@media (max-width: 767px) {
  /* Mobile-specific styles */
  .sidebar { transform: translateX(-100%); }
  .main-content { padding: 16px; }
  .data-table { overflow-x: scroll; }
}
```

### 11.2 Mobile-Optimized Features

#### 11.2.1 Touch Interactions
- Swipe gestures for navigation
- Pull-to-refresh for data updates
- Long press for context menus
- Pinch-to-zoom for maps and images

#### 11.2.2 Mobile-First Components
```javascript
// Responsive table that converts to cards on mobile
<ResponsiveTable
  columns={['ID', 'Title', 'Status', 'Date']}
  data={needs}
  mobileView="cards"
  breakpoint={768}
/>

// Mobile-optimized form layouts
<FormField
  label="Project Title"
  mobileFullWidth={true}
  stackedLabel={true}
/>
```

#### 11.2.3 Offline Capabilities
- Service worker for offline access
- Local storage for draft data
- Sync when connection restored
- Offline indicator in UI

### 11.3 Mobile-Specific Screens

#### 11.3.1 Mobile Dashboard
```
+---------------------------+
| HMDA ☰         👤 User    |
+---------------------------+
| Stage 1 Summary           |
| +-------+ +-------+       |
| |  45   | |  12   |       |
| | Needs | |Pending|       |
| +-------+ +-------+       |
|                           |
| Quick Actions             |
| [+ New Need]              |
| [📍 Site Visit]           |
| [📋 My Tasks]             |
|                           |
| Recent Activity           |
| • Park approval pending   |
| • Site visit completed    |
| • New need from Ward 42   |
+---------------------------+
| Home | Tasks | Add | More |
+---------------------------+
```

#### 11.3.2 Mobile Form Optimization
- Single column layouts
- Larger touch targets (44x44px minimum)
- Native date/time pickers
- Camera integration for photos
- GPS auto-capture

---

## 12. Integration Points

### 12.1 External System Integrations

| System | Purpose | Integration Type | Data Flow |
|--------|---------|------------------|-----------|
| DPMS | Building permissions check | REST API | Read-only |
| E-Procurement | Tender reference | REST API | Read-only |
| GIS Platform | Location services | REST/WMS | Bidirectional |
| Finance System | Budget data | Database View | Read-only |
| Document Management | File storage | REST API | Read/Write |
| SMS Gateway | Notifications | REST API | Write-only |
| Email Server | Notifications | SMTP | Write-only |

### 12.2 Data Synchronization

```javascript
const integrationConfig = {
  dpms: {
    endpoint: process.env.DPMS_API,
    syncInterval: 3600000, // 1 hour
    dataPoints: ['buildingPermissions', 'landUse']
  },
  gis: {
    endpoint: process.env.GIS_API,
    realtime: true,
    dataPoints: ['wardBoundaries', 'infrastructure', 'utilities']
  },
  finance: {
    endpoint: process.env.FINANCE_DB,
    syncInterval: 300000, // 5 minutes
    dataPoints: ['budgetHeads', 'allocations', 'expenditure']
  }
};
```

### 12.3 Authentication & Security

#### 12.3.1 Single Sign-On (SSO)
- SAML 2.0 integration with HMDA AD
- OAuth 2.0 for external consultants
- Multi-factor authentication for sensitive roles
- Session timeout after 30 minutes of inactivity

#### 12.3.2 API Security
```javascript
const securityMiddleware = {
  authentication: 'JWT',
  authorization: 'RBAC',
  encryption: 'TLS 1.3',
  rateLimit: {
    window: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  },
  cors: {
    origins: ['https://hmda.gov.in'],
    credentials: true
  }
};
```

---

## Implementation Guidelines

### Critical Success Factors

1. **Performance Requirements**
   - Page load: <2 seconds
   - API response: <500ms
   - Real-time updates: <100ms latency
   - 99.9% uptime

2. **Browser Support**
   - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
   - Mobile: iOS Safari 14+, Chrome Android 90+

3. **Accessibility Standards**
   - WCAG 2.1 Level AA compliance
   - Keyboard navigation for all features
   - Screen reader compatibility
   - High contrast mode support

4. **Data Validation**
   - Client-side validation for immediate feedback
   - Server-side validation for security
   - Clear error messages in user's language
   - Inline validation where possible

5. **Testing Requirements**
   - Unit test coverage: >90%
   - Integration tests for all workflows
   - E2E tests for critical paths
   - Performance testing under load
   - Security penetration testing

### Deployment Considerations

1. **Environment Setup**
   - Development, Staging, Production environments
   - Blue-green deployment for zero downtime
   - Database migrations automated
   - Configuration management via environment variables

2. **Monitoring & Analytics**
   - Application performance monitoring (APM)
   - Error tracking and alerting
   - User behavior analytics
   - Custom business metrics tracking

3. **Documentation Requirements**
   - API documentation (OpenAPI/Swagger)
   - User manuals for each role
   - Video tutorials for common tasks
   - Administrator guide
   - Troubleshooting guide

---

## Conclusion

This comprehensive UI/UX design document provides detailed specifications for implementing Stage 1 of the HMDA Project Execution System. The design prioritizes:

- **User Experience**: Intuitive interfaces tailored to each role
- **Efficiency**: Streamlined workflows reducing manual effort
- **Transparency**: Clear visibility of project status and bottlenecks
- **Scalability**: Architecture supporting future enhancements
- **Compliance**: Adherence to government standards and policies

The implementation team should use this document as the primary reference, ensuring consistency across all screens and maintaining the high-quality user experience essential for successful digital transformation of HMDA's project conceptualization process.

---

*Document Version: 1.0*  
*Last Updated: January 2025*  
*Prepared for: HMDA Chief Engineer B. Ravinder*