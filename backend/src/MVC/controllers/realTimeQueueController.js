const { RealTimeQueue } = require('../models/realTimeQueue');
const errorResponse = require('../../utils/errorResponse');
const { get } = require('../../routes/authRoutes');

const realTimeQueueController = {
    //  Create a new realTimeQueue row
    async create(req, res) {
        try {
            const { commentID } = req.apiQuery;
            if (!commentID) {
                return res.status(400).json(errorResponse(400, 'Емхана нің IDы берылмеген!'));
            }
            const { queueCode } = req.apiQuery;
            const realTimeQueue = await RealTimeQueue.create({ queue_code: queueCode, comment_id: commentID });
            return res.status(201).json({ message: 'Сәтті жасалды!', newQueue: realTimeQueue });
        } catch (err) {
            return res.status(500).json(errorResponse(500, 'Кезек жасалудан қате щықты!'));
        }
    },
    //  Get a realTimeQueue row by queueCode
    async getByCode(req, res) {
        try {
            const { queueCode } = req.apiQuery;
            const realTimeQueue = await RealTimeQueue.findOne({ queue_code: queueCode });
            if (!realTimeQueue) {
                return res.status(404).json(errorResponse(404, 'Таңба жоқ!'));
            }
            return res.status(200).json(realTimeQueue);
        } catch (err) {
            return res.status(500).json(errorResponse(500, 'Кезек жасалмаған!'));
        }
    },
    //  Delete a realTimeQueue row by queueCode
    async deleteByCode(req, res) {
        try {
            const { queueCode } = req.apiQuery;
            const realTimeQueue = await RealTimeQueue.findOne({ queue_code: queueCode });
            if (!realTimeQueue) {
                return res.status(404).json(errorResponse(404, 'Таңба жоқ!'));
            }
            await RealTimeQueue.deleteOne({ queue_code: queueCode });
            return res.status(204).json({ message: 'Кезек сәтті жойылды!' });
        } catch (err) {
            return res.status(500).json(errorResponse(500, 'Кезек жасалмаған!'));
        }
    },
    //  Get all realTimeQueue rows
    async getAll(req, res) {
        try {
            const realTimeQueues = await RealTimeQueue.find();
            return res.status(200).json(realTimeQueues);
        } catch (err) {
            return res.status(500).json(errorResponse(500, 'Кезек жасалмаған!'));
        }
    },
    //  Add one to queue_count of realTimeQueue row by id and queueCode
    async addOne(req, res) {
        try {
            const { id, queueCode } = req.apiQuery;
            const realTimeQueue = await RealTimeQueue.findOne({ id: id, queue_code: queueCode });

            if (!realTimeQueue) {
                return res.status(404).json(errorResponse(404, 'Таңба жоқ!'));
            }
            realTimeQueue.queue_count++;
            realTimeQueue.updated_at = new Date();
            const newRealTimeQueue = await realTimeQueue.save();
            return res.status(200).json({ message: 'ID жолдаулды!', newQueue: newRealTimeQueue });
        } catch (err) {
            return res.status(500).json(errorResponse(500, 'Кезек жасалмаған!'));
        }
    },
    //  Get the next realTimeQueue row by queueCode and queue_count = 1
    async next(req,res){
        try{
            const {id} = req.apiQuery;
            const realTimeQueue = await RealTimeQueue.findOne({id:id});
            if(!realTimeQueue){
                return res.status(404).json(errorResponse(404, 'Табылмады!'));
            }
            const queue_max_index = realTimeQueue.queue_count - 1;
            if(queue_max_index <0 || realTimeQueue.queue_index >= queue_max_index){
                return res.status(404).json(errorResponse(404, 'Келесы кезең жоқ!'));
            }
            realTimeQueue.queue_index++;
            const nextRealTimeQueue = await realTimeQueue.save();
            return res.status(200).json(nextRealTimeQueue);
        }catch(e){
            return res.status(500).json(errorResponse(500, 'Кезек жасалмаған!'));
        }
    },
};

module.exports = realTimeQueueController;