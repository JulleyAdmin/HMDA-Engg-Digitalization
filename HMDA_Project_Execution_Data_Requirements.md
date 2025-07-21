# HMDA Chief Engineer's Office - Project Execution System Data Requirements

## 1. Master Data Requirements

### 1.1 User Master (roles, departments, hierarchies)

#### User Profile Fields:
- **user_id** (Primary Key, Auto-generated)
- **employee_code** (Unique, VARCHAR(20))
- **first_name** (VARCHAR(100), Required)
- **middle_name** (VARCHAR(100), Optional)
- **last_name** (VARCHAR(100), Required)
- **email** (VARCHAR(255), Unique, Required)
- **mobile_number** (VARCHAR(15), Required)
- **alternate_number** (VARCHAR(15), Optional)
- **designation** (VARCHAR(100), Required)
- **department_id** (Foreign Key to Department Master)
- **reporting_manager_id** (Self-referencing Foreign Key)
- **role_id** (Foreign Key to Role Master)
- **user_type** (ENUM: 'Internal', 'External', 'Contractor')
- **date_of_joining** (DATE)
- **employment_status** (ENUM: 'Active', 'Inactive', 'On Leave', 'Terminated')
- **digital_signature_path** (VARCHAR(500))
- **profile_photo_path** (VARCHAR(500))
- **aadhar_number** (VARCHAR(12), Encrypted)
- **pan_number** (VARCHAR(10), Encrypted)
- **created_date** (TIMESTAMP)
- **created_by** (Foreign Key to User)
- **modified_date** (TIMESTAMP)
- **modified_by** (Foreign Key to User)
- **is_active** (BOOLEAN, Default: TRUE)

#### Role Master Fields:
- **role_id** (Primary Key, Auto-generated)
- **role_code** (VARCHAR(20), Unique)
- **role_name** (VARCHAR(100), Required)
- **role_description** (TEXT)
- **role_level** (INTEGER, 1-10)
- **permissions** (JSON - List of permission codes)
- **is_approver** (BOOLEAN)
- **max_approval_limit** (DECIMAL(15,2))
- **can_delegate** (BOOLEAN)
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

#### Department Master Fields:
- **department_id** (Primary Key, Auto-generated)
- **department_code** (VARCHAR(20), Unique)
- **department_name** (VARCHAR(200), Required)
- **parent_department_id** (Self-referencing Foreign Key)
- **department_head_id** (Foreign Key to User Master)
- **department_type** (ENUM: 'Engineering', 'Planning', 'Finance', 'Administration', 'Quality', 'Legal')
- **cost_center_code** (VARCHAR(50))
- **location** (VARCHAR(200))
- **contact_number** (VARCHAR(15))
- **email** (VARCHAR(255))
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

### 1.2 Project Categories and Types

#### Project Category Master:
- **category_id** (Primary Key, Auto-generated)
- **category_code** (VARCHAR(20), Unique)
- **category_name** (VARCHAR(200), Required)
- **category_description** (TEXT)
- **parent_category_id** (Self-referencing Foreign Key)
- **approval_required** (BOOLEAN)
- **min_budget_limit** (DECIMAL(15,2))
- **max_budget_limit** (DECIMAL(15,2))
- **default_duration_days** (INTEGER)
- **priority_level** (ENUM: 'High', 'Medium', 'Low')
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

#### Project Type Master:
- **type_id** (Primary Key, Auto-generated)
- **type_code** (VARCHAR(20), Unique)
- **type_name** (VARCHAR(200), Required)
- **category_id** (Foreign Key to Project Category)
- **type_description** (TEXT)
- **workflow_template_id** (Foreign Key to Workflow Template)
- **document_checklist** (JSON - Required documents)
- **milestone_template** (JSON - Default milestones)
- **inspection_frequency** (ENUM: 'Daily', 'Weekly', 'Monthly', 'Milestone-based')
- **quality_parameters** (JSON)
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

### 1.3 Contractor/Vendor Master

#### Contractor Master Fields:
- **contractor_id** (Primary Key, Auto-generated)
- **contractor_code** (VARCHAR(20), Unique)
- **contractor_name** (VARCHAR(500), Required)
- **contractor_type** (ENUM: 'Individual', 'Partnership', 'Company', 'Consortium')
- **registration_number** (VARCHAR(100), Unique)
- **registration_date** (DATE)
- **registration_validity** (DATE)
- **gst_number** (VARCHAR(20))
- **pan_number** (VARCHAR(10))
- **contractor_class** (ENUM: 'Class-I', 'Class-II', 'Class-III', 'Class-IV')
- **specialization** (JSON - List of specialization codes)
- **max_project_value** (DECIMAL(15,2))
- **performance_rating** (DECIMAL(3,2), 0-5)
- **blacklist_status** (BOOLEAN, Default: FALSE)
- **blacklist_reason** (TEXT)
- **blacklist_date** (DATE)
- **bank_name** (VARCHAR(200))
- **bank_account_number** (VARCHAR(50), Encrypted)
- **bank_ifsc_code** (VARCHAR(20))
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

#### Contractor Contact Details:
- **contact_id** (Primary Key, Auto-generated)
- **contractor_id** (Foreign Key to Contractor Master)
- **contact_person_name** (VARCHAR(200))
- **designation** (VARCHAR(100))
- **contact_type** (ENUM: 'Primary', 'Secondary', 'Emergency')
- **mobile_number** (VARCHAR(15))
- **email** (VARCHAR(255))
- **address_line1** (VARCHAR(500))
- **address_line2** (VARCHAR(500))
- **city** (VARCHAR(100))
- **state** (VARCHAR(100))
- **pincode** (VARCHAR(10))
- **is_primary** (BOOLEAN)

#### Contractor Documents:
- **document_id** (Primary Key, Auto-generated)
- **contractor_id** (Foreign Key to Contractor Master)
- **document_type** (ENUM: 'Registration', 'GST', 'PAN', 'Bank', 'Insurance', 'License', 'Other')
- **document_name** (VARCHAR(200))
- **document_number** (VARCHAR(100))
- **issue_date** (DATE)
- **expiry_date** (DATE)
- **document_path** (VARCHAR(500))
- **verification_status** (ENUM: 'Pending', 'Verified', 'Rejected')
- **verified_by** (Foreign Key to User Master)
- **verification_date** (DATE)

### 1.4 Material Master

#### Material Category:
- **material_category_id** (Primary Key, Auto-generated)
- **category_code** (VARCHAR(20), Unique)
- **category_name** (VARCHAR(200))
- **parent_category_id** (Self-referencing Foreign Key)
- **hsn_code** (VARCHAR(20))
- **gst_rate** (DECIMAL(5,2))
- **is_active** (BOOLEAN)

#### Material Master Fields:
- **material_id** (Primary Key, Auto-generated)
- **material_code** (VARCHAR(50), Unique)
- **material_name** (VARCHAR(500), Required)
- **material_category_id** (Foreign Key to Material Category)
- **material_type** (ENUM: 'Raw Material', 'Consumable', 'Equipment', 'Tool', 'Service')
- **specification** (TEXT)
- **unit_of_measurement** (VARCHAR(20))
- **alternate_unit** (VARCHAR(20))
- **conversion_factor** (DECIMAL(10,4))
- **minimum_order_quantity** (DECIMAL(10,3))
- **lead_time_days** (INTEGER)
- **is_hazardous** (BOOLEAN)
- **storage_conditions** (TEXT)
- **shelf_life_days** (INTEGER)
- **quality_standards** (JSON)
- **approved_vendors** (JSON - List of vendor IDs)
- **base_rate** (DECIMAL(15,2))
- **last_purchase_rate** (DECIMAL(15,2))
- **average_rate** (DECIMAL(15,2))
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

### 1.5 Location/Zone Master

#### Zone Master:
- **zone_id** (Primary Key, Auto-generated)
- **zone_code** (VARCHAR(20), Unique)
- **zone_name** (VARCHAR(200), Required)
- **zone_type** (ENUM: 'Urban', 'Rural', 'Industrial', 'Residential', 'Commercial')
- **zone_head_id** (Foreign Key to User Master)
- **geographical_area** (DECIMAL(10,2), in sq.km)
- **population** (INTEGER)
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

#### Location Master:
- **location_id** (Primary Key, Auto-generated)
- **location_code** (VARCHAR(20), Unique)
- **location_name** (VARCHAR(500), Required)
- **zone_id** (Foreign Key to Zone Master)
- **location_type** (ENUM: 'Site', 'Office', 'Warehouse', 'Plant')
- **address** (TEXT)
- **latitude** (DECIMAL(10,8))
- **longitude** (DECIMAL(11,8))
- **landmark** (VARCHAR(500))
- **pincode** (VARCHAR(10))
- **contact_person** (VARCHAR(200))
- **contact_number** (VARCHAR(15))
- **accessibility** (ENUM: 'Road', 'Rail', 'Water', 'Air')
- **nearest_police_station** (VARCHAR(200))
- **nearest_hospital** (VARCHAR(200))
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

### 1.6 Document Templates

#### Document Template Master:
- **template_id** (Primary Key, Auto-generated)
- **template_code** (VARCHAR(20), Unique)
- **template_name** (VARCHAR(200), Required)
- **template_type** (ENUM: 'Contract', 'Report', 'Certificate', 'Letter', 'Notice', 'Form')
- **document_category** (VARCHAR(100))
- **template_format** (ENUM: 'PDF', 'Word', 'Excel', 'HTML')
- **template_path** (VARCHAR(500))
- **template_content** (TEXT - for HTML templates)
- **placeholders** (JSON - List of placeholder variables)
- **approval_required** (BOOLEAN)
- **version_number** (VARCHAR(20))
- **effective_date** (DATE)
- **created_by** (Foreign Key to User Master)
- **created_date** (TIMESTAMP)
- **is_active** (BOOLEAN)

### 1.7 Approval Matrices

#### Approval Matrix Master:
- **matrix_id** (Primary Key, Auto-generated)
- **matrix_code** (VARCHAR(20), Unique)
- **matrix_name** (VARCHAR(200))
- **approval_type** (ENUM: 'Project', 'Payment', 'Change Request', 'Document', 'Vendor')
- **project_category_id** (Foreign Key to Project Category)
- **is_active** (BOOLEAN)

#### Approval Matrix Details:
- **detail_id** (Primary Key, Auto-generated)
- **matrix_id** (Foreign Key to Approval Matrix Master)
- **level_sequence** (INTEGER)
- **approver_role_id** (Foreign Key to Role Master)
- **approver_user_id** (Foreign Key to User Master - Optional)
- **min_amount** (DECIMAL(15,2))
- **max_amount** (DECIMAL(15,2))
- **approval_mode** (ENUM: 'Sequential', 'Parallel', 'Any One')
- **escalation_hours** (INTEGER)
- **escalation_to** (Foreign Key to User Master)
- **is_mandatory** (BOOLEAN)
- **can_reject** (BOOLEAN)
- **can_delegate** (BOOLEAN)

## 2. Metadata Structure

### 2.1 Project Metadata Fields

#### Project Master Metadata:
- **project_id** (Primary Key, Auto-generated)
- **project_code** (VARCHAR(50), Unique)
- **project_name** (VARCHAR(500), Required)
- **project_description** (TEXT)
- **project_category_id** (Foreign Key to Project Category)
- **project_type_id** (Foreign Key to Project Type)
- **project_status** (ENUM: 'Draft', 'Submitted', 'Approved', 'In Progress', 'On Hold', 'Completed', 'Cancelled')
- **priority** (ENUM: 'Critical', 'High', 'Medium', 'Low')
- **estimated_cost** (DECIMAL(15,2))
- **approved_cost** (DECIMAL(15,2))
- **actual_cost** (DECIMAL(15,2))
- **start_date** (DATE)
- **end_date** (DATE)
- **actual_start_date** (DATE)
- **actual_end_date** (DATE)
- **project_manager_id** (Foreign Key to User Master)
- **department_id** (Foreign Key to Department Master)
- **contractor_id** (Foreign Key to Contractor Master)
- **location_id** (Foreign Key to Location Master)
- **beneficiaries_count** (INTEGER)
- **project_area** (DECIMAL(10,2))
- **funding_source** (VARCHAR(200))
- **sanction_number** (VARCHAR(100))
- **sanction_date** (DATE)
- **tags** (JSON - searchable tags)
- **custom_fields** (JSON - flexible fields)
- **created_by** (Foreign Key to User Master)
- **created_date** (TIMESTAMP)
- **modified_by** (Foreign Key to User Master)
- **modified_date** (TIMESTAMP)

### 2.2 Document Metadata

#### Document Metadata Fields:
- **document_id** (Primary Key, Auto-generated)
- **document_code** (VARCHAR(50), Unique)
- **document_name** (VARCHAR(500))
- **document_type** (VARCHAR(100))
- **document_category** (VARCHAR(100))
- **file_format** (VARCHAR(20))
- **file_size** (BIGINT, in bytes)
- **file_path** (VARCHAR(1000))
- **version_number** (VARCHAR(20))
- **checksum** (VARCHAR(64))
- **project_id** (Foreign Key to Project Master)
- **parent_document_id** (Self-referencing Foreign Key)
- **is_confidential** (BOOLEAN)
- **access_level** (ENUM: 'Public', 'Internal', 'Restricted', 'Confidential')
- **retention_period_days** (INTEGER)
- **expiry_date** (DATE)
- **keywords** (JSON)
- **language** (VARCHAR(20))
- **created_by** (Foreign Key to User Master)
- **created_date** (TIMESTAMP)
- **last_accessed_by** (Foreign Key to User Master)
- **last_accessed_date** (TIMESTAMP)
- **download_count** (INTEGER)
- **is_archived** (BOOLEAN)

### 2.3 Workflow Metadata

#### Workflow Instance Metadata:
- **workflow_instance_id** (Primary Key, Auto-generated)
- **workflow_template_id** (Foreign Key to Workflow Template)
- **entity_type** (ENUM: 'Project', 'Payment', 'Document', 'Change Request')
- **entity_id** (VARCHAR(50))
- **current_stage** (VARCHAR(100))
- **current_status** (ENUM: 'Initiated', 'In Progress', 'Pending Approval', 'Approved', 'Rejected', 'Completed')
- **initiated_by** (Foreign Key to User Master)
- **initiated_date** (TIMESTAMP)
- **expected_completion_date** (TIMESTAMP)
- **actual_completion_date** (TIMESTAMP)
- **priority** (ENUM: 'High', 'Medium', 'Low')
- **escalation_level** (INTEGER)
- **sla_status** (ENUM: 'On Time', 'Delayed', 'Overdue')
- **workflow_data** (JSON - workflow-specific data)

#### Workflow Stage Metadata:
- **stage_id** (Primary Key, Auto-generated)
- **workflow_instance_id** (Foreign Key to Workflow Instance)
- **stage_name** (VARCHAR(200))
- **stage_sequence** (INTEGER)
- **assigned_to** (Foreign Key to User Master)
- **assigned_date** (TIMESTAMP)
- **due_date** (TIMESTAMP)
- **completed_date** (TIMESTAMP)
- **action_taken** (ENUM: 'Approved', 'Rejected', 'Returned', 'Forwarded', 'On Hold')
- **comments** (TEXT)
- **time_spent_minutes** (INTEGER)
- **attachments** (JSON)

### 2.4 User Activity Metadata

#### User Activity Log:
- **activity_id** (Primary Key, Auto-generated)
- **user_id** (Foreign Key to User Master)
- **session_id** (VARCHAR(100))
- **activity_type** (ENUM: 'Login', 'Logout', 'View', 'Create', 'Update', 'Delete', 'Download', 'Upload', 'Approve', 'Reject')
- **module_name** (VARCHAR(100))
- **entity_type** (VARCHAR(100))
- **entity_id** (VARCHAR(50))
- **activity_description** (TEXT)
- **ip_address** (VARCHAR(45))
- **user_agent** (VARCHAR(500))
- **device_type** (ENUM: 'Desktop', 'Mobile', 'Tablet')
- **browser** (VARCHAR(50))
- **operating_system** (VARCHAR(50))
- **location** (VARCHAR(200))
- **activity_timestamp** (TIMESTAMP)
- **response_time_ms** (INTEGER)
- **status** (ENUM: 'Success', 'Failed', 'Error')
- **error_message** (TEXT)

## 3. System Configurations

### 3.1 Workflow Configurations

#### Workflow Template:
- **template_id** (Primary Key, Auto-generated)
- **template_code** (VARCHAR(20), Unique)
- **template_name** (VARCHAR(200))
- **workflow_type** (ENUM: 'Sequential', 'Parallel', 'Conditional')
- **entity_type** (ENUM: 'Project', 'Payment', 'Document', 'Change Request')
- **stages** (JSON - workflow stages definition)
- **conditions** (JSON - conditional logic)
- **sla_hours** (INTEGER)
- **escalation_matrix** (JSON)
- **notification_settings** (JSON)
- **is_active** (BOOLEAN)

#### Workflow Rules:
- **rule_id** (Primary Key, Auto-generated)
- **rule_name** (VARCHAR(200))
- **template_id** (Foreign Key to Workflow Template)
- **rule_type** (ENUM: 'Validation', 'Assignment', 'Escalation', 'Notification')
- **condition_expression** (TEXT)
- **action_type** (VARCHAR(50))
- **action_parameters** (JSON)
- **priority** (INTEGER)
- **is_active** (BOOLEAN)

### 3.2 Approval Limits

#### Approval Limit Configuration:
- **limit_id** (Primary Key, Auto-generated)
- **role_id** (Foreign Key to Role Master)
- **user_id** (Foreign Key to User Master - Optional)
- **approval_type** (ENUM: 'Financial', 'Technical', 'Administrative')
- **transaction_type** (VARCHAR(100))
- **min_limit** (DECIMAL(15,2))
- **max_limit** (DECIMAL(15,2))
- **currency** (VARCHAR(3), Default: 'INR')
- **effective_from** (DATE)
- **effective_to** (DATE)
- **requires_second_approval** (BOOLEAN)
- **second_approver_role_id** (Foreign Key to Role Master)
- **is_active** (BOOLEAN)

### 3.3 Notification Rules

#### Notification Configuration:
- **notification_id** (Primary Key, Auto-generated)
- **notification_code** (VARCHAR(20), Unique)
- **notification_name** (VARCHAR(200))
- **trigger_event** (VARCHAR(100))
- **notification_type** (ENUM: 'Email', 'SMS', 'In-App', 'Push')
- **recipient_type** (ENUM: 'Role', 'User', 'Group', 'Dynamic')
- **recipient_list** (JSON)
- **template_id** (Foreign Key to Document Template)
- **priority** (ENUM: 'High', 'Medium', 'Low')
- **retry_count** (INTEGER, Default: 3)
- **is_active** (BOOLEAN)

#### Notification Queue:
- **queue_id** (Primary Key, Auto-generated)
- **notification_id** (Foreign Key to Notification Configuration)
- **recipient_user_id** (Foreign Key to User Master)
- **recipient_email** (VARCHAR(255))
- **recipient_mobile** (VARCHAR(15))
- **subject** (VARCHAR(500))
- **message_body** (TEXT)
- **scheduled_time** (TIMESTAMP)
- **sent_time** (TIMESTAMP)
- **status** (ENUM: 'Pending', 'Sent', 'Failed', 'Cancelled')
- **failure_reason** (TEXT)
- **retry_attempt** (INTEGER)

### 3.4 Integration Settings

#### Integration Configuration:
- **integration_id** (Primary Key, Auto-generated)
- **integration_code** (VARCHAR(20), Unique)
- **integration_name** (VARCHAR(200))
- **integration_type** (ENUM: 'REST API', 'SOAP', 'Database', 'File Transfer', 'Email')
- **endpoint_url** (VARCHAR(500))
- **authentication_type** (ENUM: 'None', 'Basic', 'OAuth2', 'API Key', 'Certificate')
- **credentials** (TEXT, Encrypted)
- **request_format** (ENUM: 'JSON', 'XML', 'CSV', 'Custom')
- **response_format** (ENUM: 'JSON', 'XML', 'CSV', 'Custom')
- **timeout_seconds** (INTEGER)
- **retry_policy** (JSON)
- **is_active** (BOOLEAN)

#### Integration Log:
- **log_id** (Primary Key, Auto-generated)
- **integration_id** (Foreign Key to Integration Configuration)
- **transaction_id** (VARCHAR(100))
- **request_timestamp** (TIMESTAMP)
- **request_data** (TEXT)
- **response_timestamp** (TIMESTAMP)
- **response_data** (TEXT)
- **status_code** (INTEGER)
- **status** (ENUM: 'Success', 'Failed', 'Timeout', 'Error')
- **error_message** (TEXT)
- **retry_count** (INTEGER)

### 3.5 Security Configurations

#### Security Policy:
- **policy_id** (Primary Key, Auto-generated)
- **policy_name** (VARCHAR(200))
- **policy_type** (ENUM: 'Password', 'Session', 'Access Control', 'Data Protection')
- **policy_rules** (JSON)
- **enforcement_level** (ENUM: 'Mandatory', 'Recommended', 'Optional')
- **effective_date** (DATE)
- **review_date** (DATE)
- **is_active** (BOOLEAN)

#### Access Control List:
- **acl_id** (Primary Key, Auto-generated)
- **resource_type** (VARCHAR(100))
- **resource_id** (VARCHAR(50))
- **role_id** (Foreign Key to Role Master)
- **user_id** (Foreign Key to User Master - Optional)
- **permission_type** (ENUM: 'Read', 'Write', 'Update', 'Delete', 'Execute', 'Approve')
- **grant_type** (ENUM: 'Allow', 'Deny')
- **conditions** (JSON - conditional access rules)
- **valid_from** (TIMESTAMP)
- **valid_to** (TIMESTAMP)
- **is_active** (BOOLEAN)

## 4. Transactional Data

### 4.1 Project Creation Data

#### Project Initiation:
- **initiation_id** (Primary Key, Auto-generated)
- **project_id** (Foreign Key to Project Master)
- **proposal_number** (VARCHAR(50), Unique)
- **proposal_date** (DATE)
- **proposed_by** (Foreign Key to User Master)
- **justification** (TEXT)
- **feasibility_study** (TEXT)
- **environmental_impact** (TEXT)
- **social_impact** (TEXT)
- **risk_assessment** (JSON)
- **preliminary_estimate** (DECIMAL(15,2))
- **funding_details** (JSON)
- **approval_status** (ENUM: 'Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected')
- **approval_date** (DATE)
- **approved_by** (Foreign Key to User Master)
- **approval_comments** (TEXT)

#### Project Team Assignment:
- **assignment_id** (Primary Key, Auto-generated)
- **project_id** (Foreign Key to Project Master)
- **user_id** (Foreign Key to User Master)
- **role_in_project** (VARCHAR(100))
- **responsibility** (TEXT)
- **assignment_date** (DATE)
- **start_date** (DATE)
- **end_date** (DATE)
- **allocation_percentage** (INTEGER, 0-100)
- **is_active** (BOOLEAN)

### 4.2 Milestone Tracking

#### Project Milestones:
- **milestone_id** (Primary Key, Auto-generated)
- **project_id** (Foreign Key to Project Master)
- **milestone_code** (VARCHAR(20))
- **milestone_name** (VARCHAR(500))
- **milestone_description** (TEXT)
- **milestone_type** (ENUM: 'Planning', 'Execution', 'Testing', 'Delivery', 'Payment')
- **planned_start_date** (DATE)
- **planned_end_date** (DATE)
- **actual_start_date** (DATE)
- **actual_end_date** (DATE)
- **weightage_percentage** (DECIMAL(5,2))
- **completion_percentage** (DECIMAL(5,2))
- **status** (ENUM: 'Not Started', 'In Progress', 'Completed', 'Delayed', 'On Hold')
- **deliverables** (JSON)
- **dependencies** (JSON - list of dependent milestone IDs)
- **responsible_person** (Foreign Key to User Master)
- **verification_required** (BOOLEAN)
- **verified_by** (Foreign Key to User Master)
- **verification_date** (DATE)
- **comments** (TEXT)

### 4.3 Payment Processing

#### Payment Request:
- **payment_id** (Primary Key, Auto-generated)
- **payment_number** (VARCHAR(50), Unique)
- **project_id** (Foreign Key to Project Master)
- **contractor_id** (Foreign Key to Contractor Master)
- **milestone_id** (Foreign Key to Project Milestones)
- **payment_type** (ENUM: 'Advance', 'Running Bill', 'Final Bill', 'Retention', 'Security Deposit')
- **bill_number** (VARCHAR(50))
- **bill_date** (DATE)
- **bill_amount** (DECIMAL(15,2))
- **work_done_value** (DECIMAL(15,2))
- **previous_payment** (DECIMAL(15,2))
- **current_payment** (DECIMAL(15,2))
- **retention_amount** (DECIMAL(15,2))
- **penalty_amount** (DECIMAL(15,2))
- **penalty_reason** (TEXT)
- **tds_amount** (DECIMAL(15,2))
- **gst_amount** (DECIMAL(15,2))
- **net_payable** (DECIMAL(15,2))
- **payment_status** (ENUM: 'Draft', 'Submitted', 'Under Review', 'Approved', 'Paid', 'On Hold', 'Rejected')
- **approval_workflow_id** (Foreign Key to Workflow Instance)
- **payment_mode** (ENUM: 'Cheque', 'RTGS', 'NEFT', 'Cash', 'DD')
- **transaction_reference** (VARCHAR(100))
- **payment_date** (DATE)
- **supporting_documents** (JSON)

#### Payment Schedule:
- **schedule_id** (Primary Key, Auto-generated)
- **project_id** (Foreign Key to Project Master)
- **milestone_id** (Foreign Key to Project Milestones)
- **scheduled_amount** (DECIMAL(15,2))
- **scheduled_date** (DATE)
- **payment_terms** (TEXT)
- **is_paid** (BOOLEAN)
- **actual_payment_id** (Foreign Key to Payment Request)

### 4.4 Quality Inspections

#### Inspection Master:
- **inspection_id** (Primary Key, Auto-generated)
- **inspection_code** (VARCHAR(50), Unique)
- **project_id** (Foreign Key to Project Master)
- **milestone_id** (Foreign Key to Project Milestones)
- **inspection_type** (ENUM: 'Routine', 'Stage', 'Final', 'Special', 'Third Party')
- **scheduled_date** (DATE)
- **actual_date** (DATE)
- **inspector_id** (Foreign Key to User Master)
- **inspection_status** (ENUM: 'Scheduled', 'In Progress', 'Completed', 'Cancelled')
- **overall_rating** (ENUM: 'Excellent', 'Satisfactory', 'Needs Improvement', 'Unsatisfactory')
- **compliance_percentage** (DECIMAL(5,2))
- **recommendations** (TEXT)
- **corrective_actions** (JSON)
- **follow_up_required** (BOOLEAN)
- **follow_up_date** (DATE)
- **inspection_report_path** (VARCHAR(500))

#### Inspection Checklist:
- **checklist_id** (Primary Key, Auto-generated)
- **inspection_id** (Foreign Key to Inspection Master)
- **parameter_code** (VARCHAR(20))
- **parameter_name** (VARCHAR(500))
- **parameter_category** (VARCHAR(100))
- **expected_value** (VARCHAR(500))
- **actual_value** (VARCHAR(500))
- **measurement_unit** (VARCHAR(50))
- **compliance_status** (ENUM: 'Compliant', 'Non-Compliant', 'Partially Compliant', 'Not Applicable')
- **severity** (ENUM: 'Critical', 'Major', 'Minor', 'Observation')
- **remarks** (TEXT)
- **photo_evidence** (JSON - array of photo paths)

### 4.5 Progress Reports

#### Progress Report Master:
- **report_id** (Primary Key, Auto-generated)
- **report_number** (VARCHAR(50), Unique)
- **project_id** (Foreign Key to Project Master)
- **reporting_period_from** (DATE)
- **reporting_period_to** (DATE)
- **report_type** (ENUM: 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Ad-hoc')
- **overall_progress_percentage** (DECIMAL(5,2))
- **physical_progress_percentage** (DECIMAL(5,2))
- **financial_progress_percentage** (DECIMAL(5,2))
- **scheduled_progress_percentage** (DECIMAL(5,2))
- **variance_percentage** (DECIMAL(5,2), Computed)
- **status_summary** (TEXT)
- **key_achievements** (JSON)
- **issues_faced** (JSON)
- **mitigation_measures** (JSON)
- **next_period_plan** (TEXT)
- **resource_utilization** (JSON)
- **submitted_by** (Foreign Key to User Master)
- **submission_date** (TIMESTAMP)
- **reviewed_by** (Foreign Key to User Master)
- **review_date** (TIMESTAMP)
- **review_comments** (TEXT)

#### Daily Progress Entry:
- **entry_id** (Primary Key, Auto-generated)
- **project_id** (Foreign Key to Project Master)
- **entry_date** (DATE)
- **weather_condition** (ENUM: 'Sunny', 'Rainy', 'Cloudy', 'Windy', 'Extreme')
- **work_hours** (DECIMAL(4,2))
- **manpower_deployed** (JSON - category-wise count)
- **equipment_deployed** (JSON - equipment list with hours)
- **materials_used** (JSON - material-wise quantity)
- **work_executed** (TEXT)
- **hindrance_faced** (TEXT)
- **safety_incidents** (INTEGER)
- **incident_details** (TEXT)
- **photographs** (JSON - array of photo paths with descriptions)
- **site_engineer_id** (Foreign Key to User Master)
- **contractor_representative** (VARCHAR(200))
- **verified_by** (Foreign Key to User Master)
- **verification_status** (ENUM: 'Pending', 'Verified', 'Disputed')

## Additional Considerations

### Data Integrity Rules:
1. All primary keys should be system-generated and immutable
2. All foreign key relationships must have referential integrity constraints
3. Soft delete mechanism (is_active flag) for all master data
4. Audit trail for all critical data modifications
5. Data archival policy for transactional data older than specified period

### Performance Optimization:
1. Indexing on all foreign keys and frequently searched fields
2. Partitioning for large transactional tables (by date/project)
3. Materialized views for complex reporting queries
4. Caching strategy for master data

### Security Measures:
1. Encryption for sensitive fields (PAN, Aadhar, Bank details)
2. Role-based field-level access control
3. Data masking for non-production environments
4. Regular security audits and penetration testing

### Compliance Requirements:
1. GDPR compliance for personal data
2. RTI Act compliance for public project data
3. CAG audit trail requirements
4. Government data localization requirements

This comprehensive data structure provides a robust foundation for the HMDA Chief Engineer's office project execution system, covering all aspects from master data to transactional processing with proper metadata and configuration management.