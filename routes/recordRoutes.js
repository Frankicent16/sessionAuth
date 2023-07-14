const express = require ('express')
const router = express.Router()
const recordControllers = require('../controllers/recordControllers')
const authMiddleware = require('../middlewares/authMiddlewares')

router.post('/createrecord', authMiddleware.isloggedIn,recordControllers.createRecord)
router.get('/allRecords', authMiddleware.isloggedIn,recordControllers.readRecords)
router.get('/records', authMiddleware.isloggedIn,recordControllers.readAllrecordsOfSpecificUser)
router.get('/Onerecords/:id', authMiddleware.isloggedIn,recordControllers.oneRecord)
router.put('/updatedrecords/:id', authMiddleware.isloggedIn,recordControllers.updateRecord)
router.delete('/deletedrecords/:id', authMiddleware.isloggedIn,recordControllers.deleteRecord)

module.exports = router