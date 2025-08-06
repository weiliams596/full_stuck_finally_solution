const bcrypt = require('bcrypt');

const { User } = require('../models/index');

const Response = require('../../utils/Response');
const makeSecret = require('../../utils/makeSecret');
const { makeToken, verifyToken } = require('../../utils/tokenTools');
const JoiSchema = require('../../utils/joiSchemaFunc');


let hashCode = "";
let timerIntralHandle = null;

const logout = async (req, res) => {
    if (req.session) {
        req.session.destroy();
        console.log(10);
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.user = {};
};
/**
 * @constructor AuthController
 */

const authController = {
    /**
     * @api {post} /api/auth/login  Авторизация
     * @apiName login
     * @apiGroup Auth
     * @apiDescription Авторизация
     * @apiParam {String} email Қолданушының е-майлі
     * @apiParam {String} password Қолданушының паролі
     * @apiSuccess {String} message Қолданушы сәтті тіркелді!
     * @apiError {Number} code 400 Қолданушы тіркелмеген!
     * @apiError {Number} code 404 Қолданушы жойылған!
     * @apiError {Number} code 500 Қолданушының паролі немесе е-майлі неверны!
     */
    async register(req, res) {
        try {
            const { error } = JoiSchema.registerSchema.validate(req.apiQuery, { abortEarly: false });
            if (error) {
                return res.status(400).json(Response(400, error.details[0].message));
            }
            const { username, email, password, role } = req.apiQuery;
            const user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json(Response(400, `${email} дерек қорында бар!`));
            }
            const hashedPassword = await makeSecret(password);
            const newUser = await User.create({
                email: email.toLowerCase(),
                username: username,
                password: hashedPassword,
                role: role,
                status: role === 'admin' || role === 'iller' ? 'active' : 'inactive'
            });
            console.log(req.apiQuery);
            return res.status(201).json({
                message: 'Құрылғаны қабылданды!'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Жаңа қолданушы қурылуы қате!'));
        }
    },
    /**
     * @api {post} /api/auth/forgotPassword  Пароль сұрау функция
     * @apiName forgotPassword
     * @apiGroup Auth
     * @apiDescription Пароль сұрау функция
     * @apiParam {String} email Қолданушының е-майлі
     * @apiSuccess {String} message Пароль сұрау сәтті болды!
     * @apiError {Number} code 400 Қолданушы тіркелмеген!
     * @apiError {Number} code 500 Пароль сұрау қатеболды!
     */
    async login(req, res) {
        try {
            const { error } = JoiSchema.loginSchema.validate(req.apiQuery, { abortEarly: false });
            if (error) {
                return res.status(400).json(Response(400, error.details[0].message));
            }
            const { email, password } = req.apiQuery;
            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(400).json(Response(400, `${email} тіркелмеген!`));
            }
            if (user.status === 'deleted') {
                return res.status(404).json(Response(404, `${email} жойылған!`));
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(Response(400, 'Құпия сөз қате!'));
            }


            const { value: refreshValue, option: refreshOption } = makeToken({ id: user.id, role: user.role }, '7d');
            const { value: accessValue, option: accessOption } = makeToken({ myServer: 'web' }, '20m');
            res.header('Authorization', `Bearer ${accessValue}`);
            res.cookie('refresh_token', refreshValue, refreshOption);
            res.cookie('access_token', accessValue, accessOption);
            return res.status(200).json({
                message: 'Сәтті тіркелді!',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    status: user.status,
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, err.message));
        }
    },
    /**
     * @api {post} /api/auth/refreshToken  Токен жаңалау функция
     * @apiName refreshToken
     * @apiGroup Auth
     * @apiDescription Токен жаңалау
     * @apiSuccess {String} message Token жаңалау сәтті болды!
     * @apiError {Number} code 401 Тіркелмеген!
     * @apiError {Number} code 404 Қолданушы жойылған!
     * @apiError {Number} code 500 Token жаңалау қатеболды!
     */
    async refreshToken(req, res) {
        try {
            const { refresh_token } = req.cookies;
            if (!refresh_token) {
                await logout(req, res);
                return res.status(401).json({ ...Response(401, 'Тіркелмеген!'), code: 401 });
            }
            const decoded = verifyToken(refresh_token);
            const { id } = decoded;
            const user = await User.findByPk(id);
            if (!user) {
                await logout(req, res);
                return res.status(401).json({ ...Response(401, 'Қолданушы тіркелмеген!'), code: 401 });
            }
            if (user.status === 'deleted') {
                await logout(req, res);
                return res.status(404).json({ ...Response(404, 'Қолданушы жойылған!'), code: 404 });
            }
            const { value: accessValue, option: accessOption } = makeToken({ myServer: 'web' }, '20m');
            res.header('Authorization', `Bearer ${accessValue}`);
            res.cookie('access_token', accessValue, accessOption);
            return res.status(200).json({
                message: 'Token жаңалау сәтті болді!',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
                code: 0,
            });
        } catch (err) {
            await logout(req, res);
            return res.status(500).json(Response(500, err.message));
        }
    },
    /**
     * @api {post} /api/auth/admincode  Администратор код функция
     * @apiName admincode
     * @apiGroup Auth
     * @apiDescription Администратор код жасау
     * @apiParam {String} userInsert Қолданушының коды
     * @apiSuccess {String} message Администратор код жасалды! 15 минут уақыт кұттесіз!
     * @apiError {Number} code 400 Администратор кодын еңгізіңіз!
     * @apiError {Number} code 500 Администратор код жасау қатеболды!
     */
    async admincode(req, res) {
        try {
            const { userInsert } = req.apiQuery;
            if (hashCode !== '') {
                if (userInsert !== hashCode && userInsert !== 'init') {
                    return res.status(400).json(Response(400, 'Администратор кодын қате еңгізіңіз!'));
                }
                else if (userInsert === hashCode) {
                    hashCode = '';
                    if (timerIntralHandle)
                        clearInterval(timerIntralHandle);
                    return res.status(200).json({ message: 'Сәтті болды!' })
                }
                else {
                    return res.status(200).json({ message: 'Сәтті болды!' })
                }
            }
            else {
                hashCode = makeSecret('admin').trim();
                if (timerIntralHandle)
                    clearInterval(timerIntralHandle);
                timerIntralHandle = setInterval(() => {
                    hashCode = '';
                    clearInterval(timerIntralHandle);
                }, 15 * 60 * 1000);
            }
            console.log('admin code:\n', hashCode);
            return res.status(200).json({ message: 'Администратор код жасалды! 15 минут уақытқа күшке ие!' })

        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, err.message));
        }
    },
    async logout(req, res) {
        try {
            await logout(req, res);
            return res.status(200).json({ message: 'Сәтті шықтыңыз!' });
        } catch (e) {
            return res.status(500).json(Response(500, 'Жүйеден шығу шақыру қатеболды!'));
        }
    },
};

module.exports = authController;
