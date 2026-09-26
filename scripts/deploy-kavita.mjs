// Builds the library and unpacks it into a local Kavita checkout (steps 1-3 of docs/testing-in-kavita.md)
//   node scripts/deploy-kavita.mjs                    targets ../Kavita/UI/Web
//   node scripts/deploy-kavita.mjs --target <path>    targets another Kavita UI/Web folder
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

const args = process.argv.slice(2);
const targetIndex = args.indexOf('--target');
const kavitaWeb = resolve(targetIndex >= 0 ? args[targetIndex + 1] : join(root, '../Kavita/UI/Web'));

if (!existsSync(join(kavitaWeb, 'node_modules'))) {
  console.error(`No node_modules in ${kavitaWeb}. Run npm install there first, or pass --target <Kavita/UI/Web>`);
  process.exit(1);
}

const run = (command, cwd = root) => execSync(command, { cwd, stdio: 'inherit' });

run('npm run build:lib');

const [packed] = JSON.parse(
  execSync(`npm pack ./dist/kavita-ng --pack-destination dist --json`, { cwd: root, encoding: 'utf8' }),
);
const tarball = join(distDir, packed.filename);
console.log(`Packed ${packed.name}@${packed.version}`);

const libDir = join(kavitaWeb, 'node_modules', packed.name);
rmSync(libDir, { recursive: true, force: true });
mkdirSync(libDir, { recursive: true });
// Relative paths, since Git Bash's GNU tar reads "C:" in an absolute path as a remote host
execFileSync('tar', ['-xzf', relative(kavitaWeb, tarball), '-C', relative(kavitaWeb, libDir), '--strip-components=1'], {
  cwd: kavitaWeb,
  stdio: 'inherit',
});
console.log(`Unpacked into ${libDir}`);

rmSync(join(kavitaWeb, '.angular/cache'), { recursive: true, force: true });

const mapping = execFileSync(process.execPath, ['scripts/tokens.mjs', '--kavita'], { cwd: root, encoding: 'utf8' });
const mappingPath = join(kavitaWeb, 'src/theme/_kng-mapping.scss');
writeFileSync(mappingPath, mapping);
console.log(`Wrote ${mappingPath}`);

console.log('Done. Restart the Kavita dev server (npm start in UI/Web)');
