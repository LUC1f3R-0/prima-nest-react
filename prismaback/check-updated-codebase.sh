#!/usr/bin/env bash

OUTPUT="project-code-snapshot-updated.txt"

rm -f "$OUTPUT"

echo "UPDATED PROJECT CODE SNAPSHOT" >> "$OUTPUT"
echo "Generated at: $(date)" >> "$OUTPUT"
echo "Project root: $(pwd)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

echo "==============================" >> "$OUTPUT"
echo "PACKAGE INFO" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

if [ -f package.json ]; then
  cat package.json >> "$OUTPUT"
fi

echo "" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"
echo "PROJECT TREE" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

find . \
  -path "./node_modules" -prune -o \
  -path "./dist" -prune -o \
  -path "./.git" -prune -o \
  -path "./coverage" -prune -o \
  -path "./uploads" -prune -o \
  -path "./generated" -prune -o \
  -path "./build" -prune -o \
  -path "./.next" -prune -o \
  -print | sort >> "$OUTPUT"

echo "" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"
echo "SOURCE FILE CONTENTS" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

find . \
  -path "./node_modules" -prune -o \
  -path "./dist" -prune -o \
  -path "./.git" -prune -o \
  -path "./coverage" -prune -o \
  -path "./uploads" -prune -o \
  -path "./generated" -prune -o \
  -path "./build" -prune -o \
  -path "./.next" -prune -o \
  -type f \( \
    -name "*.ts" -o \
    -name "*.js" -o \
    -name "*.json" -o \
    -name "*.prisma" -o \
    -name "*.yml" -o \
    -name "*.yaml" -o \
    -name "*.md" \
  \) \
  ! -name "package-lock.json" \
  ! -name "yarn.lock" \
  ! -name "pnpm-lock.yaml" \
  ! -name ".env" \
  ! -name ".env.local" \
  ! -name ".env.production" \
  ! -name ".env.development" \
  ! -name "$OUTPUT" \
  | sort | while read -r file; do
      echo "" >> "$OUTPUT"
      echo "--------------------------------------------------" >> "$OUTPUT"
      echo "FILE: $file" >> "$OUTPUT"
      echo "--------------------------------------------------" >> "$OUTPUT"
      cat "$file" >> "$OUTPUT"
      echo "" >> "$OUTPUT"
    done

echo "" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"
echo "BUILD CHECK" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

if [ -f package.json ]; then
  npm run build >> "$OUTPUT" 2>&1
else
  echo "package.json not found. Build check skipped." >> "$OUTPUT"
fi

echo "" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"
echo "TYPESCRIPT CHECK" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

if [ -f tsconfig.json ]; then
  npx tsc --noEmit >> "$OUTPUT" 2>&1
else
  echo "tsconfig.json not found. TypeScript check skipped." >> "$OUTPUT"
fi

echo ""
echo "Done. Created: $OUTPUT"
echo ""
echo "Now run:"
echo "cat $OUTPUT"
