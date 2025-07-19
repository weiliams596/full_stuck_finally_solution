const fs = require('fs');
const path = require('path');
const os = require('os');

const platform = os.platform();

console.log('Configuring package.json file...');
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {... packageJson.scripts,
    "build":`vite build  && echo 'Build complete!' && ${platform === 'win32'? 'xcopy dist ..\\backend\\public /E /H /C /I /Y' : platform === 'darwin'? 'cp -r dist/* ../backend/public/ ' : 'cp -r dist/* ../backend/public/'} && echo 'Copied to backend/public folder!'`,
    "useTailwindCss":`dir && cd src && ${platform === 'win32'? 'del index.css app.css main.jsx -Force':'rm -rf ./index.css ./app.css ./main.jsx'} && cd .. && npm i tailwindcss @tailwindcss/vite && node ../makeFilesWithTailwindCss.js`
 };

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Configured package.json file successfully.');