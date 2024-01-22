const ExpressError = require("./expressError");


function logger(req, res, next){
    console.log(`RECEIVED a ${req.method} request to ${req.path}.`);
    return next();
}

function checkForEmptyParams(req, res, next) {
    try{
        if(!req.body.name || !req.body.price) {
            throw new ExpressError("Missing complete item info", 400);
        } else {
            return next()
        }
    } catch (e){
        return next(e)
    }
}

function checkIfThereIsItem(req, res, next) {
    try {
        const foundItem = ITEMS.find(item => item.name === req.params.name);

        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404);
        } else {
            req.foundItem = foundItem;
            return next();
        }
    } catch (e) {
        return next(e);
    }
}



module.exports = { logger, checkForEmptyParams, checkIfThereIsItem }