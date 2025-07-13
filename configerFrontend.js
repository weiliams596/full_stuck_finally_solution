const fs = require('fs');
const path = require('path');
const os = require('os');

const platform = os.platform();

console.log('Configuring package.json file...');
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {... packageJson.scripts,
    "build":`vite build  && echo 'Build complete!' && ${platform === 'win32'? 'xcopy dist ..\\backend\\public /Y' : platform === 'darwin'? 'cp -r dist/* ../backend/public/ ' : 'cp -r dist/* ../backend/public/'} && echo 'Copied to backend/public folder!'`
 };

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Configured package.json file successfully.');