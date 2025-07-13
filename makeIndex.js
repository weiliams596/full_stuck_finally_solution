const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, 'backend/src');
const fileName = 'index.js';
const filePpath = path.join(targetDir, fileName);

const content = `// This is auto generated index.js file
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(\`Server is running on port $\{port}\`);
  console.log(\`Go to http://localhost:$\{port} to see the app\`);
});
`;

if (fs.existsSync(filePpath)) {
    console.log(`File : ${filePpath} already exists.`);
    console.log(`You can copy this content to your index.js file.\n${content}`);
}
else
    fs.writeFileSync(filePpath, content);
console.log(`Created ${fileName} in ${targetDir}`);

