import fs from 'fs/promises';
import path from 'path';

const folderPath = process.argv[2];

if (!folderPath) {
  process.stderr.write('Enter the path to the folder.\n');
  process.exit(1);
}

fs.readdir(folderPath, (err, files) => {
  if (err) {
    process.stderr.write(`Error reading folder: ${err.message}\n`);
    return;
  }

  const extensionCount = files.reduce((acc, file) => {
    const ext = path.extname(file).slice(1);
    if (ext) {
      acc[ext] = (acc[ext] || 0) + 1;
    }
    return acc;
  }, {});

  process.stdout.write('Extensions:\n');
  for (const [ext, count] of Object.entries(extensionCount)) {
    console.log(`${ext}: ${count}`);
  }
});
