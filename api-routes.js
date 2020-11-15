let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'Working',
        message: 'THE API IS WORKING YOU ACTUALLY DID SOMETHING'
    });
});

var controller = require('./controller');

router.route('/parts')
    .get(controller.getAll)
    .post(controller.new);

router.route('/parts/:id')
    .get(controller.getOne)
    .post(controller.update)
    .delete(controller.remove);

module.exports = router;