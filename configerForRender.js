const fs = require('fs');
const path = require('path');


const backendDir = path.resolve(__dirname, 'backend');
const frontendDir = path.resolve(__dirname, 'frontend');

const fileName = '.env';

const backendFile = path.join(backendDir, fileName)
const frontendFile = path.join(frontendDir, fileName)


const backendEnvContent = String.row`
DB_CONNECTED=postgresql://full_stuck_final_db_user:ytI3D0a5EBnNRkUidtCbYBYBB9kkOcZY@dpg-d287ipripnbc739ei5hg-a.oregon-postgres.render.com/full_stuck_final_db
JSON_SECRET=$2b$10$FVV6V0aMZZ5eK7ChUaZse.CIIManVtjAIRmLv/.bIow1RGstWRpSi
REFRESH_SECRET=$2b$10$kULS9jGU7oOB00d3WlTWW.Z/iJOT/d.2RI2vaPrNWrZ5RtDby/amK
NODE_ENV=development
PORT=5000
`;

const frontendEnvContent = String.row`
VITE_BASE_URL=http://localhost:5000
VITE_BASE_API_PATH=/api/v1`;

if (fs.existsSync(backendFile)) {
  console.log(`File : ${backendFile} already exists.`);
}
else
  fs.writeFileSync(backendFile, backendEnvContent);

if (fs.existsSync(frontendFile)) {
  console.log(`File : ${frontendFile} already exists.`);
}
else
  fs.writeFileSync(frontendFile, frontendEnvContent);
