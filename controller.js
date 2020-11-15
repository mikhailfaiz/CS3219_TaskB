let BikePart = require('./model');

exports.new = async function(req, res) {
    try {
        let bikePart = new BikePart();
        bikePart.name = req.body.name;
        bikePart.cost = req.body.cost;
        bikePart.weight = req.body.weight;

        await bikePart.save();
        res.status(200).send({
            message: "You have added a new bike part!",
            data: bikePart
        })
    } catch (e) {
        res.status(405).send({
            message: "Error occurred, bike part was not added. Are you sure you have all the necessary fields?",
            error: e
        })

    }
};

exports.getAll = function(req, res) {
    BikePart.get(function(err, parts){
        if (!err){
            res.status(200).send(parts);
        } else {
            res.json({
                status: "Error occurred, failed to retrieve bike parts :'(",
                message: err
            })
        }
    });
};

exports.getOne = function(req, res) {
    BikePart.findById(req.params.id, function (err, part) {
        if (!err) {
            res.status(200).json({
                message: 'Bike part details are now loading.....',
                data: part
            });
        } else {
            res.json({
                status: "Error occurred, failed to retrieve bike part :'(",
                message: err
            })
        }
    });
};

exports.update = async function(req, res) {
    try {
        if (req.body.name != undefined || 
            req.body.cost != undefined ||
            req.body.weight != undefined) {
                let bikePart = await BikePart.findOne({
                    _id: req.params.id
                })
                bikePart.name = req.body.name;
                bikePart.cost = req.body.cost;
                bikePart.weight = req.body.weight;

                await BikePart.updateOne({_id: req.params.id}, bikePart);
                res.status(200).json({
                    message: "Bike part successfully updated!",
                    data: bikePart
                });
            } else {
                res.status(405).send({
                    message: "No fields updated! Please update at least 1 field"
                })
            }
    } catch(e) {
        res.status(405).send({
            message: "No fields updated! Please update at least 1 field"
        })
    }
}

exports.remove = async function(req, res) {
    try {
        await BikePart.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: "Bike part removed successfully!",
        })
    } catch(e) {
        res.status(405).json({
            message: "Error occurred, removal failed :'(",
            error: e
        });
    }
}