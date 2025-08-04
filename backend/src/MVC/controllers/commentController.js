const { Comment, RealTimeQueue } = require('../../Config/db');

const Response = require('../../utils/Response');

const commentController = {
    /**
     * Бағалау жаңажасау
     * @api {post} /api/v1/comment/create-comment  Бағалау жасау функция
     * @apiName createComment
     * @apiGroup Comment
     * @apiDescription Бағалау жасау үшін қолданушының жауап беру, талап ереже жауап беру, сәтті жасау үшін сәттілерді жасау құжаттарын басылады.
     * @apiParam {String} comment Сәтті
     * @apiParam {Number} comment_point Сәттінің талап ережесі
     * @apiParam {String} status Сәттінің статусы 
     * @apiParam {Number} author_id Сәттінің қолданушының ID
     * @apiParam {Number} doctor_id Сәттінің талап ережегінің ID
     * @apiParam {Number} real_time_queue_id Талап ережегінің ID
     * @apiSuccess {Object} newComment Сәттінің жауап берілген объект
     * @apiError {Object} code 400  Маңізды бағдарлама берылмеген
     * @apiError {Object} code 404  Талап ереже табылмады
     * @apiError {Object} code 500  Бағалау жұйесінде қате шықты
     */
    async createComment(req, res) {
        try {
            const { comment, comment_point, status, author_id, doctor_id, real_time_queue_id } = req.apiQuery;
            if (!comment || !comment_point || !status || !author_id || !doctor_id || !real_time_queue_id) {
                return res.status(400).json(Response(400, `Маңізды бағдарлама берылмеген: comment:${comment}, comment_point:${comment_point}, status:${status}, author_id:${author_id}, doctor_id:${doctor_id}, real_time_queue_id:${real_time_queue_id}`));
            }
            const realTQ = await RealTimeQueue.findOne({where:{id: real_time_queue_id,queue_status:'completed'}});
            if (!realTQ) {
                return res.status(404).json(Response(404, `Талап ереже табылмады: ${real_time_queue_id}`));
            }
            const newComment = await Comment.create({
                comment,
                comment_point,
                status,
                author_id,
                doctor_id,
            });
            return res.status(201).json({message: 'Сәтті жіберілді!', newComment});
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Бағалау жаңажасау жұйесінде қате шықты!'));
        }
    },
    /**
     * Кезек ID бойынша бағалауларды алу функция
     * @api {get} /api/v1/comment/get-comments-by-real-time-queue-id  Сәттілерді жауап беру функция
     * @apiName getCommentsByRealTimeQueueId
     * @apiGroup Comment
     * @apiDescription Сәттілерді жауап беру үшін талап ережегінің ID жөнде сәттілерді жауап беру құжаттарын басылады.
     * @apiParam {Number} real_time_queue_id Талап ережегінің ID
     * @apiSuccess {Object} comments Сәттілерді жауап берілген объект
     * @apiError {Object} code 400  Маңізды бағдарлама берылмеген
     * @apiError {Object} code 404  Талап ереже табылмады
     * @apiError {Object} code 500  Бағалау жұйесінде қате шықты
     */
    async getCommentsByRealTimeQueueId(req, res) {
        try {
            const { real_time_queue_id } = req.apiQuery;
            if (!real_time_queue_id) {
                return res.status(400).json(Response(400, `Маңізды бағдарлама берылмеген: real_time_queue_id:${real_time_queue_id}`));
            }
            const realTQ = await RealTimeQueue.findOne({where:{id: real_time_queue_id,queue_status:'completed'}});
            if (!realTQ) {
                return res.status(404).json(Response(404, `Талап ереже табылмады: ${real_time_queue_id}`));
            }
            const comments = await Comment.findAll({where: {real_time_queue_id: real_time_queue_id}, order: [['createdAt', 'DESC']]});
            return res.status(200).json({message: 'Сәттілер жіберілді!', comments});
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Кезек ID бойынша бағалауларды алу жұйесінде қате шықты!'));
        }
    },
    /**
     * Бағалау ID бойынша алу функция
     * @api {get} /api/v1/comment/get-comment/:id Сәттінің жауап беру функция
     * @apiName getCommentById
     * @apiGroup Comment
     * @apiDescription Сәттінің ID жөнде сәттінің жауап беру құжаттарын басылады.
     * @apiParam {Number} id Сәттінің ID
     * @apiSuccess {Object} comment Сәттінің жауап берілген объект
     * @apiError {Object} code 400  Маңізды бағдарлама берылмеген
     * @apiError {Object} code 404  Сәтті табылмады
     * @apiError {Object} code 500  Бағалау жұйесінде қате шықты
     */
    async getCommentById(req, res) {
        try {
            const { id } = req.apiQuery;
            if (!id) {
                return res.status(400).json(Response(400, `Маңізды бағдарлама берылмеген: id:${id}`));
            }
            const comment = await Comment.findOne({where: {id: id}});
            if (!comment) {
                return res.status(404).json(Response(404, `Сәтті табылмады: ${id}`));
            }
            return res.status(200).json({message: 'Сәтті жіберілді!', comment});
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Бағалау ID бойынша алу жұйесінде қате шықты!'));
        }
    },
    /**
     * Бағалау ID бойынша бағалау жаңарту функция
     * @api {put} /api/v1/comment/update-comment  Сәттінің жауап беру функция
     * @apiName updateCommentById
     * @apiGroup Comment
     * @apiDescription Сәттінің ID жөнде сәттінің жауап беру құжаттарын басылады.
     * @apiParam {Number} id Сәттінің ID
     * @apiParam {String} comment Сәтті
     * @apiParam {Number} comment_point Сәттінің талап ережесі
     * @apiParam {String} status Сәттінің статусы 
     * @apiSuccess {Object} updatedComment Сәттінің жауап берілген объект
     * @apiError {Object} code 400  Маңізды бағдарлама берылмеген
     * @apiError {Object} code 404  Сәтті табылмады
     * @apiError {Object} code 500  Бағалау жұйесінде қате шықты
     */
    async updateCommentById(req, res) {
        try {
            const { id } = req.apiQuery;
            const { comment, comment_point, status } = req.body;
            if (!id || !comment || !comment_point || !status) {
                return res.status(400).json(Response(400, `Маңізды бағдарлама берылмеген: id:${id}, comment:${comment}, comment_point:${comment_point}, status:${status}`));
            }
            const commentToUpdate = await Comment.findOne({where: {id: id}});
            if (!commentToUpdate) {
                return res.status(404).json(Response(404, `Сәтті табылмады: ${id}`));
            }
            const updatedComment = await commentToUpdate.update({
                comment,
                comment_point,
                status,
            });
            return res.status(200).json({message: 'Сәтті жіберілді!', updatedComment});
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Бағалау ID бойынша бағалау жаңарту жұйесінде қате шықты!'));
        }
    },
    /**
     * Бағалау ID бойынша бағалау жойылу функция
     * @api {delete} /api/v1/comment/delete-comment/:id  Сәттінің жауап беру функция
     * @apiName deleteCommentById
     * @apiGroup Comment
     * @apiDescription Сәттінің ID жөнде сәттінің жауап беру құжаттарын басылады.
     * @apiParam {Number} id Сәттінің ID
     * @apiSuccess {Object} message Сәттінің жойылды!
     * @apiError {Object} code 400  Маңізды бағдарлама берылмеген
     * @apiError {Object} code 404  Сәтті табылмады
     * @apiError {Object} code 500  Бағалау жұйесінде қате шықты
     */
    async deleteCommentById(req, res) {
        try {
            const { id } = req.apiQuery;
            if (!id) {
                return res.status(400).json(Response(400, `Маңізды бағдарлама берылмеген: id:${id}`));
            }
            const commentToDelete = await Comment.findByPk(id);
            if (!commentToDelete) {
                return res.status(404).json(Response(404, `Сәтті табылмады: ${id}`));
            }
            await commentToDelete.destroy();
            return res.status(200).json({message: 'Сәтті жойылды!'});
        } catch (e) {
            console.log(e);
            return res.status(500).json(Response(500, 'Бағалау жұйесінде қате шықты!'));
        }
    },
}


module.exports = commentController;
