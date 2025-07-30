const express = require('express');
const router = express.Router();
const authController = require('../MVC/controllers/authController');
const frontendQuery = require('../middleware/frontendQuery');
const rateLimit = require('../utils/rateLimit');

router.use(frontendQuery);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Қолданушыға қатысты API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Қолданушыны тіркеу
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Тіркеу сәтті өтті
 */
router.post('/register', rateLimit(5, 60), authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Қолданушы жүйеге кіреді
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Кіру сәтті өтті
 */
router.post('/login', rateLimit(5, 60), authController.login);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Токенді жаңарту
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Жаңарту сәтті өтті
 */
router.post('/refresh-token', rateLimit(20, 60 * 20), authController.refreshToken);

/**
 * @swagger
 * /admincode:
 *     summary: Адміністратор кодын көру
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Жаңарту сәтті өтті
 */
router.post('/admincode', rateLimit(20, 60 * 20), authController.admincode);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Қолданушыны шығару
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шығару сәтті өтті
 */
router.post('/logout',rateLimit(1, 60 * 20), authController.logout);

module.exports = router;
