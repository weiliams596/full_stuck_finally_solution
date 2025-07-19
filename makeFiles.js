const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, 'backend/src');
const targetDir2 = path.resolve(__dirname, 'backend/src/DB');
const targetDir3 = path.resolve(__dirname, 'backend');
const fileName = 'index.js';
const fileName2 = 'db.js';
const fileName3 = '.env';
const filePpath = path.join(targetDir, fileName);
const filePpath2 = path.join(targetDir2, fileName2);
const filePpath3 = path.join(targetDir3, fileName3);
const filePpath4 = path.join(targetDir3, 'makeJWTSecret.js');

const indexContent = `// This is auto generated index.js file
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit:100, // limit each IP to 100 requests per windowMs
  message: 'Сіз көптеген сұраныс жсадңыз!',
  statusCode: 429, // return 429 status code
};

app.use(cors({
origin: 'http://localhost:5173'}));

app.listen(port, () => {
  console.log(\`Server is running on port $\{port}\`);
  console.log(\`Go to http://localhost:$\{port} to see the app\`);
});
`;

const backendEndedContent = `
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

let JWT_SECRET='';

const hashSomeThing = async (word, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedWord = await bcrypt.hash(word, salt);
        JWT_SECRET = hashedWord;

        let newEnvContent = fs.readFileSync(\`\${String.raw\`${filePpath3}\`}\`,'utf8');
        newEnvContent += \`\n\rJSON_SECRET=\${JWT_SECRET}\`;
        fs.writeFileSync(\`\${String.raw\`${filePpath3}\`}\`, newEnvContent);
    } catch (err) {
        console.log(err);
        return err;
    }
};

const getProjectName = ()=>{
  const fullPath = path.resolve(__dirname, 'makeFiles.js');
  let splitWords = fullPath.split('/');
  if(splitWords.length < 2){
    splitWords = fullPath.split(${String.raw`'\\'`});
  }
  let index = splitWords.length - 1;
  for(; index >= 0; index--){
    if(splitWords[index] == 'backend'){
      break;
    }
  }
    return splitWords[index-1];
}

const ProjectName = getProjectName();
hashSomeThing(ProjectName);

`;

const dbContent = `
const pg = require('pg');
require('dotenv').config();
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
`;

const dotenvContent = `
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_NAME=your_db_name
DB_PORT=5432
`;

const dotIgnoreContent = `# Node modules
node_modules/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS generated files
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Compiled files
dist/
build/
# Test coverage
coverage/

# Database files
*.sqlite
*.sqlite3

# IDE & Editor files
.vscode/
.idea/

# Other trash
*.tgz
*.gz
*.zip
.cache/
tmp/
temp/
*.bak
*.swp

# TypeScript files
*.tsbuildinfo

# Package lock files
package-lock.json
yarn.lock
`;


if (fs.existsSync(filePpath)) {
  console.log(`File : ${filePpath} already exists.`);
}
else
  fs.writeFileSync(filePpath, indexContent);

if (fs.existsSync(filePpath2)) {
  console.log(`Created ${fileName2} in ${targetDir2}`);
}
else
  fs.writeFileSync(filePpath2, dbContent);

if (fs.existsSync(filePpath3)) {
  console.log(`Created ${fileName3} in ${targetDir3}`);
}
else
  fs.writeFileSync(filePpath3, dotenvContent);

if (fs.existsSync(path.join(__dirname, '.gitignore'))) {
  console.log(`Created .gitignore in ${path.join(__dirname, '.gitignore')}`);
}
else
  fs.writeFileSync(path.join(__dirname, '.gitignore'), dotIgnoreContent);

if (fs.existsSync(filePpath4)) {
  console.log(`Created makeJWTSecret.js in ${targetDir3}`);
}
else
  fs.writeFileSync(filePpath4, backendEndedContent);

console.log('All files created successfully.');