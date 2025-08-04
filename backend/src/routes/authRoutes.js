const express = require('express');
const router = express.Router();
const authController = require('../MVC/controllers/authController');
const frontendQuery = require('../middleware/frontendQuery');
const rateLimit = require('../utils/rateLimit');
const authorization = require('../middleware/authorization');

router.use(frontendQuery);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Қолданушыға қатысты API(Бәрлық paramaters,body,query лар, backend ға бір обек боп құралады)
 * 
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Шығару сәтті өтті
 */
router.post('/logout', rateLimit(1, 60 * 20), authController.logout);

/**
 * @swagger
 * /active-user:
 *   post:
 *     tags: [Auth]
 *     summary: Активациялау
 *     description: Активациялау үшін қолданушының активсін жасау
 *     operationId: activeUser
 */
router.post('/active-user', rateLimit(100, 60), authController.activeUser);


router.get('/inactive-users', rateLimit(100, 60), authController.getInactiveUsers);

module.exports = router;
