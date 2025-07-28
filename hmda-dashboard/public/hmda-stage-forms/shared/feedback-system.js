/**
 * HMDA Feedback Capture System
 * Comprehensive feedback collection widget for walkthrough presentations
 */

class HMDAFeedbackSystem {
    constructor() {
        this.feedbackData = {
            sessionInfo: {
                sessionId: this.generateSessionId(),
                startTime: new Date().toISOString(),
                stageName: this.detectStageName(),
                participants: []
            },
            sectionFeedback: {},
            overallFeedback: {
                rating: 0,
                comments: '',
                recommendations: '',
                approvalStatus: ''
            }
        };
        
        this.currentSection = null;
        this.isVisible = false;
        this.init();
    }

    generateSessionId() {
        return 'HMDA-FB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    detectStageName() {
        const title = document.title;
        if (title.includes('Stage 1')) return 'Stage 1: Project Conceptualization';
        if (title.includes('Stage 2')) return 'Stage 2: DPR & Approvals';
        if (title.includes('Stage 3')) return 'Stage 3: Tendering & Procurement';
        if (title.includes('Stage 4')) return 'Stage 4: Contract Award & Mobilization';
        if (title.includes('Stage 5')) return 'Stage 5: Construction/Execution';
        if (title.includes('Stage 6')) return 'Stage 6: Quality Control & Monitoring';
        if (title.includes('Stage 7')) return 'Stage 7: Testing & Commissioning';
        if (title.includes('Stage 8')) return 'Stage 8: Project Closure & Handover';
        if (title.includes('Stage 9')) return 'Stage 9: DLP & O&M Phase';
        return 'HMDA Project Execution System Overview';
    }

    init() {
        this.createFeedbackWidget();
        this.attachEventListeners();
        this.loadParticipants();
        this.startAutoSave();
    }

    createFeedbackWidget() {
        // Create floating feedback button
        const feedbackButton = document.createElement('div');
        feedbackButton.id = 'feedback-toggle-btn';
        feedbackButton.className = 'feedback-toggle-btn';
        feedbackButton.innerHTML = `
            <div class="feedback-btn-content">
                <span class="feedback-icon">💬</span>
                <span class="feedback-text">Feedback</span>
                <span class="feedback-count" id="feedback-count">0</span>
            </div>
        `;
        
        // Create feedback panel
        const feedbackPanel = document.createElement('div');
        feedbackPanel.id = 'feedback-panel';
        feedbackPanel.className = 'feedback-panel hidden';
        feedbackPanel.innerHTML = this.createPanelHTML();
        
        document.body.appendChild(feedbackButton);
        document.body.appendChild(feedbackPanel);
        
        this.updateFeedbackCount();
    }

    createPanelHTML() {
        return `
            <div class="feedback-header">
                <div class="feedback-title">
                    <span class="feedback-icon">📝</span>
                    <h3>HMDA Walkthrough Feedback</h3>
                </div>
                <div class="feedback-controls">
                    <button class="feedback-minimize" id="feedback-minimize">−</button>
                    <button class="feedback-close" id="feedback-close">×</button>
                </div>
            </div>
            
            <div class="feedback-content">
                <!-- Session Info -->
                <div class="feedback-section">
                    <h4>👥 Participants</h4>
                    <div class="participants-container">
                        <input type="text" id="participant-name" placeholder="Add participant name" class="participant-input">
                        <input type="text" id="participant-role" placeholder="Role/Designation" class="participant-input">
                        <button class="btn-small btn-primary" onclick="feedbackSystem.addParticipant()">Add</button>
                    </div>
                    <div class="participants-list" id="participants-list"></div>
                </div>

                <!-- Quick Rating -->
                <div class="feedback-section">
                    <h4>⭐ Overall Form Rating</h4>
                    <div class="rating-container">
                        <div class="star-rating" id="overall-rating">
                            ${this.createStarRating('overall', 0)}
                        </div>
                        <span class="rating-text" id="rating-text">Not Rated</span>
                    </div>
                </div>

                <!-- Section-Specific Feedback -->
                <div class="feedback-section">
                    <h4>📋 Section Feedback</h4>
                    <select id="section-selector" class="feedback-select" onchange="feedbackSystem.selectSection(this.value)">
                        <option value="">Select a section to provide feedback</option>
                    </select>
                    
                    <div class="section-feedback-container" id="section-feedback" style="display: none;">
                        <div class="section-rating">
                            <label>Section Rating:</label>
                            <div class="star-rating" id="section-rating">
                                ${this.createStarRating('section', 0)}
                            </div>
                        </div>
                        
                        <div class="feedback-categories">
                            <div class="category-item">
                                <label>
                                    <input type="checkbox" class="category-checkbox" data-category="clarity">
                                    Clear & Easy to Understand
                                </label>
                            </div>
                            <div class="category-item">
                                <label>
                                    <input type="checkbox" class="category-checkbox" data-category="completeness">
                                    Complete Information
                                </label>
                            </div>
                            <div class="category-item">
                                <label>
                                    <input type="checkbox" class="category-checkbox" data-category="accuracy">
                                    Accurate Data & Calculations
                                </label>
                            </div>
                            <div class="category-item">
                                <label>
                                    <input type="checkbox" class="category-checkbox" data-category="workflow">
                                    Logical Workflow
                                </label>
                            </div>
                            <div class="category-item">
                                <label>
                                    <input type="checkbox" class="category-checkbox" data-category="integration">
                                    Good System Integration
                                </label>
                            </div>
                        </div>
                        
                        <textarea 
                            id="section-comments" 
                            class="feedback-textarea" 
                            placeholder="Detailed comments, suggestions, or concerns for this section..."
                            rows="4"
                        ></textarea>
                        
                        <div class="priority-level">
                            <label>Priority Level:</label>
                            <select id="section-priority" class="feedback-select-small">
                                <option value="low">Low - Minor Enhancement</option>
                                <option value="medium">Medium - Important Improvement</option>
                                <option value="high">High - Critical Issue</option>
                            </select>
                        </div>
                        
                        <button class="btn-small btn-success" onclick="feedbackSystem.saveSectionFeedback()">
                            Save Section Feedback
                        </button>
                    </div>
                </div>

                <!-- Overall Comments -->
                <div class="feedback-section">
                    <h4>💭 Overall Comments</h4>
                    <textarea 
                        id="overall-comments" 
                        class="feedback-textarea" 
                        placeholder="Overall feedback, recommendations, and suggestions for improvement..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Implementation Recommendations -->
                <div class="feedback-section">
                    <h4>🚀 Implementation Recommendations</h4>
                    <textarea 
                        id="recommendations" 
                        class="feedback-textarea" 
                        placeholder="Specific recommendations for implementation, integration, or enhancement..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Approval Status -->
                <div class="feedback-section">
                    <h4>✅ Approval Status</h4>
                    <select id="approval-status" class="feedback-select">
                        <option value="">Select approval status</option>
                        <option value="approved">✅ Approved - Ready for Implementation</option>
                        <option value="approved-modifications">⚠️ Approved with Minor Modifications</option>
                        <option value="major-revisions">🔄 Requires Major Revisions</option>
                        <option value="needs-discussion">💬 Needs Further Discussion</option>
                        <option value="rejected">❌ Not Approved</option>
                    </select>
                </div>
            </div>
            
            <div class="feedback-footer">
                <div class="feedback-actions">
                    <button class="btn-small btn-secondary" onclick="feedbackSystem.clearFeedback()">
                        🗑️ Clear All
                    </button>
                    <button class="btn-small btn-secondary" onclick="feedbackSystem.exportFeedback()">
                        📊 Export Report
                    </button>
                    <button class="btn-small btn-primary" onclick="feedbackSystem.saveFeedback()">
                        💾 Save Progress
                    </button>
                </div>
                <div class="feedback-status" id="feedback-status">
                    Auto-saved: Never
                </div>
            </div>
        `;
    }

    createStarRating(type, currentRating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= currentRating ? 'star-filled' : '';
            stars += `<span class="star ${filled}" data-rating="${i}" data-type="${type}" onclick="feedbackSystem.setRating('${type}', ${i})">⭐</span>`;
        }
        return stars;
    }

    attachEventListeners() {
        // Toggle feedback panel
        document.getElementById('feedback-toggle-btn').addEventListener('click', () => {
            this.togglePanel();
        });

        // Close panel
        document.getElementById('feedback-close').addEventListener('click', () => {
            this.hidePanel();
        });

        // Minimize panel
        document.getElementById('feedback-minimize').addEventListener('click', () => {
            this.minimizePanel();
        });

        // Auto-save on input changes
        document.addEventListener('input', (e) => {
            if (e.target.closest('#feedback-panel')) {
                this.scheduleAutoSave();
            }
        });

        // Detect sections on page
        this.detectFormSections();
    }

    detectFormSections() {
        const sections = document.querySelectorAll('.form-group');
        const sectionSelector = document.getElementById('section-selector');
        
        sections.forEach((section, index) => {
            const title = section.querySelector('.form-group-title');
            if (title) {
                const sectionName = title.textContent.trim();
                const option = document.createElement('option');
                option.value = `section-${index}`;
                option.textContent = sectionName;
                sectionSelector.appendChild(option);
                
                // Initialize feedback data for this section
                this.feedbackData.sectionFeedback[`section-${index}`] = {
                    name: sectionName,
                    rating: 0,
                    categories: [],
                    comments: '',
                    priority: 'low'
                };
            }
        });
    }

    togglePanel() {
        const panel = document.getElementById('feedback-panel');
        if (panel.classList.contains('hidden')) {
            this.showPanel();
        } else {
            this.hidePanel();
        }
    }

    showPanel() {
        const panel = document.getElementById('feedback-panel');
        panel.classList.remove('hidden');
        panel.classList.add('visible');
        this.isVisible = true;
    }

    hidePanel() {
        const panel = document.getElementById('feedback-panel');
        panel.classList.remove('visible');
        panel.classList.add('hidden');
        this.isVisible = false;
    }

    minimizePanel() {
        const panel = document.getElementById('feedback-panel');
        panel.classList.toggle('minimized');
    }

    setRating(type, rating) {
        const stars = document.querySelectorAll(`[data-type="${type}"] .star`);
        
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('star-filled');
            } else {
                star.classList.remove('star-filled');
            }
        });

        if (type === 'overall') {
            this.feedbackData.overallFeedback.rating = rating;
            document.getElementById('rating-text').textContent = this.getRatingText(rating);
        } else if (type === 'section' && this.currentSection) {
            this.feedbackData.sectionFeedback[this.currentSection].rating = rating;
        }

        this.updateFeedbackCount();
    }

    getRatingText(rating) {
        const texts = {
            1: 'Poor - Needs Major Improvement',
            2: 'Fair - Several Issues',
            3: 'Good - Minor Improvements Needed',
            4: 'Very Good - Almost Perfect',
            5: 'Excellent - Ready for Implementation'
        };
        return texts[rating] || 'Not Rated';
    }

    selectSection(sectionId) {
        this.currentSection = sectionId;
        const container = document.getElementById('section-feedback');
        
        if (sectionId) {
            container.style.display = 'block';
            this.loadSectionFeedback(sectionId);
        } else {
            container.style.display = 'none';
        }
    }

    loadSectionFeedback(sectionId) {
        const sectionData = this.feedbackData.sectionFeedback[sectionId];
        
        // Load rating
        this.setRating('section', sectionData.rating);
        
        // Load categories
        const checkboxes = document.querySelectorAll('.category-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = sectionData.categories.includes(checkbox.dataset.category);
        });
        
        // Load comments and priority
        document.getElementById('section-comments').value = sectionData.comments;
        document.getElementById('section-priority').value = sectionData.priority;
    }

    saveSectionFeedback() {
        if (!this.currentSection) return;
        
        const sectionData = this.feedbackData.sectionFeedback[this.currentSection];
        
        // Save categories
        const categories = [];
        document.querySelectorAll('.category-checkbox:checked').forEach(checkbox => {
            categories.push(checkbox.dataset.category);
        });
        sectionData.categories = categories;
        
        // Save comments and priority
        sectionData.comments = document.getElementById('section-comments').value;
        sectionData.priority = document.getElementById('section-priority').value;
        
        this.updateFeedbackCount();
        this.showNotification('Section feedback saved!', 'success');
    }

    addParticipant() {
        const nameInput = document.getElementById('participant-name');
        const roleInput = document.getElementById('participant-role');
        
        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        
        if (name && role) {
            const participant = {
                name: name,
                role: role,
                timestamp: new Date().toISOString()
            };
            
            this.feedbackData.sessionInfo.participants.push(participant);
            this.updateParticipantsList();
            
            nameInput.value = '';
            roleInput.value = '';
        }
    }

    updateParticipantsList() {
        const listContainer = document.getElementById('participants-list');
        const participants = this.feedbackData.sessionInfo.participants;
        
        listContainer.innerHTML = participants.map((p, index) => `
            <div class="participant-item">
                <span class="participant-info">${p.name} - ${p.role}</span>
                <button class="btn-remove" onclick="feedbackSystem.removeParticipant(${index})">×</button>
            </div>
        `).join('');
    }

    removeParticipant(index) {
        this.feedbackData.sessionInfo.participants.splice(index, 1);
        this.updateParticipantsList();
    }

    updateFeedbackCount() {
        let count = 0;
        
        // Count overall rating
        if (this.feedbackData.overallFeedback.rating > 0) count++;
        
        // Count section feedback
        Object.values(this.feedbackData.sectionFeedback).forEach(section => {
            if (section.rating > 0 || section.comments || section.categories.length > 0) {
                count++;
            }
        });
        
        document.getElementById('feedback-count').textContent = count;
    }

    loadParticipants() {
        // Pre-populate with common HMDA roles
        const defaultParticipants = [
            { name: 'Sri B. Ravinder', role: 'Chief Engineer' },
            { name: 'Sri S. Ramesh', role: 'Executive Engineer' }
        ];
        
        // Only add if no participants exist
        if (this.feedbackData.sessionInfo.participants.length === 0) {
            this.feedbackData.sessionInfo.participants = defaultParticipants.map(p => ({
                ...p,
                timestamp: new Date().toISOString()
            }));
            this.updateParticipantsList();
        }
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds
    }

    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.autoSave();
        }, 2000); // Save 2 seconds after last input
    }

    autoSave() {
        this.collectCurrentData();
        localStorage.setItem('hmda-feedback-' + this.feedbackData.sessionInfo.sessionId, JSON.stringify(this.feedbackData));
        
        const statusElement = document.getElementById('feedback-status');
        statusElement.textContent = 'Auto-saved: ' + new Date().toLocaleTimeString();
        statusElement.style.color = '#059669';
    }

    collectCurrentData() {
        // Collect overall feedback
        this.feedbackData.overallFeedback.comments = document.getElementById('overall-comments')?.value || '';
        this.feedbackData.overallFeedback.recommendations = document.getElementById('recommendations')?.value || '';
        this.feedbackData.overallFeedback.approvalStatus = document.getElementById('approval-status')?.value || '';
    }

    saveFeedback() {
        this.collectCurrentData();
        this.autoSave();
        this.showNotification('Feedback saved successfully!', 'success');
    }

    clearFeedback() {
        if (confirm('Are you sure you want to clear all feedback? This action cannot be undone.')) {
            // Reset feedback data
            this.feedbackData.sectionFeedback = {};
            this.feedbackData.overallFeedback = {
                rating: 0,
                comments: '',
                recommendations: '',
                approvalStatus: ''
            };
            
            // Clear UI
            document.getElementById('overall-comments').value = '';
            document.getElementById('recommendations').value = '';
            document.getElementById('approval-status').value = '';
            
            // Reset ratings
            this.setRating('overall', 0);
            
            // Re-detect sections
            this.detectFormSections();
            
            this.updateFeedbackCount();
            this.showNotification('Feedback cleared!', 'info');
        }
    }

    exportFeedback() {
        this.collectCurrentData();
        
        const report = this.generateFeedbackReport();
        const blob = new Blob([report], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `HMDA-Feedback-Report-${this.feedbackData.sessionInfo.sessionId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Feedback report exported!', 'success');
    }

    generateFeedbackReport() {
        const sessionInfo = this.feedbackData.sessionInfo;
        const overallFeedback = this.feedbackData.overallFeedback;
        
        return `
<!DOCTYPE html>
<html>
<head>
    <title>HMDA Walkthrough Feedback Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .rating { color: #f59e0b; font-weight: bold; }
        .high-priority { color: #ef4444; font-weight: bold; }
        .medium-priority { color: #f59e0b; font-weight: bold; }
        .low-priority { color: #6b7280; }
        .approval-approved { color: #059669; font-weight: bold; }
        .approval-rejected { color: #ef4444; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
        th { background: #f3f4f6; }
    </style>
</head>
<body>
    <div class="header">
        <h1>HMDA Project Execution System</h1>
        <h2>Walkthrough Feedback Report</h2>
        <p>Session ID: ${sessionInfo.sessionId}</p>
        <p>Date: ${new Date(sessionInfo.startTime).toLocaleDateString()}</p>
        <p>Stage: ${sessionInfo.stageName}</p>
    </div>

    <div class="section">
        <h3>👥 Participants</h3>
        <table>
            <tr><th>Name</th><th>Role/Designation</th></tr>
            ${sessionInfo.participants.map(p => `<tr><td>${p.name}</td><td>${p.role}</td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h3>⭐ Overall Assessment</h3>
        <p><strong>Overall Rating:</strong> <span class="rating">${'⭐'.repeat(overallFeedback.rating)} (${overallFeedback.rating}/5)</span></p>
        <p><strong>Rating Description:</strong> ${this.getRatingText(overallFeedback.rating)}</p>
        <p><strong>Approval Status:</strong> <span class="approval-${overallFeedback.approvalStatus.includes('approved') ? 'approved' : 'rejected'}">${overallFeedback.approvalStatus}</span></p>
        ${overallFeedback.comments ? `<p><strong>Comments:</strong> ${overallFeedback.comments}</p>` : ''}
        ${overallFeedback.recommendations ? `<p><strong>Recommendations:</strong> ${overallFeedback.recommendations}</p>` : ''}
    </div>

    <div class="section">
        <h3>📋 Section-wise Feedback</h3>
        ${Object.entries(this.feedbackData.sectionFeedback).map(([id, section]) => {
            if (section.rating > 0 || section.comments || section.categories.length > 0) {
                return `
                <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 6px;">
                    <h4>${section.name}</h4>
                    <p><strong>Rating:</strong> <span class="rating">${'⭐'.repeat(section.rating)} (${section.rating}/5)</span></p>
                    ${section.categories.length > 0 ? `<p><strong>Positive Aspects:</strong> ${section.categories.join(', ')}</p>` : ''}
                    <p><strong>Priority:</strong> <span class="${section.priority}-priority">${section.priority.toUpperCase()}</span></p>
                    ${section.comments ? `<p><strong>Comments:</strong> ${section.comments}</p>` : ''}
                </div>
                `;
            }
            return '';
        }).join('')}
    </div>

    <div class="section">
        <h3>📊 Summary Statistics</h3>
        <p><strong>Total Sections Reviewed:</strong> ${Object.values(this.feedbackData.sectionFeedback).filter(s => s.rating > 0 || s.comments).length}</p>
        <p><strong>Average Section Rating:</strong> ${this.calculateAverageRating()}/5</p>
        <p><strong>High Priority Issues:</strong> ${Object.values(this.feedbackData.sectionFeedback).filter(s => s.priority === 'high').length}</p>
        <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>
        `;
    }

    calculateAverageRating() {
        const ratings = Object.values(this.feedbackData.sectionFeedback)
            .map(s => s.rating)
            .filter(r => r > 0);
        
        if (ratings.length === 0) return 0;
        return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `feedback-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize feedback system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.feedbackSystem = new HMDAFeedbackSystem();
});