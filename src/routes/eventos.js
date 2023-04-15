const { Router } = require('express');
const router = Router();
const { getEvent, getEventParam, createEvent } = require('../controllers/eventos');

router.route('/')
    .get(getEvent)
    .post(createEvent);

router.route('/:param')
    .get(getEventParam);

module.exports = router;