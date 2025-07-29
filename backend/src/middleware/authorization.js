const {  makeToken, verifyToken} = require('../utils/tokenTools');

const authorization = async (req, res, next) => {
    try {
        const accessToken = req.cokies.access_token;
        if (!accessToken) {
            return res.status(401).json({ message: "Тіркелу жоқ!" });
        }
        const refreshToken = req.cokies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ message: "Тіркелу жоқ!" });
        }
        const payload = jwt.decode(refreshToken);
        if (!payload) {
            return res.status(401).json({ message: "Тіркелу жоқ!" });
        }
        req.user = payload;
        const decodedToken = verifyToken(accessToken);
        req.user ? req.user = { ...req.user, ...decodedToken } : req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Тіркелу жоқ немесе тіркелу уағы өтіп кеткен!" });
    }
};
module.exports = authorization;