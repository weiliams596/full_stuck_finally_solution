const bcrypt = require('bcrypt');

const { User,Doctor } = require('../models/index');

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
            const { error } = JoiSchema.registerSchema.validate(req.apiQuery,{abortEarly: false});
            if (error) {
                return res.status(400).json(Response(400, error.details[0].message));
            }
            const { email } = req.apiQuery;
            console.log(email);
            const user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json(Response(400, `${email} дерек қорында бар!`));
            }

            let keys = Object.keys(req.apiQuery);
            let values = Object.values(req.apiQuery);
            let obj = {};
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === "password") {
                    obj[keys[i]] = makeSecret(values[i]);
                    continue;
                } else if (keys[i] === "confirmPassword") {
                    continue;
                }
                obj[keys[i]] = values[i];
            }
            const newUser = await User.create({
                ...obj,
            });
            if (newUser.role === 'iller' || newUser.role === 'admin') {
                newUser.status = 'active';
                await newUser.save();
            }
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
            const { error } = JoiSchema.loginSchema.validate(req.apiQuery,{abortEarly: false});
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
            let isComplate = false;
            const doctor = await Doctor.findOne({ where: { user_id: user.id } });
            if (doctor) {
                if (doctor.status === 'deleted') {
                    return res.status(404).json(Response(404, `${email} жойылған!`));
                }
                isComplate = true;
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
            console.log(req.apiQuery);
            return res.status(200).json({
                message: 'Сәтті тіркелді!',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    status: user.status,
                    registed: isComplate,
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
            if (userInsert !== hashCode) {
                if (hashCode == '') {
                    hashCode = makeSecret('admin').trim();
                    if (timerIntralHandle)
                        clearInterval(timerIntralHandle);
                    timerIntralHandle = setInterval(() => {
                        hashCode = '';
                        clearInterval(timerIntralHandle);
                    }, 15 * 60 * 1000);
                }
                console.log('admin code:\n', hashCode);
                return res.status(200).json({ message: 'Администратор код жасалды! 15 минут уақыт кұттесіз!' })
            }
            else {
                console.log(userInsert);
                res.status(200).json({ isValid: userInsert == hashCode });
                return hashCode = '';
            }
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
    /**
     * @api {get} /api/v1/getInactiveUsers  Актив болғандар функция
     * @apiName getInactiveUsers
     * @apiGroup Auth
     * @apiDescription Актив болмағандарды қайтару
     * @apiParam {Number} id Администраторның ID
     * @apiSuccess {String} message Сәтті өзгерылды!
     * @apiError {Number} code 403 Сізде рұқсат жоқ!
     * @apiError {Number} code 500 Актив болғандарды қайтару қатеболды!
     */
    async getInactiveUsers(req, res) {
        try {
            const { id } = req.apiQuery;
            const admin = await User.findByPk(id);
            if (!admin.role === 'admin') {
                return res.status(403).json(Response(403, 'Сізде рұқсат жоқ!'));
            }
            const users = await User.findAll({ where: { status: 'inactive' } });
            let inactiveUsers = [];
            users.map(usr => {
                inactiveUsers.push({
                    id: usr.id,
                    username: usr.username,
                    role: usr.role,
                    status: usr.status,
                });
            });
            return res.status(200).json({ message: 'Актив болмағандар сәтті қайтарылды!', inactiveUsers });
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Актив болғандарды қайтару қатеболды!'));
        }
    },
    /**
     * @api {post} /api/v1/activeUser  Активы функция
     * @apiName activeUser
     * @apiGroup Auth
     * @apiDescription Қолданушы активация 
     * @apiParam {Number} user_id Қолданушының ID
     * @apiParam {Number} id Администраторның ID
     * @apiSuccess {String} message Сәтті активы болды!
     * @apiError {Number} code 401 Қате бағдарлама!
     * @apiError {Number} code 403 Сізде рұқсат жоқ!
     * @apiError {Number} code 404 Табылмады!
     * @apiError {Number} code 500 Активация қатеболды!
     */
    async activeUser(req, res) {
        try {
            const { user_id, id } = req.apiQuery;
            if (!user_id || !id) {
                return res.status(401).json(Response(401, 'Қате бағдарлама!'));
            }
            const admin = await User.findOne({ where: { id } });
            if (!admin.role === 'admin') {
                return res.status(403).json(Response(403, 'Сізде рұқсат жоқ!'));
            }
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return res.status(404).json(Response(404, 'Табылмады!'));
            }
            user.status = 'active';
            await user.save();
            return res.status(200).json({ message: 'Сәтті активы болды!' });
        } catch (e) {
            console.log(e);
        }
    },
};

module.exports = authController;
