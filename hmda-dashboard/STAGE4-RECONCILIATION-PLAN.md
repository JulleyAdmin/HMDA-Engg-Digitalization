# Stage 4 Form Reconciliation Plan - HMDA Feedback

## Executive Summary
This document outlines the changes needed for Stage 4 (Contract Agreement) form based on HMDA feedback. The focus is on simplifying the form by removing multiple sections and adding document upload capability.

## Feedback Analysis & Implementation Plan

### 1. Contract Terms Section Updates

#### Remove from Contract Terms:
- **Liquidated Damages** field/section
- **Early Completion Bonus** field/section

### 2. Sections to Remove Completely

#### Remove these entire sections:
- **Work Order Details** section
- **Insurance & Indemnity** section
- **Statutory and Technical Compliance** section
- **Project Team & Key Personnel** section
- **Communication Protocol** section
- **Risk Management & Mitigation** section
- **Final Contract Award Checklist** section

### 3. Add Document Upload Section

#### New Section: Reference Documents
Add capability to upload:
- Drawings (PDF, DWG, JPG formats)
- Other reference documents
- Multiple file upload support
- File list with view/download/remove options

#### Implementation:
```html
<div class="form-group">
    <h3 class="form-group-title">
        <span class="form-group-icon">📎</span>
        Reference Documents
    </h3>
    
    <div class="field">
        <label class="field-label" for="referenceDocuments">
            Upload Drawings & Other Documents
        </label>
        <input 
            type="file" 
            id="referenceDocuments" 
            class="field-input" 
            multiple
            accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx"
            onchange="handleReferenceUpload(this)"
        >
        <div class="field-help">Upload drawings, specifications, or other reference documents (PDF, DWG, JPG, DOC formats)</div>
    </div>
    
    <div id="referenceDocList" class="document-list">
        <!-- Uploaded documents will appear here -->
    </div>
</div>
```

## Summary of Changes

### Keep/Modify:
1. **Basic Contract Information**
2. **Contract Value Details** 
3. **Contract Terms** (without LD and bonus sections)
4. **Performance Security Details**
5. **Contract Timeline**

### Remove:
1. Liquidated Damages (from Contract Terms)
2. Early Completion Bonus (from Contract Terms)
3. Work Order Details section
4. Insurance & Indemnity section
5. Statutory and Technical Compliance section
6. Project Team & Key Personnel section
7. Communication Protocol section
8. Risk Management & Mitigation section
9. Final Contract Award Checklist section

### Add:
1. Reference Documents upload section

## JavaScript Functions Needed

```javascript
let referenceDocCount = 0;

function handleReferenceUpload(input) {
    const files = input.files;
    const docList = document.getElementById('referenceDocList');
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const docItem = createReferenceDocItem(file, referenceDocCount);
        docList.appendChild(docItem);
        referenceDocCount++;
    }
    
    // Clear input for next selection
    input.value = '';
}

function createReferenceDocItem(file, index) {
    const docDiv = document.createElement('div');
    docDiv.className = 'document-item';
    docDiv.id = `refDoc-${index}`;
    
    const icon = getFileIcon(file.name);
    const size = (file.size / 1024).toFixed(2) + ' KB';
    
    docDiv.innerHTML = `
        <div class="doc-info">
            <span class="doc-icon">${icon}</span>
            <div class="doc-details">
                <div class="doc-name">${file.name}</div>
                <div class="doc-meta">Size: ${size} | Uploaded: ${new Date().toLocaleDateString()}</div>
            </div>
        </div>
        <div class="doc-actions">
            <button type="button" class="btn-icon" onclick="viewDocument('${file.name}')" title="View">
                <span>👁️</span>
            </button>
            <button type="button" class="btn-icon" onclick="removeReferenceDoc(${index})" title="Remove">
                <span>🗑️</span>
            </button>
        </div>
    `;
    
    return docDiv;
}

function removeReferenceDoc(index) {
    if (confirm('Remove this document?')) {
        document.getElementById(`refDoc-${index}`).remove();
    }
}
```

## Implementation Steps
1. Backup current Stage 4 form
2. Remove LD and bonus fields from Contract Terms
3. Hide/remove all specified sections
4. Add Reference Documents upload section
5. Add JavaScript for file handling
6. Test form functionality
7. Verify feedback system still works

## Impact on Workflow
- Simplified contract process
- Focus on essential contract details
- Better document management with reference uploads
- Reduced complexity for users

## Next Steps
1. Implement changes in stage4-contract-agreement.html
2. Test document upload functionality
3. Update any references in subsequent stages
4. Create user guide for new document upload feature