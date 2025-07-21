# HMDA Interactive Web Portal - Development Setup Guide

## Overview
Comprehensive guide for setting up the development environment for the HMDA Interactive Web Portal. This guide follows the technical architecture decisions documented in `Technical-Architecture-Decisions.md`.

## Prerequisites

### System Requirements
- **Operating System**: macOS 10.15+, Windows 10+, or Ubuntu 18.04+
- **RAM**: Minimum 8GB (16GB recommended for 3D development)
- **Storage**: 10GB free space for development environment
- **Network**: Stable internet connection for package downloads

### Required Software Versions
```bash
Node.js: v18.17.0+ (LTS)
npm: v9.0.0+ (or yarn 3.0+)
Git: v2.30.0+
VS Code: Latest stable version
Chrome/Firefox: Latest for testing
```

## Environment Setup

### 1. Node.js Installation
```bash
# Using Node Version Manager (Recommended)
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18.17.0
nvm use 18.17.0
nvm alias default 18.17.0

# Windows (using Chocolatey)
choco install nodejs --version=18.17.0

# Verify installation
node --version  # Should output v18.17.0+
npm --version   # Should output v9.0.0+
```

### 2. Package Manager Setup
```bash
# Option A: Use npm (default)
npm install -g npm@latest

# Option B: Use Yarn (alternative)
npm install -g yarn
yarn set version stable
```

### 3. Git Configuration
```bash
# Configure Git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"

# Configure line endings (important for cross-platform)
git config --global core.autocrlf input  # macOS/Linux
git config --global core.autocrlf true   # Windows
```

## VS Code Setup

### Required Extensions
Install the following VS Code extensions for optimal development experience:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next",
    "pmneo.tsimporter",
    "steoates.autoimport-es6-ts",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings
Create `.vscode/settings.json` in project root:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Project Initialization

### 1. Create Project Structure
```bash
# Navigate to project directory
cd /Users/Girish/Projects/HMDA-EnggDept_Digitalization

# Create portal subdirectory
mkdir hmda-interactive-portal
cd hmda-interactive-portal

# Initialize git repository
git init
git branch -m main
```

### 2. Initialize React Project with Vite
```bash
# Create React + TypeScript project with Vite
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Test initial setup
npm run dev
```

### 3. Install Core Dependencies
```bash
# UI Framework and Styling
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install @fontsource/inter

# State Management
npm install @reduxjs/toolkit react-redux
npm install @reduxjs/toolkit/query/react

# Routing
npm install react-router-dom
npm install @types/react-router-dom

# 3D Visualization
npm install three @react-three/fiber @react-three/drei
npm install @types/three

# 2D Visualization
npm install d3 @types/d3
npm install react-chartjs-2 chart.js

# Utilities
npm install axios
npm install lodash @types/lodash
npm install date-fns
npm install uuid @types/uuid

# Animation
npm install framer-motion
npm install aos
```

### 4. Install Development Dependencies
```bash
# Testing
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev jest-environment-jsdom

# Code Quality
npm install --save-dev eslint @typescript-eslint/eslint-plugin
npm install --save-dev @typescript-eslint/parser
npm install --save-dev prettier eslint-config-prettier
npm install --save-dev eslint-plugin-react-hooks
npm install --save-dev eslint-plugin-react-refresh

# Pre-commit Hooks
npm install --save-dev husky lint-staged

# Build and Development
npm install --save-dev @types/node
npm install --save-dev @vitejs/plugin-react
npm install --save-dev vite-plugin-eslint
```

## Configuration Files

### 1. TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/store/*": ["src/store/*"],
      "@/assets/*": ["src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2. Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
})
```

### 3. ESLint Configuration (`.eslintrc.json`)
```json
{
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 4. Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 5. Package.json Scripts Update
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "prepare": "husky install"
  }
}
```

## Project Structure Setup

### Create Directory Structure
```bash
# Create main source directories
mkdir -p src/{components,pages,hooks,utils,types,store,assets,styles}

# Create component subdirectories
mkdir -p src/components/{ui,layout,visualization,forms}

# Create page directories
mkdir -p src/pages/{dashboard,processes,analytics,knowledge}

# Create asset directories
mkdir -p src/assets/{images,icons,fonts,data}

# Create test directories
mkdir -p src/__tests__/{components,hooks,utils}
```

### Initial File Structure
```
hmda-interactive-portal/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Basic UI components
│   │   ├── layout/          # Layout components
│   │   ├── visualization/   # 3D and chart components
│   │   └── forms/           # Form components
│   ├── pages/
│   │   ├── dashboard/       # Dashboard page
│   │   ├── processes/       # Process exploration
│   │   ├── analytics/       # Analytics dashboard
│   │   └── knowledge/       # Knowledge base
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript definitions
│   ├── store/               # Redux store
│   ├── assets/              # Static assets
│   ├── styles/              # Global styles
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Initial Component Setup

### 1. Create HMDA Theme (`src/styles/theme.ts`)
```typescript
import { createTheme, ThemeOptions } from '@mui/material/styles';

const hmdaThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#1e40af',
    },
    secondary: {
      main: '#059669',
      light: '#10b981',
      dark: '#047857',
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
};

export const hmdaTheme = createTheme(hmdaThemeOptions);
```

### 2. Redux Store Setup (`src/store/index.ts`)
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import slices (to be created)
// import authSlice from './slices/authSlice';
// import processSlice from './slices/processSlice';
// import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    // auth: authSlice,
    // processes: processSlice,
    // ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3. Main App Component (`src/App.tsx`)
```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { hmdaTheme } from './styles/theme';

// Import pages (to be created)
// import Dashboard from './pages/dashboard/Dashboard';
// import ProcessExplorer from './pages/processes/ProcessExplorer';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={hmdaTheme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<div>Welcome to HMDA Portal</div>} />
              {/* <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/processes" element={<ProcessExplorer />} /> */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

## Git Setup and Husky Configuration

### 1. Initialize Git Hooks
```bash
# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Create commit-msg hook (optional)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

### 2. Lint-staged Configuration
Add to `package.json`:
```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### 3. Create .gitignore
```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Production
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
/coverage

# Misc
*.tgz
*.tar.gz
```

## Development Workflow

### 1. Daily Development Commands
```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check

# Run tests
npm run test

# Build for production
npm run build
```

### 2. Git Workflow
```bash
# Create feature branch
git checkout -b feature/interactive-process-maps

# Stage and commit changes
git add .
git commit -m "feat: add interactive process map component"

# Push to remote
git push origin feature/interactive-process-maps
```

### 3. Code Quality Checklist
Before committing code, ensure:
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code formatted with Prettier
- [ ] Tests pass (when added)
- [ ] Component documented
- [ ] Accessibility considerations met

## Environment Variables Setup

### Create `.env` file
```env
# Development Environment
VITE_APP_NAME=HMDA Interactive Portal
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:4000/api
VITE_ENABLE_DEVTOOLS=true

# Feature Flags
VITE_ENABLE_3D_VISUALIZATION=true
VITE_ENABLE_AR_FEATURES=false
VITE_ENABLE_ANALYTICS=true
```

## Browser Development Tools

### Required Browser Extensions
1. **React Developer Tools**
2. **Redux DevTools**
3. **Lighthouse** (for performance auditing)
4. **axe DevTools** (for accessibility testing)

### Performance Monitoring
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run performance audit
lighthouse http://localhost:3000 --output=json --output-path=./performance-report.json
```

## Troubleshooting Common Issues

### Node.js Version Issues
```bash
# Check current version
node --version

# Switch to correct version
nvm use 18.17.0

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Path Resolution Issues
Ensure `tsconfig.json` paths match `vite.config.ts` aliases.

### VS Code IntelliSense Issues
```bash
# Restart TypeScript server
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

## Next Steps

After completing this setup:

1. ✅ **Verify Environment**: Run `npm run dev` and ensure no errors
2. ✅ **Create First Component**: Build a simple header component
3. ✅ **Setup Routing**: Implement basic page navigation
4. ✅ **Add 3D Scene**: Create initial Three.js canvas
5. ✅ **Implement Store**: Add Redux slices for data management

## Quick Start Verification

Run these commands to verify setup:
```bash
# 1. Check Node version
node --version  # Should be v18.17.0+

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run type checking
npm run type-check

# 5. Run linting
npm run lint

# 6. Build project
npm run build
```

All commands should complete without errors.

---

## Development Team Onboarding

### New Developer Checklist
- [ ] Install required software versions
- [ ] Clone repository and run setup
- [ ] Install VS Code extensions
- [ ] Verify all npm scripts work
- [ ] Read technical architecture decisions
- [ ] Complete first component tutorial
- [ ] Set up local development environment

### Resources and Documentation
- **Technical Decisions**: `Technical-Architecture-Decisions.md`
- **Project Context**: `CLAUDE.md`
- **Process Understanding**: `HMDA-Process-Understanding-Documentation-Framework.md`
- **Component Library**: Storybook (when implemented)
- **API Documentation**: GraphQL playground (when implemented)

---

*Setup Guide Version: 1.0*  
*Last Updated: 2025-01-20*  
*Next Review: Monthly*