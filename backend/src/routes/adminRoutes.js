const express = require('express');
const router = express.Router();
const adminController = require('../MVC/controllers/adminController');
const frontendQuery = require('../middleware/frontendQuery');
const rateLimit = require('../utils/rateLimit');

router.use(frontendQuery);

router.post('/admin/add-hospital', rateLimit(10, 180), adminController.createHospital);

router.post('/admin/activate-users', rateLimit(10, 180), adminController.activeUsers);

router.get('/admin/deleted-users', adminController.getDeletingUsers);

router.get('/admin/hospitals',adminController.getHospitals);

router.delete('/admin/delete-user', adminController.deleteUser);

router.delete('/admin/delete-hospital', adminController.deleteHospital);

router.delete('/admin/delete-hospitals', adminController.deleteHospitals);

router.delete('/admin/delete-hospitals/:id', adminController.deleteHospitals);

module.exports = router;
