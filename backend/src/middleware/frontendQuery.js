
const frontendQuery = (req, res, next) => {
    req.apiQuery = {
        ...req.query,
        ...req.body,
        ...req.params,
    };
    // if(Object.keys(req.apiQuery).length === 0){
    //     return res.status(400).json({ message: "Сураніста бағдарлама жоқ!",code:400 });
    // }
    next();
};

module.exports = frontendQuery;