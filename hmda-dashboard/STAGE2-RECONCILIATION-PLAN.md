# Stage 2 Form Reconciliation Plan - HMDA Feedback

## Executive Summary
This document outlines the changes needed for Stage 2 (DPR Preparation & Approvals) form based on HMDA feedback. The focus is on simplifying the form, removing unnecessary technical details, and adding consultant management fields.

## Feedback Analysis & Implementation Plan

### 1. DPR Preparation Strategy Section

#### Changes Required:
- **SIMPLIFY** DPR preparation options to only:
  - In-house
  - External Consultant
- **ADD** consultant details section (shown only when "External" is selected):
  - Consultant Name (manual entry)
  - Consultant Firm (manual entry)
  - Contact Details (manual entry)
  - Experience/Expertise (manual entry)
- **KEEP** Consultant Selection Method (as mentioned "is fine")
- **KEEP** DPR Development Cost (estimation)

#### Implementation:
```html
<div class="field">
    <label class="field-label" for="dprStrategy">
        DPR Preparation Strategy <span class="required">*</span>
    </label>
    <select id="dprStrategy" class="field-input" onchange="toggleConsultantDetails()">
        <option value="">Select Strategy</option>
        <option value="inhouse">In-house</option>
        <option value="external">External Consultant</option>
    </select>
</div>

<!-- Consultant Details (shown only for External) -->
<div id="consultantDetailsSection" style="display:none;">
    <div class="field">
        <label class="field-label" for="consultantName">
            Consultant Name <span class="required">*</span>
        </label>
        <input type="text" id="consultantName" class="field-input" 
               placeholder="Enter consultant name">
    </div>
    
    <div class="field">
        <label class="field-label" for="consultantFirm">
            Consultant Firm <span class="required">*</span>
        </label>
        <input type="text" id="consultantFirm" class="field-input" 
               placeholder="Enter consulting firm name">
    </div>
    
    <div class="field">
        <label class="field-label" for="consultantContact">
            Contact Details
        </label>
        <textarea id="consultantContact" class="field-input" 
                  placeholder="Phone, email, address"></textarea>
    </div>
</div>
```

### 2. Work Order/Agreement Details (NEW)

#### Requirements:
- Add work order/agreement details section for consultants
- Include agreement number, date, and document upload

#### Implementation:
```html
<div class="form-group" id="agreementSection" style="display:none;">
    <h3 class="form-group-title">
        <span class="form-group-icon">📄</span>
        Work Order/Agreement Details
    </h3>
    
    <div class="field">
        <label class="field-label" for="agreementNumber">
            Agreement Number <span class="required">*</span>
        </label>
        <input type="text" id="agreementNumber" class="field-input" 
               placeholder="Enter agreement/work order number">
    </div>
    
    <div class="field">
        <label class="field-label" for="agreementDate">
            Agreement Date <span class="required">*</span>
        </label>
        <input type="date" id="agreementDate" class="field-input">
    </div>
    
    <div class="field">
        <label class="field-label" for="agreementUpload">
            Upload Agreement Document
        </label>
        <input type="file" id="agreementUpload" class="field-input" 
               accept=".pdf,.doc,.docx">
        <div class="field-help">Upload signed agreement (PDF/DOC format)</div>
    </div>
</div>
```

### 3. Sections to Remove

#### Remove Completely:
- **Technical Specifications & Design Standards** section
- **Site Investigations & Studies** section
- **Clearances and NOC Management** section
- **Detailed Cost Estimates** section
- **Document Management** section

### 4. Replace Technical Sanction with Administrative Sanction

#### Changes Required:
- **REMOVE** "Technical Sanction" section
- **ADD** "Administrative Sanction Process" section with:
  - Sanction Amount (manual entry)
  - Sanction Authority (dropdown: MC or Govt)
  - Sanction Date
  - Sanction Reference Number

#### Implementation:
```html
<div class="form-group">
    <h3 class="form-group-title">
        <span class="form-group-icon">✅</span>
        Administrative Sanction Process
    </h3>
    
    <div class="field">
        <label class="field-label" for="sanctionAmount">
            Sanction Amount (₹ Lakhs) <span class="required">*</span>
        </label>
        <div class="input-group">
            <span class="input-prefix">₹</span>
            <input type="number" id="sanctionAmount" class="field-input" 
                   step="0.01" placeholder="0.00">
        </div>
    </div>
    
    <div class="field">
        <label class="field-label" for="sanctionAuthority">
            Sanction Authority <span class="required">*</span>
        </label>
        <select id="sanctionAuthority" class="field-input">
            <option value="">Select Authority</option>
            <option value="mc">MC (Commissioner)</option>
            <option value="govt">Government</option>
        </select>
    </div>
    
    <div class="field">
        <label class="field-label" for="sanctionDate">
            Sanction Date
        </label>
        <input type="date" id="sanctionDate" class="field-input">
    </div>
    
    <div class="field">
        <label class="field-label" for="sanctionReference">
            Sanction Reference Number
        </label>
        <input type="text" id="sanctionReference" class="field-input" 
               placeholder="Enter reference number">
    </div>
</div>
```

## Summary of Changes

### Sections to Keep/Modify:
1. **Basic DPR Information** - Keep with minor updates
2. **DPR Preparation Strategy** - Simplify to 2 options
3. **Consultant Selection Method** - Keep as is
4. **DPR Development Cost** - Keep as is
5. **DPR Timeline** - Keep if present

### Sections to Add:
1. **Consultant Details** (conditional - only for external)
2. **Work Order/Agreement Details** (conditional - only for external)
3. **Administrative Sanction Process** (replaces Technical Sanction)

### Sections to Remove:
1. Technical Specifications & Design Standards
2. Site Investigations & Studies
3. Clearances and NOC Management
4. Detailed Cost Estimates
5. Document Management
6. Technical Sanction Details

## Implementation Steps

1. **Backup current Stage 2 form**
2. **Remove unwanted sections**
3. **Simplify DPR strategy dropdown**
4. **Add consultant details fields**
5. **Add agreement/work order section**
6. **Replace technical sanction with administrative sanction**
7. **Update JavaScript for conditional field display**
8. **Test form functionality**
9. **Verify feedback system still works**

## JavaScript Functions Needed

```javascript
function toggleConsultantDetails() {
    const strategy = document.getElementById('dprStrategy').value;
    const consultantSection = document.getElementById('consultantDetailsSection');
    const agreementSection = document.getElementById('agreementSection');
    
    if (strategy === 'external') {
        consultantSection.style.display = 'block';
        agreementSection.style.display = 'block';
    } else {
        consultantSection.style.display = 'none';
        agreementSection.style.display = 'none';
    }
}
```

## Data Consistency Notes

- Ensure Work ID from Stage 1 is carried forward
- File Number should be referenced
- Administrative sanction details will be important for Stage 3 (Tendering)