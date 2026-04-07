import fs from 'fs';
import path from 'path';

// Remove other lockfiles
['package-lock.json', 'yarn.lock'].forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`Removing ${file}...`);
    fs.unlinkSync(filePath);
  }
});

// Check if pnpm is being used
const userAgent = process.env.npm_config_user_agent || '';
if (!userAgent.includes('pnpm/')) {
  console.error('Error: Use pnpm instead of npm or yarn.');
  process.exit(1);
}
