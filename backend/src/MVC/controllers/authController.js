const bcrypt = require('bcrypt');

const { User } = require('../models/index');

const errorResponse = require('../../utils/errorResponse');
const makeSecret = require('../../utils/makeSecret');
const { makeToken, verifyToken } = require('../../utils/tokenTools');
const JoiSchema = require('../../utils/joiSchemaFunc');

let hashCode = "";
let timerIntralHandle = null;

const authController = {
    async register(req, res) {
        try {
            const { error } = JoiSchema.registerSchema.validate(req.apiQuery);
            if (error) {
                return res.status(400).json(errorResponse(400, error.details[0].message));
            }
            const { username } = req.apiQuery;
            const user = await User.findOne({ where: { username } });
            if (user) {
                return res.status(400).json(errorResponse(400, `${username} дерек қорында бар!`));
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
            return res.status(201).json({
                message: 'Құрылғаны қабылданды!'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(errorResponse(500, 'Жаңа қолданушы қурылуы қате!'));
        }
    },
    async login(req, res) {
        try {
            const { error } = JoiSchema.loginSchema.validate(req.apiQuery);
            if (error) {
                return res.status(400).json(errorResponse(400, error.details[0].message));
            }
            const { email, password } = req.apiQuery;
            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(400).json(errorResponse(400, `${email} тіркелмеген!`));
            }
            if (user.status === 'deleted') {
                return res.status(404).json(errorResponse(404, `${email} жойылған!`));
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(errorResponse(400, 'Құпия сөз қате!'));
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
            return res.status(500).json(errorResponse(500, err.message));
        }
    },
    async refreshToken(req, res) {
        try {
            const frontend_token = req.headers.authorization.split(' ')[1];
            console.log(req.headers);

            const frontDecoded = verifyToken(frontend_token);
            if (frontDecoded.myServer !== 'web') {
                return res.status(401).json(errorResponse(401, 'Сізде құық жоқ!'));
            }
            const { refresh_token } = req.cookies;
            if (!refresh_token) {
                return res.status(401).json(errorResponse(401, 'Тіркелмеген!'));
            }
            const decoded = verifyToken(refresh_token);
            const { id, role } = decoded;
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.status(401).json(errorResponse(401, 'Қолданушы тіркелмеген!'));
            }
            if (user.status === 'deleted') {
                return res.status(404).json(errorResponse(404, 'Қолданушы жойылған!'));
            }
            const { value: accessValue, option: accessOption } = makeToken({ myServer: 'web' }, '20m');
            res.header('Authorization', `Bearer ${accessValue}`);
            res.cookie('access_token', accessValue, accessOption);
            return res.status(200).json({
                message: 'Refresh token сәтті!',
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(errorResponse(500, err.message));
        }
    },
    async admincode(req, res) {
        try {
            const { userInsert } = req.apiQuery;
            if (userInsert!=='test') {
                res.status(200).json({ isValid: userInsert == hashCode });
                return hashCode = '';
            }
            else {
                if (hashCode == '') {
                    hashCode = makeSecret('admin');
                    if (timerIntralHandle)
                        clearInterval(timerIntralHandle);
                    timerIntralHandle = setInterval(() => {
                        hashCode = '';
                        clearInterval(timerIntralHandle);
                    }, 15 * 60 * 1000);
                }
                console.log('admin code:', hashCode);
                return res.status(200).json({ message: 'Администратор код жасалды! 15 минут уақыт күшке ие!' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(errorResponse(500, err.message));
        }
    },
    async logout(req, res) {
        try {
            if (req.session) {
                req.session.destroy();
            }
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(200).json({ message: 'Сәтті шықтыңыз!' });
        } catch (e) {
            return res.status(500).json(errorResponse(500, 'Жүйеден шығу шақыру қатеболды!'));
        }
    },
};

module.exports = authController;
