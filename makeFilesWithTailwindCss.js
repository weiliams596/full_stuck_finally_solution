const fs = require('fs');
const path = require('path');


const frontendPath = path.resolve(__dirname, 'frontend');
const frontendSrcPath = path.resolve(frontendPath,'src');
const indexCss = 'index.css';
const mainJsx='main.jsx';
const viteConfigJS = 'vite.config.js';

const indexCssContent= String.raw`@import "tailwindcss";`;

const mainJsxContent=String.raw`import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
`;

const viteConfigJSContent = String.raw`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    host:'0.0.0.0',
    port:5173,// default port
    open:true,
    allowedHosts:['localhost'],
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
        rewrite:path => path.replace(/^\/api/, '')
      }
    }
  }
});
`;


const indexCssPath= path.join(frontendSrcPath,indexCss);
if (fs.existsSync(indexCssPath)) {
  console.log(`File : ${indexCssPath} already exists.`);
}
else
  fs.writeFileSync(indexCssPath, indexCssContent);

const mainJsxPath= path.join(frontendSrcPath,mainJsx);
if (fs.existsSync(mainJsxPath)) {
  console.log(`File : ${mainJsxPath} already exists.`);
}
else
  fs.writeFileSync(mainJsxPath, mainJsxContent);


const viteConfigPath= path.join(frontendPath,viteConfigJS);
if (fs.existsSync(viteConfigPath)) {
  fs.writeFileSync(viteConfigPath,viteConfigJSContent);
}
else
  console.log(`File : ${viteConfigPath} not exists.`);