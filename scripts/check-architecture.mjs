#!/usr/bin/env node
/**
 * Component-based architecture checks.
 * Requires expected top-level folders; forbids src/features and FSD leftovers.
 * Optionally flags pages importing services deeply (prefer containers/hooks).
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const errors = [];
const warnings = [];

const REQUIRED = [
  'app',
  'components',
  'containers',
  'pages',
  'hooks',
  'services',
  'types',
  'utils',
  'config',
  'i18n',
  'store',
];

for (const d of REQUIRED) {
  if (!existsSync(join(ROOT, d))) {
    errors.push(`Missing required folder: src/${d}`);
  }
}

const FORBIDDEN = ['features', 'entities', 'widgets', 'shared'];
for (const d of FORBIDDEN) {
  if (existsSync(join(ROOT, d))) {
    errors.push(`Forbidden leftover folder: src/${d}`);
  }
}

// No Atomic Design layer folders under components
const ATOMIC = ['atoms', 'molecules', 'organisms', 'templates'];
for (const d of ATOMIC) {
  if (existsSync(join(ROOT, 'components', d))) {
    errors.push(`Forbidden Atomic Design folder: src/components/${d}`);
  }
}

// No Clean Architecture trees
for (const d of ['domain', 'application', 'infrastructure', 'presentation']) {
  if (existsSync(join(ROOT, d))) {
    errors.push(`Forbidden Clean Architecture folder: src/${d}`);
  }
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith('.d.ts')) out.push(p);
  }
  return out;
}

const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;
const DYNAMIC_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  for (const re of [IMPORT_RE, DYNAMIC_RE]) {
    re.lastIndex = 0;
    for (const match of src.matchAll(re)) {
      const spec = match[1];
      if (
        spec.startsWith('@/features') ||
        spec.startsWith('@/shared') ||
        spec.startsWith('@/entities') ||
        spec.startsWith('@/widgets')
      ) {
        errors.push(`${rel}: forbidden legacy import '${spec}'`);
      }
    }
  }

  // Pages must stay thin: only containers (and React types), no services/hooks/store
  if (rel.startsWith('pages/') && rel !== 'pages/index.ts') {
    if (/from\s+['"]@\/services(\/|['"])/.test(src)) {
      errors.push(`${rel}: pages must not import @/services — use a container`);
    }
    if (/from\s+['"]@\/hooks(\/|['"])/.test(src)) {
      errors.push(`${rel}: pages must not import @/hooks — use a container`);
    }
    if (!/from\s+['"]@\/containers\//.test(src) && !rel.endsWith('index.ts')) {
      errors.push(`${rel}: page should compose a @/containers/* module`);
    }
  }
}

// Component folders should be PascalCase and have index.ts
if (existsSync(join(ROOT, 'components'))) {
  for (const name of readdirSync(join(ROOT, 'components'))) {
    const p = join(ROOT, 'components', name);
    if (!statSync(p).isDirectory()) continue;
    if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
      errors.push(`components/${name}: folder should be PascalCase`);
    }
    if (!existsSync(join(p, 'index.ts')) && !existsSync(join(p, 'index.tsx'))) {
      errors.push(`components/${name}: missing public index.ts`);
    }
  }
}

if (errors.length) {
  console.error(
    `Architecture check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'),
  );
  if (warnings.length) {
    console.error(`Warnings (${warnings.length}):\n` + warnings.map((e) => `  - ${e}`).join('\n'));
  }
  process.exit(1);
}

console.log(`Architecture check passed (${walk(ROOT).length} files).`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
