# HMDA Field Mapping Quick Reference

## Critical Field Mappings for Demo Alignment

| Current Demo Field | HMDA Master Field | Example Value (Current) | Example Value (HMDA Format) |
|-------------------|-------------------|------------------------|----------------------------|
| `projectId` | `S. No` | "HMDA-ENV-2025-001-C1" | 1, 2, 3... |
| `projectName` | `Name of the project` | "Narsingi Eco Park - Phase A" | "Inmulnarva Layout" |
| `category` | `Type of work` | "ENV" | "parks/lakes" |
| - | `Name of the work` | - | "Development of layout with infrastructure facilities..." |
| - | `Division No` | - | "VI" |
| - | `AS Financial Year` | - | "2022-23" |
| `contractor.name` | `Name of the agency` | "Ramky Infrastructure" | "M/s Ramky Infrastructure" |
| `totalBudget` | `Estimate amount (Rs. in Crs)` | 1172480547 | 117.25 |
| `contractValue` | `ECV (Rs. in Crs)` | 1172480547 | 117.25 |
| - | `TCV` | - | 112.50 |
| - | `TP %` | - | "-4.05%" |
| `goNumber` | Within `AS Details` | "G.O.Ms.No.183" | "G.O.Ms.No.183" ✅ |
| `asFileNo` | `AS file No` | "AS/ENV-2025-001-C1/2024-25" | "HMDA/CE/AS/123/2022-23" |
| - | `AS to MC or Govt` | - | "Metropolitan Commissioner" |
| - | `AS date` | - | "15-09-2022" |
| - | `Tender Notice details` | - | "HMDA/DEV/CE/23/2022-23 dt.01.09.2022" |
| - | `LOA No & Date` | - | "14572/HMDA/DEV/CE/Inmulnarva/2022-23 dt.15.11.2022" |
| - | `Agreement No` | - | "HMDA/DEV/CE/37/2022-23" |
| - | `Agreement date` | - | "01-12-2022" |
| - | `Period of completion` | - | "18 months" |
| - | `Work grounded/hand over date` | - | "01-07-2023" |
| `physicalProgress` | Part of `Status of the work` | 65.5 | "Work in progress" |
| - | `Expenditure incurred (incl taxes)` | - | 45.23 |
| - | `Expenditure incurred (excl taxes)` | - | 38.50 |

## Work Type Mapping

| Demo Category | HMDA Type | Description |
|--------------|-----------|-------------|
| INFRA | Roads | Road construction, widening, flyovers |
| URBAN | Layouts | Layout development with infrastructure |
| ENV | parks/lakes | Lake development, parks, beautification |
| SMART | others | Special projects, HUDA Heights, etc. |

## Status Mapping

| Demo Status | HMDA Status |
|------------|-------------|
| Stage 1-8 | "Work in progress" |
| Stage 9 | "Work is completed" |

## Key Formatting Rules

1. **Financial Amounts**: Always in Crores with 2 decimal places (e.g., 75.50)
2. **Dates**: DD-MM-YYYY or DD.MM.YYYY format
3. **Contractor Names**: Always prefix with "M/s"
4. **GO Numbers**: Keep existing format (already correct)
5. **File Numbers**: Use HMDA/[Department]/[Type]/[Number]/[Year] format

## Priority Implementation Items

### 🔴 HIGH PRIORITY (Demo Impact)
1. Update all project names to HMDA patterns
2. Convert all amounts to Crores
3. Add "M/s" to contractor names
4. Add detailed work descriptions
5. Include AS file numbers in HMDA format

### 🟡 MEDIUM PRIORITY 
1. Add tender notice details
2. Add LOA and agreement numbers
3. Include approval authority field
4. Add expenditure tracking

### 🟢 NICE TO HAVE
1. Division numbers
2. Revised AS details
3. Deviations and EOTs
4. Work slip details

This quick reference will help ensure our demo screens show authentic HMDA data formats that Chief Engineer B. Ravinder will immediately recognize.