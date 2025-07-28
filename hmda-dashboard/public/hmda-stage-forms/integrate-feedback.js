/**
 * HMDA Feedback System Integration Script
 * Automatically adds feedback system to all stage forms
 */

const fs = require('fs');
const path = require('path');

// List of HTML files to integrate feedback system into
const htmlFiles = [
    'stage1-conceptualization.html',
    'stage2-dpr-approvals.html',
    'stage3-tendering.html',  // Already done
    'stage4-contract-award.html',
    'stage5-execution.html',
    'stage6-quality-control.html',
    'stage7-testing-commissioning.html',
    'stage8-project-closure.html',
    'stage9-dlp-om.html',
    'index.html'
];

// CSS import to add to head section
const cssImport = '    <link rel="stylesheet" href="shared/feedback-system.css">';

// JavaScript import to add before closing body tag  
const jsImport = '    <script src="shared/feedback-system.js"></script>';

function integrateFile(filename) {
    const filePath = path.join(__dirname, filename);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${filename} - file not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already integrated
    if (content.includes('feedback-system.css') && content.includes('feedback-system.js')) {
        console.log(`✅ ${filename} - already integrated`);
        return;
    }
    
    // Add CSS import to head section
    if (!content.includes('feedback-system.css')) {
        if (content.includes('<link rel="stylesheet" href="shared/styles.css">')) {
            content = content.replace(
                '<link rel="stylesheet" href="shared/styles.css">',
                '<link rel="stylesheet" href="shared/styles.css">\n' + cssImport
            );
        } else if (content.includes('</head>')) {
            content = content.replace('</head>', cssImport + '\n</head>');
        }
    }
    
    // Add JavaScript import before closing body tag
    if (!content.includes('feedback-system.js')) {
        content = content.replace('</body>', jsImport + '\n</body>');
    }
    
    // Write updated content back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ ${filename} - feedback system integrated successfully`);
}

function main() {
    console.log('🚀 Starting HMDA Feedback System Integration...\n');
    
    // Check if required files exist
    const requiredFiles = [
        'shared/feedback-system.css',
        'shared/feedback-system.js'
    ];
    
    for (const file of requiredFiles) {
        if (!fs.existsSync(path.join(__dirname, file))) {
            console.error(`❌ Required file missing: ${file}`);
            process.exit(1);
        }
    }
    
    console.log('✅ Required feedback system files found\n');
    
    // Integrate each HTML file
    htmlFiles.forEach(integrateFile);
    
    console.log('\n🎉 Integration complete!');
    console.log('\nNext steps:');
    console.log('1. Test feedback system on any stage form');
    console.log('2. Customize participant roles and categories if needed');
    console.log('3. Train HMDA officials on feedback system usage');
    console.log('4. Use during actual walkthrough presentations');
}

if (require.main === module) {
    main();
}

module.exports = { integrateFile, main };