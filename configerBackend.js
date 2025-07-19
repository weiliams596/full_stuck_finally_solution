const fs = require('fs');
const path = require('path');
const os = require('os');

const platform = os.platform();

console.log('Configuring package.json file...');
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {
    makeServerDirectory:`mkdir public && mkdir src && cd src && mkdir DB && mkdir middleware && mkdir utils && mkdir routes && mkdir MVC && cd MVC && mkdir controllers && mkdir models && mkdir views && cd .. && cd .. && node ../makeFiles.js && node makeJWTSecret.js && ${platform==='win32'?'del':'rm -rf'} makeJWTSecret.js`,
    dev: 'nodemon src/index.js',
    start:'node src/index.js'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Configured package.json file successfully.');