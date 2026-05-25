#!/usr/bin/env bash

OUTPUT="project-code-snapshot.txt"

rm -f "$OUTPUT"

echo "PROJECT CODE SNAPSHOT" >> "$OUTPUT"
echo "Generated at: $(date)" >> "$OUTPUT"
echo "Project root: $(pwd)" >> "$OUTPUT"
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
  -path "./.next" -prune -o \
  -path "./build" -prune -o \
  -print | sort >> "$OUTPUT"

echo "" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"
echo "FILE CONTENTS" >> "$OUTPUT"
echo "==============================" >> "$OUTPUT"

find . \
  -path "./node_modules" -prune -o \
  -path "./dist" -prune -o \
  -path "./.git" -prune -o \
  -path "./coverage" -prune -o \
  -path "./uploads" -prune -o \
  -path "./generated" -prune -o \
  -path "./.next" -prune -o \
  -path "./build" -prune -o \
  -type f \( \
    -name "*.ts" -o \
    -name "*.js" -o \
    -name "*.json" -o \
    -name "*.prisma" -o \
    -name "*.yml" -o \
    -name "*.yaml" -o \
    -name "*.md" \
  \) ! -name "package-lock.json" \
     ! -name "yarn.lock" \
     ! -name "pnpm-lock.yaml" \
     ! -name ".env" \
     ! -name ".env.local" \
     ! -name ".env.production" \
  | sort | while read -r file; do
      echo "" >> "$OUTPUT"
      echo "--------------------------------------------------" >> "$OUTPUT"
      echo "FILE: $file" >> "$OUTPUT"
      echo "--------------------------------------------------" >> "$OUTPUT"
      cat "$file" >> "$OUTPUT"
      echo "" >> "$OUTPUT"
    done

echo "Done. Created: $OUTPUT"
