const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subDir = req.apiQuery.upload?.path || '';
        const dir = path.join(__dirname, '../../uploads',subDir);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}` + req.apiQuery.upload?.fileName + '-' + file.originalname);
    }
});

const filter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Сурет форматы қате!Тек JPG/JPEG/PNG файлын қолдаймыз!'), false);
    }
};

module.exports = multer({
    storage,
    limits: { fileSize: 512 * 1024 },
    filter
});