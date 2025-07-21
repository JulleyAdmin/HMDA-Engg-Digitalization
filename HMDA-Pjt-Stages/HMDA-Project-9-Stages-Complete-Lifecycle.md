# HMDA Project Lifecycle - 9 Stages Complete Documentation

## Executive Summary
This document presents the comprehensive 9-stage project lifecycle within HMDA Chief Engineer's office, demonstrating our complete understanding of end-to-end project execution from conceptualization to operations & maintenance.

## Table of Contents
1. [Stage 1: Project Conceptualization & Feasibility](#stage-1-project-conceptualization--feasibility)
2. [Stage 2: Detailed Project Report & Approvals](#stage-2-detailed-project-report--approvals)
3. [Stage 3: Tendering & Procurement](#stage-3-tendering--procurement)
4. [Stage 4: Contract Award & Mobilization](#stage-4-contract-award--mobilization)
5. [Stage 5: Construction/Execution Phase](#stage-5-constructionexecution-phase)
6. [Stage 6: Quality Control & Monitoring](#stage-6-quality-control--monitoring)
7. [Stage 7: Testing & Commissioning](#stage-7-testing--commissioning)
8. [Stage 8: Project Closure & Handover](#stage-8-project-closure--handover)
9. [Stage 9: Defect Liability & O&M Phase](#stage-9-defect-liability--om-phase)

---

## Stage 1: Project Conceptualization & Feasibility

### Duration: 3-6 months (varies by project size)

```mermaid
flowchart TD
    subgraph Initiation
        A[Need Identification] --> B{Source of Requirement}
        B -->|Citizen Demands| C[Public Representatives]
        B -->|Government Policy| D[State/Central Schemes]
        B -->|Infrastructure Gap| E[Department Analysis]
        B -->|Master Plan| F[HMDA Vision 2050]
    end
    
    subgraph Preliminary Assessment
        C --> G[Initial Site Visit]
        D --> G
        E --> G
        F --> G
        G --> H[Preliminary Cost Estimate]
        H --> I{Budget Availability?}
        I -->|No| J[Defer/Seek Funds]
        I -->|Yes| K[Feasibility Study]
    end
    
    subgraph Feasibility Analysis
        K --> L[Technical Feasibility]
        K --> M[Financial Feasibility]
        K --> N[Environmental Impact]
        K --> O[Social Impact]
        
        L --> P{All Feasible?}
        M --> P
        N --> P
        O --> P
        
        P -->|No| Q[Alternative Solutions]
        P -->|Yes| R[Concept Note Preparation]
        Q --> K
    end
    
    subgraph Approval Process
        R --> S[DCE Review]
        S --> T[CE Recommendation]
        T --> U{Project Value?}
        U -->|<50Cr| V[Secretary Approval]
        U -->|50-200Cr| W[Commissioner Approval]
        U -->|>200Cr| X[Board Approval]
        
        V --> Y[Project Sanctioned]
        W --> Y
        X --> Y
    end
    
    style A fill:#e3f2fd
    style Y fill:#c8e6c9
```

### Stage 1 Swimlane Diagram - Project Conceptualization Process:
```mermaid
flowchart LR
    subgraph Public["Public/Stakeholders"]
        A1[Raise Demand<br/>or Need]
        A2[Provide<br/>Feedback]
    end
    
    subgraph Field["Field Staff (AE/JE)"]
        B1[Site<br/>Investigation]
        B2[Initial<br/>Assessment]
        B3[Preliminary<br/>Estimate]
    end
    
    subgraph EE["Executive Engineer"]
        C1[Technical<br/>Review]
        C2[Feasibility<br/>Check]
        C3[Cost<br/>Validation]
        C4[Forward<br/>Proposal]
    end
    
    subgraph DCE["Deputy Chief Engineer"]
        D1[Department<br/>Review]
        D2[Priority<br/>Assessment]
        D3[Budget<br/>Verification]
        D4[Send<br/>Recommendation]
    end
    
    subgraph CE["Chief Engineer"]
        E1[Strategic<br/>Alignment]
        E2[Resource<br/>Planning]
        E3[Final<br/>Review]
        E4[Forward for<br/>Approval]
    end
    
    subgraph Higher["Higher Authorities"]
        F1[Secretary<br/>Review]
        F2[Commissioner<br/>Approval]
        F3[Board<br/>Sanction]
    end
    
    A1 --> B1
    A2 --> B2
    B1 --> B2
    B2 --> B3
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> E4
    E4 --> F1
    F1 --> F2
    F2 --> F3
    
    style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style F3 fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style B1 fill:#fff3e0,stroke:#f57c00
    style B2 fill:#fff3e0,stroke:#f57c00
    style B3 fill:#fff3e0,stroke:#f57c00
    style C1 fill:#fff3e0,stroke:#f57c00
    style C2 fill:#fff3e0,stroke:#f57c00
    style C3 fill:#fff3e0,stroke:#f57c00
    style C4 fill:#fff3e0,stroke:#f57c00
    style D1 fill:#fff3e0,stroke:#f57c00
    style D2 fill:#fff3e0,stroke:#f57c00
    style D3 fill:#fff3e0,stroke:#f57c00
    style D4 fill:#fff3e0,stroke:#f57c00
    style E1 fill:#fff3e0,stroke:#f57c00
    style E2 fill:#fff3e0,stroke:#f57c00
    style E3 fill:#fff3e0,stroke:#f57c00
    style E4 fill:#fff3e0,stroke:#f57c00
```

### Key Documents Generated in Stage 1:
```mermaid
flowchart LR
    A[Stage 1 Documents] --> B[Concept Note]
    A --> C[Preliminary Estimates]
    A --> D[Feasibility Reports]
    A --> E[Site Survey Reports]
    A --> F[Stakeholder Feedback]
    A --> G[Administrative Sanction]
    
    style A fill:#fff3e0
```

---

## Stage 2: Detailed Project Report & Approvals

### Duration: 4-8 months

```mermaid
flowchart TD
    subgraph DPR Preparation
        A[Project Sanctioned] --> B{DPR Preparation Mode}
        B -->|In-house| C[Engineering Wing]
        B -->|Outsourced| D[Consultant Selection]
        
        D --> E[ToR Preparation]
        E --> F[Consultant Tender]
        F --> G[Award to Consultant]
        
        C --> H[Detailed Survey]
        G --> H
    end
    
    subgraph Technical Design
        H --> I[Topographic Survey]
        I --> J[Soil Investigation]
        J --> K[Design Calculations]
        K --> L[Drawing Preparation]
        L --> M[BOQ Preparation]
        M --> N[Cost Estimates]
    end
    
    subgraph Clearances
        N --> O[Environmental Clearance]
        O --> P[CRZ/ULC Clearance]
        P --> Q[Heritage Committee]
        Q --> R[Traffic Police NOC]
        R --> S[Utility Clearances]
        S --> T{All Clear?}
        T -->|No| U[Address Objections]
        T -->|Yes| V[Final DPR]
        U --> O
    end
    
    subgraph Technical Sanction
        V --> W[AE Verification]
        W --> X[EE Recommendation]
        X --> Y[DCE Review]
        Y --> Z{Within Powers?}
        Z -->|Yes| AA[DCE TS]
        Z -->|No| AB[CE Review]
        AB --> AC{Within CE Powers?}
        AC -->|Yes| AD[CE TS]
        AC -->|No| AE[Higher TS]
        
        AA --> AF[TS Issued]
        AD --> AF
        AE --> AF
    end
    
    style A fill:#e8f5e9
    style AF fill:#4caf50
```

### Stage 2 Swimlane Diagram - DPR Preparation & Approval Process:
```mermaid
flowchart LR
    subgraph Consultant["Consultant/Design Team"]
        A1[Conduct<br/>Surveys]
        A2[Prepare<br/>Designs]
        A3[Calculate<br/>BOQ]
        A4[Submit<br/>DPR]
    end
    
    subgraph AE["Assistant Engineer"]
        B1[Field<br/>Verification]
        B2[Technical<br/>Check]
        B3[Cost<br/>Validation]
        B4[Initial<br/>Review]
    end
    
    subgraph EE["Executive Engineer"]
        C1[Design<br/>Review]
        C2[Estimate<br/>Check]
        C3[Clearance<br/>Status]
        C4[Send<br/>Recommendation]
    end
    
    subgraph External["External Agencies"]
        D1[Environmental<br/>Clearance]
        D2[Traffic<br/>NOC]
        D3[Heritage<br/>Committee]
        D4[Utility<br/>Clearances]
    end
    
    subgraph DCE["Deputy Chief Engineer"]
        E1[Technical<br/>Scrutiny]
        E2[Budget<br/>Alignment]
        E3[Approve/<br/>Forward]
    end
    
    subgraph CE["Chief Engineer"]
        F1[Final Technical<br/>Review]
        F2[Cost<br/>Reasonableness]
        F3[TS<br/>Decision]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B4 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> D1
    C3 --> D2
    C3 --> D3
    C3 --> D4
    D1 --> C4
    D2 --> C4
    D3 --> C4
    D4 --> C4
    C4 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> F1
    F1 --> F2
    F2 --> F3
    
    style A1 fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px
    style F3 fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
```

### Approval Matrix for Technical Sanction:
```mermaid
flowchart LR
    subgraph Technical Sanction Limits
        A[AE: ₹10 Lakhs] --> B[EE: ₹2 Crores]
        B --> C[DCE: ₹10 Crores]
        C --> D[CE: ₹50 Crores]
        D --> E[Secretary: ₹100 Crores]
        E --> F[Commissioner: ₹500 Crores]
        F --> G[Board: Above ₹500 Crores]
    end
    
    style D fill:#fff9c4
```

---

## Stage 3: Tendering & Procurement

### Duration: 2-4 months

```mermaid
flowchart TD
    subgraph Tender Preparation
        A[TS Obtained] --> B[Tender Document Draft]
        B --> C[Standard Bid Document]
        C --> D[Special Conditions]
        D --> E[Technical Specifications]
        E --> F[Eligibility Criteria]
        F --> G{Tender Value?}
    end
    
    subgraph Approval Route
        G -->|<1Cr| H[EE Approval]
        G -->|1-5Cr| I[DCE Approval]
        G -->|5-25Cr| J[CE Approval]
        G -->|25-50Cr| K[Secretary Approval]
        G -->|>50Cr| L[Commissioner/Board]
    end
    
    subgraph E-Procurement Process
        H --> M[Upload to Portal]
        I --> M
        J --> M
        K --> M
        L --> M
        
        M --> N[Set Tender Timeline]
        N --> O{Tender Period}
        O -->|<10Cr| P[21 Days]
        O -->|10-50Cr| Q[30 Days]
        O -->|>50Cr| R[45 Days]
    end
    
    subgraph Bidding Process
        P --> S[Pre-bid Meeting]
        Q --> S
        R --> S
        S --> T[Query Resolution]
        T --> U[Corrigendum if needed]
        U --> V[Bid Submission]
        V --> W[Technical Bid Opening]
    end
    
    subgraph Evaluation
        W --> X[Technical Evaluation Committee]
        X --> Y{Qualified Bidders}
        Y -->|<3| Z[Retender]
        Y -->|>=3| AA[Financial Bid Opening]
        AA --> AB[L1 Determination]
        AB --> AC[Reasonableness Check]
        AC --> AD{Within Estimate?}
        AD -->|No >5%| AE[Negotiation]
        AD -->|Yes| AF[Award Recommendation]
        AE --> AG{Agreed?}
        AG -->|Yes| AF
        AG -->|No| AH[L2 Consideration]
    end
    
    style A fill:#fff3e0
    style AF fill:#81c784
```

### Stage 3 Swimlane Diagram - Tendering & Procurement Process:
```mermaid
flowchart LR
    subgraph Procurement["Procurement Cell"]
        A1[Prepare<br/>Tender Docs]
        A2[Upload<br/>E-Portal]
        A3[Pre-bid<br/>Meeting]
        A4[Issue<br/>Corrigendum]
    end
    
    subgraph EE["Executive Engineer"]
        B1[Review<br/>Documents]
        B2[Approve<br/>NIT]
        B3[Chair<br/>Committees]
        B4[Award<br/>Recommendation]
    end
    
    subgraph Bidders["Bidders"]
        C1[Submit<br/>Queries]
        C2[Submit<br/>Tech Bid]
        C3[Submit<br/>Fin Bid]
        C4[Accept<br/>LOA]
    end
    
    subgraph TechComm["Technical Committee"]
        D1[Evaluate<br/>Tech Bids]
        D2[Prepare<br/>Tech Report]
        D3[Qualify<br/>Bidders]
    end
    
    subgraph FinComm["Finance Committee"]
        E1[Open<br/>Financial Bids]
        E2[Prepare<br/>Comparative]
        E3[L1<br/>Identification]
        E4[Reasonableness<br/>Check]
    end
    
    subgraph Authority["DCE/CE"]
        F1[Final<br/>Review]
        F2[Negotiation<br/>Decision]
        F3[Award<br/>Approval]
    end
    
    A1 --> B1
    B1 --> B2
    B2 --> A2
    A2 --> C1
    C1 --> A3
    A3 --> A4
    A4 --> C2
    C2 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> C3
    C3 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> E4
    E4 --> B3
    B3 --> B4
    B4 --> F1
    F1 --> F2
    F2 --> F3
    F3 --> C4
    
    style A1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style F3 fill:#81c784,stroke:#388e3c,stroke-width:2px
```

### Tender Timeline Matrix:
```mermaid
gantt
    title Tender Process Timeline
    dateFormat  YYYY-MM-DD
    section Small Tender (<10Cr)
    Document Prep       :a1, 2024-01-01, 7d
    Approval           :a2, after a1, 3d
    Publication        :a3, after a2, 21d
    Evaluation         :a4, after a3, 7d
    Award              :a5, after a4, 3d
    
    section Medium Tender (10-50Cr)
    Document Prep       :b1, 2024-01-01, 10d
    Approval           :b2, after b1, 5d
    Publication        :b3, after b2, 30d
    Evaluation         :b4, after b3, 10d
    Award              :b5, after b4, 5d
    
    section Large Tender (>50Cr)
    Document Prep       :c1, 2024-01-01, 15d
    Approval           :c2, after c1, 7d
    Publication        :c3, after c2, 45d
    Evaluation         :c4, after c3, 15d
    Award              :c5, after c4, 7d
```

---

## Stage 4: Contract Award & Mobilization

### Duration: 1-2 months

```mermaid
flowchart TD
    subgraph Award Process
        A[L1 Identified] --> B[Award Recommendation]
        B --> C{Approval Level}
        C -->|As per Matrix| D[Competent Authority]
        D --> E[Award Approval]
        E --> F[Letter of Award - LOA]
    end
    
    subgraph Agreement Execution
        F --> G[LOA Acceptance]
        G --> H[Performance Security]
        H --> I{Security Amount}
        I -->|5% Contract| J[Bank Guarantee]
        I -->|Or FDR| K[Fixed Deposit]
        
        J --> L[Agreement Draft]
        K --> L
        L --> M[Stamp Duty Payment]
        M --> N[Agreement Signing]
        N --> O[Work Order Issue]
    end
    
    subgraph Site Mobilization
        O --> P[Site Handover]
        P --> Q[Joint Measurement]
        Q --> R[Site Layout Approval]
        R --> S[Mobilization Advance]
        S --> T{Advance Amount}
        T -->|10% Max| U[Against BG]
        T -->|15% Equipment| V[Equipment Advance]
        
        U --> W[Labour Deployment]
        V --> W
        W --> X[Material Procurement]
        X --> Y[Work Commencement]
    end
    
    subgraph Documentation
        Y --> Z[Commencement Certificate]
        Z --> AA[Site Order Book]
        AA --> AB[Measurement Book]
        AB --> AC[Hindrance Register]
        AC --> AD[Quality Register]
        AD --> AE[Stage Ready]
    end
    
    style F fill:#e3f2fd
    style Y fill:#c8e6c9
    style AE fill:#4caf50
```

### Stage 4 Swimlane Diagram - Contract Award & Mobilization:
```mermaid
flowchart LR
    subgraph EE["Executive Engineer"]
        A1[Issue<br/>LOA]
        A2[Agreement<br/>Execution]
        A3[Work<br/>Order]
        A4[Advance<br/>Processing]
    end
    
    subgraph Contractor["Contractor"]
        B1[Accept<br/>LOA]
        B2[Submit Performance<br/>Security]
        B3[Sign<br/>Agreement]
        B4[Mobilize<br/>Resources]
        B5[Insurance &<br/>Licenses]
    end
    
    subgraph Legal["Legal Section"]
        C1[Agreement<br/>Vetting]
        C2[Clause<br/>Verification]
        C3[Final<br/>Draft]
    end
    
    subgraph Accounts["Accounts Section"]
        D1[Stamp<br/>Duty]
        D2[Security<br/>Verification]
        D3[Advance<br/>Release]
        D4[Register<br/>Entry]
    end
    
    subgraph Site["Site Engineer - AE/JE"]
        E1[Site<br/>Handover]
        E2[Joint<br/>Measurement]
        E3[Layout<br/>Marking]
        E4[Daily<br/>Monitoring]
    end
    
    A1 --> B1
    B1 --> B2
    B2 --> D2
    D2 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> D1
    D1 --> B3
    B3 --> A2
    A2 --> A3
    A3 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> B4
    B4 --> B5
    B5 --> A4
    A4 --> D3
    D3 --> D4
    E3 --> E4
    
    style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D3 fill:#4caf50,stroke:#388e3c,stroke-width:2px
```

### Mobilization Checklist:
```mermaid
flowchart LR
    A[Mobilization Requirements] --> B[Contractor Documents]
    B --> B1[Insurance Policies]
    B --> B2[Labour License]
    B --> B3[Safety Plan]
    B --> B4[Quality Plan]
    
    A --> C[Site Requirements]
    C --> C1[Site Office]
    C --> C2[Store Room]
    C --> C3[Labour Camp]
    C --> C4[Testing Lab]
    
    A --> D[Statutory Compliance]
    D --> D1[Labour Welfare]
    D --> D2[Environmental]
    D --> D3[Safety Norms]
    D --> D4[Local Permits]
    
    style A fill:#e8eaf6
```

---

## Stage 5: Construction/Execution Phase

### Duration: 6-60 months (project dependent)

```mermaid
flowchart TD
    subgraph Execution Management
        A[Work Commencement] --> B[Monthly Planning]
        B --> C[Resource Allocation]
        C --> D[Daily Progress]
        D --> E{On Schedule?}
        E -->|Yes| F[Continue Work]
        E -->|No| G[Catch-up Plan]
        G --> H[Additional Resources]
        H --> F
    end
    
    subgraph Progress Monitoring
        F --> I[Weekly Site Meeting]
        I --> J[Fortnightly EE Review]
        J --> K[Monthly DCE Review]
        K --> L[Quarterly CE Review]
        
        L --> M{Critical Issues?}
        M -->|Yes| N[Special Review]
        M -->|No| O[Regular Monitoring]
        N --> P[Remedial Measures]
        P --> Q[Close Monitoring]
    end
    
    subgraph Payment Process
        O --> R[Work Measurement]
        Q --> R
        R --> S[Joint Measurement]
        S --> T[MB Recording]
        T --> U[Bill Preparation]
        U --> V{Bill Type}
        V -->|RA Bill| W[Running Account]
        V -->|Final Bill| X[Final Settlement]
        
        W --> Y[Technical Check]
        X --> Y
        Y --> Z[Payment Release]
        Z --> AA{Deductions}
        AA --> AB[Security Deposit]
        AA --> AC[Income Tax]
        AA --> AD[GST]
        AA --> AE[Other Statutory]
        
        AB --> AF[Net Payment]
        AC --> AF
        AD --> AF
        AE --> AF
    end
    
    subgraph Variation Management
        AF --> AG{Variations?}
        AG -->|Yes| AH[Change Request]
        AH --> AI{Within 25%?}
        AI -->|Yes| AJ[CE Approval]
        AI -->|No| AK[Higher Approval]
        AJ --> AL[Revised Estimate]
        AK --> AL
        AL --> AM[Continue Work]
    end
    
    style A fill:#e8f5e9
    style Z fill:#4caf50
    style AF fill:#81c784
```

### Stage 5 Swimlane Diagram - Construction/Execution Phase:
```mermaid
flowchart LR
    subgraph Contractor["Contractor Team"]
        A1[Daily Work<br/>Planning]
        A2[Resource<br/>Deployment]
        A3[Work<br/>Execution]
        A4[Bill<br/>Preparation]
        A5[Variation<br/>Requests]
    end
    
    subgraph Site["Site Supervision - AE/JE"]
        B1[Daily<br/>Inspection]
        B2[Work<br/>Measurement]
        B3[MB<br/>Recording]
        B4[Quality<br/>Checks]
        B5[Progress<br/>Photos]
    end
    
    subgraph EE["Executive Engineer"]
        C1[Weekly<br/>Review]
        C2[Bill<br/>Verification]
        C3[Payment<br/>Approval]
        C4[Variation<br/>Review]
        C5[Issue<br/>Resolution]
    end
    
    subgraph Accounts["Accounts Section"]
        D1[Bill<br/>Processing]
        D2[Deduction<br/>Calculation]
        D3[Payment<br/>Release]
        D4[TDS/<br/>GST]
    end
    
    subgraph DCE["Deputy Chief Engineer"]
        E1[Monthly<br/>Review]
        E2[Critical<br/>Decisions]
        E3[Major<br/>Variations]
        E4[Performance<br/>Review]
    end
    
    subgraph CE["Chief Engineer"]
        F1[Quarterly<br/>Review]
        F2[Policy<br/>Decisions]
        F3[Major<br/>Approvals]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B4 --> A4
    A4 --> C2
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> D4
    A5 --> C4
    C4 --> E3
    C5 --> E2
    E1 --> E4
    E4 --> F1
    F1 --> F2
    E3 --> F3
    
    style A1 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style D3 fill:#4caf50,stroke:#388e3c,stroke-width:2px
```

### Stage-wise Execution Tracking:
```mermaid
gantt
    title Construction Phase Milestones
    dateFormat  YYYY-MM-DD
    section Foundation
    Site Clearing       :done, f1, 2024-01-01, 15d
    Excavation         :done, f2, after f1, 30d
    PCC Work           :active, f3, after f2, 15d
    Foundation         :f4, after f3, 45d
    
    section Structure
    Columns           :s1, after f4, 60d
    Beams & Slabs     :s2, after s1, 90d
    Brick Work        :s3, after s2, 60d
    
    section Finishing
    Plastering        :fin1, after s3, 45d
    Flooring          :fin2, after fin1, 30d
    Painting          :fin3, after fin2, 30d
    
    section MEP
    Electrical        :mep1, after s2, 120d
    Plumbing          :mep2, after s2, 120d
    HVAC              :mep3, after s3, 90d
```

---

## Stage 6: Quality Control & Monitoring

### Duration: Continuous throughout execution

```mermaid
flowchart TD
    subgraph Quality Planning
        A[Project Start] --> B[Quality Control Plan]
        B --> C[Testing Schedule]
        C --> D[Inspection Points]
        D --> E[Hold Points]
        E --> F[NCR Procedure]
    end
    
    subgraph Material Testing
        F --> G[Material Receipt]
        G --> H{Test Required?}
        H -->|Yes| I[Sample Collection]
        H -->|No| J[Visual Inspection]
        
        I --> K[Lab Testing]
        K --> L{Test Result}
        L -->|Pass| M[Approval for Use]
        L -->|Fail| N[Rejection]
        N --> O[Replacement]
        O --> G
    end
    
    subgraph Work Quality
        M --> P[Execution Check]
        P --> Q[Stage Inspection]
        Q --> R{Quality OK?}
        R -->|Yes| S[Approval to Proceed]
        R -->|No| T[NCR Issue]
        T --> U[Corrective Action]
        U --> V[Re-inspection]
        V --> R
    end
    
    subgraph Third Party QC
        S --> W{Critical Stage?}
        W -->|Yes| X[Third Party Inspector]
        W -->|No| Y[Internal QC]
        
        X --> Z[Independent Testing]
        Z --> AA{Compliance?}
        AA -->|Yes| AB[Certificate Issue]
        AA -->|No| AC[Rectification]
        AC --> AD[Re-testing]
        AD --> AA
    end
    
    subgraph Documentation
        AB --> AE[Test Certificates]
        Y --> AE
        AE --> AF[Quality Dossier]
        AF --> AG[Monthly QC Report]
        AG --> AH[Dashboard Update]
    end
    
    style A fill:#e3f2fd
    style AB fill:#4caf50
    style N fill:#f44336
```

### Stage 6 Swimlane Diagram - Quality Control Process:
```mermaid
flowchart LR
    subgraph ContractorQC["Contractor QC Team"]
        A1[Material<br/>Testing]
        A2[Internal<br/>Checks]
        A3[Test<br/>Certificates]
        A4[Corrective<br/>Actions]
    end
    
    subgraph Lab["Site Lab"]
        B1[Sample<br/>Collection]
        B2[Field<br/>Testing]
        B3[Test<br/>Results]
        B4[Compliance<br/>Report]
    end
    
    subgraph HMDAQC["HMDA QC Cell"]
        C1[Random<br/>Inspection]
        C2[Stage<br/>Approvals]
        C3[NCR<br/>Issue]
        C4[Verification]
    end
    
    subgraph ThirdParty["Third Party Lab"]
        D1[Independent<br/>Testing]
        D2[Verification<br/>Tests]
        D3[Certification]
    end
    
    subgraph EE["Executive Engineer"]
        E1[Review<br/>Reports]
        E2[Hold Point<br/>Approval]
        E3[Corrective<br/>Orders]
    end
    
    subgraph Docs["Quality Documentation"]
        F1[Test<br/>Register]
        F2[NCR<br/>Register]
        F3[QC<br/>Reports]
        F4[Certificates<br/>File]
    end
    
    A1 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> A3
    A3 --> C1
    C1 --> C2
    C2 --> D1
    D1 --> D2
    D2 --> D3
    B3 --> B4
    B4 --> E1
    C1 --> C3
    C3 --> A4
    A4 --> C4
    C4 --> E2
    E1 --> E3
    A3 --> F1
    C3 --> F2
    E1 --> F3
    D3 --> F4
    
    style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D3 fill:#4caf50,stroke:#388e3c,stroke-width:2px
```

### Quality Control Matrix:
```mermaid
flowchart LR
    subgraph Material Tests
        A[Concrete] --> A1[Cube Test 7/28 days]
        A --> A2[Slump Test]
        B[Steel] --> B1[Tensile Test]
        B --> B2[Bend Test]
        C[Bricks] --> C1[Compression Test]
        C --> C2[Water Absorption]
        D[Soil] --> D1[CBR Test]
        D --> D2[Compaction Test]
    end
    
    subgraph Frequency
        A1 --> F1[Every 50m³]
        A2 --> F2[Every Batch]
        B1 --> F3[Every 40T]
        C1 --> F4[Every 10000]
        D1 --> F5[Every 500m]
    end
    
    style A fill:#e8eaf6
    style B fill:#c5cae9
    style C fill:#9fa8da
    style D fill:#7986cb
```

---

## Stage 7: Testing & Commissioning

### Duration: 1-3 months

```mermaid
flowchart TD
    subgraph Pre-Commissioning
        A[Construction Complete] --> B[Snag List Preparation]
        B --> C[Defect Rectification]
        C --> D{All Clear?}
        D -->|No| C
        D -->|Yes| E[System Cleaning]
        E --> F[Equipment Check]
        F --> G[Safety Audit]
    end
    
    subgraph Testing Phase
        G --> H[Individual Testing]
        H --> I[Water Test]
        H --> J[Electrical Test]
        H --> K[Load Test]
        H --> L[Pressure Test]
        
        I --> M{All Pass?}
        J --> M
        K --> M
        L --> M
        
        M -->|No| N[Rectification]
        M -->|Yes| O[Integrated Testing]
        N --> H
    end
    
    subgraph Commissioning
        O --> P[Trial Run Schedule]
        P --> Q[Dry Run]
        Q --> R{Success?}
        R -->|No| S[Troubleshoot]
        S --> Q
        R -->|Yes| T[Wet Run]
        T --> U[Performance Test]
        U --> V{Meet Specs?}
        V -->|No| W[Adjustment]
        W --> U
        V -->|Yes| X[Continuous Run]
    end
    
    subgraph Documentation
        X --> Y[Test Certificates]
        Y --> Z[O&M Manuals]
        Z --> AA[As-Built Drawings]
        AA --> AB[Warranty Documents]
        AB --> AC[Training Records]
        AC --> AD[Ready for Handover]
    end
    
    style A fill:#fff3e0
    style AD fill:#4caf50
```

### Stage 7 Swimlane Diagram - Testing & Commissioning:
```mermaid
flowchart LR
    subgraph Contractor["Contractor Team"]
        A1[Pre-commissioning<br/>Checks]
        A2[System<br/>Cleaning]
        A3[Trial<br/>Runs]
        A4[Defect<br/>Rectification]
    end
    
    subgraph Testing["Testing Teams"]
        B1[Civil<br/>Testing]
        B2[Electrical<br/>Testing]
        B3[Mechanical<br/>Testing]
        B4[Integration<br/>Testing]
    end
    
    subgraph HMDA["HMDA Engineers"]
        C1[Test<br/>Witnessing]
        C2[Result<br/>Verification]
        C3[Approval/<br/>Rejection]
        C4[Final<br/>Certification]
    end
    
    subgraph Specialist["Specialist Agencies"]
        D1[Fire System<br/>Test]
        D2[Elevator<br/>Inspection]
        D3[Environmental<br/>Test]
        D4[Safety<br/>Audit]
    end
    
    subgraph OMTeam["O&M Team"]
        E1[System<br/>Training]
        E2[Manual<br/>Review]
        E3[Spare Parts<br/>Check]
        E4[Takeover<br/>Preparation]
    end
    
    A1 --> A2
    A2 --> B1
    A2 --> B2
    A2 --> B3
    B1 --> C1
    B2 --> C1
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> A4
    A4 --> A3
    A3 --> B4
    B4 --> D1
    B4 --> D2
    B4 --> D3
    D1 --> D4
    D2 --> D4
    D3 --> D4
    D4 --> C4
    C4 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> E4
    
    style A1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style C4 fill:#4caf50,stroke:#388e3c,stroke-width:2px
```

### Testing Checklist by System:
```mermaid
flowchart LR
    subgraph Civil Tests
        A[Structure] --> A1[Load Test]
        A --> A2[Waterproofing]
        A --> A3[Finishing Quality]
    end
    
    subgraph MEP Tests
        B[Electrical] --> B1[Insulation Test]
        B --> B2[Earth Test]
        B --> B3[Load Test]
        
        C[Plumbing] --> C1[Pressure Test]
        C --> C2[Leak Test]
        C --> C3[Flow Test]
        
        D[HVAC] --> D1[Temperature Test]
        D --> D2[Air Flow Test]
        D --> D3[Noise Level]
    end
    
    subgraph Special Tests
        E[Fire System] --> E1[Pump Test]
        E --> E2[Alarm Test]
        E --> E3[Sprinkler Test]
        
        F[Elevators] --> F1[Load Test]
        F --> F2[Safety Test]
        F --> F3[Speed Test]
    end
    
    style A fill:#e8f5e9
    style B fill:#fff9c4
    style E fill:#ffebee
```

---

## Stage 8: Project Closure & Handover

### Duration: 1-2 months

```mermaid
flowchart TD
    subgraph Completion Process
        A[Testing Complete] --> B[Joint Inspection]
        B --> C{Punch List}
        C -->|Items Found| D[Rectification]
        D --> E[Re-inspection]
        E --> C
        C -->|All Clear| F[Completion Certificate]
    end
    
    subgraph Documentation Handover
        F --> G[Document Compilation]
        G --> H[Technical Documents]
        H --> H1[As-built Drawings]
        H --> H2[Test Certificates]
        H --> H3[Warranties]
        H --> H4[O&M Manuals]
        
        G --> I[Financial Documents]
        I --> I1[Final Bill]
        I --> I2[Variation Statements]
        I --> I3[Material Reconciliation]
        I --> I4[Final Accounts]
    end
    
    subgraph Asset Transfer
        H4 --> J[Physical Handover]
        J --> K[Asset Register Entry]
        K --> L[Insurance Transfer]
        L --> M[Utility Connections]
        M --> N[Security Arrangements]
        N --> O[Maintenance Contract]
    end
    
    subgraph Stakeholder Handover
        O --> P{End User Type}
        P -->|Department| Q[Department Handover]
        P -->|Public Asset| R[Public Inauguration]
        P -->|Utility| S[Utility Agency]
        
        Q --> T[Training Program]
        R --> T
        S --> T
        T --> U[Handover Protocol]
        U --> V[Acceptance Certificate]
    end
    
    subgraph Financial Closure
        V --> W[Final Measurement]
        W --> X[Final Bill Process]
        X --> Y[Retention Release]
        Y --> Z[Performance BG Return]
        Z --> AA[Project Closed]
    end
    
    style A fill:#e3f2fd
    style F fill:#c8e6c9
    style V fill:#4caf50
    style AA fill:#2e7d32
```

### Stage 8 Swimlane Diagram - Project Closure & Handover:
```mermaid
flowchart LR
    subgraph Site["Site Team - AE/JE"]
        A1[Joint<br/>Inspection]
        A2[Snag List<br/>Prep]
        A3[Final<br/>Measurements]
        A4[Verify<br/>Completion]
    end
    
    subgraph Contractor["Contractor"]
        B1[Complete<br/>Punch List]
        B2[Submit<br/>Final Docs]
        B3[Final Bill<br/>Submission]
        B4[Training<br/>Delivery]
    end
    
    subgraph EE["Executive Engineer"]
        C1[Technical<br/>Verification]
        C2[Document<br/>Review]
        C3[Completion<br/>Certificate]
        C4[Final Bill<br/>Check]
    end
    
    subgraph EndUser["End User Department"]
        D1[Physical<br/>Inspection]
        D2[Training<br/>Receipt]
        D3[Asset<br/>Takeover]
        D4[Acceptance<br/>Sign-off]
    end
    
    subgraph Finance["Finance/Accounts"]
        E1[Final Account<br/>Prep]
        E2[Retention<br/>Calculation]
        E3[Security<br/>Release]
        E4[Asset<br/>Register]
    end
    
    subgraph CEOffice["Chief Engineer Office"]
        F1[Final<br/>Review]
        F2[Handover<br/>Approval]
        F3[Closure<br/>Order]
    end
    
    A1 --> A2
    A2 --> B1
    B1 --> A4
    A4 --> C1
    B2 --> C2
    C1 --> C3
    C2 --> C3
    B3 --> A3
    A3 --> C4
    C4 --> E1
    E1 --> E2
    C3 --> D1
    D1 --> B4
    B4 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> F1
    E2 --> F2
    F1 --> F2
    F2 --> F3
    F3 --> E3
    E3 --> E4
    
    style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style F3 fill:#4caf50,stroke:#388e3c,stroke-width:2px
    style E4 fill:#2e7d32,stroke:#1b5e20,stroke-width:2px
```

### Handover Documentation Checklist:
```mermaid
flowchart LR
    A[Handover Package] --> B[Technical Docs]
    B --> B1[As-built Drawings]
    B --> B2[Structural Drawings]
    B --> B3[MEP Drawings]
    B --> B4[Specifications]
    
    A --> C[Quality Docs]
    C --> C1[Test Certificates]
    C --> C2[Material Certs]
    C --> C3[Warranties]
    C --> C4[Guarantees]
    
    A --> D[O&M Docs]
    D --> D1[Operation Manual]
    D --> D2[Maintenance Schedule]
    D --> D3[Spare Parts List]
    D --> D4[Vendor Contacts]
    
    A --> E[Financial Docs]
    E --> E1[Final Account]
    E --> E2[Asset Value]
    E --> E3[Insurance Docs]
    E --> E4[AMC Details]
    
    style A fill:#e8eaf6
```

---

## Stage 9: Defect Liability & O&M Phase

### Duration: 12-60 months (as per contract)

```mermaid
flowchart TD
    subgraph Defect Liability Period
        A[Project Handover] --> B[DLP Starts]
        B --> C[Monthly Inspection]
        C --> D{Defects Found?}
        D -->|Yes| E[Defect Notice]
        D -->|No| F[Good Performance]
        
        E --> G[Contractor Intimation]
        G --> H{Response Time}
        H -->|Emergency| I[24 Hours]
        H -->|Urgent| J[7 Days]
        H -->|Routine| K[15 Days]
        
        I --> L[Rectification]
        J --> L
        K --> L
        L --> M[Verification]
        M --> N{Satisfactory?}
        N -->|No| O[Re-work]
        N -->|Yes| P[Close Defect]
        O --> L
    end
    
    subgraph Performance Monitoring
        F --> Q[Quarterly Review]
        P --> Q
        Q --> R[Performance Report]
        R --> S{DLP Status}
        S -->|6 Months| T[50% Security Release]
        S -->|12 Months| U[Full Security Release]
        S -->|Extended DLP| V[Partial Release]
    end
    
    subgraph O&M Transition
        U --> W[O&M Contract]
        W --> X{O&M Mode}
        X -->|In-house| Y[Department Team]
        X -->|Outsourced| Z[O&M Tender]
        X -->|Original Contractor| AA[Extended Contract]
        
        Y --> AB[O&M Manual]
        Z --> AB
        AA --> AB
        AB --> AC[Preventive Schedule]
        AC --> AD[Breakdown Protocol]
        AD --> AE[Performance KPIs]
    end
    
    subgraph Long-term Monitoring
        AE --> AF[Monthly Reports]
        AF --> AG[Annual Inspection]
        AG --> AH[Major Maintenance]
        AH --> AI[Budget Planning]
        AI --> AJ[Asset Life Management]
    end
    
    style A fill:#e3f2fd
    style U fill:#4caf50
    style AJ fill:#2e7d32
```

### Stage 9 Swimlane Diagram - DLP & O&M Phase:
```mermaid
flowchart LR
    subgraph EndUser["End User/Department"]
        A1[Defect<br/>Reporting]
        A2[Service<br/>Requests]
        A3[Feedback]
        A4[Annual<br/>Review]
    end
    
    subgraph HMDATeam["HMDA Maintenance Team"]
        B1[Defect<br/>Identification]
        B2[Notice<br/>Issue]
        B3[Work<br/>Verification]
        B4[Performance<br/>Review]
    end
    
    subgraph ContractorDLP["Contractor - DLP"]
        C1[Monthly<br/>Inspection]
        C2[Defect<br/>Rectification]
        C3[Emergency<br/>Response]
        C4[DLP Completion<br/>Report]
    end
    
    subgraph OMContractor["O&M Contractor"]
        D1[Preventive<br/>Maintenance]
        D2[Breakdown<br/>Service]
        D3[Spare Parts<br/>Mgmt]
        D4[Monthly<br/>Reports]
    end
    
    subgraph EE["Executive Engineer"]
        E1[DLP<br/>Monitoring]
        E2[Security Release<br/>Recommendation]
        E3[O&M Contract<br/>Mgmt]
        E4[Performance<br/>Evaluation]
    end
    
    subgraph Finance["Finance Section"]
        F1[Security<br/>Management]
        F2[50% Release<br/>6 months]
        F3[Full Release<br/>12 months]
        F4[O&M<br/>Payments]
    end
    
    A1 --> B1
    B1 --> B2
    B2 --> C1
    C1 --> C2
    C2 --> B3
    B3 --> B4
    C3 --> B3
    B4 --> E1
    E1 --> E2
    E2 --> F1
    F1 --> F2
    F2 --> F3
    C4 --> E2
    E3 --> D1
    D1 --> D4
    A2 --> D2
    D2 --> D3
    D4 --> E4
    A3 --> A4
    A4 --> E4
    E4 --> F4
    
    style A1 fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    style F3 fill:#4caf50,stroke:#388e3c,stroke-width:2px
    style D1 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
```

### DLP & O&M Timeline:
```mermaid
gantt
    title Defect Liability & O&M Period
    dateFormat  YYYY-MM-DD
    section DLP Phase
    Initial Period      :done, dlp1, 2024-01-01, 180d
    50% Security Release:milestone, after dlp1
    Extended Period     :active, dlp2, after dlp1, 180d
    Full Security Release:milestone, after dlp2
    
    section O&M Phase
    Transition Period   :om1, after dlp2, 30d
    Year 1 O&M         :om2, after om1, 335d
    Year 2 O&M         :om3, after om2, 365d
    Year 3 O&M         :om4, after om3, 365d
    Major Maintenance   :om5, after om4, 60d
    
    section Reviews
    Quarterly Review 1  :milestone, 2024-03-31
    Quarterly Review 2  :milestone, 2024-06-30
    Annual Review      :milestone, 2024-12-31
```

---

## Integrated 9-Stage Overview

```mermaid
flowchart LR
    subgraph Project Lifecycle
        A[Stage 1<br/>Conceptualization<br/>3-6 months] --> B[Stage 2<br/>DPR & Approvals<br/>4-8 months]
        B --> C[Stage 3<br/>Tendering<br/>2-4 months]
        C --> D[Stage 4<br/>Award & Mobilization<br/>1-2 months]
        D --> E[Stage 5<br/>Construction<br/>6-60 months]
        E --> F[Stage 6<br/>Quality Control<br/>Continuous]
        E --> G[Stage 7<br/>Testing<br/>1-3 months]
        G --> H[Stage 8<br/>Handover<br/>1-2 months]
        H --> I[Stage 9<br/>DLP & O&M<br/>12-60 months]
    end
    
    style A fill:#e3f2fd
    style E fill:#fff3e0
    style F fill:#ffebee
    style I fill:#e8f5e9
```

---

## Key Success Metrics Across 9 Stages

```mermaid
flowchart TD
    subgraph Stage Metrics
        A[Conceptualization] --> A1[Need Assessment Accuracy]
        B[DPR] --> B1[Design Completeness]
        C[Tendering] --> C1[Competitive Bidding]
        D[Award] --> D1[Mobilization Speed]
        E[Construction] --> E1[Schedule Adherence]
        F[Quality] --> F1[First-time Pass Rate]
        G[Testing] --> G1[System Performance]
        H[Handover] --> H1[Snag-free Completion]
        I[O&M] --> I1[Asset Reliability]
    end
    
    subgraph KPIs
        A1 --> K1[>90% Stakeholder Agreement]
        B1 --> K2[<5% Design Changes]
        C1 --> K3[>3 Qualified Bidders]
        D1 --> K4[<30 Days Mobilization]
        E1 --> K5[>85% On-time Delivery]
        F1 --> K6[>95% Quality Pass]
        G1 --> K7[100% Performance Specs]
        H1 --> K8[<10 Snag Items]
        I1 --> K9[>98% Uptime]
    end
    
    style K5 fill:#4caf50
    style K7 fill:#2e7d32
    style K9 fill:#1b5e20
```

---

## Document Control & Tracking

This comprehensive 9-stage documentation demonstrates:

1. **Complete Lifecycle Understanding**: From concept to long-term O&M
2. **Detailed Process Knowledge**: Every approval, test, and milestone
3. **Timeline Awareness**: Realistic durations for each stage
4. **Quality Integration**: Embedded at every stage, not just Stage 6
5. **Financial Control**: Payment milestones and security management
6. **Risk Management**: Hold points and verification gates
7. **Stakeholder Management**: Clear roles and responsibilities
8. **Documentation Rigor**: Complete audit trail maintenance
9. **Performance Tracking**: KPIs for continuous improvement

---

*Prepared for HMDA Chief Engineer B. Ravinder to demonstrate comprehensive project lifecycle expertise*