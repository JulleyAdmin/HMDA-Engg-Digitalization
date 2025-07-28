# Stage 3 Form Reconciliation Plan - HMDA Feedback

## Executive Summary
This document outlines the changes needed for Stage 3 (Tendering Process) form based on HMDA feedback. The focus is on simplifying the form by removing unnecessary sections and adding specific awardee details.

## Feedback Analysis & Implementation Plan

### 1. Sections to Remove

#### Remove Completely:
- **Tender Process Timeline & Status** section
- **Bidder Analysis & Evaluation Results** section
- **Evaluation Committee & Process** section
- **Tender Documents & Reports** section

### 2. Tender Information Section Updates

#### Changes Required:
- **CHANGE** "Tender Value" to "Estimated Contract Value (ECV)"
- **UPDATE** EMD information:
  - EMD is 1% of ECV
  - Security Deposit is 2.5% (at agreement time)
- **REMOVE** any savings account related fields

#### Implementation:
```html
<div class="field">
    <label class="field-label" for="ecv">
        Estimated Contract Value (ECV) (₹ Lakhs) <span class="required">*</span>
    </label>
    <div class="input-group">
        <span class="input-prefix">₹</span>
        <input type="number" id="ecv" class="field-input" 
               step="0.01" placeholder="0.00"
               onchange="calculateEMD()">
    </div>
    <div class="field-help">Estimated contract value in lakhs</div>
</div>

<div class="field">
    <label class="field-label" for="emd">
        Earnest Money Deposit (EMD) (₹ Lakhs)
    </label>
    <div class="input-group">
        <span class="input-prefix">₹</span>
        <input type="number" id="emd" class="field-input calculated-field" 
               readonly>
    </div>
    <div class="field-help">Auto-calculated: 1% of ECV</div>
</div>

<div class="field">
    <label class="field-label" for="securityDeposit">
        Security Deposit (₹ Lakhs)
    </label>
    <div class="input-group">
        <span class="input-prefix">₹</span>
        <input type="number" id="securityDeposit" class="field-input calculated-field" 
               readonly>
    </div>
    <div class="field-help">Auto-calculated: 2.5% of ECV (required at agreement time)</div>
</div>
```

### 3. Replace Award Recommendations with Awardee Details

#### Remove:
- Award Recommendations section

#### Add: Awardee Details Section
Required fields:
- Company Details
- Director Name
- Contact Information
- Address
- Quoted Amount
- % Variance from ECV
- Performance Security Required

#### Implementation:
```html
<div class="form-group">
    <h3 class="form-group-title">
        <span class="form-group-icon">🏢</span>
        Awardee Details
    </h3>
    
    <!-- Company Information -->
    <div class="field">
        <label class="field-label" for="companyName">
            Company Name <span class="required">*</span>
        </label>
        <input type="text" id="companyName" class="field-input" 
               placeholder="Enter company/contractor name">
    </div>
    
    <div class="field">
        <label class="field-label" for="companyRegistration">
            Company Registration Number
        </label>
        <input type="text" id="companyRegistration" class="field-input" 
               placeholder="Enter registration number">
    </div>
    
    <!-- Director Information -->
    <div class="field">
        <label class="field-label" for="directorName">
            Director Name <span class="required">*</span>
        </label>
        <input type="text" id="directorName" class="field-input" 
               placeholder="Enter director/proprietor name">
    </div>
    
    <div class="field">
        <label class="field-label" for="directorContact">
            Director Contact <span class="required">*</span>
        </label>
        <input type="text" id="directorContact" class="field-input" 
               placeholder="Mobile number">
    </div>
    
    <div class="field">
        <label class="field-label" for="companyAddress">
            Company Address <span class="required">*</span>
        </label>
        <textarea id="companyAddress" class="field-input" 
                  placeholder="Enter complete address" rows="3"></textarea>
    </div>
    
    <!-- Financial Details -->
    <div class="field">
        <label class="field-label" for="quotedAmount">
            Quoted Amount (₹ Lakhs) <span class="required">*</span>
        </label>
        <div class="input-group">
            <span class="input-prefix">₹</span>
            <input type="number" id="quotedAmount" class="field-input" 
                   step="0.01" placeholder="0.00"
                   onchange="calculateVariance()">
        </div>
    </div>
    
    <div class="field">
        <label class="field-label" for="variancePercentage">
            % Variance from ECV
        </label>
        <div class="input-group">
            <input type="number" id="variancePercentage" 
                   class="field-input calculated-field" readonly>
            <span class="input-suffix">%</span>
        </div>
        <div class="field-help">Auto-calculated: (Quoted - ECV) / ECV × 100</div>
    </div>
    
    <div class="field">
        <label class="field-label" for="performanceSecurity">
            Performance Security Required (₹ Lakhs)
        </label>
        <div class="input-group">
            <span class="input-prefix">₹</span>
            <input type="number" id="performanceSecurity" 
                   class="field-input calculated-field" readonly>
        </div>
        <div class="field-help">Auto-calculated: 5% of quoted amount</div>
    </div>
</div>
```

## JavaScript Functions Needed

```javascript
function calculateEMD() {
    const ecv = parseFloat(document.getElementById('ecv').value) || 0;
    const emd = ecv * 0.01; // 1% of ECV
    const securityDeposit = ecv * 0.025; // 2.5% of ECV
    
    document.getElementById('emd').value = emd.toFixed(2);
    document.getElementById('securityDeposit').value = securityDeposit.toFixed(2);
}

function calculateVariance() {
    const ecv = parseFloat(document.getElementById('ecv').value) || 0;
    const quotedAmount = parseFloat(document.getElementById('quotedAmount').value) || 0;
    
    if (ecv > 0) {
        const variance = ((quotedAmount - ecv) / ecv) * 100;
        document.getElementById('variancePercentage').value = variance.toFixed(2);
    }
    
    // Calculate performance security (5% of quoted amount)
    const performanceSecurity = quotedAmount * 0.05;
    document.getElementById('performanceSecurity').value = performanceSecurity.toFixed(2);
}
```

## Summary of Changes

### Keep/Modify:
1. **Basic Tender Information** - Update with ECV terminology
2. **Tender Details** - Keep essential fields
3. **Awardee Details** - New section replacing Award Recommendations

### Remove:
1. Tender Process Timeline & Status
2. Bidder Analysis & Evaluation Results
3. Evaluation Committee & Process
4. Tender Documents & Reports
5. Award Recommendations (replaced with Awardee Details)

### Add:
1. Company details fields
2. Director information fields
3. Financial variance calculations
4. Performance security calculations

## Implementation Steps
1. Remove unwanted sections
2. Update Tender Value to ECV
3. Add EMD and Security Deposit calculations
4. Replace Award Recommendations with Awardee Details
5. Add calculation functions
6. Test form functionality