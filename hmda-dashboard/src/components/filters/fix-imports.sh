#!/bin/bash

# Fix imports in filter components
cd /Users/Girish/Projects/HMDA-EnggDept_Digitalization/hmda-dashboard/src/components/filters

# Update imports in all filter components
for file in *.tsx; do
  echo "Updating imports in $file"
  
  # Replace relative imports to filter-types, filter-config, filter-engine
  sed -i '' "s|from '\.\./filter-types'|from '../../filters/filter-types'|g" "$file"
  sed -i '' "s|from '\.\./filter-config'|from '../../filters/filter-config'|g" "$file"
  sed -i '' "s|from '\.\./filter-engine'|from '../../filters/filter-engine'|g" "$file"
  
  # Replace project schema imports
  sed -i '' "s|from '\./enhanced-project-schema'|from '../../types/Project'|g" "$file"
done

echo "Import paths updated!"