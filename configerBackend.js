const fs = require('fs');
const path = require('path');

console.log('Configuring package.json file...');
const packageJsonPath = path.resolve(process.cwd(), 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.scripts = {
    'makeServerDirectory':'mkdir src && cd src && mkdir utils && mkdir routes && mkdir MVC && cd MVC && mkdir controllers && mkdir models && mkdir views && cd .. && cd .. && node ../makeIndex.js',
    dev: 'nodemon src/index.js',
    start:'node src/index.js'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Configured package.json file successfully.');