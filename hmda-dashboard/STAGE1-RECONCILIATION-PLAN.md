# Stage 1 Form Reconciliation Plan - HMDA Feedback

## Executive Summary
This document outlines the reconciliation plan for Stage 1 (Project Conceptualization) form based on feedback received from HMDA. The changes focus on simplifying the form, removing unnecessary fields, and adding critical administrative identifiers.

## Feedback Analysis & Implementation Plan

### 1. Basic Project Information Section

#### Changes Required:
- **REPLACE** Project Code with:
  - Work ID (new field)
  - File Number (new field)
- **REMOVE** fields:
  - Project Type
  - Priority Level  
  - Proposed Date
  - Expected Start Date
- **ADD** new field:
  - Product Category (dropdown/select)
- **MODIFY** Funding Details:
  - Change from dropdown to manual text entry
  - Allow free-form funding source description

#### Implementation:
```html
<!-- Replace existing Project Code with -->
<div class="field">
    <label class="field-label" for="workId">
        Work ID <span class="required">*</span>
    </label>
    <input type="text" id="workId" class="field-input" 
           placeholder="Enter Work ID (e.g., HMDA/WRK/2025/001)">
</div>

<div class="field">
    <label class="field-label" for="fileNumber">
        File Number <span class="required">*</span>
    </label>
    <input type="text" id="fileNumber" class="field-input" 
           placeholder="Enter File Number">
</div>

<div class="field">
    <label class="field-label" for="productCategory">
        Product Category <span class="required">*</span>
    </label>
    <select id="productCategory" class="field-input">
        <option value="">Select Product Category</option>
        <option value="roads">Roads & Highways</option>
        <option value="drainage">Storm Water Drainage</option>
        <option value="water_supply">Water Supply</option>
        <option value="sewerage">Sewerage System</option>
        <option value="parks">Parks & Open Spaces</option>
        <option value="buildings">Buildings & Infrastructure</option>
        <option value="other">Other</option>
    </select>
</div>
```

### 2. Location & Scope Details Section

#### Changes Required:
- **ADD** new fields:
  - Assembly Constituency (dropdown)
  - Parliament Constituency (dropdown)
- **REMOVE** fields:
  - Survey Numbers
  - Land Type
- **MODIFY** Project Area:
  - Change to manual text entry
  - Format: "X hectares Y guntas"
  - Single text field instead of separate numeric fields

#### Implementation:
```html
<!-- Add after Mandal field -->
<div class="field">
    <label class="field-label" for="assemblyConstituency">
        Assembly Constituency <span class="required">*</span>
    </label>
    <select id="assemblyConstituency" class="field-input">
        <option value="">Select Assembly Constituency</option>
        <option value="serilingampally">Serilingampally</option>
        <option value="kukatpally">Kukatpally</option>
        <option value="quthbullapur">Quthbullapur</option>
        <option value="medchal">Medchal</option>
        <option value="malkajgiri">Malkajgiri</option>
        <!-- Add more constituencies -->
    </select>
</div>

<div class="field">
    <label class="field-label" for="parliamentConstituency">
        Parliament Constituency <span class="required">*</span>
    </label>
    <select id="parliamentConstituency" class="field-input">
        <option value="">Select Parliament Constituency</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="secunderabad">Secunderabad</option>
        <option value="malkajgiri">Malkajgiri</option>
        <option value="chevella">Chevella</option>
        <!-- Add more constituencies -->
    </select>
</div>

<!-- Replace existing project area fields with -->
<div class="field">
    <label class="field-label" for="projectArea">
        Project Area <span class="required">*</span>
    </label>
    <input type="text" id="projectArea" class="field-input" 
           placeholder="Enter area (e.g., 5 hectares 20 guntas)">
    <div class="field-help">
        Enter project area in format: X hectares Y guntas
    </div>
</div>
```

### 3. Project Components Section (NEW)

#### Requirements:
- Add dynamic component list functionality
- Allow adding multiple major components
- Include pre-defined list and manual entry option
- Add/Remove functionality with + icon

#### Implementation:
```html
<!-- New section after Location & Scope -->
<div class="form-group">
    <h3 class="form-group-title">
        <span class="form-group-icon">🔧</span>
        Major Project Components
    </h3>
    
    <div id="projectComponentsContainer">
        <!-- Dynamic components will be added here -->
    </div>
    
    <button type="button" class="add-component-btn" onclick="addProjectComponent()">
        <span class="plus-icon">+</span> Add Component
    </button>
</div>

<script>
function addProjectComponent() {
    const container = document.getElementById('projectComponentsContainer');
    const componentDiv = document.createElement('div');
    componentDiv.className = 'component-item';
    componentDiv.innerHTML = `
        <div class="component-row">
            <select class="component-select">
                <option value="">Select Component</option>
                <option value="road_construction">Road Construction</option>
                <option value="bridge_culvert">Bridge/Culvert</option>
                <option value="drainage_system">Drainage System</option>
                <option value="retaining_wall">Retaining Wall</option>
                <option value="streetlighting">Street Lighting</option>
                <option value="footpath">Footpath/Sidewalk</option>
                <option value="other">Other (Manual Entry)</option>
            </select>
            <input type="text" class="component-manual" placeholder="Enter component details" style="display:none;">
            <button type="button" class="remove-btn" onclick="removeComponent(this)">×</button>
        </div>
    `;
    container.appendChild(componentDiv);
}
</script>
```

### 4. Financial Estimates Section

#### Changes Required:
- **SIMPLIFY** to only include:
  - Preliminary Estimate (keep existing)
  - Remove all other financial fields except basic estimate

### 5. Approvals Section

#### Changes Required:
- **MODIFY** "Approval Required From" to dropdown with only 2 options:
  - MC (Commissioner)
  - Government
- **ADD** Remarks field (already exists as "Additional Remarks")

#### Implementation:
```html
<div class="field">
    <label class="field-label" for="approvalRequired">
        Approval Required From <span class="required">*</span>
    </label>
    <select id="approvalRequired" class="field-input">
        <option value="">Select Approval Authority</option>
        <option value="mc">MC (Commissioner)</option>
        <option value="govt">Government</option>
    </select>
</div>
```

## Implementation Priority

1. **High Priority** (Implement First):
   - Replace Project Code with Work ID and File Number
   - Add Assembly and Parliament Constituency fields
   - Simplify approval authority to MC/Govt dropdown
   - Add Product Category field

2. **Medium Priority**:
   - Implement dynamic project components section
   - Convert project area to manual text entry
   - Remove unnecessary fields (survey numbers, land type, etc.)

3. **Low Priority**:
   - UI/UX improvements
   - Field validation updates
   - Help text modifications

## Testing Checklist

- [ ] Verify all removed fields are completely deleted
- [ ] Test Work ID and File Number input validation
- [ ] Verify constituency dropdowns populate correctly
- [ ] Test dynamic component add/remove functionality
- [ ] Validate project area manual entry format
- [ ] Ensure approval authority dropdown works
- [ ] Test form submission with new structure
- [ ] Verify feedback system still works on all fields

## Data Migration Considerations

1. Existing projects using old Project Code should map to new Work ID
2. Priority and Project Type data can be archived but not displayed
3. Numeric area fields should be converted to text format
4. Approval authority mapping: detailed names → MC or Govt

## Next Steps

1. Review this plan with HMDA stakeholders
2. Get approval on component categories list
3. Confirm constituency lists are complete
4. Implement changes in staged approach
5. Test with sample data
6. Deploy to staging environment for user testing