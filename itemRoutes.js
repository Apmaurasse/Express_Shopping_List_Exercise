const express = require('express');
const router = new express.Router();
const ITEMS = require("./fakeDb")
const middleware = require("./middleware");
const ExpressError = require('./expressError');



router.get('/', (req, res) => {
    res.json({ items: ITEMS })
})


router.post("/", middleware.checkForEmptyParams, function(req, res){
    const newItem = { name: req.body.name, price: req.body.price}
    ITEMS.push(newItem)
    res.status(201).json({item: newItem})
})

router.get("/:name", middleware.checkIfThereIsItem, (req, res) => {
    // Access the found item from the checkIfThereIsItem middleware
    const foundItem = req.foundItem;
    res.json({ item: foundItem });
});

router.patch("/:name", middleware.checkIfThereIsItem, function(req, res) {
    const foundItem = req.foundItem;
    foundItem.price = req.body.price
    res.json({fmessage: "Item updated successfully.", item: foundItem})
})


router.delete("/:name", function (req, res) {
    const foundItem = ITEMS.findIndex(item => item.name === req.params.name)
    if (foundItem === -1){
        throw new ExpressError("Item not found", 404)
    }
    ITEMS.splice(foundItem, 1)
    res.json({ message: "Deleted" })
})

module.exports = router;